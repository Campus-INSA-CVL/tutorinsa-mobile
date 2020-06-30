import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Platform, Dimensions } from 'react-native';
import Announce from '../Components/Announce';
import { MaterialIcons } from '@expo/vector-icons';

const NAVBAR_HEIGHT = 80;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

class NavBar extends React.Component {
  render() {
    const { theme } = this.props;

    return (
      <View style={{backgroundColor: theme.background, ...styles.container}}>
        <View style={{height: Dimensions.get('window').height-NAVBAR_HEIGHT}}>
          { this.props.children }
        </View>
        <View style={{backgroundColor: theme.background, ...styles.navbar}}>
          <TouchableOpacity
            onPress={() => {
              this.props.goBack
              ? this.props.navigation.goBack()
              : this.props.navigation.openDrawer()
            }}
            style={{ width: 50 }}>
            <MaterialIcons name={this.props.goBack ? 'arrow-back' : 'menu'} color={theme.subtitle /*'#777'*/} size={30} style={{paddingLeft: 20}}/>
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: theme.title}}>
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

    // Shadow //
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 3,
    // --- //
  },
});


const mapStateToProps = (store) => {
  return {
    theme: store.themeFunctions.theme,
  }
}

export default connect(mapStateToProps)(NavBar)
