# react-native-multi-level-selector

React Native component for Multi level options Selector for your application.

<img src="demo.gif" alt="demo.gif" align="middle" />

## Installation

```bash
npm install --save react-multi-level-selector react-native-vector-icons@6.6.0
```

## Usage

```Javascript
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import DropDown from 'react-native-multi-level-selector';

const App = () => {
  const options = [
    {
      value: 'Department',
      id: '1',
      nested: [
        {value: 'Customer Relations', id: '1.1'},
        {value: 'IT', id: '1.2'},
        {value: 'Human Resources', id: '1.3'},
        {value: 'Managerial', id: '1.4'},
      ],
    },
    {
      value: 'Location',
      id: '2',
      nested: [
        {
          value: 'Bangalore',
          id: '2.1',
          nested: [
            {
              value: 'Whitefield',
              id: '2.1.1',
              nested: [
                {
                  value: 'ITPL',
                  id: '2.1.1.1',
                },
              ],
            },
            {
              value: 'Jayanagar',
              id: '2.1.2',
            },
            {
              value: 'Majestic',
              id: '2.1.3',
            },
          ],
        },
        {
          value: 'New York',
          id: '2.2',
          nested: [
            {
              value: "Hell's Kitchen",
              id: '2.2.1',
            },
            {
              value: 'Harlem',
              id: '2.2.2',
            },
          ],
        },
        {value: 'Birmingham', id: '2.3'},
      ],
    },
    {
      value: 'Role',
      id: '3',
      nested: [
        {
          value: 'SDE 1',
          id: '3.1',
          nested: [
            {
              value: 'Trainee',
              id: '3.1.1',
            },
            {
              value: 'Associate',
              id: '3.1.2',
            },
          ],
        },
        {value: 'SDE 2', id: '3.2'},
        {value: 'SDE 3', id: '3.3'},
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

### Make sure to provide the id for every option and nested options as shown in the example.

If an option has nested options, these options should be inside array named `nested` of the particular option with the id the following the id of the parent after a decimal.

For eg: If the parent id is `1`. The nested children id should be `1.1`, `1.2` and so on. The child of `1.1` should be `1.1.1`, `1.1.2` and so on.

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
