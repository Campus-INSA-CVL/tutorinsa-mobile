import React from 'react'
import { View, Text } from 'react-native';

class LoadingOverlay extends React.Component {
  render() {
    if (!this.props.display) return null;

    return (
      <View style={{ flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0, 0.4)', position: 'absolute', top:0, bottom:0, left:0, right:0 }}>
        <Text style={{fontSize: 30, backgroundColor: 'white', borderRadius: 20}}>   Loading (TODO)   </Text>
      </View>
    );
  }
}

export default LoadingOverlay
