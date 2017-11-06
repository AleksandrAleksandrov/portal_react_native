import React from 'react';
import Moment from 'moment';
import { View } from 'react-native';
import { TextCustom } from './TextCustom';
import { CustomIcons } from './CustomIcons';

const styles = {
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
        <TextCustom type={'date'}>{author ? author.first_name : ''} {author ? author.last_name : ''}</TextCustom>
      </View>
      <View style={styles.dateViewWrapper}>
        <TextCustom type={'date'} >{Moment(createDate).format('kk:mm DD MMM YYYY')}</TextCustom>
        {getComments(commentsCount, showComments)}
      </View>
    </View>
  );
};

export { PostFooter };
