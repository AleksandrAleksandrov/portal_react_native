import React, { Component } from 'react';
import { compose } from 'redux';
import { Platform, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, hideRestorePasswordDialog, showRestorePassword, hideToast } from '../actions';
import { Card, CardSection, Input, Button, Spinner, ChangePasswordDialog, TextCustom, CustomInput, CustomPasswordInput, InputValidateIOS, InputValidateAndroid } from './common';
import { isEmailValid, isPasswordValid } from '../utils/Validation';
import Toast from 'react-native-smart-toast';
import TimerEnhance from 'react-native-smart-timer-enhance';
import {restorePassword} from "../actions/AuthActions";
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
  _showBottomToast = () => {
    this._toast.show({
      position: Toast.constants.gravity.bottom,
      duration: 1000,
      children: 'На ' + this.props.email + ' выслана ссылка на восстановление пароля',
      animationEnd: () => {
        this._toast._toastAnimationToggle = setTimeout(() => {
          this.props.dispatch(hideToast());
          this._toast.hide({
            duration: 1000,
          })
        }, 3000)
      }
    })
  };
  onEmailChanged(text) {
    this.props.dispatch(emailChanged(text));
  }

  onPasswordChanged(text) {
    this.props.dispatch(passwordChanged(text));
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.dispatch(loginUser(email, password));
  }

  onShowRestorePasswordDialog() {
    this.props.dispatch(showRestorePassword());
  }

  onDecline() {
    this.props.dispatch(hideRestorePasswordDialog());
  }

  onRestorePassword() {
    this.props.dispatch(restorePassword(this.props.email));
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)} enabled={enabled}>
        Войти
      </Button>
    );
  }

  renderMessage() {
    if (this.props.error) {
      return (
        <CardSection>
          <Text>
            {this.props.error}
          </Text>
        </CardSection>
      );
    }
  }

  render() {
    const { loginForm, form } = this.props;
    
    if (isEmailValid(this.props.email) && isPasswordValid(this.props.password)) {
      enabled = true;
    } else {
      enabled = false;
    }

    if (this.props.showToastRestorePassword) {
      this._showBottomToast();
    }
    return (
      <Card>
        <CardSection>
          <Field
            label="Email"
            name={'email'}
            placeholder={(Platform.OS === 'ios') ? "email@mail.com" : "Email"}
            component={(Platform.OS === 'ios') ? InputValidateIOS : InputValidateAndroid}
            onChangeText={this.onEmailChanged.bind(this)}
            values={this.props.email}
          />

        </CardSection>
        <CardSection>
          <Field
            secureTextEntry
            label="Пароль"
            name={'password'}
            placeholder="Пароль"
            component={(Platform.OS === 'ios') ? InputValidateIOS : InputValidateAndroid}
            onChangeText={this.onPasswordChanged.bind(this)}
            values={this.props.password}
          />
        </CardSection>
        <CardSection>
          {this.renderButton()}
        </CardSection>
        {this.renderMessage()}

        <CardSection>
          <Button onPress={this.onShowRestorePasswordDialog.bind(this)} enabled={true} >
            Восстановить пароль
          </Button>
        </CardSection>

        <ChangePasswordDialog
          visible={this.props.restorePasswordDialog}
          dispatch={this.props.dispatch}
          email={this.props.email}
          onPress={this.onRestorePassword.bind(this)}
          onDecline={this.onDecline.bind(this)}
        />
        <Toast
          ref={ component => this._toast = component }
          marginTop={64}>
        </Toast>
      </Card>


    );
  }
}

const mapStateToProps = ({ auth, form }) => {
  const { restorePasswordDialog, showToastRestorePassword, email, password, error, loading, user } = auth;
  const loginForm = form.loginForm;

  return { restorePasswordDialog, showToastRestorePassword, email, password, error, loading, user, loginForm, form };
};

export default reduxForm({
  form: 'loginForm',
  validate,
})(
    connect(mapStateToProps)(LoginForm),
    TimerEnhance(LoginForm),
);
