import React, { Component, PropTypes as PT } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { CardSection, PostFooter } from './common';
import PostHeader from './common/PostHeader';
import { CommentItem } from './CommentItem';
import { connect } from 'react-redux';
import { getComments } from '../actions';
import _ from 'lodash';

class PostForm extends Component {
  componentWillMount() {
    this.getComments();
  }

  getComments() {
    const { getComments } = this.props;
    getComments(this.props.post.message.id);
  }

  static propTypes = {
    post: PT.shape({
      id: PT.number,
      user: PT.number,
      is_favorite: PT.bool,
      message: PT.shape({
        title: PT.string,
        text: PT.string,
      }),
    }),
    // onPress: PT.func,
  };

  static defaultProps = {
    post: {
      id: 1,
      user: 2,
      is_favorite: false,
      message: {
        title: 'title',
        text: 'body',
      },
    },
    // onPress: () => {},
  };

  render() {
    const { id, post, comments } = this.props;
    const { is_favorite } = post;
    const { title, text, message_type, create_dt, author, comments_count } = post.message; // able to crash

    // const r = Post.objects('Post').filtered(`id == ${post.id}`); // r[0].message.text get message's text

    console.log('render', comments);
    return (
      <ScrollView>
        <CardSection>
          <View style={{ flexDirection: 'column', flex: 4 }}>
            <PostHeader
              id={id}
              messageType={message_type}
              title={title}
              isFavorite={is_favorite}
            />
            <Text>{text}</Text>
            <PostFooter
              author={author}
              createDate={create_dt}
              commentsCount={comments_count}
            />
          </View>
        </CardSection>
        <CardSection>
          <FlatList
            data={comments ? comments : []}
            renderItem={({item}) => <CommentItem comment={item} />}
            keyExtractor={item => item.id}
          />
        </CardSection>
      </ScrollView>
    );
  }
}

const styles = {
  
};

const mapStateToProps = (state, myProps) => ({

  post: _.find(state.postsList.results, (o) => { return o.id === myProps.id }),
  comments: state.postsList.comments,
  loadingCommentsInProgress: state.postsList.loadingCommentsInProgress,

});

const mapDispatchToProps = dispatch => ({
  dispatch,
  getComments: (messageId) => { dispatch(getComments(messageId)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
