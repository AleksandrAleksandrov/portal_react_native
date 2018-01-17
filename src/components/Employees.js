import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { NavigationBar } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import DrawerLayout from 'react-native-drawer-layout';

import DrawerView from './common/DrawerView';
import { TextCustom, SmallSpinner, Spinner } from './common';
import { navigationBarHeight } from '../constants/StyleConstants';
import { color } from '../constants/color';
import {
  fetchUsersAction,
  fetchMoreUsersAction,
} from '../actions';
import UserItem from './UserItem';

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
  postsListStyle: {
    marginBottom: navigationBarHeight,
  },
};

class Employees extends Component {
  constructor() {
    super();
    this.state = { numOfColumn: 2 };
  }

  componentDidMount() {
    this.props.fetchUsersAction();
  }

  onLayout = (event) => {
    const num = parseInt(event.nativeEvent.layout.width / 160, 10);
    this.setState({ numOfColumn: num });
  }

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

  paginate = () => {
    const {
      nextPage,
      usersAreLoading,
      loadingMoreUsersInProgress,
      fetchMoreUsersAction,
    } = this.props;

    if ((!usersAreLoading && nextPage !== null) && !loadingMoreUsersInProgress) {
      fetchMoreUsersAction(nextPage);
    }
  }

  renderLastRow = () => {
    const { loadingMoreUsersInProgress, users: { length } } = this.props;

    if (!loadingMoreUsersInProgress || !length) {
      return null;
    }
    return (<SmallSpinner size={'small'} />);
  }

  render() {
    const { users, usersAreLoading, loadingMoreUsersInProgress } = this.props;
    const { postsListStyle } = styles;

    if (usersAreLoading & users.length === 0) {
      return (<Spinner size={'large'} />);
    }

    return (
      <DrawerLayout
        drawerWidth={300}
        ref={(_drawer) => this.drawer = _drawer}
        renderNavigationView={() => this.nav}
      >
        <View onLayout={event => this.onLayout(event)}>
          {this.navigationBar('Сотрудники')}
          <FlatList
            style={postsListStyle}
            data={users}
            numColumns={this.state.numOfColumn}
            renderItem={({ item }) => <UserItem user={item} />}
            keyExtractor={item => item.id}
            onEndReached={() => this.paginate()}
            key={this.state.numOfColumn}
            ListFooterComponent={() => this.renderLastRow()}
          />
        </View>
      </DrawerLayout>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  nextPage: state.users.nextPage,
  usersAreLoading: state.users.usersAreLoading,
  loadingMoreUsersInProgress: state.users.loadingMoreUsersInProgress,
});

const mapDispatchToProps = dispatch => ({
  fetchUsersAction: () => { dispatch(fetchUsersAction()); },
  fetchMoreUsersAction: (url) => { dispatch(fetchMoreUsersAction(url)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
