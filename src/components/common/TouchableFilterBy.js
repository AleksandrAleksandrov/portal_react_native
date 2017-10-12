import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { TextCustom, CheckBoxCustom } from './';

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  textWrapStyle: {
    padding: 20,
    flexDirection: 'row',
  },
});

const TouchableFilterBy = ({ checked, onPress, label }) => {
  const { textStyle, textWrapStyle } = styles;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={textWrapStyle}>
        {CheckBoxCustom.getCheckBox(checked)}
        <TextCustom type={'sortBy'} style={textStyle}>{label}</TextCustom>
      </View>
    </TouchableWithoutFeedback>
  );
};

TouchableFilterBy.propType = {
  checked: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string,
};

TouchableFilterBy.defaultProps = {
  checked: false,
  onPress: null,
  label: '',
};

export { TouchableFilterBy };
