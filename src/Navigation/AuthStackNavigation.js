import React from 'react';
import { Easing, Animated, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SlideFromBottomTransition,
  SlideFromRightTransition
} from './Transitions';
import WelcomeScreen from '../Screens/WelcomeScreen';
import LoginScreen from '../Screens/LoginScreen';
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
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              gestureDirection: 'vertical',
              ...SlideFromBottomTransition
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              gestureDirection: 'horizontal',
              ...SlideFromRightTransition
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AuthStackNavigation
