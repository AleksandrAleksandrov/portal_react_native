import React from 'react';
import { View } from 'react-native';
import { TextCustom } from './TextCustom';
import { color } from '../../constants/color';

const styles = {
  textStyle: {
    color:'white',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 1,
  },
  labelStyle: {
    borderRadius: 2,
    backgroundColor: color.green,
    flex: 1,
    alignSelf: 'flex-start',
    margin: 10,
  },
};

const LabelNew = () => {

  const { textStyle, labelStyle } = styles;

  return (
    <View style={labelStyle}>
      <TextCustom style={textStyle} type={'labelText'}>
        новое
      </TextCustom>
    </View>
  );
};

export { LabelNew };
