import React from 'react'
import { connect } from 'react-redux';
import LoadingScreen from '../Screens/LoadingScreen'
import AuthStackNavigation from '../Navigation/AuthStackNavigation'
import MainDrawerNavigation from '../Navigation/MainDrawerNavigation'

class CrossingNavigator extends React.Component {
  state = {
    loading: true,
  };

  render() {
    if (this.state.loading) {
      return (<LoadingScreen
                onLoadingFinished={() => {this.setState({loading: false})}}
              />
      );
    }
    else if (this.props.auth_success) {
      return(<MainDrawerNavigation/>)
    }
    else {
      return(<AuthStackNavigation/>)
    }
  }
}

const mapStateToProps = (store) => {
  return { auth_success: store.auth_success}
}

export default connect(mapStateToProps)(CrossingNavigator)
