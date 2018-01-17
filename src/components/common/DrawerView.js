import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { AsyncStorage, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import OneSignal from 'react-native-onesignal';

import { Avatar, TouchableDrawerItem, TextCustom } from './';
import { color } from '../../constants/color';
import { DEFAULT_PHOTO } from '../../ApiConstants';
import {
  DRAWER_NEWS,
  DRAWER_EMPLOYEES,
  DRAWER_BIRTHDAYS,
  DRAWER_GALLERY,
  DRAWER_VACATIONS,
  DRAWER_TRUST_LETTER,
  DRAWER_ABOUT_COMPANY,
  DRAWER_EXIT,
  TOKEN,
} from '../../Constants';

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
  },
  textStyle: {
    marginLeft: 20,
    margin: 5,
    color: color.white,
  },
  containerStyle: {
    backgroundColor: color.white,
    flex: 1,
  },
  infoOfUserContainer: {
    height: 170,
    backgroundColor: color.primaryDark,
    justifyContent: 'center',
  },
  avatarContainer: {
    flexDirection: 'column',
  },
  avatarItems: {
    marginLeft: 20,
    margin: 5,
  },
};

const logOut = () => {
  AsyncStorage.removeItem(TOKEN);
  OneSignal.setSubscription(false);
  Actions.login();
};

class DrawerView extends Component {

  onNews = () => {
    Actions.postsList();
  }

  onEmployees = () => {
    Actions.employees();
  }

  onBirthdays = () => {

  }

  onGallery = () => {
    Actions.albums();
  }

  onVacation = () => {

  }

  onTrustLetter = () => {

  }

  onAboutCompany = () => {

  }

  onExit = () => {
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
        key: DRAWER_BIRTHDAYS,
        label: 'Дни рождения',
        onPress: () => {
          this.onBirthdays();
        },
      },
      {
        key: DRAWER_GALLERY,
        label: 'Жизнь Light IT',
        onPress: () => {
          this.onGallery();
        },
      },
      {
        key: DRAWER_VACATIONS,
        label: 'Отпуска',
        onPress: () => {
          this.onVacation();
        },
      },
      {
        key: DRAWER_TRUST_LETTER,
        label: 'Письмо доверия',
        onPress: () => {
          this.onTrustLetter();
        },
      },
      {
        key: DRAWER_ABOUT_COMPANY,
        label: 'О компании',
        onPress: () => {
          this.onAboutCompany();
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

  getAvatar = () => {
    const { user: { photo, photo_thumbnail } } = this.props;

    return (
      <Avatar
        thumbnail={photo_thumbnail ? photo_thumbnail : DEFAULT_PHOTO}
        photo={photo ? photo : DEFAULT_PHOTO}
        size={100}
      />
    );
  }

  getNameSurname = () => {
    const { first_name, last_name } = this.props.user;

    if (first_name !== null & last_name !== null) {
      return (
        <TextCustom type={'t2'} style={styles.textStyle}>
          {first_name} {last_name}
        </TextCustom>
      );
    }

    return (<View />);
  };

  getMenuList = () => {
    return (
      <View style={styles.avatarContainer}>
        {
          this.getDrawerArray().map(item => (
            <TouchableDrawerItem
              key={item.key}
              icon={item.key}
              label={item.label}
              onPress={item.onPress}
            />
          ))
        }
      </View>
    );
  }
  render() {
    const { containerStyle, infoOfUserContainer, avatarItems } = styles;

    return (
      <TouchableWithoutFeedback onPress={this.props.onDecline}>
        <View style={containerStyle} >
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <View style={infoOfUserContainer}>
              <View>
                <View style={avatarItems}>
                  {this.getAvatar()}
                </View>
                {this.getNameSurname()}
              </View>
            </View>
            <TouchableWithoutFeedback onPress={() => {}} >
              <View >
                {this.getMenuList()}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({
  user: state.postsList.user,
});

export default connect(mapStateToProps)(DrawerView);
