import React, { Component } from 'react';
import { compose } from 'redux';
import { Platform, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner, TextCustom, CustomInput, CustomPasswordInput, InputValidateIOS, InputValidateAndroid } from './common';
import { isEmailValid, isPasswordValid } from '../utils/Validation';
// import { MKButton, MKColor } from 'react-native-material-kit';
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

  // if (values.email === '') {
  //   error.email = 'Обязательноые поле';
  // }

  // if (values.password === '') {
  //   error.password = 'Обязательноые поле';
  // }
  // Обязательноые поле
  return errors;
};

let enabled = false;

class LoginForm extends Component {
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
      </Card>
    );
  }
}

const mapStateToProps = ({ auth, form }) => {
  const { email, password, error, loading, user } = auth;
  const loginForm = form.loginForm;

  return { email, password, error, loading, user, loginForm, form };
};

export default reduxForm({
  form: 'loginForm',
  validate,
})(
    connect(mapStateToProps)(LoginForm),
);
