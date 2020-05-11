import React from 'react'
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from 'react-native-elements';
import Separator from '../Components/Separator';
import ExternalLink from '../Components/ExternalLink';
import InternalLink from '../Components/InternalLink';
import RegisterNavigation from '../Navigation/RegisterNavigation';

class RegisterScreen extends React.Component {
  render() {
    if (this.props.register_complete) {
      this.props.dispatch({ type: "REGISTER_RESET" });
      this.props.navigation.navigate("Login");
    }

    return (
      <LinearGradient
        style={styles.container}
        colors={['#4e73df', '#224abe']}
        end={{x:0, y:1}}
        start={{x:0, y:0.1}}
      >
        <View style={styles.content}>
          <Text style={{alignSelf: 'center', fontSize:30, paddingTop:25, paddingBottom: 10}}>Créer un compte</Text>
          <RegisterNavigation/>
          <Separator backgroundColor='#d1d3e2'/>
          <View style={{paddingBottom: 10, alignItems: 'center'}}>
            <InternalLink label="J'ai déjà un compte !" target="Login" navigation={this.props.navigation}/>
            <ExternalLink label="Politique RGPD" target="https://www.tutorinsa.insa-cvl.org/politique%20de%20confidentialit%C3%A9.pdf"/>
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
});

const mapStateToProps = (store) => {
  return { register_complete: store.registerFunctions.register_complete }
}

export default connect(mapStateToProps)(RegisterScreen)
