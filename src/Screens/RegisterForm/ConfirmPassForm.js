import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';
import Dots from '../../Components/Dots';
import client from '../../feathers-client';

class NameForm extends React.Component {
  state={
    confirmPassword: '',
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1, justifyContent: 'space-around', paddingBottom: '5%'}}>
          <Text style={{alignSelf: 'center', fontSize:15, paddingTop:10, fontStyle: 'italic'}}>Promis, c'est la dernière étape</Text>
          <Input
            value={this.state.confirmPassword}
            errorMessage={this.state.confirmPassword=='' || this.state.confirmPassword==this.props.route.params.password ? '' : 'Cela ne correspond pas au mot de passe précédent'}
            onChangeText={(val) => this.setState({ confirmPassword: val })}
            onSubmitEditing={() => {
              if (this.state.confirmPassword==this.props.route.params.password) {
                client.service('users').create({
	                 "email": this.props.route.params.email,
	                 "password": this.props.route.params.password,
	                 "yearId": this.props.route.params.year,
	                 "departmentId": this.props.route.params.department,
	                 "firstName": this.props.route.params.firstName,
	                 "lastName": this.props.route.params.lastName,
	                 "favoriteSubjectsIds": this.props.route.params.favoriteSubjects,
	                 "difficultSubjectsIds": this.props.route.params.difficultSubjects,
                   "permissions": this.props.route.params.role,
                }).then(() => {
                  this.props.navigation.replace("ConfirmInscription", {
                    firstName: this.props.route.params.firstName
                  });
                }).catch(e => {
                  console.log(e.name);
                  this.props.navigation.replace("Error", {
                    error: e.name,
                    firstName: this.props.route.params.firstName,
                    lastName: this.props.route.params.lastName,
                    year: this.props.route.params.year,
                    role: this.props.route.params.role,
                    department: this.props.route.params.department,
                    favoriteSubjects: this.props.route.params.favoriteSubjects,
                    difficultSubjects: this.props.route.params.difficultSubjects,
                    email: this.props.route.params.email,
                    password: this.props.route.params.password
                  });
                });
              }
            }}
            secureTextEntry
            inputContainerStyle={styles.inputContainer}
            placeholder="Confirmez le mot de passe"
            placeholderTextColor={'#aaa'}
          />
        </View>
        <View style={{paddingBottom: '5%', flex: 0.4, justifyContent: 'space-around'}}>
          <TouchableOpacity
            disabled={this.state.confirmPassword!=this.props.route.params.password}
            style={{backgroundColor: (this.state.confirmPassword==this.props.route.params.password) ? '#4e73df' : '#d1d3e2', ...styles.nextButton}}
            onPress={() => {
              if (this.state.confirmPassword==this.props.route.params.password) {
                client.service('users').create({
	                 "email": this.props.route.params.email,
	                 "password": this.props.route.params.password,
	                 "yearId": this.props.route.params.year,
	                 "departmentId": this.props.route.params.department,
	                 "firstName": this.props.route.params.firstName,
	                 "lastName": this.props.route.params.lastName,
	                 "favoriteSubjectsIds": this.props.route.params.favoriteSubjects,
	                 "difficultSubjectsIds": this.props.route.params.difficultSubjects,
                   "permissions": this.props.route.params.role,
                }).then(() => {
                  this.props.navigation.replace("ConfirmInscription", {
                    firstName: this.props.route.params.firstName
                  });
                }).catch(e => {
                  console.log(e.name);
                  this.props.navigation.replace("Error", {
                    error: e.name,
                    firstName: this.props.route.params.firstName,
                    lastName: this.props.route.params.lastName,
                    year: this.props.route.params.year,
                    role: this.props.route.params.role,
                    department: this.props.route.params.department,
                    favoriteSubjects: this.props.route.params.favoriteSubjects,
                    difficultSubjects: this.props.route.params.difficultSubjects,
                    email: this.props.route.params.email,
                    password: this.props.route.params.password
                  });
                });
              }
            }}
          >
            <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Confirmer</Text>
          </TouchableOpacity>
          <View>
            <Dots number={6} selected={5} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
  },
  inputContainer: {
    borderRadius: 20,
    borderColor: '#d1d3e2',
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  nextButton: {
    paddingVertical: 10,
    width:'100%',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});

export default NameForm
