import React from 'react'
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';
import Card from '../../Components/Card';

class NameForm extends React.Component {
  state={
    firstName: '',
    lastName: '',
  }

  _submit(state) {
    if (state.firstName!='' && state.lastName!='') {
      this.props.navigation.navigate("Informations", {
        firstName: state.firstName.charAt(0).toUpperCase() + state.firstName.slice(1).toLowerCase(),
        lastName: state.lastName.charAt(0).toUpperCase() + state.lastName.slice(1).toLowerCase(),
      });
      this.props.dispatch({ type: "STEPPER_SET", value: 1});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <View style={styles.form}>
            <Text style={styles.infoText}>Commençons par les présentations</Text>
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
              onSubmitEditing={() => {this._submit(this.state)}}
              inputContainerStyle={styles.inputContainer}
              placeholder="Nom"
              placeholderTextColor={'#aaa'}
              returnKeyType="done"
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              disabled={this.state.firstName=='' || this.state.lastName==''}
              style={{backgroundColor: (this.state.firstName!='' && this.state.lastName!='') ? '#4e73df' : '#d1d3e2', ...styles.nextButton}}
              onPress={() => {this._submit(this.state)}}
            >
              <Text style={styles.buttonLabel}>Suivant</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoText: {
    alignSelf: 'center',
    fontSize:15,
    paddingTop:10,
    fontStyle: 'italic'
  },
  form: {
    flex:1,
    justifyContent: 'space-around',
    paddingBottom: '5%'
  },
  inputContainer: {
    borderRadius: 20,
    borderColor: '#d1d3e2',
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  footer: {
    flex: 0.4,
    paddingBottom: '5%',
  },
  nextButton: {
    paddingVertical: 10,
    width:'100%',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  buttonLabel: {
    alignSelf: 'center',
    color: 'white',
    fontSize:15
  },
});

export default connect(() => {return {}})(NameForm)
