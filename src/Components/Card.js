import React from 'react'
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function Card(props) {
  const { children, style, theme } = props;

  if (props.onFocus) {
    useFocusEffect(
      React.useCallback(props.onFocus, [])
    );
  }

  return (
    <View style={{backgroundColor: theme.foreground, ...styles.container, ...style}}>
      {children}
    </View>
  );
}

Card.defaultProps = {
  theme: {
    foreground: '#ffffff',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '10%',
    padding: '5%',
    borderRadius: 20,
  },
});
