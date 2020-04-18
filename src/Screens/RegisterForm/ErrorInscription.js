import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';
import Dots from '../../Components/Dots';
import client from '../../feathers-client';
import { MaterialIcons as Icon } from '@expo/vector-icons'

class ErrorInscription extends React.Component {
  render() {
    let content =
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize:20, paddingTop:10}}>Une erreur s'est produite,</Text>
        <Text style={{fontSize:20}}>veuillez réessayer.</Text>
        <Text style={{fontSize:15, fontStyle: 'italic'}}>({this.props.route.params.error})</Text>
      </View>
    let retryFunc = () => {
      this.props.navigation.replace("Name")
    }
    if (this.props.route.params.error=='Conflict') {
      content =
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize:20, paddingTop:10}}>Un compte associé à cette</Text>
          <Text style={{fontSize:20}}>adresse mail existe déjà.</Text>
        </View>
      retryFunc = () => {
        this.props.navigation.replace("EmailPass", {
          firstName: this.props.route.params.firstName,
          lastName: this.props.route.params.lastName,
          year: this.props.route.params.year,
          role: this.props.route.params.role,
          department: this.props.route.params.department,
          favoriteSubjects: this.props.route.params.favoriteSubjects,
          difficultSubjects: this.props.route.params.difficultSubjects,
        })
      }
    }
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: '5%'}}>
          <Icon name='error-outline' color='#d01427' size={100}/>
          { content }
        </View>
        <TouchableOpacity
          style={{backgroundColor: '#4e73df', ...styles.nextButton}}
          onPress={retryFunc}
        >
          <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  nextButton: {
    paddingVertical: 10,
    width:'100%',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});

export default ErrorInscription
