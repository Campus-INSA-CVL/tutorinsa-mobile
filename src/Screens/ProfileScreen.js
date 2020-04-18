import React from 'react'
import { connect } from 'react-redux';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import client from '../feathers-client';

class Posts extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            client.logout();
            this.props.dispatch({ type: 'AUTH_FALSE' });
          }}
        >
          <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    paddingVertical: 10,
    width:'80%',
    borderRadius: 20,
    backgroundColor: '#4e73df',
    paddingHorizontal: 10,
  },
});

export default connect(() => {return {}})(Posts)
