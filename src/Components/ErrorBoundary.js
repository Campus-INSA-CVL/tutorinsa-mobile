import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons as Icon } from '@expo/vector-icons'


class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError (error) {
    return { hasError: true }
  }

  componentDidCatch (error, info) {
    console.error(error, info.componentStack)
  }

  render () {
    return this.state.hasError ?
      <LinearGradient
        style={{flex:1, justifyContent: 'center'}}
        colors={['#4e73df', '#224abe']}
        start={{x:0, y:0.1}}
        end={{x:0, y:1}}
      >
        <View style={styles.container}>
          <Icon name='error-outline' color='#d01427' size={100}/>
          <View style={styles.header}>
            <Text style={{fontWeight: 'bold', fontSize: 19}}>Une erreur s'est produite,</Text>
            <Text style={{fontWeight: 'bold', fontSize: 19}}>veuillez redémarrer l'application.</Text>
          </View>
          <View style={styles.content}>
            <Text style={{fontStyle: 'italic'}}>
              Si l'erreur persiste, veuillez contacter le développeur
              en précisant les dernières interactions que vous avez
              eu avec l'application.
            </Text>
          </View>
        </View>
      </LinearGradient>
      : this.props.children
  }
}


const styles = StyleSheet.create({
  container: {
    height: '60%',
    width: '85%',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    padding: '3%'
  },
  header: {
    padding: 10,
    marginVertical: 30,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center'
  },
  content: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5
  },
});

export default ErrorBoundary
