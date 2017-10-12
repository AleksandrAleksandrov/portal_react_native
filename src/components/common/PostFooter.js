import React from 'react';
import Moment from 'moment';
import { View } from 'react-native';
import { TextCustom } from './TextCustom';
import { CustomIcons } from './CustomIcons';

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

const getComments = (commentsCount, showComments) => {
  if (showComments) {
    return (
      <View style={styles.dateViewWrapper}>
        {CustomIcons.getCommentsIcon()}
        <TextCustom type={'t3_light'} style={{ marginLeft: 10 }}>
          {commentsCount}
        </TextCustom>
      </View>
    );
  }
};

const PostFooter = ({ author, createDate, commentsCount, showComments }) => {
  return (
    <View style={styles.authorViewWrapper}>
      <View style={styles.authorView}>
        <TextCustom type={'t3_light'}>{author ? author.first_name : ''} {author ? author.last_name : ''}</TextCustom>
      </View>
      <View style={styles.dateViewWrapper}>
        <TextCustom type={'t3_light'}>{Moment(createDate).format('kk:mm DD MMM YYYY')}</TextCustom>
        {getComments(commentsCount, showComments)}
      </View>
    </View>
  );
};

export { PostFooter };
