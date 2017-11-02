import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import { Avatar } from './common/';

const styles = {
  avatar: {
    margin: 5,
  },
};

class PollResultItem extends Component {
  render() {
    const { user } = this.props;
    const { avatar } = styles;
    return (
      <TouchableOpacity>
        <View style={avatar} >
          <Avatar
            thumbnail={user.user.photo_thumbnail}
            photo={user.user.photo}
            size={60}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  fetchingVotedPeopleInProgress: state.postsList.fetchingVotedPeopleInProgress,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(PollResultItem);
