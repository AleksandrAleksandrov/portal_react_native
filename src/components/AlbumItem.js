import React, { Component } from 'react';
import { View } from 'react-native';
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
    // borderWidth: 1,
    justifyContent: 'flex-end',
  },
  textStyle: {
    // borderWidth: 1,
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
  render() {
    const { album } = this.props;
    const { rootView, image, textWrapper, icon, textStyle } = styles;

    return (

      <View style={[theme.cardStyle, rootView]}>
        <ProgressiveImage
          style={[theme.cardImageStyle]}
          thumbnailSource={{ uri: album.temp_cover.thumbnail }}
          imageSource={{ uri: album.temp_cover.preview }}
        />
        <View style={textWrapper}>
          <TextCustom
            style={textStyle}
          >
            {album.title}
          </TextCustom>
          <View>
            <Icon
              name={'users'}
              style={icon}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default AlbumItem;
