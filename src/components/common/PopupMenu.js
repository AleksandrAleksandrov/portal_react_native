import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';



const {
  View,
  UIManager,
  findNodeHandle,
  TouchableOpacity,
} = React;

const ICON_SIZE = 24;

class PopupMenu extends React.Component {

  handleShowPopupError = () => {
    // show error here
  };



  render() {
    return (
      <View>


          <Icon
            name="android-more-vertical"
            size={ICON_SIZE}
            color={'grey'}
            ref="menu"
          />

      </View>
    );
  }
}



export default PopupMenu;