import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
  Dimensions,
  TextInput,
  ScrollView,
  FlatList,
  Alert
} from 'react-native'
import { ButtonGroup } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'
import Slider from '@react-native-community/slider'
import NavBar, { NAVBAR_HEIGHT } from '../Components/NavBar'
import Picker from '../Components/Picker'
import LoadingWheel from '../Components/LoadingWheel'
import Card from '../Components/Card'
import { connect } from 'react-redux'
import moment from 'moment'
import client, { fetchAPI } from '../feathers-client'

class AnnounceType extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anim: new Animated.Value(-45),
    }
    if (props.selectedAnnounce == props.id) {
      Animated.timing(this.state.anim, {
        toValue: 0,
        duration: 100,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true
      }).start()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const isSelected = (this.props.selectedAnnounce == this.props.id)
    if (prevProps.selectedAnnounce!=this.props.selectedAnnounce && isSelected) {
      Animated.timing(this.state.anim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true
      }).start()
    }
    if (prevProps.selectedAnnounce!=this.props.selectedAnnounce && !isSelected) {
      Animated.timing(this.state.anim, {
        toValue: -45,
        duration: 100,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true
      }).start()
    }
  }

  render() {
    const { theme, id } = this.props
    const isSelected = (this.props.selectedAnnounce == id)

    return (
      <View
          style={styles.announceTypesContainer}
      >
        <Animated.View
          style={{
            ...styles.announceTypeOverlay,
            transform: [{translateY: this.state.anim}],
            backgroundColor: theme[id]
          }}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.onPress(id)
          }}
          style={{ ...styles.announceType}}
        >
          <Text style={{color: isSelected ? theme.buttonLabel : theme.title, ...styles.title}}>
            {this.props.title}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}


class NewPost extends React.Component {
  constructor(props) {
    super(props)

    this.eleveOpacity = new Animated.Value(0)
    this.tuteurOpacity = new Animated.Value(0)
    this.eleveTopPosition = new Animated.Value(-Dimensions.get('window').height)
    this.tuteurTopPosition = new Animated.Value(-Dimensions.get('window').height)

    this.state = {
      date: new Date(),
      duration: 0,
      announceType: 'eleve',
      campus: 'Bourges',
      matiere: '',
      description: '',
      salle: '',
      loading: false,
      nbStudents: 10,
      nbTutors: 2
    }

    if (props.user.permissions.includes('eleve')) {
      this.state.announceType = 'eleve'
    }
    if (props.user.permissions.includes('tuteur')) {
      this.state.announceType = 'tuteur'
    }
  }

