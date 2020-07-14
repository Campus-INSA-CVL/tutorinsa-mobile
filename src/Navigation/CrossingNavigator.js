import React from 'react';
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  YellowBox
} from 'react-native';
import { connect } from 'react-redux';
import LoadingScreen from '../Screens/LoadingScreen'
import { LinearGradient } from 'expo-linear-gradient';
import AuthStackNavigation from '../Navigation/AuthStackNavigation'
import MainDrawerNavigation from '../Navigation/MainDrawerNavigation'
import ProfileScreen from '../Screens/ProfileScreen'

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove if there is another way to do it
])

class CrossingNavigator extends React.Component {
  state = {
    loading: true,
  };

  render() {
    if (this.state.loading) {
      StatusBar.setHidden(true);
      return (
        <LoadingScreen
          onLoadingFinished={() => {
            this.setState({ loading: false });
          }}
        />
      );
    }
    else if (this.props.auth_success) {
      return(<MainDrawerNavigation theme={this.props.theme}/>);
    }
    else {
      StatusBar.setHidden(false);
      StatusBar.setBarStyle('light-content', true);
      return(
          <LinearGradient
            style={{ height: Dimensions.get('window').height }}
            colors={['#7196ff', '#224abe', '#324389']}
            start={{x:0, y:0}}
            end={{x:0, y:1}}
            locations={[0.05, 0.45, 1]}
          >
            <KeyboardAvoidingView behavior="height">
              <ScrollView contentContainerStyle={{ height: Dimensions.get('window').height}}>
                <AuthStackNavigation/>
              </ScrollView>
            </KeyboardAvoidingView>
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
