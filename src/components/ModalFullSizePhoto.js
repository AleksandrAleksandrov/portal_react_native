import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  Modal,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  Platform,
  CameraRoll,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob';
import Orientation from 'react-native-orientation';
import PhotoFullSizeItem from './PhotoFullSizeItem';
import { TextCustom } from './common/TextCustom';
import { navigationBarHeight } from '../constants/StyleConstants';
import { color } from '../constants/color';
import {
  showHideFullScreenPhotosAction,
  downloadPhotoAction,
} from '../actions';

const { width, height } = Dimensions.get('window');

const styles = {
  postsListStyle: {
    marginBottom: navigationBarHeight,
  },
  iconStyle: {
    fontSize: 24,
    color: color.drawerIconColor,
  },
  downloadIconWrapper: {
    flex: 1,
    padding: 5,
    marginTop: 20,
    alignSelf: 'flex-end',
    margin: 10,
  },
  closeIconWrapper: {
    flex: 1,
    padding: 5,
    marginTop: 20,
    alignSelf: 'flex-start',
    margin: 10,
  },
  photosWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImageStyle: {
    flex: 1,
  },
  barWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  albumTitleStyle: {
    flex: 4,
    color: color.textWhite,
    marginTop: 20,
    alignSelf: 'center',
  },
};

class ModalFullSizePhoto extends Component {
  constructor() {
    super();
    this.state = { width, height, openedPhotoIndex: 1 };
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

    const { fullScreenPhotoIndex } = this.props;
    setTimeout(() => {
      this.scrollToItem(fullScreenPhotoIndex);
    }, 1000);
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

  downloadedSuccessful = () => {
    this.props.downloadPhotoAction(false);
    Alert.alert('Готово', 'Фотография сохранена на устройство');
  }

  onSave = (uri) => {
    this.props.downloadPhotoAction(true);

    if (Platform.OS === 'android') {
      RNFetchBlob
        .config({
          fileCache : true,
          appendExt : 'png'
        })
        .fetch('GET', uri.file)
        .then((res) => {
          const path = '/storage/emulated/0/asdf.png';
          console.warn('PATH', path);
          CameraRoll.saveToCameraRoll(res.path(), 'photo')
            .then(() => this.downloadedSuccessful())
            .catch(err => console.log('err:', err));
        });
    } else {
      CameraRoll.saveToCameraRoll(uri.file, 'photo')
        .then(() => this.downloadedSuccessful());
    }
  }

  getTitle = (albumTitle) => {
    return (
      <TextCustom
        type={'t3'}
        style={styles.albumTitleStyle}
      >
        {albumTitle}
      </TextCustom>
    );
  }

  modalClose = () => {
    this.props.showHideFullScreenPhotosAction(false);
  }

  closeButton = () => {
    return (
      <TouchableWithoutFeedback onPress={() => this.modalClose()}>
        <View style={styles.closeIconWrapper}>
          <Icon
            name={'long-arrow-left'}
            style={styles.iconStyle}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  downloadButton = (photoDownloadingInProgress) => {
    const { fullScreenPhotoIndex, urls } = this.props;
    const { downloadIconWrapper } = styles;

    if (photoDownloadingInProgress) {
      return (
        <View style={downloadIconWrapper} >
          <ActivityIndicator size={'small'} />
        </View>
      );
    }
    return (
      <TouchableWithoutFeedback onPress={() => this.onSave(urls[fullScreenPhotoIndex])}>
        <View style={downloadIconWrapper}>
          <Icon
            name={'download'}
            style={[styles.iconStyle, {alignSelf: 'flex-end'}]}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  scrollToItem = (index) => {
    this.fullPhotosList.scrollToIndex({ animated: false, index });
  }

  setPhotoRef = (ref) => {
    this.fullPhotosList = ref;
  }

  getList = (fullScreenPhotoIndex) => {
    const { fullImageStyle } = styles;
    const { photos } = this.props;

    return (
      <FlatList
        ref={(ref) => this.setPhotoRef(ref)}
        data={photos}
        style={[fullImageStyle, { width: this.state.width, height: this.state.height, borderWidth: 2, borderColor: 'black' }]}
        renderItem={({ item, index }) => <PhotoFullSizeItem photo={item} />}
        keyExtractor={item => item.id}
        initialNumToRender={photos.length}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        horizontal={true}
      />
    );
  }

  render() {
    const {
      title,
      isFullScreenPhotos,
      photoDownloadingInProgress,
      fullScreenPhotoIndex,
    } = this.props;
    const { barWrapper, photosWrapper } = styles;

    return (
      <Modal
        transparent
        visible={isFullScreenPhotos}
        onDismiss={() => this.onCloseFullScreenPhotos()}
        onRequestClose={() => this.modalClose()}
        supportedOrientations={['portrait', 'landscape']}
        style={{ width: this.state.width, height: this.state.height, borderWidth: 5, borderColor: 'green' }}
      >
        <View
          style={[photosWrapper, { width: this.state.width, height: this.state.height, backgroundColor: 'black' }]}
        >
          <View style={[barWrapper, { width: this.state.width }]}>
            {this.closeButton()}
            {this.getTitle(title)}
            {this.downloadButton(photoDownloadingInProgress)}
          </View>
          {this.getList(fullScreenPhotoIndex)}
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isFullScreenPhotos: state.photo.isFullScreenPhotos,
  fullScreenPhotoIndex: state.photo.fullScreenPhotoIndex,
  photoDownloadingInProgress: state.photo.photoDownloadingInProgress,
  photos: state.photo.photos,
  urls: state.photo.urls,
});

const mapDispatchToProps = dispatch => ({
  showHideFullScreenPhotosAction: (isShow) => { dispatch(showHideFullScreenPhotosAction(isShow)); },
  downloadPhotoAction: (isDownloading) => { dispatch(downloadPhotoAction(isDownloading)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalFullSizePhoto);
