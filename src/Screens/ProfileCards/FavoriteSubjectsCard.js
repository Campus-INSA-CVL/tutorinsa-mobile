import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import Separator from '../../Components/Separator';
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
      paddingLeft: 30,
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      <View style={{marginLeft:10}}>
        <Text style={{fontSize: 15, color: theme.text}}>{props.name}</Text>
      </View>
    </View>
  );
}

function _setupItems(data, theme) {
  let items = [];
  data.forEach((item, i) => {
    items.push(
      <SubjectItem
        key={'sujitem_' + i}
        name={item.name}
        theme={theme}
        borderBottom={i!=data.length-1}
      />
    )
  });
  return items;
}


function FavoriteSubjectsCard(props) {
  const { user, theme, navigation } = props;
  const favoriteSubjectsItems = _setupItems(user.favoriteSubjects, theme);
  const difficultSubjectsItems = _setupItems(user.difficultSubjects, theme);

  return (
    <>
      <View style={{ backgroundColor: theme.foreground, ...styles.container }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.title}}>Matières préférées</Text>
          <Icon name='heart' size={25} color='#f72c1e' style={{marginHorizontal: 10}}/>
          <TouchableOpacity
            style={{marginLeft: 'auto'}}
            onPress={() => {navigation.navigate("EditFavoriteSubjects")}}
          >
            <Text style={{fontSize:15, color: theme.subtitle}}>Modifier</Text>
          </TouchableOpacity>
        </View>
        <Separator backgroundColor={theme.separator}/>
        { favoriteSubjectsItems }
      </View>
      <View style={{ backgroundColor: theme.foreground, ...styles.container }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.title}}>Matières difficiles</Text>
          <Icon name='heart-broken' size={25} color='#c27400' style={{marginHorizontal: 10}}/>
          <TouchableOpacity
            style={{marginLeft: 'auto'}}
            onPress={() => {navigation.navigate("EditDifficultSubjects")}}
          >
            <Text style={{fontSize:15, color: theme.subtitle}}>Modifier</Text>
          </TouchableOpacity>
        </View>
        <Separator backgroundColor={theme.separator}/>
        { difficultSubjectsItems }
      </View>
    </>
  );
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

export default connect(mapStateToProps)(FavoriteSubjectsCard);
