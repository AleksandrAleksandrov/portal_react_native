import React, { Component } from 'react';
import { Platform, Text, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { CardSection } from './CardSection';
import { Card } from './Card';
import { Button } from './Button';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { emailChangedInChangePassword } from "../../actions/AuthActions";
import { InputAndroid, Input } from "./";
import { isEmailValid } from '../../utils/Validation';
import Toast from 'react-native-smart-toast';
import TimerEnhance from 'react-native-smart-timer-enhance';

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
  },
  textStyle: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
  elementContainer: {
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
};

class ChangePasswordDialog extends Component {
  componentDidMount() {
    this._showBottomToast;
  }

  _showBottomToast = () => {
    this._toast.show({
      position: Toast.constants.gravity.bottom,
      duration: 1000,
      children: 'error',
      // animationEnd: () => {
      //   this._toast._toastAnimationToggle = setTimeout(() => {
      //     this.props.dispatch(hideToast());
      //     this._toast.hide({
      //       duration: 1000,
      //     })
      //   }, 3000)
      // }
    });
  };

  onEmailChanged(text) {
    this.props.dispatch(emailChangedInChangePassword(text));
  }

  render() {
    return (

      <Modal
        visible={this.props.visible}
        transparent

        onRequestClose={() => {}}
      >
        <TouchableWithoutFeedback onPress={this.props.onDecline} >
          <View style={styles.containerStyle} >
            <TouchableWithoutFeedback onPress={() => {}} >
              <View >
                <Card style={{borderRadius: 15,}}>
                <View style={styles.elementContainer}>
                  <Text style={styles.textStyle}>
                    На email будет выслана ссылка для восстановления пароля
                  </Text>
                </View>
                <View style={styles.elementContainer}>
                  <Field
                    label="Email"
                    name={'email'}
                    placeholder={(Platform.OS === 'ios') ? "email@mail.com" : "Email"}
                    component={(Platform.OS === 'ios') ? Input : InputAndroid}
                    values={this.props.email}
                    onChangeText={this.onEmailChanged.bind(this)}
                  />
                </View>
                <View style={styles.elementContainer}>
                  <Button onPress={this.props.onPress} enabled={isEmailValid(this.props.email)} >
                    Восстановить пароль
                  </Button>
                </View>
                </Card>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
        <Toast
          ref={ component => this._toast = component }
          marginTop={64}>
        </Toast>
      </Modal>
    );
  }
}

export { ChangePasswordDialog };
