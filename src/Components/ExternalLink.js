import React from 'react'
import { Text, Linking, TouchableOpacity } from 'react-native';

class ExternalLink extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => {Linking.openURL(this.props.target)}}>
        <Text style={{paddingVertical: 5, color: 'blue'}}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

export default ExternalLink
