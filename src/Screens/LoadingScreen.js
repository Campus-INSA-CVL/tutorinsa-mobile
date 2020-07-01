import React from 'react'
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Dimensions,
  Image,
  Alert,
  Platform,
  Text,
  StatusBar,
} from 'react-native';

import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import client, { handleAllErrors } from '../feathers-client';

import moment from 'moment';
import 'moment/min/locales'
import { NativeModules } from 'react-native'
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons'

const materialIconsList = ['menu', 'account-circle', 'error-outline', 'check', 'arrow-back']
const antDesignList = ['calendar', 'clockcircleo']
const featherList = ['check', 'edit-3', 'cpu', 'settings', 'shield', 'mail', 'award']

class LoadingScreen extends React.Component {
  state = {
    animationFinished: false,
    loadingFinished: false,
    isServerAvailable: false,
  }

  constructor(props) {
    super(props);
    this.size = new Animated.Value(1000);
  }

  loadIcons() {
    list = []

    antDesignList.forEach((item, i) => {
      list.push(<AntDesign name={item} key={'ant'+i}/>);
    });

    materialIconsList.forEach((item, i) => {
      list.push(<MaterialIcons name={item} key={'mat'+i}/>);
    });

    featherList.forEach((item, i) => {
      list.push(<Feather name={item} key={'fea'+i}/>);
    });

    return list;
  }

  checkInternet() {

    let auth_false = () => {this.props.dispatch({ type: "AUTH_FALSE" })}

    client.service('years').find()
          .then((data) => {
            this.props.dispatch({ type: "API_YEARS", value: data });
            client.service('departments').find()
                  .then((data) => {
                    this.props.dispatch({ type: "API_DEPARTMENTS", value: data });
                    client.service('subjects').find()
                          .then((data) => {
                            this.props.dispatch({ type: "API_SUBJECTS", value: data });
                            this.setState({isServerAvailable: true});
                            this.syncAnimAndLoading();
                          }).catch((e) => {
                            handleAllErrors(e, () => {this.checkInternet()}, auth_false);
                          });
                  }).catch((e) => {
                    handleAllErrors(e, () => {this.checkInternet()}, auth_false);
                  });
          })
          .catch((e) => {
            handleAllErrors(e, () => {this.checkInternet()}, auth_false);
          });
  }

  syncAnimAndLoading() {
    if (this.state.animationFinished && this.state.loadingFinished && this.state.isServerAvailable) {
      this.props.onLoadingFinished();
    }
  }

  componentDidMount() {
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

    this.checkInternet();

    Animated.timing(
      this.size,
      {
        toValue: Dimensions.get('window').width*0.3,
        duration: 1500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false
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
    StatusBar.setHidden(true);
    return (
      <View style={{flex: 1}}>
        <View style={{position: 'absolute', top: -500, left: 0}}>
          { this.loadIcons() }
        </View>
        <LinearGradient
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          colors={['#7196ff', '#224abe', '#324389']}
          start={{x:0, y:0}}
          end={{x:0, y:1}}
          locations={[0.05, 0.45, 1]}
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
