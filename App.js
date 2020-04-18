import 'react-native-gesture-handler';
import React from 'react';
import ErrorBoundary from './src/Components/ErrorBoundary';
import { Dimensions, View, AsyncStorage } from 'react-native';
import LoadingScreen from './src/Screens/LoadingScreen'
import AuthStackNavigation from './src/Navigation/AuthStackNavigation'
import MainDrawerNavigation from './src/Navigation/MainDrawerNavigation'

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state'
]);


class App extends React.Component {
  state = {
    auth_success: false,
    loading: true,
  };

  render() {
    let component;
    if (this.state.loading) {
      component = <LoadingScreen
                    onLoadingFinished={() => {this.setState({loading: false})}}
                    onAuthSuccess={() => {this.setState({auth_success: true})}}
                  />
    }
    else if (this.state.auth_success) {
      component = <MainDrawerNavigation/>
    }
    else {
      component = <AuthStackNavigation
                    onLoginSuccess={() => {
                      this.setState({auth_success: true});
                    }}
                  />
    }

    return (
      <ErrorBoundary>
        <View style={{height: Dimensions.get('window').height}}>
          { component }
        </View>
      </ErrorBoundary>
    );
  }
}

export default App
