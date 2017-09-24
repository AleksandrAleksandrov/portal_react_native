import React, { Component } from 'react';
import { compose } from 'redux';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner, TextCustom, CustomInput, CustomPasswordInput, InputValidate } from './common';

const validate = values => {
  const error = {};
  error.email = 'Неверный формат e-mail';
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
  // console.warn(error.email);
  // Обязательноые поле
  return error;
};

class TestLogin extends Component {

  onEmailChanged(text) {
    this.props.dispatch(emailChanged(text));
  }

  onPasswordChanged(text) {
    this.props.dispatch(passwordChanged(text));
  }

  render() {
    return (
      <View style={{ marginTop: 50, height: 50 }}>
        <Field
        style={{ height: 50 }}
          label="Email"
          name={'email'}
          placeholder="Email"
          component={InputValidate}
          onChangeText={this.onEmailChanged.bind(this)}
          values={this.props.email}
        />

      </View>
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
connect(mapStateToProps)(TestLogin),
);
