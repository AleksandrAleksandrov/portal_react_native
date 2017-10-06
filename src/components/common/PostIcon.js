import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  ADVERT,
  POLL,
  EVENT,
  REMIND,
} from '../../Constants';

const styles = {
  iconStyle: {
    fontSize: 32,
  },
  startStyle: {
    fontSize: 32,
  },
  commentStyle: {
    fontSize: 15,
  },
};

const getPostIcon = (messageType) => {
  let name = '';
  switch (messageType) {
    case ADVERT:
      name = 'bullhorn';
      break;
    case EVENT:
      name = 'users';
      break;
    case POLL:
      name = 'tasks';
      break;
    case REMIND:
      name = 'calendar';
      break;
    default:
      name = 'user';
      break;
  }
  return (<Icon name={name} style={styles.iconStyle} />);
};

const getStart = (isFavorite) => {
  if (isFavorite) {
    return <Icon name="star" style={styles.startStyle} />;
  }

  return <Icon name="star-o" style={styles.startStyle} />;
};

const getCommentsIcon = () => {
  return <Icon name="comments-o" style={styles.commentStyle} />;
};

const PostIcon = {
  getPostIcon,
  getStart,
  getCommentsIcon,
};

export { PostIcon };
