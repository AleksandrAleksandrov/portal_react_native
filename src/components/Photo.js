import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableWithoutFeedback } from 'react-native';
import ProgressiveImage from 'react-native-progressive-image';
import { getTheme } from 'react-native-material-kit';
import { color } from '../constants/color';
import { showHideFullScreenPhotosAction, setFullPhotoIndexAction } from '../actions';

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

class Photo extends Component {

  onPhotoPressed = (index) => {
    const {
      setFullPhotoIndexAction,
      showHideFullScreenPhotosAction,
      isFullScreenPhotos,
    } = this.props;

    setFullPhotoIndexAction(index);
    showHideFullScreenPhotosAction(!isFullScreenPhotos);
  }

  render() {
    const { photo, index } = this.props;
    const { rootView, image, textWrapper, icon, textStyle } = styles;

    return (
      <TouchableWithoutFeedback onPress={() => this.onPhotoPressed(index)}>
        <View style={[theme.cardStyle, rootView]}>
          <ProgressiveImage
            style={[theme.cardImageStyle]}
            thumbnailSource={{ uri: photo.thumbnail }}
            imageSource={{ uri: photo.thumbnail }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({
  isFullScreenPhotos: state.photo.isFullScreenPhotos,
});

const mapDispatchToProps = dispatch => ({
  showHideFullScreenPhotosAction: (isShow) => { dispatch(showHideFullScreenPhotosAction(isShow)); },
  setFullPhotoIndexAction: (index) => { dispatch(setFullPhotoIndexAction(index)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
