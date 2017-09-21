import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Input } from './';
import { MKTextField } from 'react-native-material-kit';

const TextFieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel().build();

const InputValidate = (props) => {
  
  const { secureTextEntry, meta, input, ...inputProps } = props;

  console.warn(meta.error);

  return (
    <View style={{ flex:1, height: 50}}>
      <TextInput
        style={{ flex:1, height: 50}}
        {...inputProps}
        secureTextEntry={secureTextEntry}
        onTextChange={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        text={input.value}
      />
      { meta.error && !meta.active && <Text style={styles.errorText}>{meta.error }</Text> }
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
  },
});

export { InputValidate };
