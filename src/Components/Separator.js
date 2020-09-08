import React from 'react'
import { View } from 'react-native';

class Separator extends React.Component {
  render() {
    return (
      <View style={{borderColor: this.props.backgroundColor, borderWidth: 0.5, height: 1, marginVertical: 10, width: '100%'}}></View>
    );
  }
}

export default Separator
