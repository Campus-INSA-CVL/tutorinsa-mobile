import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../Screens/LoginScreen'
import RegisterScreen from '../Screens/RegisterScreen'
import BlankScreen from '../Screens/BlankScreen'

const Stack = createStackNavigator();

class AuthStackNavigation extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login"
            options={{headerShown: false}}
            component={LoginScreen}
            initialParams={{ onLoginSuccess: this.props.onLoginSuccess }}
          />
          <Stack.Screen name="Register"
            options={{headerShown: false}}
            component={RegisterScreen}
          />
          <Stack.Screen name="Blank"
            options={{headerShown: false}}
            component={BlankScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AuthStackNavigation
