import React, { Component } from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};

class LoginForm extends Component {
  componentWillMount() {
    
  }

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

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@mail.com"
            onChangeText={this.onEmailChanged.bind(this)}
            value={this.props.email}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Пароль"
            placeholder="Пароль"
            onChangeText={this.onPasswordChanged.bind(this)}
            value={this.props.password}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Войти
          </Button>
        </CardSection>
        <CardSection>
          <Text>
            {this.props.user && this.props.user.key}
          </Text>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, user } = auth;

  return { email, password, error, loading, user };
};

export default connect(mapStateToProps)(LoginForm);
