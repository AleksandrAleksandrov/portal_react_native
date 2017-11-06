import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, FlatList, TextInput, Dimensions, Keyboard, Image, Alert, StatusBar } from 'react-native';
import _ from 'lodash';
import Moment from 'moment';
import { NavigationBar } from '@shoutem/ui';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { MKButton } from 'react-native-material-kit';
import { CardSection, PostFooter, TextCustom } from './common';
import PostHeader from './common/PostHeader';
import { CommentItem } from './CommentItem';
import DialogWhoVoted from './common/DialogWhoVoted';
import PollItem from './PollItem';
import {
  POLL,
  EVENT,
} from '../Constants';
import { color } from '../constants/color';
import { navigationBarHeight } from '../constants/StyleConstants';
import {
  resetError,
  getComments,
  setAsRead,
  showWhoVotedDialog,
  sendCommentAction,
  showAllCommentsAction,
} from '../actions';

const commentCount = 10;

const sendIcon = require('../images/ic_send_white_24dp_2x.png');

const { width, height } = Dimensions.get('window');

const styles = {
  rootViewStyle: {
    backgroundColor: 'white',
    height,
  },
  navigationBarWrapper: {
    width: 'auto',
    height: navigationBarHeight,
    backgroundColor: color.primaryDark,
  },
  bodyView: {
    flexDirection: 'column',
    flex: 4,
  },
  textStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  commentWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: StatusBar.currentHeight,
  },
  sendButton: {
    fontSize: 32,
    color: color.primaryDark,
    alignSelf: 'flex-end',
  },
  sendMaterialButton: {
    width: 75,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  sendIconStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  commentInput: {
    left: 0,
    right: 0,
    height: 45,
    marginLeft: 5,
    flex: 1,
    alignSelf: 'flex-start',
  },
  showMoreCommentButton: {
    height: 35,
    margin: 5,
    justifyContent: 'center',
  },
  showMoreCommentText: {
    textAlign: 'center',
  },
};

let numberOfVotes;

const SendCommentButton = MKButton.coloredButton()
  .withBackgroundColor(color.materialGreen)
  .build();

const ShowMoreCommentsButton = MKButton.button()
  .build();

class PostForm extends Component {
  componentWillMount() {
    this.getComments();
    this.setAsRead();
    numberOfVotes = 0;
    if (this.props.post.message.options) {
      this.props.post.message.options.forEach((objectKey, index) => {
        numberOfVotes += this.props.post.message.options[index].votes;
      });
    }
    this.state = { comment: '' };
  }

