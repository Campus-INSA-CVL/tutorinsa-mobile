import React from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Announce from '../Components/Announce';

class Posts extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: '0', matiere: "Algorithique et programmation 3", date: "25/02/2020", debut: "18h30", fin: "20h00", type:'tuteur', auteur: 'Hamza'},
            {key: '1', matiere: "Maths 4.3", date: "72/21/0202", debut: "04h44", fin: "00h40", type:'etudiant', auteur: 'Hamza'},
            {key: '2', matiere: "Maths 4.3", date: "72/21/0202", debut: "04h44", fin: "00h40", type:'etudiant', auteur: 'Hamza'},
            {key: '3', matiere: "Maths 4.3", date: "72/21/0202", debut: "04h44", fin: "00h40", type:'etudiant', auteur: 'Hamza'},
            {key: '4', matiere: "Maths 4.3", date: "72/21/0202", debut: "04h44", fin: "00h40", type:'etudiant', auteur: 'Hamza'},
            {key: '5', matiere: "Maths 4.3", date: "72/21/0202", debut: "04h44", fin: "00h40", type:'etudiant', auteur: 'Hamza'},
            {key: '6', matiere: "Maths 4.3", date: "72/21/0202", debut: "04h44", fin: "00h40", type:'etudiant', auteur: 'pas Hamza :('},
            {key: '7', matiere: "Maths 4.3", date: "72/21/0202", debut: "04h44", fin: "00h40", type:'etudiant'},
            {key: '8', matiere: "Maths 4.3", date: "72/21/0202", debut: "04h44", fin: "00h40", type:'etudiant'},
            {key: '9', matiere: "Maths 4.3", date: "72/21/0202", debut: "04h44", fin: "00h40", type:'etudiant'},
          ]}
          renderItem={({item}) => <TouchableOpacity style={{margin: 20, marginBottom: 0}}><Announce item={item}/></TouchableOpacity>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 25,
  },
});

export default Posts
