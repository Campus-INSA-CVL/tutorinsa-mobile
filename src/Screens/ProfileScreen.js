import React from 'react'
import { connect } from 'react-redux';
import client from '../feathers-client';
import moment from 'moment';

import { StyleSheet, View, ScrollView, Text, FlatList, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import NavBar from '../Components/NavBar';
import { MaterialIcons } from '@expo/vector-icons'

class Posts extends React.Component {
  render() {
    const { user } = this.props;
    const fullName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) + " " + user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)
    // const fullName = "Jean-Michel De la Bruyère"

    console.log(user);

    return (
      <NavBar title="Mon profil" navigation={this.props.navigation}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={{flexDirection: 'row', marginBottom: 30, paddingHorizontal: "7%"}}>
            <Avatar
              size='xlarge'
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              }}
              rounded
              showAccessory
            />
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{fontWeight: 'bold', fontSize: 30}}>{fullName}</Text>
              <Text style={{color: '#999'}}>Inscrit {moment(user.createdAt).fromNow()}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              client.logout();
              this.props.dispatch({ type: 'AUTH_FALSE' });
              this.props.dispatch({ type: 'API_USER', value: null });
            }}
          >
            <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </NavBar>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 25,
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  loginButton: {
    paddingVertical: 10,
    width:'80%',
    borderRadius: 20,
    backgroundColor: '#4e73df',
    paddingHorizontal: 10,
  },
});

const mapStateToProps = (store) => {
  return { user: store.apiFunctions.user}
}

export default connect(mapStateToProps)(Posts)
