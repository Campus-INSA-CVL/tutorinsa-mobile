import React from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

class Input extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          {...this.props}
        />
        {
          (this.props.value)
          ? <TouchableOpacity onPress={() => {this.props.onChangeText('')}}>
              <Icon name='x' size={25} color='#555' style={{marginLeft: 'auto'}}/>
            </TouchableOpacity>
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderColor: '#d1d3e2',
    paddingHorizontal: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '95%',
  },
  inputStyle: {
    paddingVertical: 5,
    fontSize: 18,
    flex: 1
  }
});

export default Input
