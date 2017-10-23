import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import PropTypes from 'prop-types';
import { TextCustom, CheckBoxCustom, getDrawerMenuIcon } from './';

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  textWrapStyle: {
    padding: 5,
    flexDirection: 'row',
  },
});

const TouchableDrawerItem = ({ checked, onPress, label, icon }) => {
  const { textStyle, textWrapStyle } = styles;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={textWrapStyle}>
        {getDrawerMenuIcon(icon)}
        <TextCustom type={'sortBy'} style={textStyle}>{label}</TextCustom>
      </View>
    </TouchableWithoutFeedback>
  );
};

TouchableDrawerItem.propType = {
  onPress: PropTypes.func,
  label: PropTypes.string,
};

TouchableDrawerItem.defaultProps = {
  onPress: null,
  label: '',
};

export { TouchableDrawerItem };
