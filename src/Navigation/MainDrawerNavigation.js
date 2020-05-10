import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { SlideFromRightTransition } from './Transitions';

import Posts from '../Screens/PostsScreen';
import PostDetails from '../Screens/PostDetailsScreen';
import Profile from '../Screens/ProfileScreen';

const Drawer = createDrawerNavigator();

const PostsStack = createStackNavigator();
function PostsNavigator() {
  return (
    <PostsStack.Navigator
      initialRouteName="Posts"
    >
      <PostsStack.Screen
        name="Posts"
        component={Posts}
        options={{
          title: 'Posts',
          headerShown: false
        }}
      />
      <PostsStack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{
          headerShown: false,
          gestureEnabled: true,
          ...SlideFromRightTransition,
        }}
      />
    </PostsStack.Navigator>
  );
}

class MainDrawerNavigation extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Posts">
          <Drawer.Screen
            name="Posts"
            options={{
              title: "Posts",
            }}
            component={PostsNavigator}
          />
          <Drawer.Screen
            name="Profile"
            options={{
              title: "Mon profil",
            }}
            component={Profile}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default MainDrawerNavigation
