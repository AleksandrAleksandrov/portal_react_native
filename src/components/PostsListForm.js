import React, { Component } from 'react';
import { FlatList, View, RefreshControl, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getPosts, getMorePosts, refreshPosts, showFilterBy } from '../actions';
import { NavigationBar } from '@shoutem/ui';
import PostItem from './PostItem';
import { Spinner } from './common/Spinner';
import DialogFilterBy from "./common/DialogFilterBy";
import { SmallSpinner } from './common/SmallSpinner';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { hideFilterBy } from "../actions/PostsActions";
import PropTypes from 'prop-types';

const styles = {
  clear: {
    backgroundColor: 'blue',
  },
  iconStyle: {
    fontSize: 24,
    margin: 10,
    color: 'white',
  },
};

const navigationBarHeight = 70;

class PostsListForm extends Component {
  // в конструкторе лучше биндить!
  componentWillMount() {
    this.getPosts();
  }

  getPosts() {
    const { getPosts } = this.props;
    getPosts();
  }

  getMorePosts() {
    const { getMorePosts } = this.props;
    getMorePosts();
  }

  renderLastRow = () => {

    const { loadingMorePostsInProgress, postsList: { length } } = this.props;

    if (!loadingMorePostsInProgress || !length) {
      return null;
    }
    return (<SmallSpinner size="small" />);
  };

  paginate = () => {

    const { nextPage, postsAreLoading, loadingMorePostsInProgress } = this.props;

    if (!postsAreLoading && nextPage != null && !loadingMorePostsInProgress) {
      this.props.getMorePosts(nextPage);
    }
  };

  _onRefresh() {
    this.props.dispatch(refreshPosts());
  }

  onPressWriteNewPost() {

  }

  onPressFilterByFavourite() {

  }

  onPressFilter = () => {
    this.props.dispatch(showFilterBy());
  }

  onDecline() {
    this.props.dispatch(hideFilterBy());
  }

  render() {
    const { postsList, postsAreLoading, refreshing } = this.props;
    const { iconStyle } = styles;

    if (postsAreLoading) {
      return <Spinner size="large" />;
    }

    return (
      <View>
        <View style={{ width: 'auto', height: navigationBarHeight, backgroundColor: '#2BA0F3' }}>
          <NavigationBar
            title={'Portal'}
            styleName='clear'
            rightComponent={
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.onPressWriteNewPost}>
                  <Icon name="plus-circle" style={iconStyle}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPressFilterByFavourite}>
                  <Icon name="star-o" style={iconStyle}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onPressFilter()}>
                  <Icon name="filter" style={iconStyle}/>
                </TouchableOpacity>
              </View>}
          />
        </View>
        <FlatList
          style={{marginBottom: navigationBarHeight}}
          data={postsList ? postsList : []}
          renderItem={({item}) => <PostItem post={item} />}
          keyExtractor={item => item.id}
          onEndReached={this.paginate}
          ListFooterComponent={this.renderLastRow}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />
        <DialogFilterBy
          dispatch={this.props.dispatch}
          onDecline={this.onDecline.bind(this)}
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
};

PostsListForm.defaultProps = {
  token: '',
  postsList: [],
  nextPage: '',
  postsAreLoading: false,
  loadingMorePostsInProgress: false,
  refreshing: false,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  postsList: state.postsList.results,
  nextPage: state.postsList.nextPage,
  postsAreLoading: state.postsList.postsAreLoading,
  loadingMorePostsInProgress: state.postsList.loadingMorePostsInProgress,
  refreshing: state.postsList.refreshing,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  getPosts: () => { dispatch(getPosts()); },
  getMorePosts: (url) => { dispatch(getMorePosts(url)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListForm);
