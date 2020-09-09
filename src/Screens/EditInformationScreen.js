import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  Alert,
} from 'react-native';
import Picker from '../Components/Picker';
import { connect } from 'react-redux';
import client, { handleAllErrors } from '../feathers-client';
import NavBar from '../Components/NavBar';
import { Feather as Icon } from '@expo/vector-icons';
import { getDepartmentIcon } from './ProfileCards/InformationsCard';
import { NAVBAR_HEIGHT } from '../Components/NavBar';

function InformationItem(props) {
  const { theme } = props;
  const [ checked, setChecked ] = React.useState(false);
  const [ height ] = React.useState(new Animated.Value(0));
  const [ opacity ] = React.useState(height.interpolate({
    inputRange: [0, props.childHeight],
    outputRange: [0, 1]
  }))

  const itemName = checked
  ? <View style={{marginLeft:10, justifyContent: 'center'}}>
      <Text style={{fontSize: 15, color: theme.text}}>{props.name}</Text>
    </View>
  : <View style={{marginLeft:10}}>
      <Text style={{fontSize: 15, color: theme.text}}>{props.value}</Text>
      <Text style={{fontSize: 12, color: theme.subtitle}}>{props.name}</Text>
    </View>

  return(
    <View style={{
      borderBottomWidth: 0.2,
      borderColor: theme.text,
      paddingVertical: 10,
      width: '100%'
    }}>
      <View style={{
        backgroundColor: checked ? theme.foreground : 'transparent',
        flexDirection: 'row',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: checked ? 0.2 : 0,
      }}>
        <Icon name={props.icon} size={32} color={theme.text}/>
        { itemName }
        <TouchableOpacity
          style={{width: 30, height: 30, marginLeft: 'auto'}}
          onPress={() => {
            setChecked(!checked)
            Animated.timing(height, {
                toValue: checked ? 0 : props.childHeight,
                duration: 100,
                useNativeDriver: false
            }).start()
          }}
        >
          <Icon
            size={30}
            name={checked ? 'x' : 'edit'}
            color={checked ? 'red' : theme.subtitle}
          />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={{
          height: height,
          opacity: opacity,
          backgroundColor: theme.foreground,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        { props.children }
      </Animated.View>
    </View>
  );
}

class EditInformation extends React.Component {
  constructor(props) {
    super(props);
    const { user, theme } = this.props.route.params;
    this.roleData = [
      {'_id': 'eleve', 'name': 'Étudiant'},
      {'_id': 'tuteur', 'name': 'Tuteur'},
      {'_id': 'both', 'name': 'Les deux'}
    ]

    let role = Array.from(user.permissions)
    if (role.includes('admin')) role.splice(role.indexOf('admin'), 1)
    if (role.length==1) {
      role = role.join('')
    }
    else {
      role = 'both'
    }

    this.state = {
      firstName: user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1),
      lastName: user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1),
      password: '',
      confirmPassword: '',
      department: user.department._id,
      year: user.year._id,
      role
    }

    this.oldRole = role;
  }

  _roleToPermissions(newRole, oldPerms) {
    var newPerms;
    if (newRole=='both') {
      return ["eleve", "tuteur"].concat(oldPerms.includes('admin') ? ['admin'] : []);
    }
    else {
      return newRole.split().concat(oldPerms.includes('admin') ? ['admin'] : []);
    }
  }

  _submit(user) {
    var patchedUser = {}
    var ok = true;

    if (this.state.firstName.toLowerCase() != user.firstName) {
      patchedUser["firstName"] = this.state.firstName.toLowerCase();
    }
    if (this.state.lastName.toLowerCase() != user.lastName) {
      patchedUser["lastName"] = this.state.lastName.toLowerCase();
    }
    if (this.state.department != user.department._id) {
      patchedUser["departmentId"] = this.state.department;
    }
    if (this.state.year != user.year._id) {
      patchedUser["yearId"] = this.state.year;
    }
    if (this.state.role != this.oldRole) {
      patchedUser["permissions"] = this._roleToPermissions(this.state.role, user.permissions);
    }

    if (this.state.password != '') {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(this.state.password)) {
        if (this.state.password == this.state.confirmPassword) {
          patchedUser["password"] = this.state.password;
        }
        else {
          ok = false;
          Alert.alert(
            'Erreur',
            "Les deux mots de passes entrés ne correspondent pas.",
            [
              { text: "D'accord" },
            ]
          );
        }
      }
      else {
        ok = false;
        Alert.alert(
          'Erreur',
          "Le mot de passe doit respecter les règles suivantes :\n\
             - 8 caractères minimum\n\
             - 1 lettre majuscule minimum\n\
             - 1 lettre minuscule minimum\n\
             - 1 chiffre minimum\n\
             - 1 caractère spécial minimum",
          [
            { text: "D'accord" },
          ]
        );
      }
    }

    if (ok) {
      client.service('users')
            .patch(user._id, patchedUser)
            .then((res) => {
              this.props.dispatch({ type: "API_USER", value: res });
              this.props.navigation.navigate("Profile");
            })
            .catch(handleAllErrors);
    }
  }

  render() {
    const { user, theme } = this.props.route.params;
    const roleString = user.permissions[0].charAt(0).toUpperCase() + (user.permissions.slice(0, -1).join(', ') + (user.permissions.length>1?' et ':'') + user.permissions[user.permissions.length-1]).slice(1)

    return (
      <NavBar
        navigation={this.props.navigation}
        title="Modifier les informations"
        goBack
        validate={() => {this._submit(user)}}
      >
        <ScrollView contentContainerStyle={{
          backgroundColor: theme.background,
          ...styles.container
        }}>
          <InformationItem
            name='Nom'
            value={user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
             + " " + user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
            icon={'user'}
            theme={theme}
            childHeight={100}
          >
            <View style={styles.inputContainer}>
              <Text style={{color: theme.text, ...styles.inputLabel}}>Nouveau prénom</Text>
              <TextInput
                style={{color: theme.text, ...styles.input}}
                value={this.state.firstName}
                onChangeText={text => this.setState({firstName: text})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={{color: theme.text, ...styles.inputLabel}}>Nouveau nom</Text>
              <TextInput
                style={{color: theme.text, ...styles.input}}
                value={this.state.lastName}
                onChangeText={text => this.setState({lastName: text})}
              />
            </View>
          </InformationItem>
          <InformationItem
            name='Mot de passe'
            value='********'
            icon='lock'
            theme={theme}
            childHeight={100}
          >
            <View style={styles.inputContainer}>
              <Text style={{color: theme.text, ...styles.inputLabel}}>Nouveau mot de passe</Text>
              <TextInput
                style={{color: theme.text, ...styles.input}}
                value={this.state.password}
                onChangeText={text => this.setState({password: text})}
                autoCapitalize="none"
                secureTextEntry
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={{color: theme.text, ...styles.inputLabel}}>Confirmez le mot de passe</Text>
              <TextInput
                style={{color: theme.text, ...styles.input}}
                value={this.state.confirmPassword}
                onChangeText={text => this.setState({confirmPassword: text})}
                autoCapitalize="none"
                secureTextEntry
              />
            </View>
          </InformationItem>
          <InformationItem
            name='Département'
            value={user.department.name.toUpperCase()}
            icon={getDepartmentIcon(user.department.name)}
            theme={theme}
            childHeight={50}
          >
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <Text style={{color: theme.text, ...styles.inputLabel}}>Nouveau département</Text>
              <Picker
                title='Département'
                selectedValue={this.state.department}
                onValueChange={(value) => this.setState({department: value})}
                data={this.props.departmentsData}
                theme={theme}
                hideStatusBar={false}
              />
            </View>
          </InformationItem>
          <InformationItem
            name='Année'
            value={user.year.name.toUpperCase()}
            icon='award'
            theme={theme}
            childHeight={50}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: theme.text, ...styles.inputLabel}}>Nouvelle année</Text>
              <Picker
                title='Année'
                selectedValue={this.state.year}
                onValueChange={(value) => this.setState({year: value})}
                data={this.props.yearsData}
                theme={theme}
                hideStatusBar={false}
              />
            </View>
          </InformationItem>
          <InformationItem
            name='Rôle'
            value={roleString}
            icon='briefcase'
            theme={theme}
            childHeight={50}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: theme.text, ...styles.inputLabel}}>Vous êtes </Text>
              <Picker
                selectedValue={this.state.role}
                onValueChange={(value) => this.setState({role: value})}
                data={this.roleData}
                theme={theme}
                hideStatusBar={false}
              />
            </View>
          </InformationItem>
        </ScrollView>
      </NavBar>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: "8%"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  inputLabel: {
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
  input: {
    flex: 1
  }
});

const mapStateToProps = (store) => {
  return {
    yearsData: store.apiFunctions.years,
    departmentsData: store.apiFunctions.departments,
  }
}

export default connect(mapStateToProps)(EditInformation)
