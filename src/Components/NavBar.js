import React from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Platform, Dimensions } from 'react-native';
import Announce from '../Components/Announce';
import { MaterialIcons } from '@expo/vector-icons'

const NAVBAR_HEIGHT = 80;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

class NavBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: Dimensions.get('window').height-NAVBAR_HEIGHT}}>
          { this.props.children }
        </View>
        <View style={styles.navbar}>
          <TouchableOpacity
            onPress={() => {
              this.props.goBack
              ? this.props.navigation.goBack()
              : this.props.navigation.openDrawer()
            }}
            style={{ width: 50 }}>
            <MaterialIcons name={this.props.goBack ? 'arrow-back' : 'menu'} color='#777' size={30} style={{paddingLeft: 20}}/>
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              { this.props.title }
            </Text>
          </View>
          <View style={{ width: 50 }}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex:1,
    justifyContent: 'flex-end'
  },
  contentContainer: {
    paddingTop: NAVBAR_HEIGHT,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: NAVBAR_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    backgroundColor: 'white',

    // Shadow //
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11,
    // --- //
  },
});

export default NavBar
