import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { TextCustom } from './common';

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

class WeekBirthdayItem extends Component {
  render() {
    const { user } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.onPostPress}>
        <View>
          <View style={styles.rootViewStyle}>
            <TextCustom type={'t2_regular'} numberOfLines={4} >{user.first_name}</TextCustom>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default WeekBirthdayItem;
