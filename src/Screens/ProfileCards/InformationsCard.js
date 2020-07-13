import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import Separator from '../../Components/Separator';
import { Feather as Icon } from '@expo/vector-icons';


function InformationItem(props) {
  const { theme } = props;
  return(
    <View style={{
      borderBottomWidth: 0.2,
      borderColor: theme.text,
      paddingVertical: 10,
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


function InformationsCard(props) {
  const { user, theme, navigation } = props;
  const informationsItems = _setupItems(user, theme);

  return (
    <View style={{ backgroundColor: theme.foreground, ...styles.container }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.title}}>Informations</Text>
        <TouchableOpacity
          style={{
            marginLeft: 'auto',
          }}
          onPress={() => {navigation.navigate("EditInformation", {user, theme})}}
        >
          <Text style={{fontSize:15, color: theme.subtitle}}>Modifier</Text>
        </TouchableOpacity>
      </View>
      <Separator backgroundColor={theme.separator}/>
      { informationsItems }
    </View>
  );
}

export function getDepartmentIcon(name) {
  switch (name.toLowerCase()) {
    case 'sti':
      return 'cpu';

    case 'gsi':
      return 'settings';

    case 'mri':
      return 'shield';

    case 'stpi':
      return 'layers';

    default:
      return 'help-circle';
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
    elevation: 1,
    width: "85%",
  },
});

const mapStateToProps = (store) => {
  return {
    user: store.apiFunctions.user,
    theme: store.themeFunctions.theme,
  }
}

export default connect(mapStateToProps)(InformationsCard);
