import React from 'react';
import { View } from 'react-native';
import { TextCustom } from './TextCustom';
import { color } from '../../constants/color';

const styles = {
  textStyle: {
    color: color.textBlack,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 1,
  },
  hintStyle: {
    color: color.textGray,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 1,
  },
  labelStyle: {
    flex: 1,
    alignSelf: 'flex-start',
    margin: 10,
  },
};

const InfoWithHint = (props) => {
  const { hint, text } = props;
  const { textStyle, hintStyle, labelStyle } = styles;

  return (
    <View style={labelStyle}>
      <TextCustom style={hintStyle} type={'hint'}>
        {hint}
      </TextCustom>
      <TextCustom style={textStyle} type={'labelText'}>
        {text}
      </TextCustom>
    </View>
  );
};

export { InfoWithHint };
