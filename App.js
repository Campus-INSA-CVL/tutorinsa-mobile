import 'react-native-gesture-handler';
import * as React from 'react';
import client from './src/feathers-client'
import MainDrawerNavigation from './src/Navigation/MainDrawerNavigation'
import AuthStackNavigation from './src/Navigation/AuthStackNavigation'

export default function App({ navigation }) {
  let auth_success = false;

  client.reAuthenticate().then(() => {auth_success = true}).catch(()=>{});
  return (
    auth_success ? <MainDrawerNavigation/> : <AuthStackNavigation/>
  )
}
