import React from 'react';
import { Easing, Animated, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SlideFromBottomTransition } from './Transitions'
import LoginScreen from '../Screens/LoginScreen'
import RegisterScreen from '../Screens/RegisterScreen';

const Stack = createStackNavigator();

class AuthStackNavigation extends React.Component {
  render() {
    return (
      <NavigationContainer
        theme={{
          colors: {
            background: 'transparent',
          }
        }}
      >
        <Stack.Navigator
          initialRouteName="Register"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            ...SlideFromBottomTransition
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Register" component={RegisterScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AuthStackNavigation
