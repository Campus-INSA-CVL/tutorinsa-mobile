import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  Picker,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import client, { handleAllErrors } from '../feathers-client';
import NavBar from '../Components/NavBar';
import { Feather as Icon } from '@expo/vector-icons';
import { getDepartmentIcon } from './ProfileCards/InformationsCard'

function InformationItem(props) {
  const { theme } = props;
  const [ checked, setChecked ] = React.useState(false);
  const [ height ] = React.useState(new Animated.Value(0));

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
      width: '100%',
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
          display: checked ? 'flex' : 'none',
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

    this.state = {
      firstName: user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1),
      lastName: user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1),
      email: user.email,
      password: '',
      confirmPassword: '',
      department: user.department._id,
      year: user.year._id,
    }
  }

  setupPicker(data) {
    var pickerItems = []
    for (let i=0; i<data.length; i++) {
      pickerItems.push(
        <Picker.Item label={data[i].name} value={data[i]._id} key={"pickerItem_"+i}/>
      );
    }
    return pickerItems;
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
      patchedUser["department"] = this.state.department;
    }
    if (this.state.year != user.year._id) {
      patchedUser["year"] = this.state.year;
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

    if (this.state.email != user.email) {
      if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@insa-cvl\.fr$/.test(this.state.email)) {
        patchedUser["email"] = this.state.email;
      }
      else {
        ok = false;
        Alert.alert(
          'Erreur',
          "L'adresse email entrée n'est pas une adresse @insa-cvl.fr valide.",
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
              <Text style={styles.inputLabel}>Nouveau prénom</Text>
              <TextInput
                style={styles.input}
                value={this.state.firstName}
                onChangeText={text => this.setState({firstName: text})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nouveau nom</Text>
              <TextInput
                style={styles.input}
                value={this.state.lastName}
                onChangeText={text => this.setState({lastName: text})}
              />
            </View>
          </InformationItem>
          <InformationItem
            name='Email'
            value={user.email}
            icon='mail'
            theme={theme}
            childHeight={50}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nouvel email</Text>
              <TextInput
                style={styles.input}
                value={this.state.email}
                onChangeText={text => this.setState({email: text})}
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
              <Text style={styles.inputLabel}>Nouveau mot de passe</Text>
              <TextInput
                style={styles.input}
                value={this.state.password}
                onChangeText={text => this.setState({password: text})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirmez le mot de passe</Text>
              <TextInput
                style={styles.input}
                value={this.state.confirmPassword}
                onChangeText={text => this.setState({confirmPassword: text})}
              />
            </View>
          </InformationItem>
          <InformationItem
            name='Département'
            value={user.department.name}
            icon={getDepartmentIcon(user.department.name)}
            theme={theme}
            childHeight={50}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.inputLabel}>Nouveau département</Text>
              <Picker
                mode='dropdown'
                style={{flex: 1}}
                selectedValue={this.state.department}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({department: itemValue})
                }}
              >
                { this.setupPicker(this.props.departmentsData) }
              </Picker>
            </View>
          </InformationItem>
          <InformationItem
            name='Année'
            value={user.year.name}
            icon='award'
            theme={theme}
            childHeight={50}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.inputLabel}>Nouvelle année</Text>
              <Picker
                mode='dropdown'
                style={{flex: 1}}
                selectedValue={this.state.year}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({year: itemValue})
                }}
              >
                { this.setupPicker(this.props.yearsData) }
              </Picker>
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
