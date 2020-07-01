import React from 'react'
import client, { handleAllErrors } from '../feathers-client';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';

import { Feather as Icon } from '@expo/vector-icons';
import Announce from '../Components/Announce';
import NavBar from '../Components/NavBar';
import LoadingWheel from '../Components/LoadingWheel';

const ADDBUTTON_SIZE = Dimensions.get('window').width/6;

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
          .catch(handleAllErrors);
  }

  render() {
    const { theme } = this.props;
    let content;

    if (this.state.loadingPosts) {
      content = <LoadingWheel/>
    }
    else {
      content = <FlatList
                  contentContainerStyle={{ backgroundColor: theme.background, ...styles.flatlistContainer }}
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
                            handleAllErrors(e)
                          });
                  }}
                  data={this.state.postsData}
                  keyExtractor={(item, index) => item._id}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate("PostDetails", {post: item, theme: theme})
                        }}
                        style={styles.itemStyle}
                      >
                        <Announce item={item}/>
                      </TouchableOpacity>

                    );
                  }}
                />
    }

    return (
      <NavBar title="Posts" navigation={this.props.navigation}>
        { content }
        <View style={{backgroundColor: theme.foreground, ...styles.addButton, ...styles.overButton}}>
          <TouchableOpacity style={{backgroundColor: theme.button, ...styles.addButton}}>
            <Icon name='plus' size={ADDBUTTON_SIZE} color={theme.buttonLabel}/>
          </TouchableOpacity>
        </View>
      </NavBar>
    );
  }
}

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingBottom:20+ADDBUTTON_SIZE*2
  },
  itemStyle: {
    margin: 20,
    marginBottom: 0,
  },
  overButton: {
    position: 'absolute',
    bottom: ADDBUTTON_SIZE/4,
    right: ADDBUTTON_SIZE/4,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ADDBUTTON_SIZE,
    width: ADDBUTTON_SIZE*1.1,
    height: ADDBUTTON_SIZE*1.1,
  }
});

const mapStateToProps = (store) => {
  return {
    theme: store.themeFunctions.theme,
  }
}

export default connect(mapStateToProps)(Posts)
