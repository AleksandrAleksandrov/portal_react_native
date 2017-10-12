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
  navBarIcon: {
    fontSize: 24,
    margin: 10,
    color: 'white',
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

const getNavBarStar = (isFavorite) => {
  if (isFavorite) {
    return <Icon name="star" style={styles.navBarIcon} />;
  }

  return <Icon name="star-o" style={styles.navBarIcon} />;
};

const CustomIcons = {
  getPostIcon,
  getStart,
  getCommentsIcon,
  getNavBarStar,
};

export { CustomIcons };
