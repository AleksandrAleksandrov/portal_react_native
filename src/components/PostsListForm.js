import React, { Component } from 'react';
import { AsyncStorage, ListView } from 'react-native';
import { connect } from 'react-redux';
import { getPosts } from '../actions';
import PostItem from './PostItem';
import { Spinner } from './common/Spinner';

class PostsListForm extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }

  componentWillMount() {
    this.getPosts();
  }

  getPosts() {
    const { getPosts } = this.props;
    getPosts();
  }

  renderRow = (post) => (<PostItem post={post} />);

  render() {
    const { postsList, postsAreLoading } = this.props;

    if (postsAreLoading) {
      return <Spinner size="small" />;
    }
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
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = state => ({
  postsList: state.postsList.results,
  postsAreLoading: state.postsList.postsAreLoading,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  getPosts: () => { dispatch(getPosts()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListForm);
