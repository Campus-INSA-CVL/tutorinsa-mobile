import React from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import LoadingScreen from '../Screens/LoadingScreen'
import { LinearGradient } from 'expo-linear-gradient';
import AuthStackNavigation from '../Navigation/AuthStackNavigation'
import MainDrawerNavigation from '../Navigation/MainDrawerNavigation'

class CrossingNavigator extends React.Component {
  state = {
    loading: true,
  };

  render() {
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('light-content', true);

    if (this.state.loading) {
      return (
        <LoadingScreen
          onLoadingFinished={() => {
            this.setState({ loading: false });
          }}
        />
      );
    }
    else if (this.props.auth_success) {
      return(<MainDrawerNavigation theme={this.props.theme}/>)
    }
    else {
      return(
        <LinearGradient
          style={{ flex: 1 }}
          colors={['#7196ff', '#224abe', '#324389']}
          start={{x:0, y:0}}
          end={{x:0, y:1}}
          locations={[0.05, 0.45, 1]}
        >
          <AuthStackNavigation/>
        </LinearGradient>
      );
    }
  }
}

const mapStateToProps = (store) => {
  return {
    auth_success: store.authFunctions.auth_success,
    theme: store.themeFunctions.theme,
  }
}

export default connect(mapStateToProps)(CrossingNavigator)
