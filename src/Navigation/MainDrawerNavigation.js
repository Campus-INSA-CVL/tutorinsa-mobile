import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Posts from '../Screens/PostsScreen';
import Profile from '../Screens/ProfileScreen';

const Drawer = createDrawerNavigator();

class MainDrawerNavigation extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Posts">
          <Drawer.Screen
            name="Posts"
            options={{
              title: "Posts",
              headerShown: true,
            }}
            component={Posts}
          />
          <Drawer.Screen
            name="Profile"
            options={{
              title: "Mon profil",
              headerShown: true,
            }}
            component={Profile}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default MainDrawerNavigation