  componentDidMount() {
    Animated.sequence([
      Animated.timing(this.state.announceType=='eleve'? this.eleveTopPosition : this.tuteurTopPosition, {
        toValue: 0,
        duration: 0,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true
      }),
      Animated.timing(this.state.announceType=='eleve'? this.eleveOpacity : this.tuteurOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true
      })
    ]).start()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.announceType != this.state.announceType) {
      Animated.sequence([
        Animated.timing(this.state.announceType=='eleve'? this.eleveTopPosition : this.tuteurTopPosition, {
          toValue: 0,
          duration: 0,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true
        }),

        Animated.parallel([
          Animated.timing(this.eleveOpacity, {
            toValue: this.state.announceType=='eleve' ? 1 : 0,
            duration: 500,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true
          }),
          Animated.timing(this.tuteurOpacity, {
            toValue: this.state.announceType=='eleve' ? 0 : 1,
            duration: 500,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true
          })
        ]),

        Animated.timing(this.state.announceType=='eleve'? this.tuteurTopPosition : this.eleveTopPosition, {
          toValue: -Dimensions.get('window').height,
          duration: 0,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true
        }),
      ]).start()
    }
  }

  submit = () => {
    const { campus, matiere, description, salle, date, announceType, nbStudents, nbTutors, duration } = this.state

    if (announceType=='eleve') {
      if (matiere!='' && description!='') {
        this.setState({loading: true})
        client.service('posts').create({
           "type": 'eleve',
           "campus": campus.toLowerCase(),
           "subjectId": matiere,
           "comment": description
        }).then(() => {
          this.setState({loading: false})
          Alert.alert(
            'Post créé',
            'Le post a été créé avec succès',
            [
              { text: "D'accord" },
            ]
          )
          this.props.navigation.goBack()
        }).catch(e => {
          this.setState({loading: false})
          Alert.alert(
            'Erreur',
            'Il y a eu une erreur. Veuillez réessayer.',
            [
              { text: "D'accord" },
            ]
          )
          // console.log(e)
        })
      }
      else {
        Alert.alert(
          'Erreur',
          'Veuillez choisir une matière et entrer une description.',
          [
            { text: "D'accord" },
          ]
        )
      }
    }


    else {
      if (matiere!='' && description!='' && salle!='') {
        this.setState({loading: true})
        client.service('posts').create({
           "type": 'tuteur',
           "campus": campus.toLowerCase(),
           "subjectId": matiere,
           "roomId": salle,
           "startAt": date,
           "duration": duration,
           "studentsCapacity": nbStudents,
           "tutorsCapacity": nbTutors,
           "comment": description
        }).then(() => {
          this.setState({loading: false})
          Alert.alert(
            'Post créé',
            'Le post a été créé avec succès',
            [
              { text: "D'accord" },
            ]
          )
          this.props.navigation.goBack()
        }).catch(e => {
          this.setState({loading: false})
          Alert.alert(
            'Erreur',
            'Il y a eu une erreur. Veuillez réessayer.',
            [
              { text: "D'accord" },
            ]
          )
          console.log(e)
        })
      }
      else {
        Alert.alert(
          'Erreur',
          'Veuillez choisir une matière, entrer une description et choisir un horaire valide parmis ceux proposés.',
          [
            { text: "D'accord" },
          ]
        )
      }
    }
  }

  render() {
    const { user, theme, subjectsData, roomsData } = this.props
    var announceTypes = []
    if (user.permissions.includes('eleve')) {
      announceTypes.push(
        <AnnounceType
          id='eleve'
          key='eleve'
          title={'Demande d\'aide'}
          selectedAnnounce={this.state.announceType}
          theme={this.props.theme}
          onPress={(id) => {
            this.setState({announceType: id})
          }}
        />
      )
    }
    if (user.permissions.includes('tuteur')) {
      announceTypes.push(
        <AnnounceType
          id='tuteur'
          key='tuteur'
          title='Proposition de cours'
          selectedAnnounce={this.state.announceType}
          theme={this.props.theme}
          onPress={(id) => {
            this.setState({announceType: id})
          }}
        />
      )
    }

    return (
      <>
        <NavBar
          navigation={this.props.navigation}
          title="Nouveau Post"
          close
          validate={this.submit}
        >
          <ScrollView contentContainerStyle={{ height: Dimensions.get('window').height-NAVBAR_HEIGHT}}>
            <View style={{backgroundColor: theme.background, ...styles.container}}>
              <View style={{backgroundColor: theme.foreground, ...styles.card}}>
                <View style={styles.row}>
                  {announceTypes}
                </View>
                <View style={{flex: 1}}>

                  <Animated.View
                    style={{
                      opacity: this.eleveOpacity,
                      transform: [{ translateY: this.eleveTopPosition }],
                      ...styles.overlay
                    }}
                  >
                    <EleveForm
                      theme={theme}
                      subjectsData={subjectsData}
                      setState={(value) => {this.setState(value)}}
                      campus={this.state.campus}
                      matiere={this.state.matiere}
                      description={this.state.description}
                    />
                  </Animated.View>

                  <Animated.View
                  style={{
                    opacity: this.tuteurOpacity,
                    transform: [{ translateY: this.tuteurTopPosition }],
                    ...styles.overlay
                  }}
                  >
                    <TuteurForm
                      theme={theme}
                      subjectsData={subjectsData}
                      roomsData={roomsData}
                      setState={(value) => {this.setState(value)}}
                      campus={this.state.campus}
                      matiere={this.state.matiere}
                      salle={this.state.salle}
                      description={this.state.description}
                      date={this.state.date}
                      nbStudents={this.state.nbStudents}
                      nbTutors={this.state.nbTutors}
                    />
                  </Animated.View>

                </View>
              </View>
            </View>
          </ScrollView>
        </NavBar>
        <LoadingWheel overlay display={this.state.loading}/>
      </>
    )
  }
}


function EleveForm(props) {
  const { theme, campus, matiere, description, setState } = props
  const buttons = ['Blois', 'Bourges']

  return (
    <View style={styles.form}>
    <View style={styles.row}>
      <Text style={{color: theme.eleve, flex: 0.5, ...styles.title}}>Campus</Text>
      <ButtonGroup
        onPress={(index) => {
          setState({campus: buttons[index]})
        }}
        selectedIndex={buttons.indexOf(campus)}
        buttons={buttons}
        containerStyle={{
          flex: 1,
          borderRadius: 100,
          borderWidth: 0.2,
          borderColor: theme.separator,
          backgroundColor: theme.foreground,
        }}
        textStyle={{
          color: theme.subtitle
        }}
        selectedButtonStyle={{
          backgroundColor: theme.eleve
        }}
        selectedTextStyle={{
          color: theme.buttonLabel
        }}
      />
    </View>
    <View style={styles.row}>
      <Text style={{color: theme.eleve, flex: 0.5, ...styles.title}}>Matière</Text>
      <Picker
        style={{flex: 1, padding: 10, marginBottom: 10}}
        title='Choisissez une matière'
        selectedValue={matiere}
        onValueChange={(value) => {
          setState({ matiere: value })
        }}
        textStyle={{fontSize: 15}}
        theme={theme}
        data={props.subjectsData}
      />
    </View>
    <View style={styles.row}>
      <Text style={{color: theme.eleve, flex: 0.5, ...styles.title}}>Description</Text>
      <TextInput
        style={{
          flex: 1,
          borderColor: theme.separator,
          color: theme.text,
          ...styles.textInputMultiline
        }}
        value={description}
        onChangeText={text => setState({description: text})}
        textAlignVertical='top'
        multiline
        placeholder='Veuillez entrer une description'
        placeholderTextColor={theme.subtitle}
      />
    </View>
    </View>
  )
}

