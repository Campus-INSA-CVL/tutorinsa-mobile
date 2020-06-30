import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Feather as Icon } from '@expo/vector-icons'

import RegisterNavigation from '../Navigation/RegisterNavigation';
import Stepper from '../Components/Stepper';

class RegisterScreen extends React.Component {

  render() {
    if (this.props.register_complete) {
      this.props.dispatch({ type: "REGISTER_RESET" });
      this.props.navigation.navigate("Login");
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {this.props.navigation.navigate("Welcome")}}
          >
            <Icon name='chevron-left' size={32} color='white'/>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <RegisterNavigation/>
        </View>
        <View style={styles.footer}>
          <Stepper number={7} selected={this.props.currentStep}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  backButton: {
    paddingHorizontal: 10,
    paddingTop: 10
  },
  content: {
    flex: 9,
  },
  header: {
    paddingTop: 24,
    marginBottom: 10
  },
  footer: {
    flex: 1,
    justifyContent: 'center'
  },
});

const mapStateToProps = (store) => {
  return {
    register_complete: store.registerFunctions.register_complete,
    currentStep: store.stepperFunctions.currentStep
  }
}

export default connect(mapStateToProps)(RegisterScreen)
