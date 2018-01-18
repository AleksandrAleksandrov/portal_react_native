import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Moment from 'moment';

import { TextCustom, Avatar } from './common';
import { DEFAULT_PHOTO } from '../ApiConstants';

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
};

class WeekBirthdayItem extends Component {
  getPicture = (url) => {
    if (url != null) {
      return url;
    }
    return DEFAULT_PHOTO;
  }

  render() {
    const { birthday } = styles;
    const {
      user: { photo_thumbnail, photo, birth_date },
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.onPostPress}>
        <View style={styles.rootViewStyle}>
          <Avatar
            thumbnail={this.getPicture(photo_thumbnail)}
            photo={this.getPicture(photo)}
            size={80}
          />
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
