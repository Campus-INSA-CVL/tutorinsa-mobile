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
        colors={['#7196ff', '#224abe', '#324389']}
        start={{x:0, y:0}}
        end={{x:0, y:1}}
        locations={[0.05, 0.45, 1]}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Icon name='error-outline' color='#d01427' size={100}/>
            <View style={styles.header}>
              <Text style={{fontWeight: 'bold', fontSize: 19}}>Une erreur s'est produite,</Text>
              <Text style={{fontWeight: 'bold', fontSize: 19}}>veuillez redémarrer l'application.</Text>
            </View>
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
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    padding: '3%'
  },
  header: {
    alignItems: 'center'
  },
  content: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5
  },
});

export default ErrorBoundary
