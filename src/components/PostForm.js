import React, { Component, PropTypes as PT } from 'react';
import { Text, View } from 'react-native';
import { CardSection, PostIcon } from './common';
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
    const r = Post.objects('Post').filtered(`id == ${this.props.post.id}`);
    console.warn(r[0]);

    return (
      <CardSection>
      <View style={{ flexDirection: 'column', flex: 4 }}>
        {PostIcon.getPostIcon(r[0].message.message_type)}
        <Text>{ r[0].message.text } </Text>
      </View>
      </CardSection>
    );
  }
}

export default PostForm;
