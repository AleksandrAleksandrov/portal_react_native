import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import ProgressiveImage from 'react-native-progressive-image';

import { getTheme } from 'react-native-material-kit';
import { color } from '../constants/color';
import { TextCustom } from './common';

const theme = getTheme();

const styles = {
  rootView: {
    flex: 1,
    margin: 5,
  },
  image: {
    width: 180,
    height: 180,
  },
  textWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  textStyle: {
    fontSize: 14,
    margin: 5,
    flex: 1,
    alignSelf: 'flex-start',
  },
  icon: {
    margin: 10,
    alignSelf: 'flex-end',
    fontSize: 24,
    color: color.myGreen,
  },
};

class UserItem extends Component {
  onEmployeePress = (user) => {

  }

  render() {
    const {
      user,
      user: { first_name, last_name, specialization, photo_thumbnail, photo },
    } = this.props;
    const { rootView, textWrapper, textStyle } = styles;

    return (
      <TouchableWithoutFeedback onPress={() => this.onEmployeePress(user)}>
        <View style={[theme.cardStyle, rootView]}>
          <ProgressiveImage
            style={[theme.cardImageStyle]}
            thumbnailSource={{ uri: photo_thumbnail }}
            imageSource={{ uri: photo }}
          />
          <View style={textWrapper}>
            <TextCustom style={textStyle}>
              {last_name.concat(' ', first_name)}
            </TextCustom>
            <TextCustom style={textStyle}>
              {specialization}
            </TextCustom>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default UserItem;
