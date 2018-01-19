import React from 'react';
import { View } from 'react-native';
import { TextCustom } from './TextCustom';
import { color } from '../../constants/color';

const styles = {
  textStyle: {
    color: color.textBlack,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 1,
  },
  labelStyle: {
    borderRadius: 25,
    backgroundColor: color.skillItemColor,
    flex: 1,
    alignSelf: 'flex-start',
    margin: 5,
  },
};

const SkillText = (props) => {
  const { textStyle, labelStyle } = styles;

  return (
    <View style={labelStyle}>
      <TextCustom style={textStyle} type={'labelText'}>
        {props.skill}
      </TextCustom>
    </View>
  );
};

export { SkillText };
