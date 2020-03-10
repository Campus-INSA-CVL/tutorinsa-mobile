import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Posts from '../Screens/PostsScreen'

const Drawer = createDrawerNavigator();

class MainDrawerNavigation extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Posts">
          <Drawer.Screen name="Posts" component={Posts} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default MainDrawerNavigation
