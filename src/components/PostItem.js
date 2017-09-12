import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class PostItem extends Component {

  render() {
    const { title } = this.props.post.message;
    // console.warn(title);
    return (
      <View>
        <CardSection>
          <Text>{title}</Text>
        </CardSection>
      </View>
    );
  }
}

export default PostItem;
