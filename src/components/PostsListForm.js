import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import { getPosts, getMorePosts } from '../actions';
import PostItem from './PostItem';
import { Spinner } from './common/Spinner';
import { SmallSpinner } from './common/SmallSpinner';

class PostsListForm extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
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

  renderRow = (post) => (<PostItem post={post} />);
  renderLastRow = () => {
    if (!this.props.loadingMorePostsInProgress || !this.props.postsList.length) {
      return <View />;
    }
    
    return (<SmallSpinner size="large" />);
  };

  paginate = () => {
    if (!this.props.postsAreLoading && this.props.nextPage != null && !this.props.loadingMorePostsInProgress) {
      this.props.getMorePosts(this.props.nextPage);
    }
  };

  render() {
    const { postsList, postsAreLoading } = this.props;

    if (postsAreLoading) {
      return <Spinner size="large" />;
    }

    return (
      <View>
        <ListView
          enableEmptySections
          initialListSize={20}
          pageSize={5}
          scrollRenderAheadDistance={300}
          onEndReachedThreshold={10}
          dataSource={ds.cloneWithRows(postsList ? postsList : [])}
          renderRow={this.renderRow}
          onEndReached={this.paginate}
          renderFooter={this.renderLastRow}
        />
      </View>
    );
  }
}

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = state => ({
  token: state.auth.token,
  postsList: state.postsList.results,
  nextPage: state.postsList.nextPage,
  postsAreLoading: state.postsList.postsAreLoading,
  loadingMorePostsInProgress: state.postsList.loadingMorePostsInProgress,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  getPosts: (url) => { dispatch(getPosts(url)); },
  getMorePosts: (url) => { dispatch(getMorePosts(url)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListForm);
