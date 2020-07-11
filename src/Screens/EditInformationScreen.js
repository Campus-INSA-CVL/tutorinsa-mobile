import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import NavBar from '../Components/NavBar';
import { Feather as Icon } from '@expo/vector-icons';


function InformationItem(props) {
  const { theme } = props;
  return(
    <View style={{
      borderBottomWidth: 0.2,
      borderColor: theme.text,
      paddingVertical: 10,
      width: '95%',
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      <Icon name={props.icon} size={32} color={theme.text}/>
      <View style={{marginLeft:10}}>
        <Text style={{fontSize: 15, color: theme.text}}>{props.value}</Text>
        <Text style={{fontSize: 12, color: theme.subtitle}}>{props.name}</Text>
      </View>
    </View>
  );
}

function _setupItems(user, theme) {
  const fullName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) + " " + user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
  const data = [
    { name: 'Nom', value: fullName, icon: 'user' },
    { name: 'Email', value: user.email, icon: 'mail' },
    { name: 'Mot de passe', value: "*********", icon: 'lock' },
    { name: 'Département', value: user.department.name, icon: getDepartmentIcon(user.department.name) },
    { name: 'Année', value: user.year.name, icon: 'award' },
  ]

  let items = [];
  data.forEach((item, i) => {
    items.push(
      <InformationItem
        name={item.name}
        value={item.value}
        icon={item.icon}
        key={item.name + i}
        theme={theme}
      />
    )
  });
  return items;
}

function getDepartmentIcon(name) {
  switch (name.toLowerCase()) {
    case 'sti':
      return 'cpu';

    case 'gsi':
      return 'settings';

    case 'mri':
      return 'shield';

    default:
      return 'edit-3';
  }
}


class EditInformation extends React.Component {
  render() {
    const { user, theme } = this.props.route.params;

    const items = _setupItems(user, theme);

    return (
      <NavBar navigation={this.props.navigation} title="Modifier les informations" goBack>
        <View style={{backgroundColor: theme.background, ...styles.container}}>
          { items }
        </View>
      </NavBar>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 10,
    alignItems: 'center',
    paddingHorizontal: "8%"
  },
});

export default EditInformation
