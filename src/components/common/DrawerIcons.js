import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { color } from '../../constants/color';
import {
  DRAWER_NEWS,
  DRAWER_EMPLOYEES,
  DRAWER_BIRTHDAYS,
  DRAWER_GALLERY,
  DRAWER_VACATIONS,
  DRAWER_TRUST_LETTER,
  DRAWER_ABOUT_COMPANY,
  DRAWER_EXIT,
} from '../../Constants';

const styles = {
  iconStyle: {
    margin: 10,
    fontSize: 24,
    color: color.drawerIconColor,
  },
};

export const getDrawerMenuIcon = (itemType) => {
  let name = '';
  switch (itemType) {
    case DRAWER_NEWS:
      name = 'newspaper-o';
      break;
    case DRAWER_EMPLOYEES:
      name = 'address-card-o';
      break;
    case DRAWER_BIRTHDAYS:
      name = 'birthday-cake';
      break;
    case DRAWER_GALLERY:
      name = 'picture-o';
      break;
    case DRAWER_VACATIONS:
      name = 'sun-o';
      break;
    case DRAWER_TRUST_LETTER:
      name = 'envelope';
      break;
    case DRAWER_ABOUT_COMPANY:
      name = 'info-circle';
      break;
    case DRAWER_EXIT:
      name = 'sign-out';
      break;
    default:
      name = 'question-circle-o';
      break;
  }
  return (<Icon name={name} style={styles.iconStyle} />);
};
