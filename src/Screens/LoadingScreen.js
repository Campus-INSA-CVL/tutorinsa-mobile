import React from 'react'
import {
  View,
  Animated,
  Easing,
  Dimensions,
  Image,
  Platform,
  StyleSheet
} from 'react-native'

import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import client, { handleAllErrors, fetchAPI } from '../feathers-client'

import moment from 'moment'
import 'moment/min/locales'
import { NativeModules } from 'react-native'
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5
} from '@expo/vector-icons'

const materialCommuIconsList = [
  'heart',
  'heart-broken',
  'circle',
]

const materialIconsList = [
  'menu',
  'account-circle',
  'error-outline',
  'check',
  'arrow-back',
  'filter-list',
]

const antDesignList = [
  'calendar',
  'clockcircleo',
  'home',
]

const fontAwesomeList = ['caret-down']

const fontAwesome5List = [
  'chalkboard-teacher',
  'home',
  'calendar-alt',
  'clock',
]

const featherList = [
  'x',
  'check',
  'edit',
  'cpu',
  'settings',
  'shield',
  'zap',
  'mail',
  'award',
  'layers',
  'help-circle',
  'map',
  'briefcase'
]

const LOADED_ARRAY = [
  'rooms',
  'years',
  'departments',
  'subjects',
  'animation',
  'theme',
  'auth'
]

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.loaded = [] // The app is fully loaded when this array is equals to LOADED_ARRAY
    this.size = new Animated.Value(1000)
  }

  loadIcons() {
    list = []

    antDesignList.forEach((item, i) => {
      list.push(<AntDesign name={item} key={'ant'+i}/>)
    })

    materialCommuIconsList.forEach((item, i) => {
      list.push(<MaterialCommunityIcons name={item} key={'matcomm'+i}/>)
    })

    materialIconsList.forEach((item, i) => {
      list.push(<MaterialIcons name={item} key={'mat'+i}/>)
    })

    featherList.forEach((item, i) => {
      list.push(<Feather name={item} key={'fea'+i}/>)
    })

    fontAwesomeList.forEach((item, i) => {
      list.push(<FontAwesome name={item} key={'fon'+i}/>)
    })

    fontAwesome5List.forEach((item, i) => {
      list.push(<FontAwesome5 name={item} key={'fon5'+i}/>)
    })

    return list
  }

  async loadTheme() {
    try {
      const theme = await AsyncStorage.getItem('tutorinsa_theme')
      if(theme !== null) {
        this.props.dispatch({ type: "THEME_"+theme })
      }
      this.syncAnimAndLoading('theme')
    } catch(e) {
      console.log('Error while loading the theme : ' + e.name)
    }
  }

  checkInternet() {
    let onTokenExpired = () => {
      this.props.dispatch({ type: "AUTH_FALSE" })
      this.checkInternet()
    }

    fetchAPI('years')
      .then((data) => {
        this.props.dispatch({ type: "API_YEARS", value: data })
        this.syncAnimAndLoading('years')
      })
      .catch((e) => {
        console.log(e)
        handleAllErrors(e, () => {this.checkInternet()}, onTokenExpired, true)
      })

    fetchAPI('departments')
      .then((data) => {
        this.props.dispatch({ type: "API_DEPARTMENTS", value: data })
        this.syncAnimAndLoading('departments')
      })
      .catch((e) => {
        console.log(e)
        handleAllErrors(e, () => {this.checkInternet()}, onTokenExpired, true)
      })

    fetchAPI('subjects')
      .then((data) => {
        this.props.dispatch({ type: "API_SUBJECTS", value: data })
        this.syncAnimAndLoading('subjects')
      })
      .catch((e) => {
        console.log(e)
        handleAllErrors(e, () => {this.checkInternet()}, onTokenExpired, true)
      })

    fetchAPI('rooms')
      .then((data) => {
        this.props.dispatch({ type: "API_ROOMS", value: data })
        this.syncAnimAndLoading('rooms')
      })
      .catch((e) => {
        console.log(e)
        handleAllErrors(e, () => {this.checkInternet()}, onTokenExpired, true)
      })
  }

  syncAnimAndLoading(service) {
    this.loaded.push(service)

    if (this.loaded.length == LOADED_ARRAY.length) {
      this.props.onLoadingFinished()
    }
  }

  componentDidMount() {
    client.reAuthenticate().then((res) => {
      this.props.dispatch({ type: "AUTH_TRUE" })
      this.props.dispatch({ type: "API_USER", value: res.user })
      this.syncAnimAndLoading('auth')
    }).catch((e)=>{
      this.props.dispatch({ type: "AUTH_FALSE" })
      this.syncAnimAndLoading('auth')
    })

    this.checkInternet()
    this.loadTheme()

    Animated.timing(
      this.size,
      {
        toValue: Dimensions.get('window').width*0.3,
        duration: 1500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false
      }
    ).start(() => {
      this.syncAnimAndLoading('animation')
    })

    const deviceLocale = Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier

    moment.locale(deviceLocale)
  }

  render() {
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
        <Animated.View
          style={{
            width: this.size,
            height: this.size,
            ...styles.logoContainer
          }}
        >
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
    )
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    borderRadius: 100,
    backgroundColor: 'white',
    alignItems:'center',
    justifyContent:'center'
  }
})

export default connect(() => {return {}})(LoadingScreen)
