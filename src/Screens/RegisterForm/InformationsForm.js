import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Picker } from 'react-native';
import { Input } from 'react-native-elements';
import Dots from '../../Components/Dots';
import LoadingWheel from '../../Components/LoadingWheel';
import client, { handleErrors } from '../../feathers-client';
import { MaterialIcons as Icon } from '@expo/vector-icons';



class InformationsForm extends React.Component {
  state={
    roleData: [
      {'_id': 'etudiant', 'name': 'Un étudiant'},
      {'_id': 'tuteur', 'name': 'Un tuteur'},
      {'_id': 'both', 'name': 'Les deux'}
    ],
    departmentsData: [{"_id": '', "name": "Chargement..."}],
    yearsData: [{"_id": '', "name": "Chargement..."}],
    isLoadingDepartments: true,
    isLoadingYears: true,
    year: '',
    department: '',
    role: 'etudiant',
  }

  _roleToPermissions() {
    if (this.state.role=='etudiant') {
      return ["eleve"];
    }
    else if (this.state.role=='etudiant') {
      return ["tuteur"];
    }
    else {
      return ["eleve", "tuteur"];
    }
  }

  componentDidMount() {
    client.service('departments').find()
          .then((e) => {
            this.setState({
              departmentsData: e.data,
              isLoadingDepartments: false
            })
          })
          .catch(handleErrors);

    client.service('years').find()
          .then((e) => {
            this.setState({
              yearsData: e.data,
              isLoadingYears: false
            });
          })
          .catch(handleErrors);
  }

  setupPicker(data) {
    var pickerItems = []
    for (let i=0; i<data.length; i++) {
      pickerItems.push(
        <Picker.Item label={data[i].name} value={data[i]._id} key={"pickerItem_"+i}/>
      );
    }
    return pickerItems;
  }

  render() {
    let content=
      <View style={{flex:1, justifyContent: 'space-around', paddingBottom: '5%'}}>
        <Text style={{alignSelf: 'center', fontSize:15, paddingTop:10, fontStyle: 'italic'}}>Bonjour {this.props.route.params.firstName} !</Text>
        <View style={{borderWidth: 0.5, borderRadius: 5}}>
          <Text style={{alignSelf: 'center', fontSize:20, paddingVertical:5, fontWeight: 'bold'}}>Vous êtes</Text>
          <View style={{flexDirection: 'row'}}>
            <Icon name='account-circle' color='#b7b9cc' size={100}/>
            <View style={{flex:1}}>
              <Picker
                mode='dropdown'
                style={{flex: 1}}
                selectedValue={this.state.role}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({role: itemValue})
                }}
              >
                { this.setupPicker(this.state.roleData) }
              </Picker>
              <View style={{flexDirection : 'row'}}>
                <Picker
                  mode='dropdown'
                  style={{flex: 1}}
                  selectedValue={this.state.year}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({year: itemValue})
                  }}
                >
                  <Picker.Item label="Année" value='' key="annee"/>
                  { this.setupPicker(this.state.yearsData) }
                </Picker>
                <Picker
                  mode='dropdown'
                  style={{flex: 1}}
                  selectedValue={this.state.department}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({department: itemValue})
                  }}
                >
                  <Picker.Item label="Département" value='' key="department"/>
                  { this.setupPicker(this.state.departmentsData) }
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </View>

    if (this.state.isLoadingYears || this.state.isLoadingDepartments) {
      content = <LoadingWheel/>
    }
    return (
      <View style={styles.container}>
        {content}
        <View style={{paddingBottom: '5%', flex: 0.4, justifyContent: 'space-around'}}>
          <TouchableOpacity
            disabled={this.state.year=='' || this.state.department==''}
            style={{backgroundColor: (this.state.year!='' && this.state.department!='') ? '#4e73df' : '#d1d3e2', ...styles.nextButton}}
            onPress={() => {
              if (this.state.year!='' && this.state.department!='') {
                this.props.navigation.navigate("FavoriteSubjects", {
                  firstName: this.props.route.params.firstName,
                  lastName: this.props.route.params.lastName,
                  year: this.state.year,
                  role: this._roleToPermissions(),
                  department: this.state.department,
                });
              }
            }}
          >
            <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Suivant</Text>
          </TouchableOpacity>
          <View>
            <Dots number={6} selected={1} />
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

export default InformationsForm
