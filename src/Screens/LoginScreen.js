import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import Separator from '../Components/Separator';
import LoadingWheel from '../Components/LoadingWheel';
import ExternalLink from '../Components/ExternalLink';
import InternalLink from '../Components/InternalLink';
import client, { handleErrors } from '../feathers-client';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', isLoading: false };
  }

  submit(state) {
    client.authenticate({
      strategy: "local",
      email: state.email,
      password: state.password,
    }).then(() => {
      this.setState({ isLoading: false })
      this.props.route.params.onLoginSuccess()
    }).catch(e => {
      this.setState({ isLoading: false, password: '' })
      handleErrors(e)
    });
  }

  render() {
    return (
      <LinearGradient
      style={styles.container}
      colors={['#4e73df', '#224abe']}
      start={{x:0, y:0.1}}
      end={{x:0, y:1}}
      >
        <View style={styles.header}>
          <Image
            source={require('../../assets/logo_tutorinsa.png')}
            style={{resizeMode: "contain", height: '100%'}}
          />
          <Image
            source={require('../../assets/logo_insa.png')}
            style={{resizeMode: 'contain', height: '50%', marginTop: '7.5%'}}
          />
        </View>
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
              <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Login</Text>
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
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    backgroundColor: '#374dc0',
    paddingTop: 20,
  },
  header: {
    flex: 0.5,
    flexDirection: 'row',
    padding: 10,
  },
  content: {
    width: '85%',
    marginBottom: '5%',
    paddingHorizontal: '5%',
    borderRadius: 5,
    flex: 3,
    backgroundColor: 'white'
  },
  form:{
    flex: 3,
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
    paddingBottom: 20,
    alignItems: 'center',
  },
});

export default LoginScreen
