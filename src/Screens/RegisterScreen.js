import React from 'react'
import { connect } from 'react-redux';
import RegisterNavigation from '../Navigation/RegisterNavigation';

class RegisterScreen extends React.Component {
  render() {
    if (this.props.register_complete) {
      this.props.dispatch({ type: "REGISTER_RESET" });
      this.props.navigation.navigate("Login");
    }

    return (<RegisterNavigation/>);
  }
}

const mapStateToProps = (store) => {
  return { register_complete: store.registerFunctions.register_complete }
}

export default connect(mapStateToProps)(RegisterScreen)
