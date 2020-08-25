import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@feathersjs/authentication-client';

// const API_URL = 'https://tutorinsa-server.herokuapp.com';
const API_URL = 'http://192.168.43.10:3030';
// const API_URL = 'http://192.168.1.88:3030';

const socket = io(API_URL);
const client = feathers();

client.configure(socketio(socket))
      .configure(auth({
        storage: AsyncStorage
      }));

export default client

export function handleAllErrors(e, retry, onTokenExpired, hasToken) {

  console.log('Error catched : '+e.name);
  if (e.name == "Timeout") {
    Alert.alert(
      'Erreur',
      'Serveur introuvable. Veuillez vérifier votre connexion internet.',
      (retry == undefined)
        ? [ { text: "D'accord" }, ]
        : [ { text: "Annuler", style: 'cancel' },
            { text: "Réessayer", onPress: retry }, ]
    );
  }
  else if (e.name == "NotAuthenticated") {
    Alert.alert(
      'Erreur',
      (hasToken)
        ? 'Le jeton d\'authentification est expiré, veuillez vous reconnecter.'
        : 'Email ou mot de passe invalide.',
      (onTokenExpired == undefined)
        ? [ { text: "D'accord" }, ]
        : [ { text: "D'accord", onPress: () => {onTokenExpired()} }, ]
    );
  }
  else if (e.name == "BadRequest") {
    Alert.alert(
      'Erreur',
      'Requête invalide. Si cette erreur persiste veuillez contacter le développeur.',
      [
        { text: "D'accord" },
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
