import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { SlideFromRightTransition } from './Transitions';

import Posts from '../Screens/PostsScreen';
import PostDetails from '../Screens/PostDetailsScreen';
import Profile from '../Screens/ProfileScreen';

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


const Drawer = createDrawerNavigator();

class MainDrawerNavigation extends React.Component {
  render() {
    const { theme } = this.props;

    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Posts"
          drawerContent={(props) => {return (
            <DrawerContentScrollView {...props} style={{backgroundColor: theme.background}}>
              <DrawerItemList
                {...props}
                labelStyle={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: theme.title
                }}
              />
            </DrawerContentScrollView>
          )}}
          minSwipeDistance={50}
        >
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
