import React from 'react'
import { StyleSheet, View } from 'react-native';

export default function Card(props) {
  const { children, style } = props;
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: '10%',
    padding: '5%',
    borderRadius: 20,
  },
});
