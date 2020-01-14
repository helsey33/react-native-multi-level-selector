import React, {useState, useLayoutEffect} from 'react';
import {TouchableHighlight, Text, StyleSheet, View, Image} from 'react-native';

import Checked from './correct.png';
import Unchecked from './unchecked.png';
import Next from './next.png';

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
            <Image
              source={checked ? Checked : Unchecked}
              style={[{width: 10, height: 10}, optionsIconStyles]}
            />
          )}
          <Text style={[{marginLeft: 5}, optionTextStyles]}>
            {option.value}
          </Text>
          {nested && (
            <Image
              source={Next}
              style={[{width: 10, height: 10}, optionsIconStyles]}
            />
          )}
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
