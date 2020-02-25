import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from '../Components/LoginScreen'
import Posts from '../Components/Posts'

const AppNavigator = createStackNavigator({
  LoginScreen: LoginScreen,
  Posts: Posts,
},
{
  initialRouteName: 'LoginScreen'
})

export default createAppContainer(AppNavigator);
