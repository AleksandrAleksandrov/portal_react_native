import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, View, FlatList } from 'react-native';
import { NavigationBar } from '@shoutem/ui';
import { TextCustom, Spinner } from './common/';
import Photo from './Photo';
import { navigationBarHeight } from '../constants/StyleConstants';
import { color } from '../constants/color';
import {
  fetchPhotosFromAlbumAction,
  resetPhotosAction,
  showHideFullScreenPhotosAction,
  setFullPhotoIndexAction,
  downloadPhotoAction,
} from '../actions';
import ModalFullSizePhoto from './ModalFullSizePhoto';

const styles = {
  navigationBarWrapper: {
    width: 'auto',
    height: navigationBarHeight,
    backgroundColor: color.primaryDark,
  },
  postsListStyle: {
    marginBottom: navigationBarHeight,
  },
  iconStyle: {
    fontSize: 24,
    color: color.drawerIconColor,
  },
  downloadIconWrapper: {
    padding: 10,
    marginTop: 20,
    alignSelf: 'flex-end',
    margin: 10,
  },
  closeIconWrapper: {
    padding: 10,
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
};

class Album extends Component {
  constructor() {
    super();
    this.state = { numOfColumn: 2, openedPhotoIndex: 1 };
  }

  componentWillMount() {
    this.props.resetPhotosAction();
    this.props.fetchPhotosFromAlbumAction(this.props.album.id);
  }

  navigationBar = (title) => {
    return (
      <View style={styles.navigationBarWrapper}>
        <NavigationBar
          hasHistory
          styleName={'clear'}
          navigateBack={this.props.navigation.goBack}
          title={<TextCustom type={'labelText'} numberOfLines={1}>{title}</TextCustom>}
        />
      </View>
    );
  };

  onLayout = (event) => {
    const num = parseInt(event.nativeEvent.layout.width / 160, 10);
    this.setState({ numOfColumn: num });
  };

  getProgressBar = (fetchingAlbumsInProgress) => {
    const { initProgressBarStyle } = styles;

    if (fetchingAlbumsInProgress) {
      return (
        <Spinner style={initProgressBarStyle} size={'large'} />
      );
    }
    return null;
  };

  onCloseFullScreenPhotos = () => {
    this.props.showHideFullScreenPhotosAction(false);
  }

  full = (urls, isFullScreenPhotos) => {
    if (isFullScreenPhotos) {
      return (
        <ModalFullSizePhoto title={this.props.album.title} />
      );
    }
    return null;
  };

  render() {
    const { postsListStyle } = styles;
    const { photos, fetchingPhotosForAlbumInProgress, urls, isFullScreenPhotos } = this.props;

    return (
      <View onLayout={(event) => this.onLayout(event)}>
        {this.navigationBar(this.props.album.title)}
        <FlatList
          ref={(s) => this.list = s}
          style={postsListStyle}
          data={photos}
          renderItem={({ item, index }) => <Photo photo={item} index={index} />}
          keyExtractor={item => item.id}
          numColumns={this.state.numOfColumn}
          key={this.state.numOfColumn}
        />
        {this.getProgressBar(fetchingPhotosForAlbumInProgress)}
        {this.full(urls, isFullScreenPhotos)}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.photo.photos,
  fetchingPhotosForAlbumInProgress: state.photo.fetchingPhotosForAlbumInProgress,
  urls: state.photo.urls,
  isFullScreenPhotos: state.photo.isFullScreenPhotos,
  fullScreenPhotoIndex: state.photo.fullScreenPhotoIndex,
  photoDownloadingInProgress: state.photo.photoDownloadingInProgress,
});

const mapDispatchToProps = dispatch => ({
  fetchPhotosFromAlbumAction: (albumId) => { dispatch(fetchPhotosFromAlbumAction(albumId)); },
  resetPhotosAction: () => { dispatch(resetPhotosAction()); },
  showHideFullScreenPhotosAction: (isShow) => { dispatch(showHideFullScreenPhotosAction(isShow)); },
  setFullPhotoIndexAction: (index) => { dispatch(setFullPhotoIndexAction(index)); },
  downloadPhotoAction: (isDownloading) => { dispatch(downloadPhotoAction(isDownloading)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Album);
