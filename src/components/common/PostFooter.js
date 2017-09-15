import React from 'react';
import Moment from 'moment';
import { View, Text } from 'react-native';
import { TextCustom } from './TextCustom';
import { PostIcon } from './PostIcon';

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
    borderWidth: 1,
  },
  authorView: {
    flex: 1,
    borderWidth: 1,
  },
  dateViewWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderWidth: 1,
  },
};

const PostFooter = ({ author, createDate, commentsCount, showComments }) => {
  return (
    <View style={styles.authorViewWrapper}>
      <View style={styles.authorView}>
        <Text>{author ? author.first_name : ''} {author ? author.last_name : ''}</Text>
      </View>
      <View style={styles.dateViewWrapper}>
        <Text>{Moment(createDate).format('kk:mm DD MMM YYYY')}</Text>
        {getComments(commentsCount, showComments)}
      </View>
    </View>
  );
};

const getComments = (commentsCount, showComments) => {
  if (showComments)
  return (
    <View style={styles.dateViewWrapper}>
      {PostIcon.getCommentsIcon()}
      <TextCustom style={{ borderWidth: 1 }}>
        {commentsCount}
      </TextCustom>
    </View>
  );
};

export { PostFooter };
