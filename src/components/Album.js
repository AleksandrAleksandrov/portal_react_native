import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { NavigationBar } from '@shoutem/ui';
import { TextCustom, Spinner } from './common/';
import Photo from './Photo';
import { navigationBarHeight } from '../constants/StyleConstants';
import { color } from '../constants/color';
import {
  fetchPhotosFromAlbumAction,
  resetPhotosAction,
} from '../actions';

const styles = {
  navigationBarWrapper: {
    width: 'auto',
    height: navigationBarHeight,
    backgroundColor: color.primaryDark,
  },
  postsListStyle: {
    marginBottom: navigationBarHeight,
  },
};

class Album extends Component {
  constructor() {
    super();
    this.state = { numOfColumn: 2 };
  }

  componentWillMount() {
    this.props.resetPhotosAction();
    this.props.fetchPhotosFromAlbumAction(this.props.album.id);
  }

  componentDidMount() {

    // this.list.scrollToIndex(10);
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

  render() {
    const { postsListStyle } = styles;
    const { photos, fetchingPhotosForAlbumInProgress } = this.props;

    return (
      <View onLayout={(event) => this.onLayout(event)}>
        {this.navigationBar(this.props.album.title)}
        <FlatList
          ref={(s) => this.list = s}
          style={postsListStyle}
          data={photos}
          renderItem={({ item }) => <Photo photo={item} />}
          keyExtractor={item => item.id}
          numColumns={this.state.numOfColumn}
          key={this.state.numOfColumn}
        />
        {this.getProgressBar(fetchingPhotosForAlbumInProgress)}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.photo.photos,
  fetchingPhotosForAlbumInProgress: state.photo.fetchingPhotosForAlbumInProgress,
});

const mapDispatchToProps = dispatch => ({
  fetchPhotosFromAlbumAction: (albumId) => { dispatch(fetchPhotosFromAlbumAction(albumId)); },
  resetPhotosAction: () => { dispatch(resetPhotosAction()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Album);
