import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const styles = {
  iconStyle: {
    fontSize: 32,
  },
  startStyle: {
    fontSize: 32,
  },
  commmentStyle: {
    fontSize: 15,
  },
};

const getPostIcon = (messageType) => {
  let name = '';
  switch (messageType) {
    case 'advert':
      name = 'bullhorn';
      break;
    case 'event':
      name = 'users';
      break;
    case 'poll':
      name = 'tasks';
      break;
    case 'remind':
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
  return <Icon name="comments-o" style={styles.commmentStyle} />;
};

const PostIcon = {
  getPostIcon,
  getStart,
  getCommentsIcon,
};

export { PostIcon };
