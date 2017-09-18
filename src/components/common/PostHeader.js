import React from 'react';
import { View } from 'react-native';
import { TextCustom } from './TextCustom';
import { PostIcon } from './PostIcon';

const styles = {
  titleTextStyle: {
    marginLeft: 15,
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
    margin: 10,
  },
  starViewWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    margin: 10,
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

const PostHeader = ({ messageType, title, isFavorite }) => {
  return (
    <View style={styles.headerViewStyle}>
      <View style={styles.textViewWrapper}>
        {PostIcon.getPostIcon(messageType)}
        <TextCustom
          type={'t1_light'}
          style={styles.titleTextStyle}
          numberOfLines={3}
        >
          {title}
        </TextCustom>
      </View>
      <View style={styles.starViewWrapper}>
        {PostIcon.getStart(isFavorite)}
      </View>
    </View>
  );
};

export { PostHeader };
