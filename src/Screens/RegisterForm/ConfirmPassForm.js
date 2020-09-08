import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';
import Card from '../../Components/Card';
import client from '../../feathers-client';

class ConfirmPassForm extends React.Component {
  state={
    confirmPassword: '',
    passwordError: false,
  }

  _submit = () => {
    if (this.state.confirmPassword=='' || this.state.confirmPassword==this.props.route.params.password) {
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
          firstName: this.props.route.params.firstName,
          email: this.props.route.params.email,
          password: this.props.route.params.password,
        });
        this.props.dispatch({ type: "STEPPER_SET", value: 7 });
      }).catch(e => {
        console.log('Error while creating account : ' + e.name);
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
  }

  render() {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.form}>
            <Text style={styles.infoText}>Promis, c'est la dernière étape</Text>
            <Input
              value={this.state.confirmPassword}
              errorMessage={this.state.confirmPassword=='' || this.state.confirmPassword==this.props.route.params.password ? '' : 'Cela ne correspond pas au mot de passe précédent'}
              onChangeText={(val) => this.setState({ confirmPassword: val })}
              onSubmitEditing={() => {this._submit(this.state)}}
              secureTextEntry
              inputContainerStyle={styles.inputContainer}
              placeholder="Confirmez le mot de passe"
              placeholderTextColor={'#aaa'}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              disabled={this.state.confirmPassword!=this.props.route.params.password}
              style={{backgroundColor: (this.state.confirmPassword==this.props.route.params.password) ? '#4e73df' : '#d1d3e2', ...styles.nextButton}}
              onPress={() => {this._submit(this.state)}}
            >
              <Text style={styles.buttonLabel}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  card: {
    marginVertical: '5%',
    borderRadius: 40,
  },
  form: {
    flex:1,
    justifyContent: 'space-around',
    paddingBottom: '5%',
  },
  infoText: {
    alignSelf: 'center',
    fontSize:15,
    paddingTop:10,
    fontStyle: 'italic',
  },
  inputContainer: {
    borderRadius: 20,
    borderColor: '#d1d3e2',
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  footer: {
    paddingBottom: '5%',
    flex: 0.4,
    justifyContent: 'space-around',
  },
  nextButton: {
    paddingVertical: 10,
    width:'100%',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  buttonLabel: {
    alignSelf: 'center',
    color: 'white',
    fontSize:15,
  }
});

export default connect(() => {return {}})(ConfirmPassForm)
