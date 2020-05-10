import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import Separator from './Separator';
import { AntDesign as Icon } from '@expo/vector-icons'
import moment from 'moment';

class Announce extends React.Component {
  render() {
    return (
      <View style={{flexDirection: 'row', flex: 1, borderRadius: 6, backgroundColor: this.props.item.type=='eleve' ? '#1cc88a' : '#4e73df', justifyContent: 'flex-end', marginRight: 10}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{this.props.item.subject.name}</Text>
          </View>
          <Separator backgroundColor='#000'/>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 5}}>
            <Icon name='calendar' color={this.props.item.type=='eleve' ? '#1cc88a' : '#4e73df'} size={25}/>
            <Text style={{fontSize: 18}}> {moment(this.props.item.date).local().format('dddd LL')}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name='clockcircleo' color={this.props.item.type=='eleve' ? '#1cc88a' : '#4e73df'} size={25}/>
            <Text style={{fontSize: 18}}> {moment(this.props.item.date).local().format('LT')} - {moment(this.props.item.endAt).local().format('LT')}</Text>
          </View>
          {
            // <View style={{backgroundColor: this.props.item.type=='tuteur' ? '#4e73df' : '#1cc88a', width: '90%', padding: 2, paddingLeft: 5, borderRadius: 10}}>
            //   <Text style={{color: 'white'}}>{this.props.item.type=='tuteur' ? 'Offre d\'un tuteur' : 'Demande d\'un étudiant'}</Text>
            // </View>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "98%",
    alignSelf: 'center',
    backgroundColor: '#e8e8e8',
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
