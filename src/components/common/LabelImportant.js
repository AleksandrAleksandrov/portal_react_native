import React from 'react';
import { View } from 'react-native';
import { TextCustom } from "./TextCustom";
import { color } from "../../constants/color";

const styles = {
  textStyle: {
    color:'white',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 1,
  },
  labelStyle: {
    borderRadius: 2,
    backgroundColor: color.red,
    flex: 1,
    alignSelf: 'flex-start',
    margin: 10,
  },
};

const LabelImportant = () => {

  const { textStyle, labelStyle } = styles;

  return (
    <View style={labelStyle}>
      <TextCustom style={textStyle} type={'labelText'}>
        важное
      </TextCustom>
    </View>
  );
};

export { LabelImportant };
