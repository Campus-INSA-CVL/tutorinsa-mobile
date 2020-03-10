import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';
import Dots from '../../Components/Dots';

class InformationsForm extends React.Component {
  state={
    year: '',
    role: '',
    course: '',
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1, justifyContent: 'space-around', paddingBottom: '5%'}}>
          <Text style={{alignSelf: 'center', fontSize:15, paddingTop:10, fontStyle: 'italic'}}>Quelques informations</Text>
          <Picker
            selectedValue={this.state.year}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({language: itemValue})
            }
          >
            <Picker.Item label="Année" value="" />
            <Picker.Item label="1A" value="1A" />
            <Picker.Item label="2A" value="2A" />
            <Picker.Item label="3A" value="3A" />
            <Picker.Item label="4A" value="4A" />
            <Picker.Item label="5A" value="5A" />
            <Picker.Item label="Ancien" value="Ancien" />
            <Picker.Item label="Autre" value="Autre" />
          </Picker>

          <Picker
            selectedValue={this.state.role}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({language: itemValue})
            }
          >
            <Picker.Item label="Rôle" value="" />
            <Picker.Item label="Tuteur" value="tutor" />
            <Picker.Item label="Etudiant" value="studient" />
            <Picker.Item label="Les deux" value="both" />
          </Picker>

          <Picker
            selectedValue={this.state.course}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({language: itemValue})
            }
          >
            <Picker.Item label="Filière" value="" />
            <Picker.Item label="STPI" value="STPI" />
            <Picker.Item label="GSI" value="GSI" />
            <Picker.Item label="STI" value="STI" />
            <Picker.Item label="ENP" value="ENP" />
            <Picker.Item label="ERE" value="ERE" />
            <Picker.Item label="MRI" value="MRI" />
            <Picker.Item label="ERE" value="ERE" />
            <Picker.Item label="Autre" value="other" />
          </Picker>
        </View>
        <View style={{paddingBottom: '5%', flex: 0.4, justifyContent: 'space-around'}}>
          <TouchableOpacity
            disabled={this.state.year=='' || this.state.course=='' || this.state.role==''}
            style={{backgroundColor: (this.state.year!='' && this.state.course!='' && this.state.role!='') ? '#4e73df' : '#ddd', ...styles.nextButton}}
            onPress={() => {
              if (this.state.year!='' && this.state.course!='' && this.state.role!='') {
                this.props.navigation.navigate("EmailPass", {
                  firstName: this.props.route.params.firstName,
                  lastName: this.props.route.params.lastName,
                  year: this.state.year,
                  role: this.state.role,
                  course: this.state.course,
                });
              }
            }}
          >
            <Text style={{alignSelf: 'center', color: 'white', fontSize:15}}>Suivant</Text>
          </TouchableOpacity>
          <View>
            <Dots number={3} selected={0} />
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
    borderColor: '#ddd',
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
