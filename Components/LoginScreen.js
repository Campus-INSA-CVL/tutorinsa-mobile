import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import Separator from './Separator';


class LoginScreen extends React.Component {
  static navigationOptions = {
      headerShown: false,
  };

  constructor(props) {
    super(props)
    this.state = {
      error: false,
    }
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
            source={require('../assets/logo_tutorinsa.png')}
            style={{resizeMode: "contain", height: '100%'}}
          />
          <Image
            source={require('../assets/logo_insa.png')}
            style={{resizeMode: 'contain', height: '50%', marginTop: '7.5%'}}
          />
        </View>
        <View style={styles.content}>
          <Text style={{alignSelf: 'center', fontSize:30, paddingTop:10}}>Connexion</Text>
          <Input
            //value={this.state.value}
            //onSubmitEditing={() => {this.onChange(this.state.value)}}
            //onChangeText={(text) => {this.onChange(text)}}
            inputContainerStyle={styles.inputContainer}
            placeholder="Entrez votre email"
            placeholderTextColor={'#aaa'}
          />
          <Input
            //value={this.state.value}
            //onSubmitEditing={() => {this.onChange(this.state.value)}}
            //onChangeText={(text) => {this.onChange(text)}}
            inputContainerStyle={styles.inputContainer}
            placeholder="Mot de passe"
            placeholderTextColor={'#aaa'}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {this.props.navigation.replace("Posts")}}
            >
            <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Login</Text>
          </TouchableOpacity>
          <Separator/>
          <View style={{paddingBottom: 20}}>
            <Text style={styles.link}>Mot de passe oublié ?</Text>
            <Text style={styles.link}>Créer un compte !</Text>
            <Text style={styles.link}>Politique RGPD</Text>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    backgroundColor: '#374dc0',
  },
  header: {
    flex: 0.5,
    flexDirection: 'row',
    padding: 10,
  },
  content: {
    width: '85%',
    marginBottom: '7.5%',
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 3,
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 0.5,
    padding: 10,
  },
  inputContainer: {
    borderRadius: 20,
    borderColor: '#ddd',
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
  link: {
    alignSelf: 'center',
    color: 'blue',
  }
});

export default LoginScreen
