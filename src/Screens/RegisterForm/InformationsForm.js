import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Picker } from 'react-native';
import { Input } from 'react-native-elements';
import Card from '../../Components/Card';
import LoadingWheel from '../../Components/LoadingWheel';
import client from '../../feathers-client';
import { connect } from 'react-redux';
import { MaterialIcons as Icon } from '@expo/vector-icons';

class InformationsForm extends React.Component {
  state={
    roleData: [
      {'_id': 'etudiant', 'name': 'Un étudiant'},
      {'_id': 'tuteur', 'name': 'Un tuteur'},
      {'_id': 'both', 'name': 'Les deux'}
    ],
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

  _submit(state) {
    if (state.year!='' && state.department!='') {
      this.props.navigation.navigate("FavoriteSubjects", {
        firstName: this.props.route.params.firstName,
        lastName: this.props.route.params.lastName,
        year: state.year,
        role: this._roleToPermissions(),
        department: state.department,
      });
      this.props.dispatch({ type: "STEPPER_SET", value: 2});
    }
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
    return (
      <View style={styles.container}>
        <Card>
          <View style={styles.form}>
            <Text style={styles.infoText}>Bonjour {this.props.route.params.firstName} !</Text>
            <View style={{borderWidth: 0.5, borderRadius: 5}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{ height: 100, width: 100 }}>
                  <Icon name='account-circle' color='#b7b9cc' size={100}/>
                </View>
                <View style={{flex:1}}>
                <Text style={{alignSelf: 'center', fontSize:20, paddingVertical:5, fontWeight: 'bold'}}>Vous êtes</Text>
                  <Picker
                    mode='dialog'
                    style={{flex: 1}}
                    selectedValue={this.state.role}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({role: itemValue})
                    }}
                  >
                    { this.setupPicker(this.state.roleData) }
                  </Picker>
                </View>
              </View>
              <View style={{flexDirection : 'row', paddingHorizontal: 10}}>
                <Picker
                  mode='dropdown'
                  style={{flex: 1}}
                  selectedValue={this.state.year}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({year: itemValue})
                  }}

                >
                  <Picker.Item label="Année" value='' key="annee"/>
                  { this.setupPicker(this.props.yearsData) }
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
                  { this.setupPicker(this.props.departmentsData) }
                </Picker>
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              disabled={this.state.year=='' || this.state.department==''}
              style={{backgroundColor: (this.state.year!='' && this.state.department!='') ? '#4e73df' : '#d1d3e2', ...styles.nextButton}}
              onPress={() => {this._submit(this.state)}}
            >
              <Text style={styles.buttonLabel}>Suivant</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  infoText: {
    alignSelf: 'center',
    fontSize:15,
    paddingTop:10,
    fontStyle: 'italic'
  },
  form: {
    flex:1,
    justifyContent: 'space-around',
    paddingBottom: '5%'
  },
  inputContainer: {
    borderRadius: 20,
    borderColor: '#d1d3e2',
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  footer: {
    flex: 0.4,
    paddingBottom: '5%',
    justifyContent: 'center'
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
    fontSize:15
  },
});


const mapStateToProps = (store) => {
  return {
    yearsData: store.apiFunctions.years,
    departmentsData: store.apiFunctions.departments,
  }
}

export default connect(mapStateToProps)(InformationsForm)
