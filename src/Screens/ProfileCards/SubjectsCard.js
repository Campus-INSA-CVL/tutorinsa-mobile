import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import Separator from '../../Components/Separator';
import Card from '../../Components/Card';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

function SubjectItem(props) {
  const { theme } = props;
  return(
    <View style={{
      borderBottomWidth: props.borderBottom ? 0.2 : 0,
      borderColor: theme.text,
      width: '90%',
      alignSelf: 'center',
      paddingVertical: 5,
      paddingLeft: 5,
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      <View style={{marginLeft:10, flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name='circle'
          size={10}
          color={theme.text}
          style={{marginRight: 15}}
        />
        <Text style={{fontSize: 15, color: theme.text, flex: 1}}>{props.name}</Text>
      </View>
    </View>
  );
}

function _setupItems(data, theme) {
  if (data) {
    let items = [];
    data.forEach((item, i) => {
      items.push(
        <SubjectItem
        key={'sujitem_' + i}
        name={item.name.charAt(0).toUpperCase() + item.name.substring(1)}
        theme={theme}
        borderBottom={i!=data.length-1}
        />
      )
    });
    return items;
  }
  else {
    return undefined
  }
}


function SubjectsCard(props) {
  const { user, theme, navigation } = props;
  const favoriteSubjectsItems = _setupItems(user?.favoriteSubjects, theme);
  const difficultSubjectsItems = _setupItems(user?.difficultSubjects, theme);

  return (
    <>
      {
        favoriteSubjectsItems && (
          <Card theme={theme} style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              {
                <Icon name='heart' size={25} color='#f72c1e' style={{marginRight: 10}}/>
              }
              <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.title}}>Matières préférées</Text>
              <TouchableOpacity
                style={{marginLeft: 'auto'}}
                onPress={() => {navigation.navigate("EditFavoriteSubjects")}}
              >
                <Text style={{fontSize:15, color: theme.subtitle}}>Modifier</Text>
              </TouchableOpacity>
            </View>
            <Separator backgroundColor={theme.separator}/>
            { favoriteSubjectsItems }
          </Card>
        )
      }

      {
        difficultSubjectsItems && (
          <Card theme={theme} style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              {
                <Icon name='heart-broken' size={25} color='#4e73df' style={{marginRight: 10}}/>
              }
              <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.title}}>Matières difficiles</Text>
              <TouchableOpacity
                style={{marginLeft: 'auto'}}
                onPress={() => {navigation.navigate("EditDifficultSubjects")}}
              >
                <Text style={{fontSize:15, color: theme.subtitle}}>Modifier</Text>
              </TouchableOpacity>
            </View>
            <Separator backgroundColor={theme.separator}/>
            { difficultSubjectsItems }
          </Card>
        )
      }
    </>
  );
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

export default connect(mapStateToProps)(SubjectsCard);