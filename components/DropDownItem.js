import React, {useState, useLayoutEffect} from 'react';
import {TouchableHighlight, Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const DropDownItem = ({
  option,
  handleSelect,
  loadNested,
  nested,
  optionTextWrapperStyles,
  optionTextStyles,
  optionsIconStyles,
  selected,
}) => {
  const isSelected = React.useCallback(
    (arr, i) => {
      const parent = arr.find(el => el.id === option.id.slice(0, i + 1));
      if (parent && parent.id === option.id) return true;
      if (parent && parent.nested) return isSelected(parent.nested, i + 2);
      else return false;
    },
    [selected],
  );

  const [checked, handleCheck] = useState(isSelected(selected, 0));

  useLayoutEffect(() => {
    handleCheck(isSelected(selected, 0));
  }, [selected]);

  const handlePress = async () => {
    if (nested) loadNested(nested);
    else {
      const _selected = handleSelect(option.id);
      handleCheck(isSelected(_selected, 0));
    }
  };

  return (
    <View style={styles.optionWrapper}>
      <TouchableHighlight
        underlayColor="#fff"
        style={[
          styles.optionTextWrapper,
          {justifyContent: nested ? 'space-between' : 'flex-start'},
          optionTextWrapperStyles,
        ]}
        onPress={handlePress}>
        <>
          {!nested && (
            <Icon
              style={[optionsIconStyles]}
              name={checked ? 'check-square' : 'square'}
            />
          )}
          <Text style={[{marginLeft: 5}, optionTextStyles]}>
            {option.value}
          </Text>
          {nested && <Icon style={optionsIconStyles} name="chevron-right" />}
        </>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  optionWrapper: {
    position: 'relative',
  },
  optionTextWrapper: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DropDownItem;
