import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, RefreshControl, View, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { TextCustom, Spinner } from './common';
import { navigationBarHeight } from '../constants/StyleConstants';
import { color } from '../constants/color';
import AlbumItem from './AlbumItem';
import {
  fetchAlbumsAction,
  refreshAlbumsAction,
} from '../actions';

const { width } = Dimensions.get('window');

const styles = {
  navigationBarWrapper: {
    width: 'auto',
    height: navigationBarHeight,
    backgroundColor: color.primaryDark,
  },
  iconStyle: {
    fontSize: 24,
    margin: 10,
    color: color.white,
  },
  postsListStyle: {
    marginBottom: navigationBarHeight,
  },
};

class AlbumsList extends Component {
  constructor() {
    super();
    this.state = { numOfColumn: 2 };
  }

  componentWillMount() {
    this.props.fetchAlbumsAction();
  }

  navigationBar = (title) => {
    const { iconStyle } = styles;

    return (
      <View style={styles.navigationBarWrapper}>
        <NavigationBar
          hasHistory
          styleName={'clear'}
          navigateBack={this.props.navigation.goBack}
          title={<TextCustom type={'labelText'} numberOfLines={1}>{title}</TextCustom>}
          leftComponent={
            <TouchableOpacity onPress={() => this.openDrawer()}>
              <Icon name={'bars'} style={iconStyle} />
            </TouchableOpacity>
          }
        />
      </View>
    );
  };

  onLayout = (event) => {
    const num = parseInt(event.nativeEvent.layout.width / 160, 10);
    this.setState({ numOfColumn: num });
  }

  getInitialProgressBar = (fetchingAlbumsInProgress) => {
    const { initProgressBarStyle } = styles;
    if (fetchingAlbumsInProgress) {
      return (
        <Spinner style={initProgressBarStyle} size={'large'} />
      );
    }
    return null;
  };

  onRefreshAlbums = () => {
    this.props.refreshAlbumsAction();
  };

  render() {
    const { albums, fetchingAlbumsInProgress, refreshingAlbumsInProgress } = this.props;
    const { postsListStyle } = styles;

    return (
      <View onLayout={(event) => this.onLayout(event)}>
        {this.navigationBar('Жизнь Light IT')}
        <FlatList
          style={postsListStyle}
          data={albums}
          numColumns={this.state.numOfColumn}
          renderItem={({ item }) => <AlbumItem album={item} />}
          keyExtractor={item => item.id}
          key={this.state.numOfColumn}
          refreshControl={
            <RefreshControl
              refreshing={refreshingAlbumsInProgress}
              onRefresh={() => this.onRefreshAlbums()}
            />
          }
        />
        {this.getInitialProgressBar(fetchingAlbumsInProgress)}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.photo.albums,
  fetchingAlbumsInProgress: state.photo.albums,
  refreshingAlbumsInProgress: state.photo.refreshingAlbumsInProgress,
});

const mapDispatchToProps = dispatch => ({
  fetchAlbumsAction: () => { dispatch(fetchAlbumsAction()); },
  refreshAlbumsAction: () => { dispatch(refreshAlbumsAction()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsList);
