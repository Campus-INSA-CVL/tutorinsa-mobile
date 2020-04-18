import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';
import Dots from '../../Components/Dots';
import client from '../../feathers-client';
import { MaterialIcons as Icon } from '@expo/vector-icons'

class ConfirmInscription extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: '5%'}}>
          <Icon name='check' color='#00ae00' size={100}/>
          <Text style={{fontSize:20, paddingTop:10, fontWeight: 'bold'}}>Bienvenue {this.props.route.params.firstName} !</Text>
          <Text style={{fontSize:15, paddingTop:10}}>Votre compte a été créé avec succès</Text>
        </View>
        <TouchableOpacity
          style={{backgroundColor: '#4e73df', ...styles.nextButton}}
          onPress={() => {this.props.route.params.onRegisterSuccess()}}
        >
          <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
  },
  nextButton: {
    paddingVertical: 10,
    width:'100%',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});

export default ConfirmInscription
