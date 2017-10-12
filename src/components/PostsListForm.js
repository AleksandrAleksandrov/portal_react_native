import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { FlatList, View, RefreshControl, TouchableOpacity } from 'react-native';
import { NavigationBar } from '@shoutem/ui';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import PropTypes from 'prop-types';
import { getPosts, getMorePosts, refreshPosts, showFilterBy, setFavourite, getFilteredPosts } from '../actions';
import { CustomIcons, TextCustom } from './common';
import PostItem from './PostItem';
import { Spinner } from './common/Spinner';
import DialogFilterBy from './common/DialogFilterBy';
import { SmallSpinner } from './common/SmallSpinner';
import { hideFilterBy } from '../actions/PostsActions';

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
  navigationIconsWrapper: {
    flexDirection: 'row',
  },
};

class PostsListForm extends Component {
  // в конструкторе лучше биндить!
  componentWillMount() {
    this.props.getPosts();
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
    this.props.dispatch(showFilterBy());
  }

  onDecline() {
    this.props.dispatch(hideFilterBy());
  }

  renderNavigationBar = () => {
    const { filterByFavourite } = this.props;
    const { iconStyle, navigationBarWrapper, navigationIconsWrapper } = styles;
    return (
      <View style={navigationBarWrapper}>
        <NavigationBar
          title={'Portal'}
          styleName="clear"
          rightComponent={
            <View style={navigationIconsWrapper}>
              <TouchableOpacity onPress={() => this.onPressWriteNewPost()}>
                <Icon name="plus-circle" style={iconStyle} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onPressFilterByFavourite()}>
                {CustomIcons.getNavBarStar(filterByFavourite)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onPressFilter()}>
                <Icon name="filter" style={iconStyle} />
              </TouchableOpacity>
            </View>
          }
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

  renderPostsList = () => {
    const { postsList, refreshing } = this.props;
    return (
      <FlatList
        style={{ marginBottom: navigationBarHeight }}
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

  showInfoMessage = () => {
    const { postsList, postsAreLoading, filteredByFavourite } = this.props;

    if (!postsAreLoading && !postsList.length) {
      return (<TextCustom>У Вас нет избранных сообщений</TextCustom>);
    } else if (!postsAreLoading && filteredByFavourite) {
      return (<TextCustom>Сообщений нет</TextCustom>);
    }
    return null;
  }

  paginate = () => {
    const { nextPage, postsAreLoading, loadingMorePostsInProgress, getMorePosts } = this.props;

    if (!postsAreLoading && nextPage != null && !loadingMorePostsInProgress) {
      getMorePosts(nextPage);
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
    const { postsAreLoading } = this.props;

    if (postsAreLoading) {
      return (<Spinner size="large" />);
    }

    return (
      <View>
        {this.renderNavigationBar()}
        {this.showInfoMessage()}
        {this.renderPostsList()}
        <DialogFilterBy
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
  refreshPosts: () => { dispatch(refreshPosts()); },
  getFilteredPosts: (filter) => { dispatch(getFilteredPosts(filter)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListForm);
