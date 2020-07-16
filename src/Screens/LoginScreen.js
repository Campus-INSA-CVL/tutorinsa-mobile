import React from 'react'
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Separator from '../Components/Separator';
import LoadingWheel from '../Components/LoadingWheel';
import Input from '../Components/Input';
import ExternalLink from '../Components/ExternalLink';
import InternalLink from '../Components/InternalLink';
import Card from '../Components/Card';
import client, { handleAllErrors } from '../feathers-client';
import { Feather as Icon } from '@expo/vector-icons';

class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
    savePassword: false,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'SET_AUTH_NAVIGATION', value: () => {this.props.navigation}});
  }

  async loadAsyncData() {
    try {
      const loginstring = await AsyncStorage.getItem('tutorinsa_loginstring');
      if(loginstring !== null) {
        [email, password] = loginstring.split(':');
        this.setState({email, password: password || ''});
      }
    } catch(e) {
      console.log('Error while reading the login string : ' + e.name);
    }
  }

  async submit(state) {
    const loginstring = this.state.email + (this.state.savePassword ? ':'+this.state.password : '')
    try {
      await AsyncStorage.setItem('tutorinsa_loginstring', loginstring)
    } catch (e) {
      console.log('Error while saving email/password : ' + e.name);
    }
    client.authenticate({
      strategy: "local",
      email: state.email,
      password: state.password,
    }).then((res) => {
      this.setState({ isLoading: false })
      this.props.dispatch({ type: "AUTH_TRUE" });
      this.props.dispatch({ type: "API_USER", value: res.user });
    }).catch(e => {
      this.setState({ isLoading: false, password: '' })
      handleAllErrors(e)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Card style={styles.content} onFocus={() => {this.loadAsyncData()}}>
          <KeyboardAvoidingView
          style={styles.form}
          behavior="height"
          >
            <Text style={{alignSelf: 'center', fontSize:30, paddingVertical: 10}}>Connexion</Text>
            <Input
              value={this.state.email}
              onChangeText={(val) => this.setState({ email: val })}
              onSubmitEditing={() => {this.passInput.focus()}}
              blurOnSubmit={false}
              inputContainerStyle={styles.inputContainer}
              placeholder="Entrez votre email"
              autoCapitalize="none"
              placeholderTextColor={'#aaa'}
              returnKeyType="next"
              keyboardType='email-address'
            />
            <Input
              value={this.state.password}
              ref={(input) => {this.passInput = input}}
              onChangeText={(val) => this.setState({ password: val })}
              secureTextEntry
              onSubmitEditing={() => {
                this.submit(this.state);
                this.setState({ isLoading: true });
              }}
              inputContainerStyle={styles.inputContainer}
              placeholder="Mot de passe"
              placeholderTextColor={'#aaa'}
              returnKeyType="done"
            />
            <CheckBox
              title="Enregistrer mon mot de passe"
              checked={this.state.savePassword}
              onPress={() => {this.setState({savePassword: !this.state.savePassword})}}
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                this.submit(this.state);
                this.setState({ isLoading: true });
              }}
            >
              <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Connexion</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <Separator backgroundColor='#d1d3e2'/>
          <View style={styles.footer}>
            <ExternalLink label="Mot de passe oublié ?" target="https://www.tutorinsa.insa-cvl.org/forgot-password"/>
            <InternalLink label="Créer un compte !" target="Register" navigation={this.props.navigation}/>
            <ExternalLink label="Politique RGPD" target="https://www.tutorinsa.insa-cvl.org/politique%20de%20confidentialit%C3%A9.pdf"/>
          </View>
        </Card>
        <LoadingWheel overlay display={this.state.isLoading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    paddingTop: 24
  },
  content: {
    width: '85%',
    marginVertical: '15%',
    flex: 1,
  },
  form:{
    flex: 4,
    justifyContent: 'space-around'
  },
  inputContainer: {
    borderRadius: 20,
    borderColor: '#d1d3e2',
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  loginButton: {
    paddingVertical: 10,
    width:'100%',
    borderRadius: 20,
    backgroundColor: '#4e73df',
    paddingHorizontal: 10,
  },
  footer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(() => {return {}})(LoginScreen)
