import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Picker, FlatList } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import Dots from '../../Components/Dots';
import LoadingWheel from '../../Components/LoadingWheel';
import client, { handleErrors } from '../../feathers-client';

class DifficultSubjectsForm extends React.Component {
  state={
    subjectsData: [{"_id": '', "name": "Chargement..."}],
    isLoadingSubjects: true,
    difficultSubjects: [],
  }

  componentDidMount() {
    client.service('subjects').find()
          .then((data) => {
            this.setState({
              subjectsData: data,
              isLoadingSubjects: false
            });
          })
          .catch(handleErrors);
  }

  render() {
    let content =
      <View style={{flex:1, justifyContent: 'space-around', paddingBottom: '5%'}}>
        <Text style={{alignSelf: 'center', fontSize:15, paddingVertical:10, fontStyle: 'italic'}}>Quelles sont les matières dans lesquelles vous éprouvez des difficultés ?</Text>
        <FlatList
          data={this.state.subjectsData}
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
    if (this.state.isLoadingSubjects) {
      content = <LoadingWheel/>
    }
    return (
      <View style={styles.container}>
        {content}
        <View style={{paddingBottom: '5%', flex: 0.4, justifyContent: 'space-around'}}>
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
              }
            }}
          >
            <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Suivant</Text>
          </TouchableOpacity>
          <View>
            <Dots number={6} selected={3} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
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
});

export default DifficultSubjectsForm
