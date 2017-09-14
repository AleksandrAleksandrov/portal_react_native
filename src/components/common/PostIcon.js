import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const styles = {
  iconStyle: {
    fontSize: 32,
    margin: 10,
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

const PostIcon = {
  getPostIcon,
};

export { PostIcon };
