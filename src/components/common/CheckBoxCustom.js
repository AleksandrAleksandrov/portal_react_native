import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 32,
    marginRight: 10,
  },
});

const getCheckBox = (checked) => {
  const { iconStyle } = styles;
  if (checked) {
    return <Icon name="check-square-o" style={iconStyle} />;
  }
  return <Icon name="square-o" style={iconStyle} />;
};

const CheckBoxCustom = {
  getCheckBox,
};

export { CheckBoxCustom };
