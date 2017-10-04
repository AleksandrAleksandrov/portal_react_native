import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Input } from './';
import { MKTextField } from 'react-native-material-kit';

const TextFieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel().build();

const InputAndroid = (props) => {

  const { secureTextEntry, meta, input, ...inputProps } = props;

  const shouldShowError = ((!meta.active && meta.dirty) || meta.submitFailed) && meta.error;

  return (
    <View style={{ flex:1, height: 70}}>
      <TextFieldWithFloatingLabel
        style={{ flex:1, height: 70}}
        {...inputProps}
        secureTextEntry={secureTextEntry}
        onTextChange={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        text={input.value}
      />
      { shouldShowError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
  },
});

export { InputAndroid };
