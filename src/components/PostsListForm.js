import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import Realm from 'realm';
import { FlatList, View, RefreshControl, TouchableOpacity, StatusBar } from 'react-native';
import { NavigationBar } from '@shoutem/ui';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import PropTypes from 'prop-types';
import OneSignal from 'react-native-onesignal';
import DrawerLayout from 'react-native-drawer-layout';
import Post from '../models/Post';

import {
  getPosts,
  getMorePosts,
  refreshPosts,
  showFilterBy,
  setFavourite,
  getFilteredPosts,
  hideFilterBy,
  subscribeToNotifications,
  hideShowNotificationDialog,
  getPostsFromNotification,
  openDrawer,
  setPostsAction,
  fetchWeekBirthdays,
} from '../actions';
import { CustomIcons, TextCustom, SmallSpinner, Spinner } from './common';
import { color } from '../constants/color';
import { navigationBarHeight } from '../constants/StyleConstants';
import PostItem from './PostItem';
import DialogFilterBy from './common/DialogFilterBy';
import DrawerView from './common/DrawerView';
import {
  NOTIFICATION_TYPE_NEWS,
} from '../Constants';
import WeekBirthdayItem from './WeekBirthdayItem';

const styles = {
  iconStyle: {
    fontSize: 24,
    margin: 10,
    color: color.white,
  },
  navigationBarWrapper: {
    width: 'auto',
    height: navigationBarHeight,
    backgroundColor: color.primaryDark,
  },
  navigationIconsWrapper: {
    flexDirection: 'row',
  },
  postsListStyle: {
    marginBottom: navigationBarHeight,
  },
  weekBirthdayTitle: {
    marginLeft: 10,
    marginTop: 10,
  },
};

const showPushNotificationRequest = () => {
  const permissions = {
    alert: false,
    badge: true,
    sound: true,
  };
  OneSignal.requestPermissions(permissions);
  OneSignal.registerForPushNotifications();
  // this.props.hideShowNotificationDialog();
};

class PostsListForm extends Component {
  constructor() {
    super();
    this.openDrawer = this.openDrawer.bind(this);
  }

  componentDidMount() {
    const realm = new Realm();
    this.props.setPostsAction(Array.from(realm.objects('Post')));
    setTimeout(() => {
      if (this.props.postsList.length > 0) {
        this.props.refreshPosts();
      } else {
        this.props.getPosts();
      }
    }, 10);
    OneSignal.addEventListener('received', this.onReceived.bind(this));
    OneSignal.inFocusDisplaying(2);
    this.props.fetchWeekBirthdays();
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
    Actions.newPostForm();
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

  openDrawer = () => {
    this.drawer.openDrawer();
  }

  renderNavigationBar = () => {
    const { filterByFavourite } = this.props;
    const { iconStyle, navigationBarWrapper, navigationIconsWrapper } = styles;

    return (
      <View style={navigationBarWrapper}>
        <StatusBar
          backgroundColor={color.primaryDark}
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
          leftComponent={
            <TouchableOpacity onPress={() => this.openDrawer()}>
              <Icon name={'bars'} style={iconStyle} />
            </TouchableOpacity>
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
        ListHeaderComponent={() => this.birthdaysOfTheWeek()}
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

  birthdaysOfTheWeek = () => {
    const { weekBirthdayTitle } = styles;
    const { weekBirthdays } = this.props;
    return (
      <View>
        <TextCustom
          type={'t3'}
          style={weekBirthdayTitle}
        >
          Именинники недели:
        </TextCustom>
        <FlatList
          horizontal
          data={weekBirthdays}
          renderItem={({ item }) => <WeekBirthdayItem user={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }

  nav = (
    <DrawerView />
  );

  render() {
    const { postsAreLoading, showNotificationPermissionDialog, postsList } = this.props;

    if (showNotificationPermissionDialog) {
      showPushNotificationRequest();
    }

    if (postsAreLoading & postsList.length === 0) {
      return (<Spinner size={'large'} />);
    }

    return (
      <DrawerLayout
        drawerWidth={300}
        // drawerPosition={DrawerLayout.positions.Left}
        ref={(_drawer) => this.drawer = _drawer}
        renderNavigationView={() => this.nav}>
        <View>

          {this.renderNavigationBar()}
          {this.renderInfoMessage()}
          {this.renderPostsList()}
          <DialogFilterBy
            onDecline={() => this.onDecline()}
          />
        </View>
      </DrawerLayout>
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
  weekBirthdays: state.postsList.weekBirthdays,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  getPosts: () => { dispatch(getPosts()); },
  setPostsAction: (posts) => { dispatch(setPostsAction(posts)); },
  getMorePosts: (url) => { dispatch(getMorePosts(url)); },
  refreshPosts: () => { dispatch(refreshPosts()); },
  getFilteredPosts: (filter) => { dispatch(getFilteredPosts(filter)); },
  showFilterBy: () => { dispatch(showFilterBy()); },
  hideFilterBy: () => { dispatch(hideFilterBy()); },
  subscribeToNotifications: (deviceId) => { dispatch(subscribeToNotifications(deviceId)); },
  hideShowNotificationDialog: () => { dispatch(hideShowNotificationDialog()); },
  getPostsFromNotification: () => { dispatch(getPostsFromNotification()); },
  fetchWeekBirthdays: () => { dispatch(fetchWeekBirthdays()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListForm);
