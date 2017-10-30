import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, PostIcon, TextCustom, PostFooter } from './common';
import PostHeader from './common/PostHeader';

const styles = {
  titleTextStyle: {
    marginTop: 5,
    flex: 1,
  },
  bodyTextStyle: {
    fontSize: 32,
    margin: 10,
  },
  rootViewStyle: {
    flex: 1,
  },
  headerViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textViewWrapper: {
    flexDirection: 'row',
    flex: 4,
  },
  starViewWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  authorViewWrapper: {
    flexDirection: 'row',
    marginTop: 10,
  },
  authorView: {
    flex: 1,
  },
  dateViewWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
};

class PostItem extends Component {
  constructor() {
    super();
    this.onPostPress = this.onPostPress.bind(this);
  }

  onPostPress() {
    Actions.post({ id: this.props.post.id });
  }

  render() {
    const { post } = this.props;
    const { text, create_dt, author, comments_count } = post.message; // able to

    return (
      <TouchableWithoutFeedback onPress={this.onPostPress}>
        <View>
          <CardSection >
            <View style={styles.rootViewStyle}>
              <PostHeader
                post={post}
                id={post.id}
              />
              <View>
                <TextCustom type={'t2_regular'} numberOfLines={4} >{text}</TextCustom>
              </View>
              <PostFooter
                author={author}
                createDate={create_dt}
                commentsCount={comments_count}
                showComments
              />
            </View>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default PostItem;
