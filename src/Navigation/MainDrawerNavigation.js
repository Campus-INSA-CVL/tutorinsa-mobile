import React from 'react'
import { Image, View, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { SlideFromRightTransition, PresentTransition } from './Transitions'
import { AntDesign as Icon } from '@expo/vector-icons'

import Posts from '../Screens/PostsScreen'
import PostDetails from '../Screens/PostDetailsScreen'
import NewPostScreen from '../Screens/NewPostScreen'
import FilterPostsScreen from '../Screens/FilterPostsScreen'
import Profile from '../Screens/ProfileScreen'
import EditInformation from '../Screens/EditInformationScreen'
import EditFavoriteSubjects from '../Screens/EditFavoriteSubjectsScreen'
import EditDifficultSubjects from '../Screens/EditDifficultSubjectsScreen'

const PostsStack = createStackNavigator()
function PostsNavigator() {
  return (
    <PostsStack.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerShown: false
      }}
    >
      <PostsStack.Screen
        name="Posts"
        component={Posts}
        options={{
          title: 'Posts'
        }}
      />
      <PostsStack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{
          gestureEnabled: true,
          ...SlideFromRightTransition,
        }}
      />
      <PostsStack.Screen
        name="NewPost"
        component={NewPostScreen}
        options={{
          ...PresentTransition,
        }}
      />
      <PostsStack.Screen
        name="FilterPosts"
        component={FilterPostsScreen}
        options={{
          ...PresentTransition,
        }}
      />
    </PostsStack.Navigator>
  )
}


const ProfileStack = createStackNavigator()
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
  )
}




const Drawer = createDrawerNavigator()

class MainDrawerNavigation extends React.Component {
  render() {
    const { theme } = this.props

    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Posts"
          drawerContent={(props) => {return (
            <DrawerContentScrollView {...props} style={{backgroundColor: theme.foreground}}>
              <View style={{height: Dimensions.get('window').height/4, alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={require('../../assets/icon_512x512.png')}
                  style={{width: '50%'}}
                  resizeMode='contain'
                />
              </View>
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
              drawerIcon: () => <Icon name='appstore-o' size={32} color={theme.title}/>
            }}
            component={PostsNavigator}
          />
          <Drawer.Screen
            name="Profile"
            options={{
              title: "Mon profil",
              drawerIcon: () => <Icon name='idcard' size={32} color={theme.title}/>
            }}
            component={ProfileNavigator}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}

export default MainDrawerNavigation
