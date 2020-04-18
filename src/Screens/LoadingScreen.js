import React from 'react'
import { StyleSheet, View, Animated, Easing, Dimensions, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import client from '../feathers-client';

class LoadingScreen extends React.Component {
  state = {
    animationFinished: false,
    loadingFinished: false,
  }

  syncAnimAndLoading() {
    if (this.state.animationFinished && this.state.loadingFinished) {
      this.props.onLoadingFinished();
    }
  }

  constructor(props) {
    super(props);
    this.size = new Animated.Value(1000);

    client.reAuthenticate().then(() => {
      this.setState({loadingFinished: true});
      this.props.onAuthSuccess();
      this.syncAnimAndLoading();
    }).catch((e)=>{
      this.setState({loadingFinished: true});
      this.syncAnimAndLoading();
    });
  }

  componentDidMount() {
    Animated.timing(
      this.size,
      {
        toValue: Dimensions.get('window').height*0.185,
        duration: 1500,
        easing: Easing.out(Easing.exp)
      }
    ).start(() => {
      this.setState({animationFinished: true});
      this.syncAnimAndLoading();
    });
  }

  render() {
    return (
      <LinearGradient
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      colors={['#4e73df', '#224abe']}
      start={{x:0, y:0.1}}
      end={{x:0, y:1}}
      >
        <Animated.View style={{bottom:20, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', width: this.size, height: this.size, borderRadius: 100}}>
          <Animated.Image
            source={require('../../assets/splash-empty.png')}
            style={{resizeMode: "center", top:20}}
          />
        </Animated.View>
      </LinearGradient>
    );
  }
}

export default LoadingScreen
