import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Animated,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import DropDownItem from './DropDownItem';
import DisplayFilter from './DisplayFilter';

import Back from './back.png';

const {height} = Dimensions.get('screen');

const deepClone = arr => JSON.parse(JSON.stringify(arr));

const assignId = (options, parent) => {
  options = options.map((option, i) => {
    if (option.nested)
      option.nested = assignId(option.nested, [...parent, i + 1]);
    const idPrefix = parent.reduce((prefix, el) => (prefix += el + '.'), '');
    return Object.assign(option, {id: idPrefix + (i + 1)});
  });
  return options;
};

export class DropDown extends Component {
  constructor(props) {
    super(props);
    this.optionsWithId = assignId(Array.from(props.options), []);

    this.state = {
      isOpen: false,
      options: this.optionsWithId,
      optionStack: [],
      levelDown: false,
      selected: [],
      animation: {
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(20),
      },
    };
  }

  toggleOpen = () => {
    this.setState(prevState => {
      if (!prevState.isOpen) {
        Animated.parallel([
          Animated.timing(this.state.animation.opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.animation.translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(this.state.animation.opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.animation.translateY, {
            toValue: 20,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }
      return {
        isOpen: !prevState.isOpen,
      };
    });
  };

  handleSelect = id => {
    const _options = deepClone(this.optionsWithId);
    let _selected = deepClone(this.state.selected);

    const filterSelections = (selected, newSelection) => {
      const index = selected.findIndex(el => {
        if (newSelection) return el.id === newSelection.id;
        else {
          return el.id === id.slice(0, 1);
        }
      });
      if (index === -1) return selected.concat(newSelection);
      else {
        selected.splice(index, 1, newSelection);
        return selected.filter(el => el);
      }
    };

    const selectOption = (arr, sArr, i) => {
      const parent = arr.find(el => el.id === id.slice(0, i + 1));
      let sParent = [];
      if (
        sArr &&
        sArr.length &&
        sArr.some(el => el.id.slice(0, 1) === id.slice(0, 1))
      ) {
        sParent = sArr.find(el => el.id === id.slice(0, i + 1));
        if (sParent === undefined) {
          sParent = [];
          if (parent.id === id) {
            return sArr.concat(parent);
          }
        } else if (sParent.id === id) {
          if (i === 0) return null;
          return sArr.filter(el => el.id !== sParent.id);
        }
      }

      if (parent.id === id) return [parent];

      if (parent.nested) {
        const nested = selectOption(parent.nested, sParent.nested, (i += 2));
        if (Array.isArray(nested)) {
          if (nested.length) {
            parent['nested'] = nested;
          } else return null;
        } else if (nested === null) {
          sParent['nested'] = sParent.nested.filter(
            el => el.id !== id.slice(0, i + 1),
          );
          return sParent['nested'].length ? sParent : null;
        } else {
          parent['nested'] = sParent.nested
            ? filterSelections(sParent.nested, nested)
            : [nested];
        }
      }

      return parent;
    };

    const newSelection = selectOption(_options, _selected, 0);
    _selected = filterSelections(_selected, newSelection);

    this.setState({
      selected: _selected,
    });

    if (this.props.onChange) {
      this.props.onChange(_selected);
    }

    return _selected;
  };

  removeFilter = id => {
    this.setState(prevState => ({
      selected: prevState.selected.filter(el => el.id !== id),
    }));
  };

  loadNested = options => {
    this.setState(prevState => ({
      optionStack: prevState.optionStack.concat([prevState.options]),
      options,
      levelDown: true,
    }));
  };

  goBack = () => {
    this.setState(prevState => ({
      options: prevState.optionStack.pop(),
      levelDown: !!prevState.optionStack.length,
    }));
  };

  render() {
    const {options, isOpen, levelDown, selected, animation} = this.state;

    return (
      <View style={{padding: 10}}>
        <TouchableWithoutFeedback onPress={this.toggleOpen}>
          <Animated.View
            pointerEvents={isOpen ? 'auto' : 'none'}
            style={[styles.backDrop, {opacity: animation.opacity}]}
          />
        </TouchableWithoutFeedback>
        <TouchableHighlight
          underlayColor={this.props.inputUnderlayColor || '#fff'}
          onPress={this.toggleOpen}
          style={[styles.rootSelect, this.props.inputStyles]}>
          <>
            {!selected.length ? (
              <Text
                style={{color: 'gray', padding: 5, margin: 3, fontSize: 23}}>
                {this.props.placeholder || 'Multi Level Selector'}
              </Text>
            ) : (
              <DisplayFilter
                removeFilter={this.removeFilter}
                filters={selected}
              />
            )}
          </>
        </TouchableHighlight>
        <View style={styles.optionWrapper}>
          <Animated.View
            pointerEvents={!isOpen ? 'none' : 'auto'}
            style={[
              styles.optionContainer,
              {
                opacity: animation.opacity,
                transform: [
                  {
                    translateY: animation.translateY,
                  },
                ],
              },
              this.props.optionContainerStyles,
            ]}>
            {levelDown && (
              <TouchableHighlight
                onPress={this.goBack}
                underlayColor="#fff"
                style={[
                  styles.optionTextWrapper,
                  this.props.optionTextWrapperStyles,
                ]}>
                <>
                  <Image
                    source={Back}
                    style={[
                      {width: 10, height: 10},
                      this.props.optionsIconStyles,
                    ]}
                  />
                  <Text style={[this.props.optionTextStyles]}>Go Back</Text>
                </>
              </TouchableHighlight>
            )}

            {options.map(el => (
              <DropDownItem
                handleSelect={this.handleSelect}
                key={el.id}
                option={el}
                nested={el.nested}
                selected={selected}
                loadNested={el.nested && this.loadNested}
                optionTextWrapperStyles={this.props.optionTextWrapperStyles}
                optionTextStyles={this.props.optionTextStyles}
                optionsIconStyles={this.props.optionsIconStyles}
              />
            ))}
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootSelect: {
    borderRadius: 5,
    elevation: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  backDrop: {
    height,
    backgroundColor: 'rgba(0,0,0,0.4)',
    ...StyleSheet.absoluteFill,
  },
  optionWrapper: {
    ...StyleSheet.absoluteFill,
    height,
  },
  optionContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    position: 'absolute',
    bottom: '9%',
  },
  optionTextWrapper: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DropDown;
