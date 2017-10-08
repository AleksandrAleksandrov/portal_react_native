import React from 'react';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import { View, Text, CheckBox } from 'react-native';
import { color} from "../../constants/color";

const Toolbar = ({ title }) => {

  return (
    <View style={{padding: 20, flexDirection: 'row', backgroundColor: color.primary}}>
      <View style={{flex: 1, alignSelf: 'center'}}><Text>{title}</Text></View>
      <Menu onSelect={(value) => alert(`User selected the number ${value}`)}>
        <MenuTrigger>
          <Text style={{fontSize: 20}}>&#8942;</Text>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption value={1}>

            <Text>One</Text>

          </MenuOption>
          <MenuOption value={2}>
            <Text>Two</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export { Toolbar };