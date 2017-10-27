import React, { Component, PropTypes as PT } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { CardSection, PostFooter, TextCustom } from './common';
import PostHeader from './common/PostHeader';
import { CommentItem } from './CommentItem';
import { connect } from 'react-redux';
import {
  POLL,
  EVENT,
} from '../Constants';
import { getComments, setAsRead } from '../actions';
import _ from 'lodash';
import { NavigationBar } from '@shoutem/ui';
import { navigationBarHeight } from '../constants/StyleConstants';

class PostForm extends Component {
  componentWillMount() {
    this.getComments();
    this.setAsRead();
  }

  setAsRead() {
    const { post } = this.props;
    if ((post.message.message_type === POLL | post.message.message_type === EVENT) & post.my_vote === null) {
      return;
    }

    this.props.dispatch(setAsRead(this.props.post.id));
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
    const { post, comments } = this.props;
    const { title, text, create_dt, author, comments_count } = post.message; // able to crash

    // const r = Post.objects('Post').filtered(`id == ${post.id}`); // r[0].message.text get message's text

    console.log('render', comments);
    return (
      <View>
        <View style={{ width: 'auto', height: navigationBarHeight, backgroundColor: '#2BA0F3' }}>
          <NavigationBar
            hasHistory
            styleName="clear"
            navigateBack={this.props.navigation.goBack}
            title={<TextCustom type={'labelText'} numberOfLines={1}>{title}</TextCustom>}
          />
        </View>
      <ScrollView style={{marginBottom: navigationBarHeight}}>
        <CardSection>
          <View style={{ flexDirection: 'column', flex: 4 }}>
            <PostHeader
              post={post}
              id={post.id}
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

      </View>
    );
  }
}

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
