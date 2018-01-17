import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import { NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import DrawerLayout from 'react-native-drawer-layout';

import DrawerView from './common/DrawerView';
import { TextCustom } from './common';
import { navigationBarHeight } from '../constants/StyleConstants';
import { color } from '../constants/color';

const styles = {
  navigationBarWrapper: {
    width: 'auto',
    height: navigationBarHeight,
    backgroundColor: color.primaryDark,
  },
  iconStyle: {
    fontSize: 24,
    margin: 10,
    color: color.white,
  },
};

class Employees extends Component {

  nav = (
    <DrawerView />
  );

  openDrawer = () => {
    this.drawer.openDrawer();
  }

  navigationBar = (title) => {
    const { iconStyle } = styles;

    return (
      <View style={styles.navigationBarWrapper}>
        <NavigationBar
          hasHistory
          styleName={'clear'}
          navigateBack={this.props.navigation.goBack}
          title={
            <TextCustom
              type={'labelText'}
              numberOfLines={1}
            >
              {title}
            </TextCustom>
          }
          leftComponent={
            <TouchableOpacity onPress={() => this.openDrawer()}>
              <Icon
                name={'bars'}
                style={iconStyle}
              />
            </TouchableOpacity>
          }
        />
      </View>
    );
  };

  render() {
    return (
      <DrawerLayout
        drawerWidth={300}
        ref={(_drawer) => this.drawer = _drawer}
        renderNavigationView={() => this.nav}
      >
        <View>
          {this.navigationBar('Сотрудники')}
          <TextCustom>Employees</TextCustom>
        </View>
      </DrawerLayout>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
