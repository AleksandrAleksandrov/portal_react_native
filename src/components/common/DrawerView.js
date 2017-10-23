import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { AsyncStorage, View, TouchableWithoutFeedback } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { CardSection, Card, TouchableDrawerItem } from './';
import { TextCustom} from './TextCustom';
import { setAdvert, setEvent, setPoll, getFilteredPosts } from '../../actions';
import { InputAndroid  } from './';
import {
  DRAWER_NEWS,
  DRAWER_EMPLOYEES,
  DRAWER_BIRTHDAYS,
  DRAWER_GALLERY,
  DRAWER_VACATIONS,
  DRAWER_TRUST_LETTER,
  DRAWER_ABOUT_COMPANY,
  DRAWER_EXIT,
} from '../../Constants';

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
  },
  textStyle: {
    margin: 20,
    flexDirection: 'row',
  },
  containerStyle: {
    backgroundColor: 'white',
    flex: 1,
  },
  elementContainer: {
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',

  },
  iconStyle: {
    fontSize: 32,
    marginRight: 10,
  },
};

const logOut = () => {
  AsyncStorage.removeItem('token');
  OneSignal.setSubscription(false);
  Actions.login();
};

class DrawerView extends Component {

  onNews() {

  }

  onEmployees() {

  }

  onExit() {
    logOut();
  }

  getDrawerArray = () => {
    const drawerList = [
      {
        key: DRAWER_NEWS,
        label: 'Лента',
        onPress: () => {
          this.onNews();
        },
      },
      {
        key: DRAWER_EMPLOYEES,
        label: 'Сотрудники',
        onPress: () => {
          this.onEmployees();
        },
      },
      {
        key: DRAWER_EXIT,
        label: 'Выйти',
        onPress: () => {
          this.onExit();
        },
      },
    ];
    return drawerList;
  };
  render() {
    const { containerStyle } = styles;

    return (

      <TouchableWithoutFeedback onPress={this.props.onDecline}>
        <View style={containerStyle} >
          <TouchableWithoutFeedback onPress={() => {}} >
            <View >
              <CardSection style={{flexDirection: 'column'}}>
                {
                  this.getDrawerArray().map(item => (
                    <TouchableDrawerItem
                      key={item.key}
                      label={item.label}
                      onPress={item.onPress}
                    />
                  ))
                }
              </CardSection>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(DrawerView);
