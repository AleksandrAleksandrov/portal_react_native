import { MKTextField, MKColor, mdl } from 'react-native-material-kit';

const styles = {
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 10,
  },
};

const CustomPasswordInput = mdl.Textfield.textfieldWithFloatingLabel()
  
  .withPlaceholder('Password')
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({ flex: 1 })
  .withOnFocus(() => console.log('Focus'))
  .withOnBlur(() => console.log('Blur'))
  .withOnEndEditing((e) => console.log('EndEditing', e.nativeEvent.text))
  .withOnSubmitEditing((e) => console.log('SubmitEditing', e.nativeEvent.text))
  .withOnTextChange((e) => console.log('TextChange', e))
  .withOnChangeText((e) => console.log('ChangeText', e))
  .build();

export { CustomPasswordInput };
