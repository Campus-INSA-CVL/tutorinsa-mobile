import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SlideFromRightTransition } from './Transitions';

import StepIndicator from 'react-native-step-indicator';

import WelcomeScreen from '../Screens/WelcomeScreen';
import NameForm from '../Screens/RegisterForm/NameForm';
import EmailPassForm from '../Screens/RegisterForm/EmailPassForm';
import ConfirmPassForm from '../Screens/RegisterForm/ConfirmPassForm';
import InformationsForm from '../Screens/RegisterForm/InformationsForm';
import FavoriteSubjectsForm from '../Screens/RegisterForm/FavoriteSubjectsForm';
import DifficultSubjectsForm from '../Screens/RegisterForm/DifficultSubjectsForm';
import ConfirmInscription from '../Screens/RegisterForm/ConfirmInscription';
import ErrorInscription from '../Screens/RegisterForm/ErrorInscription';

const Stack = createStackNavigator();

class RegisterNavigation extends React.Component {
  render() {
    return (
      <NavigationContainer
        independent={true}
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
            ...SlideFromRightTransition
          }}
        >
          <Stack.Screen name="Welcome"
            options={{
              gestureEnabled: true
            }}
            component={WelcomeScreen}
          />
          <Stack.Screen name="Name"
            options={{
              gestureEnabled: true
            }}
            component={NameForm}
          />
          <Stack.Screen name="Informations"
          options={{
            gestureEnabled: true
          }}
          component={InformationsForm}
          />
          <Stack.Screen name="FavoriteSubjects"
          options={{
            gestureEnabled: true
          }}
          component={FavoriteSubjectsForm}
          />
          <Stack.Screen name="DifficultSubjects"
          options={{
            gestureEnabled: true
          }}
          component={DifficultSubjectsForm}
          />
          <Stack.Screen name="EmailPass"
          options={{
            gestureEnabled: true
          }}
          component={EmailPassForm}
          />
          <Stack.Screen name="ConfirmPass"
            options={{
              gestureEnabled: true
            }}
            component={ConfirmPassForm}
          />
          <Stack.Screen name="ConfirmInscription"
            options={{
              gestureEnabled: false
            }}
            component={ConfirmInscription}
          />
          <Stack.Screen name="Error"
            options={{
              gestureEnabled: false
            }}
            component={ErrorInscription}
          />
        </Stack.Navigator>

      </NavigationContainer>
    );
  }
}

export default RegisterNavigation
