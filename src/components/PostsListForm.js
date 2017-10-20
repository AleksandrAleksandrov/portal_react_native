import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { FlatList, View, RefreshControl, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native';
import { NavigationBar } from '@shoutem/ui';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import PropTypes from 'prop-types';
import OneSignal from 'react-native-onesignal';

import { getPosts, getMorePosts, refreshPosts, showFilterBy, setFavourite, getFilteredPosts, hideFilterBy, subscribeToNotifications, hideShowNotificationDialog, getPostsFromNotification } from '../actions';
import { CustomIcons, TextCustom, SmallSpinner, Spinner } from './common';
import { color } from '../constants/color';
import { navigationBarHeight } from '../constants/StyleConstants';
import PostItem from './PostItem';
import DialogFilterBy from './common/DialogFilterBy';
import {
  NOTIFICATION_TYPE_NEWS,
} from '../Constants';

const styles = {
  iconStyle: {
    fontSize: 24,
    margin: 10,
    color: color.white,
  },
  navigationBarWrapper: {
    width: 'auto',
    height: navigationBarHeight,
    backgroundColor: color.primary,
  },
  navigationIconsWrapper: {
    flexDirection: 'row',
  },
  postsListStyle: {
    marginBottom: navigationBarHeight,
  },
};

const logOut = () => {
  AsyncStorage.removeItem('token');
  OneSignal.setSubscription(false);
  Actions.login();
};

const showPushNotificationRequest = () => {
  const permissions = {
    alert: false,
    badge: true,
    sound: true,
  };
  OneSignal.requestPermissions(permissions);
  OneSignal.registerForPushNotifications();
  this.dispatch.hideShowNotificationDialog();
};

class PostsListForm extends Component {
  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived.bind(this));
    OneSignal.inFocusDisplaying(2);
    this.props.getPosts();
  }

  onReceived(notification) {
    if (notification.payload.launchURL.includes(NOTIFICATION_TYPE_NEWS)) {
      this.props.getPostsFromNotification();
    }
  }

  onRefresh() {
    this.props.refreshPosts();
  }

  onPressWriteNewPost = () => {
    // Actions.newPostForm();
    logOut();
  }

  onPressFilterByFavourite() {
    const { filterByFavourite, filterSet, getFilteredPosts } = this.props;

    this.props.dispatch(setFavourite(!filterByFavourite)).then(() => {
      getFilteredPosts(Array.from(filterSet));
    });
  }

  onPressFilter = () => {
    this.props.showFilterBy();
  }

  onDecline = () => {
    this.props.hideFilterBy();
  }

  paginate = () => {
    const { nextPage, postsAreLoading, loadingMorePostsInProgress, getMorePosts } = this.props;

    if ((!postsAreLoading && nextPage !== null) && !loadingMorePostsInProgress) {
      getMorePosts(nextPage);
    }
  }

  renderNavigationBar = () => {
    const { filterByFavourite } = this.props;
    const { iconStyle, navigationBarWrapper, navigationIconsWrapper } = styles;

    return (
      <View style={navigationBarWrapper}>
        <StatusBar
          backgroundColor={color.primary}
          barStyle="light-content"
        />
        <NavigationBar
          title={'Portal'}
          styleName={'clear'}
          rightComponent={
            <View style={navigationIconsWrapper}>
              <TouchableOpacity onPress={() => this.onPressWriteNewPost()}>
                <Icon name={'plus-circle'} style={iconStyle} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onPressFilterByFavourite()}>
                {CustomIcons.getNavBarStar(filterByFavourite)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onPressFilter()}>
                <Icon name={'filter'} style={iconStyle} />
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  }

  renderPostsList = () => {
    const { postsList, refreshing } = this.props;
    const { postsListStyle } = styles;

    return (
      <FlatList
        style={postsListStyle}
        data={postsList}
        renderItem={({ item }) => <PostItem post={item} />}
        keyExtractor={item => item.id}
        onEndReached={() => this.paginate()}
        ListFooterComponent={() => this.renderLastRow()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => this.onRefresh()}
          />
        }
      />
    );
  }

  renderInfoMessage = () => {
    const { postsList, postsAreLoading, filteredByFavourite } = this.props;

    if (!postsAreLoading && !postsList.length) {
      return (<TextCustom>У Вас нет избранных сообщений</TextCustom>);
    } else if (!postsAreLoading && filteredByFavourite) {
      return (<TextCustom>Сообщений нет</TextCustom>);
    }
    return null;
  }

  renderLastRow = () => {
    const { loadingMorePostsInProgress, postsList: { length } } = this.props;

    if (!loadingMorePostsInProgress || !length) {
      return null;
    }
    return (<SmallSpinner size={'small'} />);
  }

  render() {
    const { postsAreLoading, showNotificationPermissionDialog } = this.props;

    if (showNotificationPermissionDialog) {
      showPushNotificationRequest();
    }

    if (postsAreLoading) {
      return (<Spinner size={'large'} />);
    }

    return (
      <View>
        {this.renderNavigationBar()}
        {this.renderInfoMessage()}
        {this.renderPostsList()}
        <DialogFilterBy
          onDecline={() => this.onDecline()}
        />
      </View>
    );
  }
}

PostsListForm.propType = {
  token: PropTypes.string,
  postsList: PropTypes.array,
  nextPage: PropTypes.string,
  postsAreLoading: PropTypes.bool,
  loadingMorePostsInProgress: PropTypes.bool,
  refreshing: PropTypes.bool,
  filterByFavourite: PropTypes.bool,
};

PostsListForm.defaultProps = {
  token: '',
  postsList: [],
  nextPage: '',
  postsAreLoading: false,
  loadingMorePostsInProgress: false,
  refreshing: false,
  filterByFavourite: false,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  postsList: state.postsList.results,
  nextPage: state.postsList.nextPage,
  postsAreLoading: state.postsList.postsAreLoading,
  loadingMorePostsInProgress: state.postsList.loadingMorePostsInProgress,
  refreshing: state.postsList.refreshing,
  filterSet: state.postsList.filterSet,
  filterByFavourite: state.postsList.filterByFavourite,
  showNotificationPermissionDialog: state.postsList.showNotificationPermissionDialog,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  getPosts: () => { dispatch(getPosts()); },
  getMorePosts: (url) => { dispatch(getMorePosts(url)); },
  refreshPosts: () => { dispatch(refreshPosts()); },
  getFilteredPosts: (filter) => { dispatch(getFilteredPosts(filter)); },
  showFilterBy: () => { dispatch(showFilterBy()); },
  hideFilterBy: () => { dispatch(hideFilterBy()); },
  subscribeToNotifications: (deviceId) => { dispatch(subscribeToNotifications(deviceId)); },
  hideShowNotificationDialog: () => { dispatch(hideShowNotificationDialog()); },
  getPostsFromNotification: () => { dispatch(getPostsFromNotification()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListForm);
