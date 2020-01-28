# react-native-multi-level-selector

React Native component for Multi level options Selector for your application.

[DOCS](https://rnmls.netlify.com/)

## Installation

```bash
npm install --save react-native-multi-level-selector
```

##Update Log

- Removed react native vector icons dependency
- Users do not have to enter the id themselves manually thus improving developer experience. (Careful of the level of your nesting though)
- Design Changes

## Usage

```Javascript
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import DropDown from 'react-native-multi-level-selector';

const App = () => {
  const options = [
    {
      value: 'Department',
      nested: [
        {value: 'Customer Relations'},
        {value: 'IT'},
        {value: 'Human Resources'},
        {value: 'Managerial'},
      ],
    },
    {
      value: 'Location',
      nested: [
        {
          value: 'Bangalore',
          nested: [
            {
              value: 'Whitefield',
              nested: [
                {
                  value: 'ITPL',
                },
              ],
            },
            {
              value: 'Jayanagar',
            },
            {
              value: 'Majestic',
            },
          ],
        },
        {
          value: 'New York',
          nested: [
            {
              value: "Hell's Kitchen",
            },
            {
              value: 'Harlem',
            },
          ],
        },
        {value: 'Birmingham'},
      ],
    },
    {
      value: 'Role',
      nested: [
        {
          value: 'SDE 1',
          nested: [
            {
              value: 'Trainee',
            },
            {
              value: 'Associate',
            },
          ],
        },
        {value: 'SDE 2'},
        {value: 'SDE 3'},
      ],
    },
  ];

  return (
    <View>
      <DropDown placeholder="Filter" onChange={el => {}} options={options} />
      <Text style={styles.content}>Your Content Goes Here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {textAlign: 'center', fontSize: 20, marginVertical: 20},
});

export default App;

```

## Props

| Name                          | Type         | Description                                                                        |
| ----------------------------- | ------------ | ---------------------------------------------------------------------------------- |
| **`options`**                 | `{Array}`    | (Required) Options for the dropdown. Specify the options for users to select from. |
| **`placeholder`**             | `{String}`   | (Required) The text displayed when no option is selected.                          |
| **`onChange`**                | `{function}` | Subscribe to change events.                                                        |
| **`inputUnderlayColor`**      | `{String}`   | Underlay color for the TouchableHighlight Input. Default is white                  |
| **`optionContainerStyles`**   | `{Object}`   | Styles for the input.                                                              |
| **`optionTextWrapperStyles`** | `{Object}`   | Styles for Option List Wrapper                                                     |
| **`optionsIconStyles`**       | `{Object}`   | Styles for the icons                                                               |
| **`optionTextStyles`**        | `{Object}`   | Text styles for options                                                            |
