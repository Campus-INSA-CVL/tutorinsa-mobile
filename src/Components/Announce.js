import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import Separator from './Separator';
import { AntDesign as Icon } from '@expo/vector-icons'
import moment from 'moment';
import { connect } from 'react-redux';

class Announce extends React.Component {
  render() {
    const { theme } = this.props;

    return (
      <View style={{
        backgroundColor: theme.foreground,
        flex: 1,
        borderRadius: 6,
        overflow: 'hidden',
        marginRight: 10
      }}>
        <View style={{
          backgroundColor: this.props.item.type=='eleve'
            ? theme.eleve
            : theme.tuteur,

          ...styles.announce
        }}>
        <View style={{ backgroundColor: theme.background, ...styles.container }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: theme.title}}>{this.props.item.subject.name}</Text>
          <Separator backgroundColor={theme.separator}/>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 5}}>
            <Icon
              name='calendar'
              color={this.props.item.type=='eleve' ? theme.eleve : theme.tuteur}
              size={25}
            />
            <Text style={{fontSize: 18, color: theme.subtitle}}> {moment(this.props.item.date).local().format('dddd LL')}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name='clockcircleo'
              color={this.props.item.type=='eleve' ? theme.eleve : theme.tuteur}
              size={25}
            />
            <Text style={{fontSize: 18, color: theme.subtitle}}> {moment(this.props.item.date).local().format('LT')} - {moment(this.props.item.endAt).local().format('LT')}</Text>
          </View>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  announce: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    width: "98.5%",
    padding: 10,
  },
});


const mapStateToProps = (store) => {
  return {
    theme: store.themeFunctions.theme,
  }
}

export default connect(mapStateToProps)(Announce)
