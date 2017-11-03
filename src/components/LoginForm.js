import React, { Component } from 'react';
import { compose } from 'redux';
import { NavigationBar } from '@shoutem/ui';
import { Platform, View, Text } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, hideRestorePasswordDialog, showRestorePassword, hideToast, restorePassword } from '../actions';
import { Card, CardSection, Button, Spinner, ChangePasswordDialog, TextCustom, InputValidateIOS, InputValidateAndroid } from './common';
import { isEmailValid, isPasswordValid } from '../utils/Validation';
import { navigationBarHeight } from '../constants/StyleConstants';
import { color } from '../constants/color';
import Toast from 'react-native-smart-toast';
import TimerEnhance from 'react-native-smart-timer-enhance';
const MK = require('react-native-material-kit');

const {
  MKButton,
  MKColor,
  MKTextField,
} = MK;

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
  viewStyle: {
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
  titleStyle: {
    color: color.navigationBarText,
  },
  navigationBarWrapper: {
    width: 'auto',
    height: navigationBarHeight,
    backgroundColor: color.primaryDark,
  },
};

const ColoredRaisedButton = MKButton.coloredButton()
  .withText('BUTTON')
  .withOnPress(() => {
    console.log("Hi, it's a colored button!");
  })
  .build();

const validate = values => {
  const errors = {};
  errors.email = '';
  errors.password = '';
  if (values.email) {
    errors.email = !isEmailValid(values.email) ? 'Неверный формат email.' : undefined;
  } else {
    errors.email = 'Обязательное поле';
  }

  if (values.password) {
    errors.password = !isPasswordValid(values.password) ? 'Пароль слишком короткий' : undefined;
  } else {
    errors.password = 'Обязательное поле';
  }
  return errors;
};

let enabled = false;

class LoginForm extends Component {
  showBottomToast = () => {
    this._toast.show({
      position: Toast.constants.gravity.bottom,
      duration: 1000,
      children: 'На ' + this.props.email + ' выслана ссылка на восстановление пароля',
      animationEnd: () => {
        this._toast._toastAnimationToggle = setTimeout(() => {
          this.props.hideToast();
          this._toast.hide({
            duration: 1000,
          });
        }, 3000);
      },
    });
  };
  onEmailChanged(text) {
    this.props.emailChanged(text);
  }

  onPasswordChanged(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password, loginUser } = this.props;
    loginUser(email, password);
  }

  onShowRestorePasswordDialog() {
    this.props.showRestorePassword();
  }

  onDecline() {
    this.props.hideRestorePasswordDialog();
  }

  onRestorePassword() {
    const { email, restorePassword } = this.props;
    restorePassword(email);
  }

  renderMessage() {
    const { error } = this.props;
    if (error) {
      return (
        <CardSection>
          <Text>
            {error}
          </Text>
        </CardSection>
      );
    }
  }

  renderNavigationBar = () => {
    const { navigationBarWrapper, titleStyle } = styles;

    return (
      <View style={navigationBarWrapper}>
        <NavigationBar
          styleName={'clear'}
          centerComponent={<TextCustom type={'t2'} style={titleStyle}>Авторизация</TextCustom>}
        />
      </View>
    );
  }

  renderEmailField = () => {
    const { email } = this.props;

    return (
      <Field
        label={'Email'}
        name={'email'}
        placeholder={(Platform.OS === 'ios') ? 'email@mail.com' : 'Email'}
        component={(Platform.OS === 'ios') ? InputValidateIOS : InputValidateAndroid}
        onChangeText={this.onEmailChanged.bind(this)}
        values={email}
      />
    );
  }

  renderPasswordField = () => {
    const { password } = this.props;

    return (
      <Field
        secureTextEntry={true}
        label={'Пароль'}
        name={'password'}
        placeholder={'Пароль'}
        component={(Platform.OS === 'ios') ? InputValidateIOS : InputValidateAndroid}
        onChangeText={this.onPasswordChanged.bind(this)}
        values={password}
      />
    );
  }

  renderLoginButton = () => {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)} enabled={enabled}>
        Войти
      </Button>
    );
  }

  renderRestorePasswordButton = () => {
    return (
      <Button onPress={this.onShowRestorePasswordDialog.bind(this)} enabled={true} >
        Восстановить пароль
      </Button>
    );
  }


  render() {
    const { email, password, loginForm, form, restorePasswordDialog } = this.props;
    
    if (isEmailValid(email) && isPasswordValid(password)) {
      enabled = true;
    } else {
      enabled = false;
    }

    if (this.props.showToastRestorePassword) {
      this.showBottomToast();
    }
    return (
      <View>
        {this.renderNavigationBar()}
        <Card>
          <CardSection>
            {this.renderEmailField()}
          </CardSection>
          <CardSection>
            {this.renderPasswordField()}
          </CardSection>
          <CardSection>
            {this.renderLoginButton()}
          </CardSection>
          {this.renderMessage()}

          <CardSection>
            {this.renderRestorePasswordButton()}
          </CardSection>

          <ChangePasswordDialog
            visible={restorePasswordDialog}
            dispatch={this.props.dispatch}
            email={email}
            onPress={this.onRestorePassword.bind(this)}
            onDecline={this.onDecline.bind(this)}
          />
          <Toast
            ref={ component => this._toast = component }
            marginTop={64}>
          </Toast>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({ auth, form }) => {
  const {
    restorePasswordDialog,
    showToastRestorePassword,
    email,
    password,
    error,
    loading,
    user,
  } = auth;
  const loginForm = form.loginForm;

  return {
    restorePasswordDialog,
    showToastRestorePassword,
    email,
    password,
    error,
    loading,
    user,
    loginForm,
    form,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  emailChanged: (text) => { dispatch(emailChanged(text)); },
  passwordChanged: (text) => { dispatch(passwordChanged(text)); },
  loginUser: (login, password) => { dispatch(loginUser(login, password)); },
  showRestorePassword: () => { dispatch(showRestorePassword()); },
  hideRestorePasswordDialog: () => { dispatch(hideRestorePasswordDialog()); },
  restorePassword: () => { dispatch(restorePassword()); },
  hideToast: () => { dispatch(hideToast()); },
});

export default reduxForm({
  form: 'loginForm',
  validate,
})(
    connect(mapStateToProps, mapDispatchToProps)(LoginForm),
    TimerEnhance(LoginForm),
);
