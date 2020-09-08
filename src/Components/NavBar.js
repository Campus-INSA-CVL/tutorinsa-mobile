import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native';

import Announce from '../Components/Announce';
import { MaterialIcons } from '@expo/vector-icons';

export const NAVBAR_HEIGHT = 80;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

class NavBar extends React.Component {

  componentDidMount() {
    StatusBar.setHidden(false);
  }

  getIconName() {
    if (this.props.goBack) {
      return 'arrow-back'
    }
    else if (this.props.close) {
      return 'close'
    }
    else return 'menu'
  }

  render() {
    const { theme } = this.props;

    StatusBar.setBarStyle(theme.statusbarMode, true);

    const rightIcon = this.props.rightIcon || (this.props.validate==null
                                              ? <View style={{ width: 50 }}/>
                                              : <TouchableOpacity
                                                  onPress={this.props.validate}
                                                  style={{ width: 50 }}
                                                >
                                                  <MaterialIcons
                                                  name={'check'}
                                                  color='#31a108'
                                                  size={30}
                                                  style={{paddingRight: 20}}
                                                />
                                                </TouchableOpacity>
                                              )

    const leftIcon = this.props.leftIcon || <TouchableOpacity
                                              onPress={() => {
                                                this.props.goBack || this.props.close
                                                ? this.props.navigation.goBack()
                                                : this.props.navigation.openDrawer()
                                              }}
                                              style={{ width: 50 }}
                                            >
                                              <MaterialIcons
                                                name={this.getIconName()}
                                                color={theme.separator}
                                                size={30}
                                                style={{paddingLeft: 20}}
                                              />
                                            </TouchableOpacity>

    return (
      <View style={{backgroundColor: theme.background, ...styles.container}}>
        <View style={{backgroundColor: theme.foreground, ...styles.navbar}}>
          { leftIcon }
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: theme.title}}>
              { this.props.title }
            </Text>
          </View>
          { rightIcon }
        </View>
        <View style={[styles.content, this.props.contentStyle]}>
          { this.props.children }
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: NAVBAR_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    elevation: 4,
  },
  content: {
    flex:1
  }
});


const mapStateToProps = (store) => {
  return {
    theme: store.themeFunctions.theme,
  }
}

export default connect(mapStateToProps)(NavBar)
