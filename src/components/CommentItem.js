import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import { CardSection, PostIcon, TextCustom, PostFooter, Avatar } from './common';
import Moment from 'moment';

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
    flex: 2,
  },
  dateViewWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
};

class CommentItem extends Component {

  render() {
    const { text, create_dt } = this.props.comment;
    const { first_name, last_name, photo_thumbnail, photo } = this.props.comment.user;
    return (
        <CardSection >
          <Avatar
            thumbnail={photo_thumbnail}
            photo={photo}
            size={80}
          />
          <View style={{ flexDirection: 'column', flex: 1, }}>
          <View style={styles.starViewWrapper}>
            <View style={styles.authorView}>
              <TextCustom type={'name'}>{first_name} {last_name}</TextCustom>
            </View>
            <View style={styles.dateViewWrapper}>
              <TextCustom type={'date'} numberOfLines={1}>{Moment(create_dt).format('kk:mm DD MMM YYYY')}</TextCustom>
            </View>
          </View>
            <View>
              <TextCustom type={'body'} >{text}</TextCustom>
            </View>
          </View>
        </CardSection>
    );
  }
}

export { CommentItem };
