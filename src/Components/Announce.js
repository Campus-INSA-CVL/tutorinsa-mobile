import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import Separator from './Separator'

class Announce extends React.Component {
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{this.props.item.matiere}</Text>
          </View>
          <Separator backgroundColor='#000'/>
          <View style={{flexDirection: 'row', flex:1}}>
            <View style={styles.left}>
              <Text style={{fontSize: 18}}>{this.props.item.date}</Text>
              <Text style={{fontSize: 15}}>{this.props.item.debut} - {this.props.item.fin}</Text>
            </View>
            <View style={styles.right}>
              {// <View style={{backgroundColor: this.props.item.type=='tuteur' ? '#4e73df' : '#1cc88a', width: '90%', padding: 2, paddingLeft: 5, borderRadius: 10}}>
              //   <Text style={{color: 'white'}}>{this.props.item.type=='tuteur' ? 'Offre d\'un tuteur' : 'Demande d\'un étudiant'}</Text>
              // </View>
            }
              <Text style={{paddingRight: 15, alignSelf: 'flex-end'}}>{this.props.item.auteur}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignSelf: 'center',
    backgroundColor: '#4e73df',
    borderRadius: 6,
    width: '100%',
    padding: 10,
  },
  header: {
  },
  left: {
    flex: 1,
    paddingLeft: 10
  },
  right: {
    flex: 1.2,
  },
});

export default Announce
