import React, { Component, PropTypes as PT } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { CardSection, PostFooter } from './common';
import PostHeader from './common/PostHeader';
import Post from '../models/Post';

class PostForm extends Component {
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
    const { post } = this.props;
    const { is_favorite } = post;
    const { title, text, message_type, create_dt, author, comments_count } = post.message; // able to crash

    // const r = Post.objects('Post').filtered(`id == ${post.id}`); // r[0].message.text get message's text 

    return (
      <ScrollView>
        <CardSection>
          <View style={{ flexDirection: 'column', flex: 4 }}>
            <PostHeader
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
      </ScrollView>
    );
  }
}

const styles = {
  
};

export default PostForm;
