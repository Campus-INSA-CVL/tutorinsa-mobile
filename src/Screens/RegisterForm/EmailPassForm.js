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
          <Text style={{alignSelf: 'center', fontSize:15, paddingTop:10, fontStyle: 'italic'}}>Vous y êtes presque !</Text>
          <Input
            value={this.state.email}
            onChangeText={(val) => this.setState({ email: val })}
            onSubmitEditing={() => {this.passInput.focus()}}
            blurOnSubmit={false}
            returnKeyType="next"
            inputContainerStyle={styles.inputContainer}
            placeholder="Entrez votre email"
            placeholderTextColor={'#aaa'}
            keyboardType='email-address'
          />
          <Input
            value={this.state.password}
            ref={(input) => {this.passInput = input}}
            onChangeText={(val) => this.setState({ password: val })}
            onSubmitEditing={() => {
              if (this.state.email!='' && this.state.password!='') {
                this.props.navigation.navigate("ConfirmPass", {
                  firstName: this.props.route.params.firstName,
                  lastName: this.props.route.params.lastName,
                  year: this.props.route.params.year,
                  role: this.props.route.params.role,
                  department: this.props.route.params.department,
                  favoriteSubjects: this.props.route.params.favoriteSubjects,
                  difficultSubjects: this.props.route.params.difficultSubjects,
                  email: this.state.email,
                  password: this.state.password
                });
              }
            }}
            secureTextEntry
            inputContainerStyle={styles.inputContainer}
            placeholder="Mot de passe"
            placeholderTextColor={'#aaa'}
            returnKeyType="done"
          />
        </View>
        <View style={{paddingBottom: '5%', flex: 0.4, justifyContent: 'space-around'}}>
          <TouchableOpacity
            disabled={this.state.email=='' || this.state.password==''}
            style={{backgroundColor: (this.state.email!='' && this.state.password!='') ? '#4e73df' : '#d1d3e2', ...styles.nextButton}}
            onPress={() => {
              if (this.state.email!='' && this.state.password!='') {
                this.props.navigation.navigate("ConfirmPass", {
                  firstName: this.props.route.params.firstName,
                  lastName: this.props.route.params.lastName,
                  year: this.props.route.params.year,
                  role: this.props.route.params.role,
                  department: this.props.route.params.department,
                  favoriteSubjects: this.props.route.params.favoriteSubjects,
                  difficultSubjects: this.props.route.params.difficultSubjects,
                  email: this.state.email,
                  password: this.state.password
                });
              }
            }}
          >
            <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Suivant</Text>
          </TouchableOpacity>
          <View>
            <Dots number={6} selected={4} />
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
    borderColor: '#d1d3e2',
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
