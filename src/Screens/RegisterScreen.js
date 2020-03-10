import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from 'react-native-elements';
import Separator from '../Components/Separator';
import ExternalLink from '../Components/ExternalLink';
import InternalLink from '../Components/InternalLink';
import RegisterNavigation from '../Navigation/RegisterNavigation';


class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={100} style={{flex:1}}>
        <ScrollView>
          <LinearGradient
            style={{height: Dimensions.get('window').height, ...styles.container}}
            colors={['#4e73df', '#224abe']}
            end={{x:0, y:1}}
            start={{x:0, y:0.1}}
          >
            <View style={styles.content}>
              <Text style={{alignSelf: 'center', fontSize:30, paddingTop:25, paddingBottom: 10}}>Créer un compte</Text>
              <RegisterNavigation/>
              <Separator backgroundColor='#ddd'/>
              <View style={{paddingBottom: 10, alignItems: 'center'}}>
                <InternalLink label="J'ai déjà un compte !" target="Login" navigation={this.props.navigation}/>
                <ExternalLink label="Politique RGPD" target="https://www.tutorinsa.insa-cvl.org/politique%20de%20confidentialit%C3%A9.pdf"/>
                <Input
                  value={this.state.firstName}
                  onChangeText={(val) => this.setState({ firstName: val })}
                  inputContainerStyle={styles.inputContainer}
                  placeholder="Prénom"
                  placeholderTextColor={'#aaa'}
                />
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
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
  content: {
    width: '85%',
    marginVertical: '7.5%',
    paddingHorizontal: '5%',
    borderRadius: 5,
    flex: 3,
    backgroundColor: 'white',
    justifyContent: 'space-between'
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
});

export default RegisterScreen
