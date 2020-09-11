import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@feathersjs/authentication-client';

const API_URL = 'https://tutorinsa-server.azurewebsites.net';

const socket = io(API_URL);
const client = feathers();

client.configure(socketio(socket))
      .configure(auth({
        storage: AsyncStorage
      }));

export default client


export function handleAllErrors(e, retry, onTokenExpired, hasToken) {

  console.log('Error catched : '+e.name);
  // console.error(e);

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
  else if (e.name == "Forbidden") {
    Alert.alert(
      'Erreur',
      'Veuillez confirmer votre adresse mail en cliquant sur le lien que vous avez reçu par mail avant de vous connecter.',
      [ { text: "D'accord" }, ]
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
      'Si cette erreur persiste veuillez contacter le développeur.',
      [
        {text: "D'accord"},
      ]
    );
  }
}


export function fetchAPI(service, query) {
  return new Promise(resolve => {
    var response = []

    client.service(service)
    .find({
      query : {
        ...query
      }
    })
    .then((data) => {
      if (Array.isArray(data)) {
        resolve(data)
      }
      else {
        if (data.total==0) {
          resolve([])
        }
        else {
          for (var i=0; i*data.limit<data.total; i++) {
            client.service(service)
            .find({
              query: {
                $skip: i*data.limit,
                ...query
              }
            })
            .then((res) => {
              res.data.forEach((item, i) => {
                response.push(item)
              });

              if (response.length == data.total) {
                resolve(response)
              }
            })
          }
        }
      }
    })
  })
}
