import { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getToken } from '../services/StorageHelper';
import { setTokenToState, startNetworkListener } from '../actions';
import * as serviceREST from '../services/serviceREST';

class StartScreen extends Component {
  componentWillMount() {
    this.props.dispatch(startNetworkListener());
    // Rename to getTokenfrom Storrage
    getToken()
    .then((data) => {
      if (data === null) {
        Actions.login();
      } else {
        // SET USER TO REDUX
        this.props.dispatch(setTokenToState(data));
        serviceREST.setTokenToHeaders(data);
        Actions.postsList();
      }
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  render() {
    return (
      null
    );
  }
}

const mapStateToProps = state => ({
  // postsList: state.postsList.results,
  // postsAreLoading: state.postsList.postsAreLoading,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  // getPosts: (url) => { dispatch(getPosts(url)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);

