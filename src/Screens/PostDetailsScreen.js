import React from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import NavBar from '../Components/NavBar';
import Card from '../Components/Card';
import Separator from '../Components/Separator';
import moment from 'moment';
import { FontAwesome5 } from '@expo/vector-icons';

/*
{
  _id: "5e741529760c0c821cc5206e",
  comment: "top",
  creator: {},
  date: "2020-03-16T18:00:00.000Z",
  duration: "1970-01-01T01:00:00.000Z",
  endAt: "2020-03-16T19:00:00.000Z",
  room: {
    campus: "bourges",
    day: "lundi",
    duration: "1970-01-01T02:30:00.000Z",
    endAt: "2020-03-16T19:30:00.000Z",
    name: "e1.06",
    startAt: "2020-03-16T17:00:00.000Z",
    time: "2020-04-26T17:00:00.000Z",
  },
  subject: {
    name: "Résistance Des Matériaux",
  },
  tutors: [],
  type: "eleve",
},

*/

function RowItem(props) {
  return (
    <View style={styles.rowItem}>
      <View style={styles.iconContainer}>
        <FontAwesome5
          name={props.icon}
          color={props.color}
          size={32}
        />
      </View>
      <Text style={{paddingLeft: 3, color: props.color, fontWeight: 'bold', fontSize: 17}}> {props.title} </Text>
      <Text style={{paddingLeft: 3, color: props.textColor}}> {props.value}</Text>
    </View>
  )
}

class PostDetails extends React.Component {
  state = {
    loadingPostDetails: true,
    refreshing: false,
  }

  render() {
    const { post, theme } = this.props.route.params;

    const color = (post.type=='eleve') ? theme.eleve : theme.tuteur
    const campus = (post.type=='eleve') ? post.campus : post.room.campus

    const content = (post.type=='eleve')
    ? <>
        <RowItem
          icon='home'
          title='CAMPUS'
          value={campus.charAt(0).toUpperCase() + campus.slice(1)}
          color={color}
          textColor={theme.text}
        />
        <RowItem
          icon='calendar-alt'
          title='DATE'
          value={moment(post.date).local().format('dddd LL').charAt(0).toUpperCase() + moment(post.date).local().format('dddd LL').slice(1)}
          color={color}
          textColor={theme.text}
        />
        <RowItem
          icon='clock'
          title='HEURE'
          value={moment(post.date).local().format('LT') + ' - ' + moment(post.endAt).local().format('LT')}
          color={color}
          textColor={theme.text}
        />
      </>

    : <>
        <RowItem
        icon='home'
        title='CAMPUS'
        value={campus.charAt(0).toUpperCase() + campus.slice(1)}
        color={color}
        textColor={theme.text}
        />
        <RowItem
        icon='calendar-alt'
        title='DATE'
        value={moment(post.date).local().format('dddd LL').charAt(0).toUpperCase() + moment(post.date).local().format('dddd LL').slice(1)}
        color={color}
        textColor={theme.text}
        />
        <RowItem
        icon='clock'
        title='HEURE'
        value={moment(post.date).local().format('LT') + ' - ' + moment(post.endAt).local().format('LT')}
        color={color}
        textColor={theme.text}
        />
        <RowItem
        icon='chalkboard-teacher'
        title='SALLE'
        value={post.room.name.toUpperCase()}
        color={color}
        textColor={theme.text}
        />
      </>

    return (
      <NavBar navigation={this.props.navigation} title="Détails de l'annonce" goBack>
        <ScrollView contentContainerStyle={{backgroundColor: theme.background, ...styles.container}}>
          <Card theme={theme} style={styles.card}>
            <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17, color: theme.title}}>{post.subject.name.toUpperCase()}</Text>
            <Text style={{alignSelf: 'center', fontSize: 13, color: theme.subtitle}}>{moment(post.createdAt).fromNow()}</Text>
            <Separator backgroundColor={theme.separator}/>
            { content }
            <View>
              <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 17, color: theme.title}}>Détails : </Text>
              <Text style={{alignSelf: 'center', color: theme.text}}>{post.comment}</Text>
            </View>
          </Card>
        </ScrollView>
      </NavBar>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
  },
  card: {
    flex: undefined,
    width: '80%',
    margin: '5%',
  },
  iconContainer: {
    width: 40,
    alignItems: 'center'
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5
  }
});

export default PostDetails
