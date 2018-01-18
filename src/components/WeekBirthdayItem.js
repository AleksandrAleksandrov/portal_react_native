import React, { Component } from 'react';
import { Platform, View, TouchableWithoutFeedback } from 'react-native';
import Moment from 'moment';
import { Actions } from 'react-native-router-flux';

import { TextCustom, Avatar } from './common';
import { DEFAULT_PHOTO } from '../ApiConstants';
import { color } from '../constants/color';

const styles = {
  titleTextStyle: {
    marginTop: 5,
    flex: 1,
  },
  bodyTextStyle: {
    fontSize: 32,
    margin: 10,
  },
  rootViewStyle: {
    flex: 1,
    margin: 10,
  },
  headerViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textViewWrapper: {
    flexDirection: 'row',
    flex: 4,
  },
  starViewWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  authorViewWrapper: {
    flexDirection: 'row',
    marginTop: 10,
  },
  authorView: {
    flex: 1,
  },
  dateViewWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  birthday: {
    alignSelf: 'center',
    marginTop: 5,
  },
  wrapperForAvatar: {
    borderWidth: 2,
    padding: 2,
    borderColor: color.primary,
    borderRadius: Platform.OS === 'ios' ? 84 / 2 : 84,
  },
};

class WeekBirthdayItem extends Component {
  getPicture = (url) => {
    if (url != null) {
      return url;
    }
    return DEFAULT_PHOTO;
  }

  getWrapperOfAvatar = (photoThumbnail, photo, birthDate) => {
    const today = Moment();
    const birth = Moment(birthDate);
    const { wrapperForAvatar } = styles;
    if (today.date() === birth.date()) {
      return (
        <View style={wrapperForAvatar}>
          {this.getAvatar(photoThumbnail, photo)}
        </View>
      );
    }
    return (
      this.getAvatar(photoThumbnail, photo)
    );
  }

  getAvatar = (photoThumbnail, photo) => {
    return (
      <Avatar
        thumbnail={this.getPicture(photoThumbnail)}
        photo={this.getPicture(photo)}
        size={80}
      />
    );
  }

  onPress = user => {
    Actions.profile({ user });
  }

  render() {
    const { birthday, rootViewStyle } = styles;
    const {
      user,
      user: { photo_thumbnail, photo, birth_date },
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => this.onPress(user)}>
        <View style={rootViewStyle}>
          {this.getWrapperOfAvatar(photo_thumbnail, photo, birth_date)}
          <TextCustom
            type={'t3'}
            style={birthday}
          >
            {Moment(birth_date).format('DD MMMM')}
          </TextCustom>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default WeekBirthdayItem;
