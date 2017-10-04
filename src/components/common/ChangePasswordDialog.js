import React, { Component } from 'react';
import { Platform, Text, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { emailChangedInChangePassword } from "../../actions/AuthActions";
import { InputAndroid, Input } from "./";
import { isEmailValid } from '../../utils/Validation';

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
};

class ChangePasswordDialog extends Component {

  onEmailChanged(text) {
    this.props.dispatch(emailChangedInChangePassword(text));
  }

  render () {
    return (

      <Modal
        visible={this.props.visible}
        transparent
        animationType="slide"
        onRequestClose={() => {}}
      >
        <TouchableWithoutFeedback onPress={this.props.onDecline} >
          <View style={styles.containerStyle} >
            <TouchableWithoutFeedback onPress={() => {}} >
              <View>
                <CardSection>
                  <Text>
                    На email будет выслана ссылка для восстановления пароля
                  </Text>
                </CardSection>
                <CardSection>
                  <Field
                    label="Email"
                    name={'email'}
                    placeholder={(Platform.OS === 'ios') ? "email@mail.com" : "Email"}
                    component={(Platform.OS === 'ios') ? Input : InputAndroid}
                    values={this.props.email}
                    onChangeText={this.onEmailChanged.bind(this)}
                  />
                </CardSection>

                <CardSection>
                  <Button onPress={this.props.onPress} enabled={isEmailValid(this.props.email)} >
                    Восстановить пароль
                  </Button>
                </CardSection>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
};

export { ChangePasswordDialog };
