import React from 'react'
import { View, ActivityIndicator, StyleSheet} from 'react-native';

class LoadingWheel extends React.Component {
  render() {
    if (this.props.display==false) return null;
    if (this.props.overlay) return (
      <View style={styles.overlay}>
        <View style={{padding: 10, borderRadius: 500, backgroundColor: 'rgba(255,255,255, 1)'}}>
          <ActivityIndicator size='large'/>
        </View>
      </View>
    );
    return (
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center', ...this.props.style}}>
        <ActivityIndicator size='large'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.4)',
    position: 'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    elevation: 5
  }
})

export default LoadingWheel
