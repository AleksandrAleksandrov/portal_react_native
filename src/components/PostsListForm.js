import React, { Component } from 'react';
import { FlatList, View, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { getPosts, getMorePosts, refreshPosts } from '../actions';
import PostItem from './PostItem';
import { Spinner } from './common/Spinner';
import { SmallSpinner } from './common/SmallSpinner';

class PostsListForm extends Component {
  constructor(props) {
    super(props);
    // console.warn(this.state.token);
  }

  componentWillMount() {
    this.getPosts();
  }

  getPosts() {
    const { getPosts } = this.props;
    getPosts(null);
  }

  getMorePosts() {
    const { getMorePosts } = this.props;
    getMorePosts();
  }

  renderItem = ({post, index}) => (<PostItem post={post} />);
  renderLastRow = () => {
    if (!this.props.loadingMorePostsInProgress || !this.props.postsList.length) {
      return null;
    }
    
    return (<SmallSpinner size="large" />);
  };

  paginate = () => {
    if (!this.props.postsAreLoading && this.props.nextPage != null && !this.props.loadingMorePostsInProgress) {
      this.props.getMorePosts(this.props.nextPage);
    }
  };

  _onRefresh() {
    this.props.dispatch(refreshPosts());
  }

  render() {
    const { postsList, postsAreLoading } = this.props;

    if (postsAreLoading) {
      return <Spinner size="large" />;
    }

    return (
      <View>
        <FlatList
          data={postsList ? postsList : []}
          renderItem={({item}) => <PostItem post={item} />}
          keyExtractor={item => item.id}
          onEndReached={this.paginate}
          ListFooterComponent={this.renderLastRow}
          refreshControl={
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />
      </View>
    );
  }
}

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
  getPosts: (url) => { dispatch(getPosts(url)); },
  getMorePosts: (url) => { dispatch(getMorePosts(url)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListForm);
