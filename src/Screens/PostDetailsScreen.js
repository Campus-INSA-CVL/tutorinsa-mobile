import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import NavBar from '../Components/NavBar';

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

class PostDetails extends React.Component {
  state = {
    loadingPostDetails: true,
    refreshing: false,
  }

  render() {
    const { post, theme } = this.props.route.params;

    return (
      <NavBar navigation={this.props.navigation} goBack>
        <View style={{backgroundColor: theme.background, ...styles.container}}>
          <Text style={{alignSelf: 'center', fontWeight: 'bold', color: theme.title}}>{post.subject.name}</Text>
        </View>
      </NavBar>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 10,
    alignItems: 'center',
    paddingHorizontal: "8%"
  },
});

export default PostDetails
