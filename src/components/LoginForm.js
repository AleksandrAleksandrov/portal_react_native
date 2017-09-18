import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner, TextCustom, CustomInput, CustomPasswordInput } from './common';
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

const ColoredRaisedButton = new MKButton.coloredButton()
  .withText('BUTTON')
  .withOnPress(() => {
    this.onButtonPress.bind(this);
  })
  .build();

class LoginForm extends Component {
  componentWillMount() {
    
  }

  onEmailChanged(text) {
    this.props.dispatch(emailChanged(text));
  }

  onPasswordChanged = (text) => {
    this.props.dispatch(passwordChanged(text));
  };

  onButtonPress = () => {
    console.warn('click');
    const { email, password } = this.props;
    this.props.dispatch(loginUser(email, password));
  }

  render() {
    return (
      <View>

        <View style={styles.viewStyle}>
          <CustomInput
            style={{ flex: 1 }}
            placeholder="email@mail.com"
            secureTextEntry={false}
          />
        </View>

        <View style={styles.viewStyle}>
          <CustomInput
            style={{ flex: 1 }}
            placeholder="password"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.viewStyle}>
          <View style={styles.col}>
            <ColoredRaisedButton onPress={this.onButtonPress}>
              <Text>Войти</Text>
            </ColoredRaisedButton>
            <Text style={styles.legendLabel}>Accent colored</Text>
          </View>
        </View>

        <View style={styles.viewStyle}>
          <Text>
            {this.props.user && this.props.user.key}
          </Text>
        </View>

      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, user } = auth;

  return { email, password, error, loading, user };
};

export default connect(mapStateToProps)(LoginForm);