function TuteurForm(props) {
  const { theme, campus, matiere, description, salle, date, nbStudents, nbTutors, setState } = props
  const [ pickerOpened, setPickerOpened ] = React.useState(false)
  const [ loadingRooms, setLoadingRooms ] = React.useState()
  const [ occupiedRoomsIds, setOccupiedRoomsIds ] = React.useState([])
  const buttons = ['Blois', 'Bourges']
  var initSliders = true
  const filteredRoomsIds = props.roomsData.filter(room =>
    room.campus == campus.toLowerCase() && room.day == moment(date).format('dddd')
  ).map(room => room._id)

  React.useEffect(() => {
    const start = new Date(date)
    start.setHours(0)
    start.setMinutes(0)
    start.setSeconds(0)
    start.setMilliseconds(0)

    const end = new Date(start)
    end.setHours(23)
    end.setMinutes(59)
    end.setSeconds(59)
    end.setMilliseconds(999)

    fetchAPI('posts', {
      type: 'tuteur',
      startAt: { $gte: start, $lte: end }
    }).then((data) => {
      const occupiedRooms = []
      data.forEach((post, i) => {
        occupiedRooms.push(post.room._id)
      })
      setLoadingRooms(false)
      setOccupiedRoomsIds(occupiedRooms)
    })
  }, [date])

  React.useEffect(() => {
    initSliders = false
  }, [nbStudents, nbTutors])

  occupiedRoomsIds.forEach((roomId, i) => {
    if (filteredRoomsIds.includes(roomId)) {
      filteredRoomsIds.splice(filteredRoomsIds.indexOf(roomId), 1)
    }
  })

  const filteredRooms = props.roomsData.filter(room => filteredRoomsIds.includes(room._id))

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setPickerOpened(false)
    setLoadingRooms(true)
    setState({ date: currentDate, salle: '' })
  }

  return (
    <View style={styles.form}>
      <View style={styles.row}>
        <Text style={{color: theme.tuteur, flex: 0.5, ...styles.title}}>Campus</Text>
        <ButtonGroup
          onPress={(index) => {
            setState({campus: buttons[index]})
          }}
          selectedIndex={buttons.indexOf(campus)}
          buttons={buttons}
          containerStyle={{
            flex: 1,
            borderRadius: 100,
            borderWidth: 0.2,
            borderColor: theme.separator,
            backgroundColor: theme.foreground,
          }}
          textStyle={{
            color: theme.subtitle
          }}
          selectedButtonStyle={{
            backgroundColor: theme.tuteur
          }}
          selectedTextStyle={{
            color: theme.buttonLabel
          }}
        />
      </View>
      <View style={styles.row}>
        <Text style={{color: theme.tuteur, flex: 0.5, ...styles.title}}>Matière</Text>
        <Picker
          style={{flex: 1, padding: 10, marginBottom: 10}}
          title='Choisissez une matière'
          selectedValue={matiere}
          onValueChange={(value) => {
            setState({ matiere: value })
          }}
          textStyle={{fontSize: 15}}
          theme={theme}
          data={props.subjectsData}
        />
      </View>
      <View style={styles.row}>
        <Text style={{color: theme.tuteur, flex: 0.5, ...styles.title}}>Description</Text>
        <TextInput
          style={{
            flex: 1,
            borderColor: theme.separator,
            color: theme.text,
            ...styles.textInputMultiline
          }}
          value={description}
          onChangeText={text => setState({description: text})}
          textAlignVertical='top'
          multiline
          placeholder='Veuillez entrer une description'
          placeholderTextColor={theme.subtitle}
        />
      </View>
      <View style={{marginVertical: 20, ...styles.row}}>
        <Text style={{color: theme.tuteur, flex: 0.5, ...styles.title}}>Jour</Text>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.2,
            borderRadius: 5,
            borderColor: theme.separator,
            height: 30,
            padding: 10,
          }}
          onPress={() => {setPickerOpened(true)}}
        >
          <Text style={{color: theme.title}}>{moment(date).format('dddd DD/MM/YYYY')}</Text>
        </TouchableOpacity>
        {
          pickerOpened && (
            <DateTimePicker
              minimumDate={new Date()}
              value={date}
              mode='date'
              onChange={onChange}
            />
          )
        }
      </View>
      {
        (filteredRooms.length > 0)
        ? <>
            <View style={styles.row}>
              <Text style={{color: theme.tuteur, flex: 0.5, ...styles.title}}>Salle et{'\n'}horaire</Text>
              {
                (loadingRooms)
                ? <LoadingWheel/>
                : <FlatList
                    style={{
                      height: filteredRooms.length > 3 ? 3*30 : undefined,
                      flex: 1,
                      marginRight: 10,
                      borderRadius: 5,
                      borderWidth: 0.2,
                      borderColor: theme.separator}}
                    data={filteredRooms}
                    keyExtractor={(item, index) => item._id}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          style={{
                            flex:1,
                            height: 30,
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flexDirection: 'row',
                            backgroundColor: salle == item._id ? theme.tuteur : undefined,
                            borderBottomWidth: 0.2,
                            borderColor: theme.separator,
                            borderTopLeftRadius: index == 0 ? 5 : 0,
                            borderTopRightRadius: index == 0 ? 5 : 0,
                            borderBottomLeftRadius: index == filteredRooms.length-1 ? 5 : 0,
                            borderBottomRightRadius: index == filteredRooms.length-1 ? 5 : 0,
                          }}
                          onPress={() => {
                            const startAt = date.toISOString().split('T')[0] + 'T' + item.startAt.split('T')[1]

                            setState({
                              salle: item._id,
                              date: startAt,
                              duration: item.duration
                            })
                          }}
                        >
                          <Text style={{flex: 0.4, textAlign: 'center', color: salle == item._id ? theme.buttonLabel: theme.text}}>{item.name.toUpperCase()}</Text>
                          <Text style={{flex: 0.6, textAlign: 'center', color: salle == item._id ? theme.buttonLabel: theme.text}}>{moment(item.startAt).format('LT')} - {moment(item.endAt).format('LT')}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
              }
            </View>
            {
              (!loadingRooms)
              ? <>
                  <View style={{marginVertical: 20, ...styles.row}}>
                    <Text style={{color: theme.tuteur, flex: 0.5, ...styles.title}}>Capacité{'\n'}d'élèves</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10, flex: 1}}>
                      <Text style={{color: theme.eleve, flex: 0.15, textAlign: 'right', ...styles.title}}>{nbStudents}</Text>
                      <Slider
                        style={{flex: 1}}
                        minimumValue={5}
                        maximumValue={20}
                        value={initSliders ? 10 : undefined}
                        step={1}
                        onValueChange={(value) => {setState({nbStudents: value})}}
                        minimumTrackTintColor={theme.eleve}
                        maximumTrackTintColor={theme.separator}
                        thumbTintColor={theme.eleve}
                      />
                    </View>
                  </View>
                  <View style={styles.row}>
                    <Text style={{color: theme.tuteur, flex: 0.5, ...styles.title}}>Capacité{'\n'}de tuteurs</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10, flex: 1}}>
                      <Text style={{color: theme.tuteur, flex: 0.15, textAlign: 'right', ...styles.title}}>{nbTutors}</Text>
                      <Slider
                        style={{flex: 1}}
                        minimumValue={1}
                        maximumValue={5}
                        value={initSliders ? 2 : undefined}
                        step={1}
                        onValueChange={(value) => {setState({nbTutors: value})}}
                        minimumTrackTintColor={theme.tuteur}
                        maximumTrackTintColor={theme.separator}
                        thumbTintColor={theme.tuteur}
                      />
                    </View>
                  </View>
                </>
              : null
            }
          </>
        : <Text style={{
            marginTop: 30,
            alignSelf: 'center',
            fontStyle: 'italic',
            color: theme.subtitle
          }}>
            Aucune disponibilité pour le jour choisi
          </Text>
      }
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    paddingHorizontal: '5%'
  },
  card: {
    flex: 1,
    marginBottom: '5%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: '100%',
  },
  form: {
    paddingHorizontal: 40,
    paddingVertical: 20
  },
  row : {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  announceTypesContainer: {
    flex: 1,
    height: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden'
  },
  announceType: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
  },
  announceTypeOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 50,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  textInputMultiline: {
    flex: 1,
    width: '100%',
    borderWidth: 0.2,
    borderRadius: 5,
    padding: 10,
    height: 100,
  }
})


const mapStateToProps = (store) => {
  return {
    theme: store.themeFunctions.theme,
    user: store.apiFunctions.user,
    subjectsData : store.apiFunctions.subjects,
    roomsData : store.apiFunctions.rooms,
  }
}

export default connect(mapStateToProps)(NewPost)
