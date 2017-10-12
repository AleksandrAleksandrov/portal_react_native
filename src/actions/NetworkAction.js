import { NetInfo } from 'react-native';
import {
  SET_NETWORK_IS_CONNECTED,
} from '../actions/types';

const setNetworkIsConnected = isConnected => ({
  type: SET_NETWORK_IS_CONNECTED,
  payload: isConnected,
});

export const startNetworkListener = () => (dispatch) => {
  function handleFirstConnectivityChange(isConnected) {
    dispatch(setNetworkIsConnected(isConnected));
  }
  NetInfo.isConnected.addEventListener('change', handleFirstConnectivityChange);
};
