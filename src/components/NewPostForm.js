import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { CardSection, TextCustom } from './common';
import { connect } from 'react-redux';
import { NavigationBar } from '@shoutem/ui';
import { color } from '../constants/color';

const navigationBarHeight = 70;

class PostForm extends Component {

  render() {
    return (
      <View>
        <View style={{ width: 'auto', height: navigationBarHeight, backgroundColor: color.primaryDark, }}>
          <NavigationBar
            hasHistory
            styleName="clear"
            navigateBack={this.props.navigation.goBack}
            title={<TextCustom type={'labelText'} numberOfLines={1}> new post</TextCustom>}
          />
        </View>
        <ScrollView style={{marginBottom: navigationBarHeight}}>
          <CardSection>
            <TextCustom type={'t1'}> new post </TextCustom>
          </CardSection>
        </ScrollView>

      </View>
    );
  }
}

// const mapStateToProps = (state, myProps) => ({
//
//   post: _.find(state.postsList.results, (o) => { return o.id === myProps.id }),
//   comments: state.postsList.comments,
//   loadingCommentsInProgress: state.postsList.loadingCommentsInProgress,
//
// });

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(null, mapDispatchToProps)(PostForm);
