import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';
import Dots from '../../Components/Dots';

class NameForm extends React.Component {
  state={
    confirmPassword: '',
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1, justifyContent: 'space-around', paddingBottom: '5%'}}>
          <Text style={{alignSelf: 'center', fontSize:15, paddingTop:10, fontStyle: 'italic'}}>Vous y êtes presque !</Text>
          <Input
            value={this.state.confirmPassword}
            onChangeText={(val) => this.setState({ confirmPassword: val })}
            secureTextEntry
            inputContainerStyle={styles.inputContainer}
            placeholder="Confirmez le mot de passe"
            placeholderTextColor={'#aaa'}
          />
        </View>
        <View style={{paddingBottom: '5%', flex: 0.4, justifyContent: 'space-around'}}>
          <TouchableOpacity
            disabled={this.state.confirmPassword!=this.props.route.params.password}
            style={{backgroundColor: (this.state.confirmPassword==this.props.route.params.password) ? '#4e73df' : '#ddd', ...styles.nextButton}}
            onPress={() => {
              if (this.state.confirmPassword==this.props.route.params.password) {
                // TODO: Send form and check for confirmation
                this.props.navigation.navigate("ConfirmInscription", {
                  firstName: this.props.route.params.firstName,
                  lastName: this.props.route.params.lastName
                });
                // TODO: Handle possible errors
                this.props.navigation.navigate("Error", {
                  firstName: this.props.route.params.firstName,
                  lastName: this.props.route.params.lastName
                });
              }
            }}
          >
            <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Confirmer</Text>
          </TouchableOpacity>
          <View>
            <Dots number={3} selected={0} />
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
    borderColor: '#ddd',
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
