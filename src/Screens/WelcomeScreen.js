import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Bienvenue !</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("Name");
            }}
          >
            <Text style={styles.buttonLabel}>Créer un compte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.dispatch({ type: "REGISTER_COMPLETE" });
            }}
          >
            <Text style={styles.buttonLabel}>J'ai déjà un compte</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View style={styles.image}>
            <Image
              source={require('../../assets/logo_tutorinsa.png')}
              style={{resizeMode: 'contain', width: '100%'}}
            />
          </View>
          <View style={styles.image}>
            <Image
              source={require('../../assets/logo_insa.png')}
              style={{resizeMode: 'contain', width: '100%'}}
            />
          </View>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 20,
    alignItems: 'center'
  },
  content: {
    width: '85%',
    marginBottom: '5%',
    paddingHorizontal: '5%',
    flex: 5,
  },
  footer: {
    flex: 1,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '5%',
  },
  image: {
    flex: 1,
    margin: '5%',
  },
  title: {
    alignSelf: 'center',
    color: 'white',
    fontSize:50,
    fontWeight: 'bold',
    paddingVertical: '30%'
  },
  button: {
    alignItems: 'center',
    paddingVertical: 5,
    width:'100%',
    borderRadius: 20,
    backgroundColor: 'white',
    marginVertical: '10%'
  },
  buttonLabel: {
    color: '#224abe',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default connect(() => {return {}})(WelcomeScreen)
