import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../Screens/LoginScreen'
import RegisterScreen from '../Screens/RegisterScreen'

const Stack = createStackNavigator();

class AuthStackNavigation extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login"
            options={{
              headerShown: false
            }}
            component={LoginScreen}
          />
          <Stack.Screen name="Register"
            options={{
              headerShown: false,
              gestureDirection: 'vertical',
              gestureEnabled: true,
            }}
            component={RegisterScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AuthStackNavigation
