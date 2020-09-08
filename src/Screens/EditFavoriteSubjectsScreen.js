import React from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Alert
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import client, { handleAllErrors } from '../feathers-client';
import NavBar from '../Components/NavBar';

class EditFavoriteSubjectsScreen extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;

    var tmpSubjects = [];
    user.favoriteSubjects.forEach((item, i) => {
      tmpSubjects.push(item._id);
    });

    this.state = {
      favoriteSubjects: tmpSubjects,
    }
  }

  _submit() {
    if (this.state.favoriteSubjects.length!=0) {
      client.service('users')
            .patch(this.props.user._id, {'favoriteSubjectsIds': this.state.favoriteSubjects})
            .then((res) => {
              this.props.dispatch({ type: "API_USER", value: res });
              this.props.navigation.navigate("Profile");
            })
            .catch(handleAllErrors);
    }
    else {
      Alert.alert(
        'Erreur',
        'Veuillez entrer au moins une matière.',
        [
          { text: "D'accord" },
        ]
      );

    }
  }

  render() {
    const { user, theme } = this.props;
    return (
      <NavBar
        navigation={this.props.navigation}
        title="Modifier les matières préférées"
        goBack
        validate={() => {this._submit()}}
      >
        <FlatList
          contentContainerStyle={styles.container}
          data={this.props.subjectsData}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => {
            const checked = this.state.favoriteSubjects.includes(item._id);
            return (
              <CheckBox
                title={item.name}
                iconRight
                checkedIcon=<View style={{height: 31}}/>
                uncheckedIcon=<View style={{height: 31}}/>
                containerStyle={{
                  backgroundColor: checked ? '#b0c4ff' : theme.foreground,
                  borderWidth: 0,
                  elevation: 1
                }}
                textStyle={{
                  color: checked ? '#333' : theme.text
                }}
                onPress={() => {
                  let tmp = this.state.favoriteSubjects;
                  if (this.state.favoriteSubjects.includes(item._id)) {
                    tmp.splice(tmp.indexOf(item._id), 1);
                  }
                  else {
                    tmp.push(item._id);
                  }
                  this.setState({favoriteSubjects: tmp});
                }}
              />
            );
          }}
        />
      </NavBar>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
});

const mapStateToProps = (store) => {
  return {
    user: store.apiFunctions.user,
    subjectsData: store.apiFunctions.subjects,
    theme: store.themeFunctions.theme,
  }
}

export default connect(mapStateToProps)(EditFavoriteSubjectsScreen)
