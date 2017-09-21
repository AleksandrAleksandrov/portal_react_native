import React, { Component } from 'react';
import { compose } from 'redux';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner, TextCustom, CustomInput, CustomPasswordInput, InputValidate } from './common';
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

const validate = values => {
  const error = {};
  error.email = '';
  error.password = '';

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = 'Неверный формат e-mail';
  }

  if (values.password && (values.password.length < 8)) {
    error.password = 'Пароль слишком короткий';
  }

  if (values.email === '') {
    error.email = 'Обязательноые поле';
  }

  if (values.password === '') {
    error.password = 'Обязательноые поле';
  }

  // Обязательноые поле
  return error;
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
    
    if (!(this.props.loginForm.syncErrors.email === '') || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.props.email) || (this.props.password.length < 8)) {
      enabled = false;
    } else {
      enabled = true;
    }

    return (
      <Card>
        <CardSection>
          <Field
            label="Email"
            name={'email'}
            placeholder="Email"
            component={InputValidate}
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
            component={InputValidate}
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
