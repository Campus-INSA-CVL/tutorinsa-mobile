import 'react-native-gesture-handler';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { Provider } from 'react-redux';
import ErrorBoundary from './src/Components/ErrorBoundary';
import Store from './src/Store/configureStore';
import CrossingNavigator from './src/Navigation/CrossingNavigator';

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Provider store={Store}>
          <View style={{height: Dimensions.get('window').height}}>
            <CrossingNavigator/>
          </View>
        </Provider>
      </ErrorBoundary>
    );
  }
}

export default App
