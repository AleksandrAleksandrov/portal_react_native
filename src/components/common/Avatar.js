import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import ProgressiveImage from 'react-native-progressive-image';

const Avatar = ({ thumbnail, photo, size }) => (

  <ProgressiveImage
    thumbnailSource={{ uri: thumbnail }}
    imageSource={{ uri: photo }}
    style={{
      width: size,
      height: size,
      borderRadius: Platform.OS === 'ios' ? size / 2 : size,
    }}
  />
);


export { Avatar };

Avatar.propTypes = {
  thumbnail: PropTypes.any,
  photo: PropTypes.any,
  size: PropTypes.number,
};

Avatar.defaultProps = {
  thumbnail: '',
  photo: '',
  size: null,
};