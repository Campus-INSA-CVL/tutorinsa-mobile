import React from 'react'
import { View } from 'react-native';

class Separator extends React.Component {
  render() {
    return (
      <View style={{borderColor: '#ddd', borderWidth: 0.5, height: 1}}></View>
    );
  }
}

export default Separator
