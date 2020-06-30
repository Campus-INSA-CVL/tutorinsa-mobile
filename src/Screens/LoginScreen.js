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
import { Input } from 'react-native-elements';

import Separator from '../Components/Separator';
import LoadingWheel from '../Components/LoadingWheel';
import ExternalLink from '../Components/ExternalLink';
import InternalLink from '../Components/InternalLink';
import client, { handleAllErrors } from '../feathers-client';

class LoginScreen extends React.Component {
  state = { email: '', password: '', isLoading: false };

  componentDidMount() {
    this.props.dispatch({ type: 'SET_AUTH_NAVIGATION', value: () => {this.props.navigation}});
  }

  submit(state) {
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
        <View style={styles.content}>
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
        </View>
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
    paddingHorizontal: '5%',
    borderRadius: 20,
    flex: 1,
    backgroundColor: 'white'
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
