import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ProgressiveImage from 'react-native-progressive-image';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textStyle: {
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

class AlbumItem extends Component {
  onAlbumPress = (album) => {
    Actions.album({ album });
  }

  getIsOpenAlbumIcon = (isPublic) => {
    const { icon } = styles;

    if (isPublic) {
      return (
        <View>
          <Icon
            name={'users'}
            style={icon}
          />
        </View>
      );
    }

    return (null);
  }

  render() {
    const {
      album,
      album: { temp_cover: { preview, thumbnail } },
    } = this.props;
    const { rootView, textWrapper, textStyle } = styles;

    return (
      <TouchableWithoutFeedback onPress={() => this.onAlbumPress(album)}>
        <View style={[theme.cardStyle, rootView]}>
          <ProgressiveImage
            style={[theme.cardImageStyle]}
            thumbnailSource={{ uri: thumbnail }}
            imageSource={{ uri: preview }}
          />
          <View style={textWrapper}>
            <TextCustom
              style={textStyle}
            >
              {album.title}
            </TextCustom>
            {this.getIsOpenAlbumIcon(album.is_public)}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default AlbumItem;
