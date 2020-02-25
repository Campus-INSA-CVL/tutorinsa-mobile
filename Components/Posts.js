import React from 'react'
import { StyleSheet, View, Text } from 'react-native';

class Posts extends React.Component {
  static navigationOptions = {
      headerShown: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Testtt</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});

export default Posts
