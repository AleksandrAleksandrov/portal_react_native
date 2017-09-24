import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Input } from './';
import { MKTextField } from 'react-native-material-kit';

const TextFieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel().build();

const InputValidateIOS = (props) => {

  const { secureTextEntry, placeholder, label, value, meta, input, ...inputProps } = props;

  const shouldShowError = (!meta.active && meta.touched);

  return (
    <View style={styles.con}>
      <View style={styles.containerStyle}>
        <Text style={styles.labelStyle}>{label}</Text>
        <TextInput
          {...inputProps}
          secureTextEntry={secureTextEntry}
          onTextChange={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          text={input.value}
          style={styles.inputStyle}
          placeholder={placeholder}
          autoCorrect={false}
        />
      </View>
      { !shouldShowError || meta.error && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  con: {
    height: 60,
    flex: 1,
    flexDirection: 'column',
  },
  errorText: {
    color: 'red',
    paddingLeft: 20,
  },
};

export { InputValidateIOS };
