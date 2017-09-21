import React, { Component } from 'react';
import { AsyncStorage, ListView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getPosts, setToken } from '../actions';
import PostItem from './PostItem';
import { Spinner } from './common/Spinner';
import { SmallSpinner } from './common/SmallSpinner';
import * as serviceREST from '../services/serviceREST';

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

  renderRow = (post) => (<PostItem post={post} />);
  renderLastRow = () => {
    if (!this.props.postsAreLoading || !this.props.postsList.length) {
      return <View />;
    }
    
    return (<SmallSpinner size="large" />);
  };

  pagin = () => {
    if (!this.props.postsAreLoading && this.props.nextPage != null) {
      this.props.getPosts(this.props.nextPage);
    }
  }

  render() {
    const { postsList, postsAreLoading } = this.props;

    // if (postsAreLoading) {
    //   return <Spinner size="small" />;
    // }
    return (
      <View>
        <ListView
          enableEmptySections
          onEndReachedThreshold={100}
          dataSource={ds.cloneWithRows(postsList ? postsList : [])}
          renderRow={this.renderRow}
          onEndReached={this.pagin}
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
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  getPosts: (url) => { dispatch(getPosts(url)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListForm);
