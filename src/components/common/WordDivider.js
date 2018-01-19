import React from 'react';
import { Dimensions, View } from 'react-native';
import { TextCustom } from './TextCustom';
import { color } from '../../constants/color';

const { width } = Dimensions.get('window');

const styles = {
  textStyle: {
    color: color.textBlack,
  },
  divider: {
    backgroundColor: color.black,
    height: 1,
    width: 150,
  },
  container: {
    width,
    flexDirection: 'row',
    padding: 10,
  },
};

const WordDivider = (props) => {
  const { text } = props;
  const { textStyle, container, divider } = styles;

  return (
    <View style={container}>
      <TextCustom style={textStyle} type={'labelText'}>
        {text}
      </TextCustom>
    </View>
  );
};

export { WordDivider };
