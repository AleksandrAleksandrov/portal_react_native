import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonDisabledStyle: {
    opacity: 0.5,
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
  },
};

const Button = ({ onPress, children, enabled }) => {
  const { buttonStyle, textStyle, buttonDisabledStyle } = styles;
  return (
    <TouchableHighlight underlayColor="white" onPress={onPress} style={[buttonStyle, (!enabled && buttonDisabledStyle)]} disabled={!enabled}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableHighlight>
  );
};

export { Button };
