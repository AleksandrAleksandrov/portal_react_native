import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const styles = {
  spinnerStyle: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const SmallSpinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

export { SmallSpinner };
