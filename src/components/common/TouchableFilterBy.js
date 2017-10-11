import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { TextCustom, CheckBoxCustom } from "./";
import PropTypes from 'prop-types';

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

const TouchableFilterBy = (props) => {

  const { textStyle, textWrapStyle } = styles;

  const { checked, onPress } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={ textWrapStyle }>
        {CheckBoxCustom.getCheckBox(checked)}
        <TextCustom type={'sortBy'} style={ textStyle }>{props.label}</TextCustom>
      </View>
    </TouchableWithoutFeedback>
  );
};

TouchableFilterBy.propType = {
  checked: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

TouchableFilterBy.defaultProps = {
  checked: false,
  onPress: null,
};

export { TouchableFilterBy };