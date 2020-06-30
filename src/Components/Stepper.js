import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

class Stepper extends React.Component {
  dotWidth = Dimensions.get('window').width*0.07;

  render() {

    var steps=[];

    for (let i=0; i<this.props.number; i++) {
      if (this.props.selected>=i+1) {
        steps.push(
          <Icon key={'check_' + i} name='check' size={this.dotWidth} color='#7196ff'/>
        );
      }
      else {
        steps.push(
          <View key={'dotContainer_' + i} style={{
            width: this.dotWidth,
            alignItems: 'center'
          }}>
            <View key={'dot_' + i} style={{
              borderRadius: 20,
              width: this.dotWidth/3,
              height: this.dotWidth/3,
              ...this.props.selected==i
              ? this.props.checkedStyle || styles.checked
              : this.props.uncheckedStyle || styles.unchecked
            }}/>
          </View>
        );
      }

      if (i!=this.props.number-1) {
        steps.push(
          <View key={'line_' + i} style={{
            borderRadius: 20,
            width: this.dotWidth/2,
            height: 3,
            marginHorizontal: '1%',
            ...this.props.selected>=i+1 ? this.props.checkedStyle || styles.checked : this.props.uncheckedStyle || styles.unchecked
          }}/>
        );
      }
    }

    return (
      <View style={styles.container}>
          { steps }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checked: {
    backgroundColor: '#7196ff', // '#4e73df',
  },
  unchecked: {
    backgroundColor: 'white', // '#d1d3e2',
  }
});

export default Stepper
