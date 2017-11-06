import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import Moment from 'moment';
import { CardSection, PostIcon, TextCustom, PostFooter, Avatar } from './common';

const styles = {
  avatarStyle: {
    marginTop: 5,
    marginBottom: 5,
    // borderWidth: 1,
  },
  titleTextStyle: {
    marginTop: 5,
    flex: 1,
    // borderWidth: 1,
  },
  bodyTextStyle: {
    fontSize: 32,
    margin: 10,
  },
  rootViewStyle: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 10,
    // borderWidth: 1,
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
    flex: 2,
    // borderWidth: 1,
  },
  authorView: {
    flex: 1,
    // borderWidth: 1,
  },
  dateViewWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    // borderWidth: 1,
  },
  dateStyle: {
    textAlign: 'right',
  },
  bodyWrapper: {
    flex: 3,
    // borderWidth: 1,
  },
};

class CommentItem extends Component {

  render() {
    const { text, create_dt } = this.props.comment;
    const { first_name, last_name, photo_thumbnail, photo } = this.props.comment.user;
    const { avatarStyle, starViewWrapper, authorView, dateViewWrapper, rootViewStyle, dateStyle, bodyWrapper } = styles;
    return (
      <CardSection >
        <View style={avatarStyle}>
          <Avatar
            thumbnail={photo_thumbnail}
            photo={photo}
            size={80}
          />
        </View>
        <View style={rootViewStyle}>
          <View style={starViewWrapper}>
            <View style={authorView}>
              <TextCustom type={'name'}>{first_name} {last_name}</TextCustom>
            </View>
            <View style={dateViewWrapper}>
              <TextCustom style={dateStyle} type={'date'} numberOfLines={2}>{Moment(create_dt).format('kk:mm DD MMM YYYY')}</TextCustom>
            </View>
          </View>
          <View style={bodyWrapper}>
            <TextCustom type={'body'} >{text}</TextCustom>
          </View>
        </View>
      </CardSection>
    );
  }
}

export { CommentItem };
