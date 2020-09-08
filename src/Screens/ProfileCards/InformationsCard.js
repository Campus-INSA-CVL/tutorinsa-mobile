import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import Separator from '../../Components/Separator';
import Card from '../../Components/Card';
import { Feather as Icon } from '@expo/vector-icons';


function InformationItem(props) {
  const { theme } = props;
  return(
    <View style={{
      borderBottomWidth: props.borderBottom ? 0.2 : 0,
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

function _setupItems(user, theme, customUser) {
  var fullName = ''
  var roleString = ''
  var data = []

  if (customUser) {
    const fullName = (customUser.firstName && customUser.lastName)
      ? customUser.firstName.charAt(0).toUpperCase()
          + customUser.firstName.slice(1)
          + " "
          + customUser.lastName.charAt(0).toUpperCase()
          + customUser.lastName.slice(1)
      : undefined

    data = [
      fullName && { name: 'Nom', value: fullName, icon: 'user' },
      customUser.email && { name: 'Email', value: customUser.email, icon: 'mail' },
      customUser.department?.name && { name: 'Département', value: customUser.department.name.toUpperCase(), icon: getDepartmentIcon(customUser.department.name) },
      customUser.year?.name && { name: 'Année', value: customUser.year.name.toUpperCase(), icon: 'award' },
    ]
  }
  else {
    const fullName = (user.firstName && user.lastName)
      ? user.firstName.charAt(0).toUpperCase()
          + user.firstName.slice(1)
          + " "
          + user.lastName.charAt(0).toUpperCase()
          + user.lastName.slice(1)
      : undefined

    roleString = user.permissions && (user.permissions[0].charAt(0).toUpperCase() + (user.permissions.slice(0, -1).join(', ') + (user.permissions.length>1?' et ':'') + user.permissions[user.permissions.length-1]).slice(1))
    data = [
      fullName && { name: 'Nom', value: fullName, icon: 'user' },
      user?.email && { name: 'Email', value: user.email, icon: 'mail' },
      user?.department?.name && { name: 'Département', value: user.department.name.toUpperCase(), icon: getDepartmentIcon(user.department.name) },
      user?.year?.name && { name: 'Année', value: user.year.name.toUpperCase(), icon: 'award' },
      roleString && { name: user.permissions.length>1?'Rôles':'Rôle', value: roleString, icon: 'briefcase' },
    ]
  }

  let items = [];
  data.forEach((item, i) => {
    if (item) {
      if (item.name == 'Email' && customUser) {
        items.push(
          <View
            key={item.name + i}
            style={{
              borderBottomWidth: i!=data.length-1 ? 0.2 : 0,
              borderColor: theme.text,
            }}
          >
            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:'+item.value)}
            >
              <InformationItem
                name={item.name}
                value={item.value}
                icon={item.icon}
                theme={theme}
                borderBottom={false}
              />
            </TouchableOpacity>
          </View>
        )
      }
      else {
        items.push(
          <InformationItem
            name={item.name}
            value={item.value}
            icon={item.icon}
            key={item.name + i}
            theme={theme}
            borderBottom={i!=data.length-1}
          />
        )
      }
    }
  });
  return items;
}


function InformationsCard(props) {
  const { user, theme, navigation, editable, title, customUser } = props;
  const informationsItems = _setupItems(user, theme, customUser);

  if (informationsItems.length == 0) return null
  
  return (
    <Card theme={theme} style={{...styles.container, ...props.style}}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.title, ...props.titleStyle}}>{title || 'Informations'}</Text>
        {
          !customUser && <TouchableOpacity
                           style={{
                             marginLeft: 'auto',
                           }}
                           onPress={() => {navigation.navigate("EditInformation", {user, theme})}}
                         >
                           <Text style={{fontSize:15, color: theme.subtitle}}>Modifier</Text>
                         </TouchableOpacity>
        }
      </View>
      <Separator backgroundColor={theme.separator}/>
      { informationsItems }
    </Card>
  );
}

export function getDepartmentIcon(name) {
  switch (name.toLowerCase()) {
    case 'stpi':
      return 'layers';

    case 'gsi':
      return 'settings';

    case 'sti':
      return 'cpu';

    case 'mri':
      return 'shield';

    case 'ere':
      return 'zap';

    case 'enp':
      return 'map';

    default:
      return 'help-circle';
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 20,
  },
});

const mapStateToProps = (store) => {
  return {
    user: store.apiFunctions.user,
    theme: store.themeFunctions.theme,
  }
}

export default connect(mapStateToProps)(InformationsCard);
