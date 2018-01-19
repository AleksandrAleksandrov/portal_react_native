import React, { Component } from 'react';
import { Dimensions, Platform, View, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import ProgressiveImage from 'react-native-progressive-image';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { NavigationBar } from '@shoutem/ui';

import { color } from '../constants/color';
import {
  DEFAULT_PHOTO,
} from '../ApiConstants';
import { InfoWithHint } from './common/InfoWithHint';
import { KnowBlock } from './common/KnowBlock';

const { width } = Dimensions.get('window');

const styles = {
  image: {
    width,
    height: 250,
  },
};

class ProfileForm extends Component {
  componentWillMount() {
    StatusBar.setBarStyle('light-content');

    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.2)', true);
    }
  }
  getPicture = (url) => {
    if (url != null) {
      return url;
    }
    return DEFAULT_PHOTO;
  }

  renderContent = () => {
    const { user } = this.props;
    return (
      <View style={{ backgroundColor: 'white' }}>
        <InfoWithHint
          hint={'Номер телефона'}
          text={user.phone_number}
        />
        <InfoWithHint
          hint={'email'}
          text={user.email}
        />
        <InfoWithHint
          hint={'Slack'}
          text={user.slack}
        />
        <KnowBlock skills={user.skills_know} />
      </View>
    );
  };

  renderNavBar = () => {
    const { user } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Text style={{ textAlign: 'center', color: '#FFF' }}>{user.first_name} {user.last_name}</Text>
      </View>
    );
  };

  render() {
    const {
      user,
      user: { photo_thumbnail, photo },
    } = this.props;
    const { image } = styles;
    return (
      <CollapsibleToolbar
        renderContent={this.renderContent}
        renderNavBar={this.renderNavBar}
        imageSource={this.getPicture(photo)}
        collapsedNavBarBackgroundColor={color.primaryDark}
        translucentStatusBar={Platform.Version >= 21}
        toolBarHeight={300}
      />

    );
  }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
