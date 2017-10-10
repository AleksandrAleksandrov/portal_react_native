import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { TextCustom } from "./TextCustom";
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const styles = {
  textStyle: {
    margin: 20,
    flexDirection: 'row',
  },
  iconStyle: {
    fontSize: 32,
    marginRight: 10,
  },
};

const TouchableFilterBy = (props) => {

  const { textStyle, iconStyle } = styles;

  const { checked, onPress } = props;

  const isChecked = (checked) => {
    if (checked) {
      return <Icon name="check-square-o" style={iconStyle} />;
    }
    return <Icon name="square-o" style={iconStyle} />;
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={textStyle}>
        {isChecked(checked)}
        <TextCustom type={'sortBy'}>{props.label}</TextCustom>
      </View>
    </TouchableWithoutFeedback>
  );
};

export { TouchableFilterBy };