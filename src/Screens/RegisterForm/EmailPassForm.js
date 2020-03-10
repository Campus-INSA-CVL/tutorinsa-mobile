import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import Dots from '../../Components/Dots';

class EmailPassForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1, justifyContent: 'space-around', paddingBottom: '5%'}}>
          <Text style={{alignSelf: 'center', fontSize:15, paddingTop:10, fontStyle: 'italic'}}>Bonjour {this.props.route.params.firstName} !</Text>
          <Input
            value={this.state.email}
            onChangeText={(val) => this.setState({ email: val })}
            inputContainerStyle={styles.inputContainer}
            placeholder="Entrez votre email"
            placeholderTextColor={'#aaa'}
          />
          <Input
            value={this.state.password}
            onChangeText={(val) => this.setState({ password: val })}
            secureTextEntry
            inputContainerStyle={styles.inputContainer}
            placeholder="Mot de passe"
            placeholderTextColor={'#aaa'}
          />
        </View>
        <View style={{paddingBottom: '5%', flex: 0.4, justifyContent: 'space-around'}}>
          <TouchableOpacity
            disabled={this.state.email=='' || this.state.password==''}
            style={{backgroundColor: (this.state.email!='' && this.state.password!='') ? '#4e73df' : '#ddd', ...styles.nextButton}}
            onPress={() => {
              if (this.state.email!='' && this.state.password!='') {
                this.props.navigation.navigate("ConfirmPass", {
                  firstName: this.props.route.params.firstName,
                  lastName: this.props.route.params.lastName,
                  year: this.props.route.params.year,
                  role: this.props.route.params.role,
                  course: this.props.route.params.course,
                  email: this.state.email,
                  password: this.state.password
                });
              }
            }}
          >
            <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Suivant</Text>
          </TouchableOpacity>
          <View>
            <Dots number={3} selected={1} />
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
    justifyContent: 'space-around'
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

export default EmailPassForm
