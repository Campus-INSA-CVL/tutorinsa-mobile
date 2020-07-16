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
import EditInformation from '../Screens/EditInformationScreen';
import EditFavoriteSubjects from '../Screens/EditFavoriteSubjectsScreen';
import EditDifficultSubjects from '../Screens/EditDifficultSubjectsScreen';

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


const ProfileStack = createStackNavigator();
function ProfileNavigator() {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
        }}
      />
      <ProfileStack.Screen
        name="EditInformation"
        component={EditInformation}
        options={{
          gestureEnabled: true,
          ...SlideFromRightTransition,
        }}
      />
      <ProfileStack.Screen
        name="EditFavoriteSubjects"
        component={EditFavoriteSubjects}
        options={{
          gestureEnabled: true,
          ...SlideFromRightTransition,
        }}
      />
      <ProfileStack.Screen
        name="EditDifficultSubjects"
        component={EditDifficultSubjects}
        options={{
          gestureEnabled: true,
          ...SlideFromRightTransition,
        }}
      />
    </ProfileStack.Navigator>
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
            <DrawerContentScrollView {...props} style={{backgroundColor: theme.foreground}}>
              <DrawerItemList
                {...props}
                labelStyle={{
                  fontWeight: 'bold',
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
            component={ProfileNavigator}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default MainDrawerNavigation
