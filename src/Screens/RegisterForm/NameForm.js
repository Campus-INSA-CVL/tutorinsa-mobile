import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';
import Dots from '../../Components/Dots';

class NameForm extends React.Component {
  state={
    firstName: '',
    lastName: '',
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1, justifyContent: 'space-around', paddingBottom: '5%'}}>
          <Text style={{alignSelf: 'center', fontSize:15, paddingTop:10, fontStyle: 'italic'}}>Commençons par les présentations</Text>
          <Input
            value={this.state.firstName}
            onChangeText={(val) => this.setState({ firstName: val })}
            onSubmitEditing={() => {this.lastNameInput.focus()}}
            blurOnSubmit={false}
            returnKeyType="next"
            inputContainerStyle={styles.inputContainer}
            placeholder="Prénom"
            placeholderTextColor={'#aaa'}
          />
          <Input
            value={this.state.lastName}
            ref={(input) => {this.lastNameInput = input}}
            onChangeText={(val) => this.setState({ lastName: val })}
            onSubmitEditing={() => {
              if (this.state.firstName!='' && this.state.lastName!='') {
                this.props.navigation.navigate("Informations", {
                  firstName: this.state.firstName.charAt(0).toUpperCase() + this.state.firstName.slice(1).toLowerCase(),
                  lastName: this.state.lastName.charAt(0).toUpperCase() + this.state.lastName.slice(1).toLowerCase(),
                });
              }
            }}
            inputContainerStyle={styles.inputContainer}
            placeholder="Nom"
            placeholderTextColor={'#aaa'}
            returnKeyType="done"
          />
        </View>
        <View style={{paddingBottom: '5%', flex: 0.4, justifyContent: 'space-around'}}>
          <TouchableOpacity
            disabled={this.state.firstName=='' || this.state.lastName==''}
            style={{backgroundColor: (this.state.firstName!='' && this.state.lastName!='') ? '#4e73df' : '#d1d3e2', ...styles.nextButton}}
            onPress={() => {
              if (this.state.firstName!='' && this.state.lastName!='') {
                this.props.navigation.navigate("Informations", {
                  firstName: this.state.firstName.charAt(0).toUpperCase() + this.state.firstName.slice(1).toLowerCase(),
                  lastName: this.state.lastName.charAt(0).toUpperCase() + this.state.lastName.slice(1).toLowerCase(),
                });
              }
            }}
          >
            <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Suivant</Text>
          </TouchableOpacity>
          <View>
            <Dots number={6} selected={0} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
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

export default NameForm