  setAsRead() {
    const { post } = this.props;
    if ((post.message.message_type === POLL | post.message.message_type === EVENT) & post.my_vote === null) {
      return;
    }

    this.props.setAsRead(this.props.post.id);
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

  navigationBar = (title) => {
    return (
      <View style={styles.navigationBarWrapper}>
        <NavigationBar
          hasHistory
          styleName="clear"
          navigateBack={this.props.navigation.goBack}
          title={<TextCustom type={'labelText'} numberOfLines={1}>{title}</TextCustom>}
        />
      </View>
    );
  };

  pollItem = (item, messageId, index) => {
    return (
      <PollItem
        option={item}
        totalVotes={numberOfVotes}
        messageId={messageId}
        index={index}
      />
    );
  }

  renderPollList = (options, messageId) => {
    return (
      <FlatList
        // style={postsListStyle}
        data={options ? options : []}
        renderItem={({ item, index }) => this.pollItem(item, messageId, index)}
        keyExtractor={item => item.id}
      />
    );
  }

  pollEndDate = (date) => {
    const { textStyle } = styles;
    return (
      <TextCustom style={textStyle} type={'t2_regular'}>
        Голосование открыто до {Moment(date).format('DD.MM.YYYY')} вкючительно.
      </TextCustom>
    );
  };

  renderPollInfo = (type, contentObject) => {
    const { textStyle } = styles;
    if (type === EVENT) {
      return (
        <View>
          <TextCustom style={textStyle} type={'t2_regular'}>
            Место проведения: {contentObject.location}
          </TextCustom>
          <TextCustom style={textStyle} type={'t2_regular'}>
            Время проведения: {Moment(contentObject.date_time).format('DD.MM.YYYY kk:mm')}
          </TextCustom>
          {this.pollEndDate(contentObject.poll_end_date)}
        </View>
      );
    } else if (type === POLL) {
      return (
        <View>
          {this.pollEndDate(contentObject.poll_end_date)}
        </View>
      );
    }
  };

  onCommentChanged = (comment) => {
    this.setState({ comment });
  };

  sendMessage = (messageId, text) => {
    this.props.sendCommentAction(messageId, text, () => {
      this.setState({ comment: '' });
      Keyboard.dismiss();
    });
  };

  getSendButton = () => {
    const { post, sendingCommentInProgress } = this.props;
    const { sendMaterialButton, sendIconStyle } = styles;

    if (this.state.comment.length === 0) {
      return null;
    }
    return (
      <SendCommentButton
        style={sendMaterialButton}
        enabled={!sendingCommentInProgress}
        onPress={() => this.sendMessage(post.message.id, this.state.comment)}
      >
        <Image
          style={sendIconStyle}
          source={sendIcon}
        />
      </SendCommentButton>
    );
  };

  showAlert = () => {
    const { error } = this.props;

    if (error === null) {
      return null;
    }
    return (
      Alert.alert(
        null,
        error,
        [{ text: 'OK', onPress: () => resetError() }],
        { cancelable: false },
      )
    );
  };

  moreCommentButton = () => {
    const { post, isShowAllComments } = this.props;
    const { showMoreCommentButton, showMoreCommentText } = styles;

    if (post.message.comments_count <= commentCount || isShowAllComments) {
      return null;
    }

    return (
      <ShowMoreCommentsButton
        style={showMoreCommentButton}
        onPress={() => this.props.showAllCommentsAction()}
      >
        <TextCustom
          type={'t3'}
          style={showMoreCommentText}
        >
          ПОКАЗАТЬ ЕЩЕ {post.message.comments_count - commentCount} КОММЕНТАРИЯ ИЗ {post.message.comments_count}
        </TextCustom>
      </ShowMoreCommentsButton>
    );
  };

  getCommentArray = (comments) => {
    const { isShowAllComments } = this.props;

    if (!isShowAllComments && comments.length > commentCount) {
      return (
        _.chunk(comments, commentCount)[0]
      );
    }

    return (comments);
  };

  render() {
    const { post, comments, voteOptions, showWhoVotedDialog, showWhoVoted } = this.props;
    const {
      title,
      text,
      create_dt,
      author,
      comments_count,
      message_type,
      content_object,
      options
    } = post.message; // able to crash
    const {
      rootViewStyle,
      commentInput,
      commentWrapper,
    } = styles;

    return (
      <View style={rootViewStyle}>
        {this.showAlert}
        {this.navigationBar(title)}
        <ScrollView >
          <CardSection>
            <View style={styles.bodyView}>
              <PostHeader
                post={post}
                id={post.id}
              />
              <TextCustom type={'t2_regular'}>{text}</TextCustom>
              {this.renderPollInfo(message_type, content_object)}
              {this.renderPollList(voteOptions ? voteOptions : options, post.message.id)}
              <PostFooter
                author={author}
                createDate={create_dt}
                commentsCount={comments_count}
              />
            </View>
          </CardSection>
          <View>
            {this.moreCommentButton()}
          </View>
          <CardSection>
            <FlatList
              data={comments ? this.getCommentArray(comments) : []}
              renderItem={({ item }) => <CommentItem comment={item} />}
              keyExtractor={item => item.id}
            />
          </CardSection>
          <DialogWhoVoted
            onDecline={() => showWhoVotedDialog(!showWhoVoted)}
          />
        </ScrollView>
        <View style={[commentWrapper, { width }]}>
          <TextInput
            style={commentInput}
            placeholder={'Текст комментария'}
            onChangeText={textInputValue => this.onCommentChanged(textInputValue)}
            value={this.state.comment}
          />
          {this.getSendButton()}
        </View>
        <KeyboardSpacer />
      </View>
    );
  }
}

const mapStateToProps = (state, myProps) => ({
  post: _.find(state.postsList.results, (o) => { return o.id === myProps.id }),
  comments: state.postsList.comments,
  loadingCommentsInProgress: state.postsList.loadingCommentsInProgress,
  voteOptions: state.postsList.voteOptions,
  showWhoVoted: state.postsList.showWhoVoted,
  sendingCommentInProgress: state.postsList.sendingCommentInProgress,
  isShowAllComments: state.postsList.isShowAllComments,
  error: state.postsList.error,
});

const mapDispatchToProps = dispatch => ({
  resetError: () => { dispatch(resetError()); },
  getComments: (messageId) => { dispatch(getComments(messageId)); },
  showWhoVotedDialog: (isShow) => { dispatch(showWhoVotedDialog(isShow)); },
  setAsRead: (postId) => { dispatch(setAsRead(postId)); },
  showAllCommentsAction: () => { dispatch(showAllCommentsAction()); },
  sendCommentAction: (messageId, text, callback) => { dispatch(sendCommentAction(messageId, text, callback)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
