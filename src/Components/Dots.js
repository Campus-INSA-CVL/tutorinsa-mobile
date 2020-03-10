import React from 'react'
import { StyleSheet, View } from 'react-native';

class Dots extends React.Component {
  render() {

    var dots=[];

    for (let i=0; i<this.props.number; i++) {
      dots.push(
        <View key={'dot_' + i} style={{
          borderRadius: 20,
          width: 10,
          height: 10,
          marginHorizontal: '1%',
          ...this.props.selected==i ? this.props.checkedStyle || styles.checked : this.props.uncheckedStyle || styles.unchecked
        }}/>
      );
    }

    return (
      <View style={styles.container}>
          { dots }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#4e73df',
  },
  unchecked: {
    backgroundColor: '#ddd',
  }
});

export default Dots
