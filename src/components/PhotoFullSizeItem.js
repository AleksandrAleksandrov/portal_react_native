import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import ProgressiveImage from 'react-native-progressive-image';
import Orientation from 'react-native-orientation';
import { Spinner } from './common/Spinner';

const { width, height } = Dimensions.get('window');

const styles = {
  rootView: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  photoStyle: {
    height: 200,
  },
};

class PhotoFullSizeItem extends Component {
  constructor() {
    super();
    this.state = { width, height, isLoaded: false };
  }

  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      this.setState({ width, height });
    } else {
      this.setState({ width: height, height: width });
    }
  }

  componentDidMount() {
    Orientation.lockToPortrait();
    Orientation.addOrientationListener(this._orientationDidChange);
  }

  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      this.setState({ width: height, height: width });
    } else {
      this.setState({ width, height });
    }
  }

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });

    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  onLoad = () => {
    this.setState({ isLoaded: true });
  }

  getContent = isLoaded => {
    if (!isLoaded) {
      return (
        <Spinner style={{position: 'relative'}} size={'large'} />
      );
    }
    return null;
  }

  render() {
    const { photo } = this.props;
    const { rootView, photoStyle } = styles;
    // Image.getSize(photo.thumbnail, (width, height) => {
    //   this.setState({ height });
    //   console.log(`The image dimensions are ${width}x${height}`);
    // }, (error) => {
    //   console.error(`Couldn't get the image size: ${error.message}`);
    // });
    return (
      <View style={[rootView, { width: this.state.width, height: this.state.height }]}>
        <ProgressiveImage
          onLoadThumbnail={this.onLoad}
          style={[photoStyle, { width: this.state.width }]}
          resizeMode={'contain'}
          thumbnailSource={{ uri: photo.thumbnail }}
          imageSource={{ uri: photo.preview }}
        />
        {this.getContent(this.state.isLoaded)}
      </View>
    );
  }
}

export default PhotoFullSizeItem;
