import React, { Component } from 'react';
import { AsyncStorage, Text, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { getPosts } from '../actions';
import { Button } from './common';
import PostItem from './PostItem';

class PostsListForm extends Component {
  componentWillMount() {
      this.getPosts();
  }

  getPosts() {
    this.props.dispatch(getPosts());
  }

  getToken() {
    AsyncStorage.getItem('token').then((settingsStr) => {
      return settingsStr;
    });
  }

  state = { results: [] };

  // renderPost() {
  //   return (
  //   this.state.results.map(message => (<PostItem key={message.id} message={message} />)));
  // }

  renderRow(post) {
    return <PostItem post={post} />;
  }

  render() {
    const {postsList} = this.props;
    return (
      <ListView
        enableEmptySections
        dataSource={ds.cloneWithRows(postsList ? postsList : [])}
        renderRow={this.renderRow}
      />
    );
  }
}

const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

const mapStateToProps = (state) => {
  return { postsList: state.postsList.results };
};

export default connect(mapStateToProps)(PostsListForm);
