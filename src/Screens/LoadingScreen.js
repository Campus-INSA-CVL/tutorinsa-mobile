import React from 'react'
import { StyleSheet, View, Animated, Easing, Dimensions, Image, Alert, Platform, Text } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import client from '../feathers-client';

import moment from 'moment';
import 'moment/min/locales'
import { NativeModules } from 'react-native'

import { MaterialIcons, AntDesign } from '@expo/vector-icons'

const materialIconsList = ['menu', 'account-circle', 'error-outline', 'check', 'arrow-back']
const antDesignList = ['calendar', 'clockcircleo']

class LoadingScreen extends React.Component {
  state = {
    animationFinished: false,
    loadingFinished: false,
  }

  constructor(props) {
    super(props);
    this.size = new Animated.Value(1000);

    client.reAuthenticate().then((res) => {
      this.setState({loadingFinished: true});
      this.props.dispatch({ type: "AUTH_TRUE" });
      this.props.dispatch({ type: "API_USER", value: res.user });
      this.syncAnimAndLoading();
    }).catch((e)=>{
      this.setState({loadingFinished: true});
      this.props.dispatch({ type: "AUTH_FALSE" });
      this.syncAnimAndLoading();
    });
  }

  loadIcons() {
    list = []

    antDesignList.forEach((item, i) => {
      list.push(<AntDesign name={item} key={'ant'+i}/>);
    });

    materialIconsList.forEach((item, i) => {
      list.push(<MaterialIcons name={item} key={'mat'+i}/>);
    });

    return list;
  }


  syncAnimAndLoading() {
    if (this.state.animationFinished && this.state.loadingFinished) {
      this.props.onLoadingFinished();
    }
  }


  componentDidMount() {
    Animated.timing(
      this.size,
      {
        toValue: Dimensions.get('window').width*0.3,
        duration: 1500,
        easing: Easing.out(Easing.exp)
      }
    ).start(() => {
      this.setState({animationFinished: true});
      this.syncAnimAndLoading();
    });

    const deviceLocale = Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier

    moment.locale(deviceLocale)
  }

  render() {
    console.log(Dimensions.get("window").width + " x " + Dimensions.get("window").height);
    return (
      <View style={{flex: 1}}>
        <View style={{position: 'absolute', top: -500, left: 0}}>
          { this.loadIcons() }
        </View>
        <LinearGradient
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          colors={['#4e73df', '#224abe']}
          start={{x:0, y:0.1}}
          end={{x:0, y:1}}
        >
        <Animated.View style={{width: this.size, height: this.size, borderRadius: 100, backgroundColor: 'white', alignItems:'center', justifyContent:'center'}}>
          <Image
            source={require('../../assets/icon-empty.png')}
            style={{
              width: Dimensions.get("window").width*0.3,
              height: Dimensions.get("window").width*0.3,
              resizeMode: "stretch",
            }}
          />
        </Animated.View>
        </LinearGradient>
      </View>
    );
  }
}

export default connect(() => {return {}})(LoadingScreen)
