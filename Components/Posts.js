import React from 'react'
import { StyleSheet, View, Text } from 'react-native';

class Posts extends React.Component {
  static navigationOptions = {
      title: "Posts",
      headerShown: true,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Test</Text>
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
