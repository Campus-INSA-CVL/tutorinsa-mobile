import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SlideFromRightTransition } from './Transitions';

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
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Name">
          <Stack.Screen name="Name"
            options={{
              headerShown: false,
              gestureEnabled: true,
              ...SlideFromRightTransition,
            }}
            component={NameForm}
          />
          <Stack.Screen name="Informations"
          options={{
            headerShown: false,
            gestureEnabled: true,
            ...SlideFromRightTransition,
          }}
          component={InformationsForm}
          />
          <Stack.Screen name="FavoriteSubjects"
          options={{
            headerShown: false,
            gestureEnabled: true,
            ...SlideFromRightTransition,
          }}
          component={FavoriteSubjectsForm}
          />
          <Stack.Screen name="DifficultSubjects"
          options={{
            headerShown: false,
            gestureEnabled: true,
            ...SlideFromRightTransition,
          }}
          component={DifficultSubjectsForm}
          />
          <Stack.Screen name="EmailPass"
          options={{
            headerShown: false,
            gestureEnabled: true,
            ...SlideFromRightTransition,
          }}
          component={EmailPassForm}
          />
          <Stack.Screen name="ConfirmPass"
            options={{
              headerShown: false,
              gestureEnabled: true,
              ...SlideFromRightTransition,
            }}
            component={ConfirmPassForm}
          />
          <Stack.Screen name="ConfirmInscription"
            options={{
              headerShown: false,
              gestureEnabled: false,
              ...SlideFromRightTransition,
            }}
            component={ConfirmInscription}
          />
          <Stack.Screen name="Error"
            options={{
              headerShown: false,
              gestureEnabled: false,
              ...SlideFromRightTransition,
            }}
            component={ErrorInscription}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default RegisterNavigation
