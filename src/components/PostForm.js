import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, FlatList } from 'react-native';
import _ from 'lodash';
import Moment from 'moment';
import { NavigationBar } from '@shoutem/ui';
import { CardSection, PostFooter, TextCustom } from './common';
import PostHeader from './common/PostHeader';
import { CommentItem } from './CommentItem';
import PollItem from './PollItem';
import {
  POLL,
  EVENT,
} from '../Constants';
import { color } from '../constants/color';
import { getComments, setAsRead } from '../actions';
import { navigationBarHeight } from '../constants/StyleConstants';

const styles = {
  navigationBarWrapper: {
    width: 'auto',
    height: navigationBarHeight,
    backgroundColor: color.primary,
  },
  bodyView: {
    flexDirection: 'column',
    flex: 4,
  },
  textStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
};

let numberOfVotes;

class PostForm extends Component {
  componentWillMount() {
    this.getComments();
    this.setAsRead();
  }

  componentDidMount() {
    numberOfVotes = 0;
    if (this.props.post.message.options) {
      this.props.post.message.options.forEach((objectKey, index) => {
        numberOfVotes += this.props.post.message.options[index].votes;
      });
    }
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

  renderPollList = (options) => {
    // const { postsList, refreshing } = this.props;
    // const { postsListStyle } = styles;
    return (
      <FlatList
        // style={postsListStyle}
        data={options ? options : []}
        renderItem={({ item }) => <PollItem option={item} totalVotes={numberOfVotes} />}
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

  render() {
    const { post, comments, voteOptions } = this.props;
    const { title, text, create_dt, author, comments_count, message_type, content_object, options } = post.message; // able to crash

    return (
      <View>
        {this.navigationBar(title)}
        <ScrollView style={{ marginBottom: navigationBarHeight }}>
          <CardSection>
            <View style={styles.bodyView}>
              <PostHeader
                post={post}
                id={post.id}
              />
              <TextCustom type={'t2_regular'}>{text}</TextCustom>
              {this.renderPollInfo(message_type, content_object)}
              {this.renderPollList(voteOptions ? voteOptions : options)}
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
              renderItem={({ item }) => <CommentItem comment={item} />}
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
  voteOptions: state.postsList.voteOptions,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  getComments: (messageId) => { dispatch(getComments(messageId)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
