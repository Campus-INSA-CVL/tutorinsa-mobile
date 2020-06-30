import React from 'react'
import { Text, Linking, TouchableOpacity } from 'react-native';

class InternalLink extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => {this.props.navigation.navigate(this.props.target)}}>
        <Text style={{paddingVertical: 5, color: 'blue'}}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

export default InternalLink
