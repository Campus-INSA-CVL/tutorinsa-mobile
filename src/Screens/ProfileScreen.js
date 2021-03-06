import React from 'react'
import { connect } from 'react-redux';
import client from '../feathers-client';
import moment from 'moment';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Button
} from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import NavBar from '../Components/NavBar';
import Separator from '../Components/Separator';
import InformationsCard from './ProfileCards/InformationsCard';
import ThemesCard from './ProfileCards/ThemesCard';
import { MaterialIcons } from '@expo/vector-icons'

class Posts extends React.Component {
  render() {
    const { user, theme } = this.props;
    const fullName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) + " " + user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)

    return (
      <NavBar title="Mon profil" navigation={this.props.navigation}>
        <ScrollView contentContainerStyle={{ backgroundColor: theme.background, ...styles.container }}>
          <Avatar
            size='xlarge'
            source={require('../../assets/logo_tutorinsa.png')}
            rounded
            showAccessory
          />
          <Text style={{ fontWeight: 'bold', fontSize: 30, width: "80%", textAlign: 'center', color: theme.title }}>{fullName}</Text>
          <Text style={{ color: theme.subtitle }}>Inscrit {moment(user.createdAt).fromNow()}</Text>

          <ThemesCard/>
          <InformationsCard navigation={this.props.navigation}/>

          <TouchableOpacity
            style={{ backgroundColor: theme.button, ...styles.loginButton }}
            onPress={() => {
              client.logout();
              this.props.dispatch({ type: 'AUTH_FALSE' });
              this.props.dispatch({ type: 'API_USER', value: null });
            }}
          >
            <Text style={{alignSelf: 'center', fontSize:15, color: theme.buttonLabel}}>Déconnexion</Text>
          </TouchableOpacity>
        </ScrollView>
      </NavBar>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    alignItems: 'center',
  },
  card: {
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
    elevation: 1,
    width: "80%",
  },
  loginButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    width:'80%',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 20
  },
});


const mapStateToProps = (store) => {
  return {
    user: store.apiFunctions.user,
    theme: store.themeFunctions.theme,
  }
}

export default connect(mapStateToProps)(Posts)
