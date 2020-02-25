import React from 'react'
import { Text, Linking, TouchableOpacity } from 'react-native';

class ExternalLink extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => {Linking.openURL(this.props.url)}}>
        <Text style={{paddingVertical: 5, color: 'blue'}}>{this.props.value}</Text>
      </TouchableOpacity>
    );
  }
}

export default ExternalLink
