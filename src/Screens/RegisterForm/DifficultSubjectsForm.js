import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Picker, FlatList } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import Card from '../../Components/Card';
import LoadingWheel from '../../Components/LoadingWheel';
import client from '../../feathers-client';
import { connect } from 'react-redux';

class DifficultSubjectsForm extends React.Component {
  state={
    isLoadingSubjects: true,
    difficultSubjects: [],
  }

  render() {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.form}>
            <Text style={styles.infoText}>Quelles sont les matières dans lesquelles vous éprouvez des difficultés ?</Text>
            <FlatList
              data={this.props.subjectsData}
              keyExtractor={(item) => item._id}
              renderItem={({item}) =>
                <CheckBox
                  title={item.name}
                  iconRight
                  checkedIcon=<View style={{height: 31}}/>
                  uncheckedIcon=<View style={{height: 31}}/>
                  containerStyle={{backgroundColor: this.state.difficultSubjects.includes(item._id) ? '#b0c4ff' : '#fafafa'}}
                  onPress={() => {
                    let tmp = this.state.difficultSubjects;
                    if (this.state.difficultSubjects.includes(item._id)) {
                      tmp.splice(tmp.indexOf(item._id), 1);
                    }
                    else {
                      tmp.push(item._id);
                    }
                    this.setState({difficultSubjects: tmp});
                  }}
                />
              }
            />
          </View>
          <TouchableOpacity
            disabled={this.state.difficultSubjects.length==0}
            style={{backgroundColor: (this.state.difficultSubjects.length!=0) ? '#4e73df' : '#d1d3e2', ...styles.nextButton}}
            onPress={() => {
              if (this.state.difficultSubjects.length!=0) {
                this.props.navigation.navigate("EmailPass", {
                  firstName: this.props.route.params.firstName,
                  lastName: this.props.route.params.lastName,
                  year: this.props.route.params.year,
                  role: this.props.route.params.role,
                  department: this.props.route.params.department,
                  favoriteSubjects: this.props.route.params.favoriteSubjects,
                  difficultSubjects: this.state.difficultSubjects,
                });
                this.props.dispatch({ type: "STEPPER_SET", value: 4});
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

export default connect(mapStateToProps)(DifficultSubjectsForm)
