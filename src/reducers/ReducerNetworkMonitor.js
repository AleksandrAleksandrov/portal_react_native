import {
  SET_NETWORK_IS_CONNECTED,
} from '../actions/types';

const INITIAL_STATE = {
  networkIsConnected: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NETWORK_IS_CONNECTED:
      return {
        ...state,
        networkIsConnected: action.payload,
      };
    default:
      return state;
  }
};
