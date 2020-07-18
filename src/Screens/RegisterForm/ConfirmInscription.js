import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Card from '../../Components/Card';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import client, { handleAllErrors } from '../../feathers-client';

import { connect } from 'react-redux';
import { MaterialIcons as Icon } from '@expo/vector-icons'

class ConfirmInscription extends React.Component {
  state = {
    savePassword: false
  }

  async _saveEmailPass() {
    const loginstring = this.props.route.params.email + (this.state.savePassword ? ':'+ this.props.route.params.password : '')
    try {
      await AsyncStorage.setItem('tutorinsa_loginstring', loginstring)
    } catch (e) {
      console.log('Error while saving email/password : ' + e.name);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: '5%'}}>
            <Icon name='check' color='#00ae00' size={100}/>
            <Text style={{fontSize:20, paddingTop:10, fontWeight: 'bold'}}>Bienvenue {this.props.route.params.firstName} !</Text>
            <Text style={{fontSize:15, paddingTop:10}}>Votre compte a été créé avec succès</Text>
          </View>
          <CheckBox
            title="Enregistrer mon mot de passe"
            checked={this.state.savePassword}
            onPress={() => {this.setState({savePassword: !this.state.savePassword})}}
          />
          <TouchableOpacity
            style={{backgroundColor: '#4e73df', ...styles.nextButton}}
            onPress={() => {
              this._saveEmailPass();
              client.authenticate({
                strategy: "local",
                email: this.props.route.params.email,
                password: this.props.route.params.password,
              }).then((res) => {
                this.props.dispatch({ type: "AUTH_TRUE" });
                this.props.dispatch({ type: "REGISTER_COMPLETE" });
                this.props.dispatch({ type: "API_USER", value: res.user });
              }).catch(e => {
                this.props.navigation.replace("Error", { error: e.name });
              });
            }}
          >
            <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Se connecter</Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  nextButton: {
    paddingVertical: 10,
    width:'100%',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});

export default connect(() => {return {}})(ConfirmInscription)
