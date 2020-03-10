import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FadeTransition } from './Transitions';

import NameForm from '../Screens/RegisterForm/NameForm';
import EmailPassForm from '../Screens/RegisterForm/EmailPassForm';
import ConfirmPassForm from '../Screens/RegisterForm/ConfirmPassForm';
import InformationsForm from '../Screens/RegisterForm/InformationsForm';
import BlankScreen from '../Screens/BlankScreen';

const Stack = createStackNavigator();

class RegisterNavigation extends React.Component {
  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Name">
          <Stack.Screen name="Name"
            options={{
              headerShown: false,
              ...FadeTransition,
            }}
            component={NameForm}
          />
          <Stack.Screen name="Informations"
          options={{
            headerShown: false,
            ...FadeTransition,
          }}
          component={InformationsForm}
          />
          <Stack.Screen name="EmailPass"
          options={{
            headerShown: false,
            ...FadeTransition,
          }}
          component={EmailPassForm}
          />
          <Stack.Screen name="ConfirmPass"
            options={{
              headerShown: false,
              gestureEnabled: true,
              ...FadeTransition,
            }}
            component={ConfirmPassForm}
          />
          <Stack.Screen name="ConfirmInscription"
            options={{
              headerShown: false,
              gestureEnabled: true,
              ...FadeTransition,
            }}
            component={BlankScreen}
          />
          <Stack.Screen name="Error"
            options={{
              headerShown: false,
              ...FadeTransition,
            }}
            component={BlankScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default RegisterNavigation
