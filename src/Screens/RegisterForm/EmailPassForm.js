import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import Card from '../../Components/Card';

class EmailPassForm extends React.Component {
  state = {
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
  }

  _submit(state) {
    if (state.email!='' && state.password!='' && this.checkEmailPassSpec()) {
      this.props.navigation.navigate("ConfirmPass", {
        firstName: this.props.route.params.firstName,
        lastName: this.props.route.params.lastName,
        year: this.props.route.params.year,
        role: this.props.route.params.role,
        department: this.props.route.params.department,
        favoriteSubjects: this.props.route.params.favoriteSubjects,
        difficultSubjects: this.props.route.params.difficultSubjects,
        email: state.email,
        password: state.password
      });
      this.props.dispatch({ type: "STEPPER_SET", value: 5});
    }
  }

  checkEmailPassSpec() {
    let emailOk = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@insa-cvl\.fr$/.test(this.state.email)
    let passwordOk = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(this.state.password)
    this.setState({emailError: !emailOk, passwordError: !passwordOk});
    return emailOk && passwordOk
  }

  render() {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.form}>
            <Text style={styles.infoText}>{this.state.emailError || this.state.passwordError ? "" : "Vous y êtes presque !"}</Text>
            <Input
              value={this.state.email}
              onChangeText={(val) => this.setState({ email: val })}
              onSubmitEditing={() => {this.passInput.focus()}}
              blurOnSubmit={false}
              returnKeyType="next"
              inputContainerStyle={styles.inputContainer}
              placeholder="Entrez votre email"
              autoCapitalize="none"
              errorMessage={this.state.emailError ? 'Adresse email insa-cvl.fr non valide.' : ''}
              errorStyle={{paddingBottom: 20}}
              placeholderTextColor={'#aaa'}
              keyboardType='email-address'
            />
            <Input
              value={this.state.password}
              ref={(input) => {this.passInput = input}}
              onChangeText={(val) => this.setState({ password: val })}
              onSubmitEditing={() => {this._submit(this.state)}}
              secureTextEntry
              inputContainerStyle={styles.inputContainer}
              placeholder="Mot de passe"
              errorMessage={this.state.passwordError ? 'Le mot de passe doit respecter les règles suivantes :\n - 8 caractères minimum\n - 1 lettre majuscule minimum\n - 1 lettre minuscule minimum\n - 1 chiffre minimum\n - 1 caractère spécial minimum' : ''}
              placeholderTextColor={'#aaa'}
              returnKeyType="done"

            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              disabled={this.state.email=='' || this.state.password==''}
              style={{backgroundColor: (this.state.email!='' && this.state.password!='') ? '#4e73df' : '#d1d3e2', ...styles.nextButton}}
              onPress={() => {this._submit(this.state)}}
            >
              <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Suivant</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'space-around'
  },
  card: {
    marginVertical: '5%',
    borderRadius: 40,
  },
  form: {
    flex:1,
    justifyContent: 'space-around',
    paddingBottom: '5%',
  },
  infoText: {
    alignSelf: 'center',
    fontSize:15,
    paddingTop:10,
    fontStyle: 'italic',
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
  footer: {
    flex: 0.4,
    paddingBottom: '4%',
  },
});

export default connect(() => {return {}})(EmailPassForm)
