import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import { AsyncStorage, Alert } from 'react-native';
import auth from '@feathersjs/authentication-client';

const socket = io('http://192.168.1.48:3030');
const client = feathers();

client.configure(socketio(socket))
      .configure(auth({
        storage: AsyncStorage
      }));

export default client

export function handleErrors(e) {
  console.log(e.name);
  if (e.name == "Timeout") {
    Alert.alert(
      'Erreur',
      'Serveur introuvable. Veuillez vérifier votre connexion internet.',
      [
        {text: "D'accord"},
      ]
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
