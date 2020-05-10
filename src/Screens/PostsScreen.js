import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Announce from '../Components/Announce';
import NavBar from '../Components/NavBar';
import LoadingWheel from '../Components/LoadingWheel';
import client, { handleErrors } from '../feathers-client';

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

class Posts extends React.Component {
  state = {
    loadingPosts: true,
    postsData: [],
    refreshing: false,
  }

  componentDidMount() {
    client.service('posts').find()
          .then((res) => {
            this.setState({
              loadingPosts: false,
              postsData: res.data,
            });
          })
          .catch(handleErrors);
  }

  render() {
    let content;

    if (this.state.loadingPosts) {
      content = <LoadingWheel/>
    }
    else {
      content = <FlatList
                  contentContainerStyle={{paddingBottom:20}}
                  refreshing={this.state.refreshing}
                  onRefresh={() => {
                    client.service('posts').find()
                          .then((res) => {
                            this.setState({
                              refreshing: false,
                              postsData: res.data,
                            });
                          })
                          .catch((e) => {
                            this.setState({refreshing: false})
                            handleErrors(e)
                          });
                  }}
                  data={this.state.postsData}
                  keyExtractor={(item, index) => item._id}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate("PostDetails", {post: item})
                        }}
                        style={{
                          margin: 20,
                          marginBottom: 0
                        }}
                      >
                        <Announce item={item}/>
                      </TouchableOpacity>
                    )
                  }}
                />
    }

    return (
      <NavBar title="Posts" navigation={this.props.navigation}>
        { content }
      </NavBar>
    );
  }
}

export default Posts
