import React, { Component } from 'react';
import { FlatList, View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getPosts, getMorePosts, refreshPosts, showFilterBy } from '../actions';
import { NavigationBar, DropDownMenu } from '@shoutem/ui';
import PostItem from './PostItem';
import { Spinner } from './common/Spinner';
import { DialogFilterBy } from "./common/DialogFilterBy";
import { SmallSpinner } from './common/SmallSpinner';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {hideFilterBy} from "../actions/PostsActions";

const styles = {
  iconStyle: {
    fontSize: 24,
    margin: 10,
  },
};

class PostsListForm extends Component {

  componentWillMount() {
    this.getPosts();
  }

  getPosts() {
    const { getPosts } = this.props;
    getPosts(null);
  }

  getMorePosts() {
    const { getMorePosts } = this.props;
    getMorePosts();
  }

  renderLastRow = () => {
    if (!this.props.loadingMorePostsInProgress || !this.props.postsList.length) {
      return null;
    }
    
    return (<SmallSpinner size="small" />);
  };

  paginate = () => {
    if (!this.props.postsAreLoading && this.props.nextPage != null && !this.props.loadingMorePostsInProgress) {
      this.props.getMorePosts(this.props.nextPage);
    }
  };

  _onRefresh() {
    this.props.dispatch(refreshPosts());
  }

  onPressWriteNewPost() {

  }

  onPressFilterByFavourite() {

  }

  onPressFilter() {
    this.props.dispatch(showFilterBy());
  }

  onDecline() {
    this.props.dispatch(hideFilterBy());
  }

  render() {
    const { postsList, postsAreLoading, refreshing, showSortBy, sortByAdvert, sortByPoll, sortByEvent } = this.props;
    const { iconStyle } = styles;

    if (postsAreLoading) {
      return <Spinner size="large" />;
    }

    return (
      <View>
        <FlatList
          style={{marginTop: 60}}
          data={postsList ? postsList : []}
          renderItem={({item}) => <PostItem post={item} />}
          keyExtractor={item => item.id}
          onEndReached={this.paginate}
          ListFooterComponent={this.renderLastRow}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />
        <DialogFilterBy
          visible={showSortBy}
          dispatch={this.props.dispatch}
          onDecline={this.onDecline.bind(this)}
          sortByAdvert={sortByAdvert}
          sortByPoll={sortByPoll}
          sortByEvent={sortByEvent}
        />
        <NavigationBar
          title={'Portal'}
          rightComponent={
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={this.onPressWriteNewPost}>
                <Icon name="plus-circle" style={iconStyle}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressFilterByFavourite}>
                <Icon name="star-o" style={iconStyle}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressFilter.bind(this)}>
                <Icon name="filter" style={iconStyle}/>
              </TouchableOpacity>
            </View>}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  postsList: state.postsList.results,
  nextPage: state.postsList.nextPage,
  postsAreLoading: state.postsList.postsAreLoading,
  loadingMorePostsInProgress: state.postsList.loadingMorePostsInProgress,
  refreshing: state.postsList.refreshing,
  showSortBy: state.postsList.showSortBy,
  sortByAdvert: state.postsList.sortByAdvert,
  sortByPoll: state.postsList.sortByPoll,
  sortByEvent: state.postsList.sortByEvent,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  getPosts: (url) => { dispatch(getPosts(url)); },
  getMorePosts: (url) => { dispatch(getMorePosts(url)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListForm);
