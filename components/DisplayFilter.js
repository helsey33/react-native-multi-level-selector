import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const DisplayFilter = ({filters, removeFilter}) => {
  const renderOptions = options => (
    <>
      {options.map((el, i) => {
        return (
          <Text style={{marginHorizontal: 2}} key={el.id}>
            {`${el.value} `}
            {el.nested && '-> '}
            {el.nested && renderOptions(el.nested)}
            {i === options.length - 1 ? ' ' : ', '}
          </Text>
        );
      })}
    </>
  );

  return (
    <View style={styles.container}>
      {filters.map(option => (
        <View style={styles.parent} key={option.id}>
          <View style={styles.wrapper}>
            <Text style={{marginHorizontal: 2}}>{option.value} -></Text>
            {renderOptions(option.nested)}
          </View>
          <TouchableOpacity onPress={() => removeFilter(option.id)}>
            <Icon name="close" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
  },
  parent: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {flexDirection: 'row', maxWidth: '97%', flexWrap: 'wrap'},
});

export default DisplayFilter;
