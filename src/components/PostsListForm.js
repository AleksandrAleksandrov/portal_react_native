import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { FlatList, View, RefreshControl, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getPosts, getMorePosts, refreshPosts, showFilterBy, setFavourite, getFilteredPosts } from '../actions';
import { NavigationBar } from '@shoutem/ui';
import { CustomIcons, TextCustom } from './common';
import PostItem from './PostItem';
import { Spinner } from './common/Spinner';
import DialogFilterBy from './common/DialogFilterBy';
import { SmallSpinner } from './common/SmallSpinner';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { hideFilterBy } from '../actions/PostsActions';
import PropTypes from 'prop-types';

const navigationBarHeight = 70;

const styles = {
  clear: {
    backgroundColor: 'blue',
  },
  iconStyle: {
    fontSize: 24,
    margin: 10,
    color: 'white',
  },
  navigationBarWrapper: {
    width: 'auto',
    height: navigationBarHeight,
    backgroundColor: '#2BA0F3',
  },
};

class PostsListForm extends Component {
  componentWillMount() {
    this.getPosts();
  }

  onRefresh() {
    this.props.dispatch(refreshPosts());
  }

  onPressWriteNewPost = () => {
    Actions.newPostForm();
  }

  getPosts() {
    const { getPosts } = this.props;
    getPosts();
  }

  getMorePosts() {
    const { getMorePosts } = this.props;
    getMorePosts();
  }

  onPressFilterByFavourite() {
    this.props.dispatch(setFavourite(!this.props.filterByFavourite)).then(() => {
      this.props.dispatch(getFilteredPosts(Array.from(this.props.filterSet)));
    });
  }

  onPressFilter = () => {
    this.props.dispatch(showFilterBy());
  }

  onDecline() {
    this.props.dispatch(hideFilterBy());
  }

  renderNavigationBar = (iconStyle, navigationBarWrapper) => {
    return (
      <View style={navigationBarWrapper}>
        <NavigationBar
          title={'Portal'}
          styleName="clear"
          rightComponent={
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={this.onPressWriteNewPost}>
                <Icon name="plus-circle" style={iconStyle} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onPressFilterByFavourite()}>
                {CustomIcons.getNavBarStar(this.props.filterByFavourite)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onPressFilter()}>
                <Icon name="filter" style={iconStyle} />
              </TouchableOpacity>
            </View>}
        />
      </View>
    );
  }

  postsAreLoading = (postsAreLoading) => {
    if (postsAreLoading) {
      return (<Spinner size="large" />);
    }
    return null;
  }

  renderPostsList = (postsList, refreshing) => {
    return (
      <FlatList
        style={{ marginBottom: navigationBarHeight }}
        data={postsList ? postsList : []}
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

  showInfoMessage = (postsList, filteredByFavourite, postsAreLoading) => {
    if (!postsAreLoading && !postsList.length) {
      return (<TextCustom>У Вас нет избранных сообщений</TextCustom>);
    } else if (!postsAreLoading && filteredByFavourite) {
      return (<TextCustom>Сообщений нет</TextCustom>);
    }
    return null;
  }

  paginate = () => {
    const { nextPage, postsAreLoading, loadingMorePostsInProgress } = this.props;

    if (!postsAreLoading && nextPage != null && !loadingMorePostsInProgress) {
      this.props.getMorePosts(nextPage);
    }
  }

  renderLastRow = () => {
    const { loadingMorePostsInProgress, postsList: { length } } = this.props;

    if (!loadingMorePostsInProgress || !length) {
      return null;
    }
    return (<SmallSpinner size="small" />);
  }

  render() {
    const { postsList, postsAreLoading, refreshing, filteredByFavourite } = this.props;
    const { iconStyle, navigationBarWrapper } = styles;

    if (postsAreLoading) {
      return (<Spinner size="large" />);
    }

    return (
      <View>
        {this.renderNavigationBar(iconStyle, navigationBarWrapper)}
        {this.showInfoMessage(postsList, filteredByFavourite, postsAreLoading)}
        {this.renderPostsList(postsList, refreshing)}
        <DialogFilterBy
          dispatch={this.props.dispatch}
          onDecline={() => this.onDecline()}
        />
      </View>
    );
  }
}

PostsListForm.propType = {
  token: PropTypes.string.isRequired,
  postsList: PropTypes.array.isRequired,
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
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  getPosts: () => { dispatch(getPosts()); },
  getMorePosts: (url) => { dispatch(getMorePosts(url)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListForm);
