import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import { AsyncStorage, Alert } from 'react-native';
import auth from '@feathersjs/authentication-client';

const API_URL = 'http://192.168.43.143:3030';

const socket = io(API_URL);
const client = feathers();

client.configure(socketio(socket))
      .configure(auth({
        storage: AsyncStorage
      }));

export default client

export function handleAllErrors(e, retry) {
  console.log('Error catched : '+e.name);
  if (e.name == "Timeout") {
    let buttons = (retry == undefined)
      ? [ { text: "D'accord" }, ]
      : [ { text: "Annuler", style: 'cancel' },
          { text: "Réessayer", onPress: retry }, ]
    Alert.alert(
      'Erreur',
      'Serveur introuvable. Veuillez vérifier votre connexion internet.',
      buttons
    );
  }
  else if (e.name == "NotAuthenticated") {
    Alert.alert(
      'Erreur',
      'Email ou mot de passe invalide.',
      [
        {text: "D'accord"},
      ]
    );
  }
  else {
    Alert.alert(
      'Erreur',
      'Veuillez consulter la console pour plus de détails.',
      [
        {text: "D'accord"},
      ]
    );
  }
}
