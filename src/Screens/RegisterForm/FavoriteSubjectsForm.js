import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Card from '../../Components/Card';
import { connect } from 'react-redux';

class FavoriteSubjectsForm extends React.Component {
  state={
    favoriteSubjects: [],
  }

  render() {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.form}>
            <Text style={styles.infoText}>Quelles sont vos matières préférées ?</Text>
            <FlatList
              data={this.props.subjectsData}
              keyExtractor={(item) => item._id}
              renderItem={({item}) =>
                <CheckBox
                  title={item.name}
                  iconRight
                  checkedIcon=<View style={{height: 31}}/>
                  uncheckedIcon=<View style={{height: 31}}/>
                  containerStyle={{backgroundColor: this.state.favoriteSubjects.includes(item._id) ? '#b0c4ff' : '#fafafa'}}
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
              }
            />
          </View>
          <TouchableOpacity
            disabled={this.state.favoriteSubjects.length==0}
            style={{backgroundColor: (this.state.favoriteSubjects.length!=0) ? '#4e73df' : '#d1d3e2', ...styles.nextButton}}
            onPress={() => {
              if (this.state.favoriteSubjects.length!=0) {
                this.props.navigation.navigate("DifficultSubjects", {
                  firstName: this.props.route.params.firstName,
                  lastName: this.props.route.params.lastName,
                  year: this.props.route.params.year,
                  role: this.props.route.params.role,
                  department: this.props.route.params.department,
                  favoriteSubjects: this.state.favoriteSubjects,
                });
                this.props.dispatch({ type: "STEPPER_SET", value: 3});
              }
            }}
          >
            <Text style={styles.buttonLabel}>Suivant</Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  card: {
    justifyContent: 'space-between',
    marginVertical: '5%',
    paddingVertical: 0
  },
  infoText: {
    alignSelf: 'center',
    fontSize:15,
    paddingVertical:10,
    fontStyle: 'italic'
  },
  form: {
    flex:1,
    justifyContent: 'space-around',
    paddingBottom: '3%'
  },
  inputContainer: {
    borderRadius: 20,
    borderColor: '#d1d3e2',
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  nextButton: {
    paddingVertical: 10,
    width:'100%',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  buttonLabel: {
    alignSelf: 'center',
    color: 'white',
    fontSize:15,
  }
});

const mapStateToProps = (store) => {
  return {
    subjectsData: store.apiFunctions.subjects
  }
}

export default connect(mapStateToProps)(FavoriteSubjectsForm)
