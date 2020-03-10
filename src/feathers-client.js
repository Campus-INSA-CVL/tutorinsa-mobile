import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import { AsyncStorage } from 'react-native';
import auth from '@feathersjs/authentication-client';

const socket = io('http://api.tutorinsa.ChauffezVous.com');
const client = feathers();

client.configure(socketio(socket))
      .configure(auth({
        storage: AsyncStorage
      }));

export default client
