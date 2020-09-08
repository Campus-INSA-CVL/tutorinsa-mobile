import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Card from '../../Components/Card';
import Picker from '../../Components/Picker';
import { connect } from 'react-redux';
import { MaterialIcons as Icon } from '@expo/vector-icons';

class InformationsForm extends React.Component {
  state={
    roleData: [
      {'_id': 'eleve', 'name': 'Un étudiant'},
      {'_id': 'tuteur', 'name': 'Un tuteur'},
      {'_id': 'both', 'name': 'Les deux'}
    ],
    year: '',
    department: '',
    role: 'eleve',
  }

  _roleToPermissions() {
    if (this.state.role=='both') {
      return ["eleve", "tuteur"];
    }
    else {
      return Array.from(this.state.role)
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

  render() {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.form}>
            <Text style={styles.infoText}>Bonjour {this.props.route.params.firstName} !</Text>
            <View style={{borderWidth: 0.5, borderRadius: 5}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{ height: 100, width: 100, marginRight: 10 }}>
                  <Icon name='account-circle' color='#b7b9cc' size={100}/>
                </View>
                <View style={{flex:1}}>
                <Text style={{alignSelf: 'center', fontSize:20, paddingVertical:5, fontWeight: 'bold'}}>Vous êtes</Text>
                  <Picker
                    style={{flex: 1}}
                    selectedValue={this.state.role}
                    onValueChange={(value) => {
                      this.setState({role: value})
                    }}
                    textStyle={{fontSize: 15}}
                    data={this.state.roleData}
                  />
                </View>
              </View>
              <View style={{flexDirection : 'row', paddingHorizontal: 10}}>
                <Picker
                  title='Année'
                  style={{flex: 1}}
                  selectedValue={this.state.year}
                  onValueChange={(value) => {
                    this.setState({year: value})
                  }}
                  textStyle={{fontSize: 15}}
                  data={this.props.yearsData}
                  toUpperCase={true}
                />
                <Picker
                  title='Département'
                  style={{flex: 1}}
                  selectedValue={this.state.department}
                  onValueChange={(value) => {
                    this.setState({department: value})
                  }}
                  textStyle={{fontSize: 15}}
                  data={this.props.departmentsData}
                  toUpperCase={true}
                />
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
  card: {
    marginVertical: '5%',
    borderRadius: 40,
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
