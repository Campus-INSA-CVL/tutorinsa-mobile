import React from 'react'
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { Feather as Icon } from '@expo/vector-icons'
import client from '../feathers-client.js'
import NavBar from '../Components/NavBar'
import Card from '../Components/Card'
import Separator from '../Components/Separator'
import InformationsCard from '../Screens/ProfileCards/InformationsCard'

function RowItem(props) {
  return (
    <View style={styles.rowItem}>
      <View style={styles.iconContainer}>
        <Icon
          name={props.icon}
          color={props.color}
          size={30}
        />
      </View>
      <Text style={{paddingLeft: 3, color: props.color, fontWeight: 'bold', fontSize: 17}}> {props.title} </Text>
      <Text style={{paddingLeft: 3, color: props.textColor, textAlign: 'right', flex: 1}}> {props.value}</Text>
    </View>
  )
}

class PostDetails extends React.Component {
  state = {
    loadingPostDetails: true,
    refreshing: false,
  }

  toggleSubscription = (as) => {
    const { post } = this.props.route.params
    const { user } = this.props
    var type = (as=='eleve')
      ? ((post?.studentsIds) ? (post.studentsIds.includes(user._id) ? 'unsubscribe' : 'subscribe') : undefined)
      : ((post?.tutorsIds) ? (post.tutorsIds.includes(user._id) ? 'unsubscribe' : 'subscribe') : undefined)

    if (post==undefined) return

    client.service('subscriptions').patch(post._id, {
      "type": type,
      "as": as,
    }).then(() => {
      // this.props.dispatch({ type: "API_POST_FORCE_RELOAD" })
      if (as=='eleve') {
        switch (type) {
          case 'subscribe':
            post.studentsIds.push(user._id)
            break
          case 'unsubscribe':
            post.studentsIds.splice(post.studentsIds.indexOf(user._id), 1)
            break
        }
      }
      else {
        switch (type) {
          case 'subscribe':
            post.tutorsIds.push(user._id)
            post.tutors.push({
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName
            })
            break
          case 'unsubscribe':
            post.tutorsIds.splice(post.tutorsIds.indexOf(user._id), 1)
            var index
            post.tutors.forEach((item, i) => {
              if (item._id==user._id) index=i
            })
            post.tutors.splice(index, 1)
            break
        }
      }
      this.setState(this.state)
    }).catch((e) => {
      if (e.message.split(' ').slice(-4).join(' ')=="this post is full") {
        Alert.alert(
          'Trop tard !',
          'Ce cours est déjà complet.',
          [
            { text: "D'accord :(" },
          ]
        )
      }
      else {
        console.log(e)
        Alert.alert(
          'Erreur',
          'Veuillez réessayer.',
          [
            { text: "D'accord" },
          ]
        )
      }
    })
  }

  render() {
    const { post } = this.props.route.params
    const { user, theme } = this.props

    console.log(post.tutors.length);

    const subject = post?.subject?.name?.toUpperCase()
    const color = (post?.type=='eleve') ? theme.eleve : theme.tuteur
    var campus = post?.campus || post?.room?.campus
    const createdAt = post?.createdAt
    const startAt = post?.startAt
    const endAt = post?.endAt

    var content = (post.type=='eleve')
    ? [
        campus && {icon: 'home', title: 'CAMPUS', value: campus.charAt(0).toUpperCase() + campus.slice(1)},
        createdAt && {icon: 'calendar', title: 'CRÉÉ LE', value: moment(createdAt).local().format('dd').charAt(0).toUpperCase() + moment(createdAt).local().format('dddd LL').slice(1)},
      ]
    : [
        campus && {icon: 'home', title: 'CAMPUS', value: campus.charAt(0).toUpperCase() + campus.slice(1)},
        startAt && {icon: 'calendar', title: 'DATE', value: moment(startAt).local().format('dd').charAt(0).toUpperCase() + moment(startAt).local().format('dddd LL').slice(1)},
        (startAt && endAt) && {icon: 'clock', title: 'HEURE', value: moment(startAt).local().format('LT') + ' - ' + moment(endAt).local().format('LT')},
        post?.room?.name && {icon: 'map-pin', title: 'SALLE', value: post.room.name.toUpperCase()},
      ]

    content = content.map((item, index) => (
      <RowItem
        key={'content_'+index}
        icon={item.icon}
        title={item.title}
        value={item.value}
        color={color}
        textColor={theme.text}
      />
    ))

    return (
      <NavBar navigation={this.props.navigation} title="Détails de l'annonce" goBack>
        <ScrollView contentContainerStyle={{backgroundColor: theme.background, ...styles.container}}>

          <Card theme={theme} style={styles.card}>
            {[
              subject && <Text key={'title'} style={styles.title(theme)}>{subject}</Text>,
              createdAt && <Text key={'subtitle'} style={{alignSelf: 'center', fontSize: 13, color: theme.subtitle}}>{moment(createdAt).fromNow()}</Text>
            ]}
            <Separator backgroundColor={theme.separator}/>
            { content }
            <Separator backgroundColor={theme.separator}/>
            {
              post?.comment && (
                <View>
                  <Text style={{paddingBottom: 10, ...styles.title(theme)}}>DÉTAILS</Text>
                  <Text style={{alignSelf: 'center', color: theme.text}}>{post.comment}</Text>
                </View>
              )
            }
          </Card>

          {
            (post?.type=='tuteur') && (
              <Card theme={theme} style={styles.card}>
                <Text style={styles.title(theme)}>INSCRIPTION</Text>
                <Separator backgroundColor={theme.separator}/>
                <View style={{flexDirection: 'row'}}>

                  {
                    post.studentsIds && post.studentsCapacity && (
                      <Card theme={{...theme, foreground: theme.background}} style={styles.littleCard}>
                        <Text style={styles.title(theme)}>Eleves : {post.studentsIds.length}/{post.studentsCapacity}</Text>
                        <View style={styles.progressBarContainer(theme)}>
                          <View style={styles.progressBar(theme, theme.eleve, post.studentsIds.length/post.studentsCapacity)}/>
                        </View>
                        {
                          user.permissions.includes('eleve') && (
                            <TouchableOpacity
                              disabled={!(post.studentsIds.includes(user._id) || (user.permissions.includes('eleve') && post.studentsIds.length/post.studentsCapacity!=1))}
                              onPress={() => this.toggleSubscription('eleve')}
                            >
                              <View style={!(post.studentsIds.includes(user._id) || post.studentsIds.length/post.studentsCapacity!=1) ? styles.buttonDisabled(theme.eleve) : styles.button(theme.eleve)}>
                                <Text style={styles.buttonLabel(theme)}>
                                  {post.studentsIds.includes(user._id) ? "Inscrit" : post.studentsIds.length/post.studentsCapacity==1 ? "Complet !" : "S'inscrire"}
                                </Text>
                                {
                                  post.studentsIds.includes(user._id) && <Icon name='check' size={20} color={theme.buttonLabel}/>
                                }
                              </View>
                            </TouchableOpacity>
                          )
                        }
                      </Card>
                    )
                  }

                  {
                    post.tutorsIds && post.tutorsCapacity && (
                      <Card theme={{...theme, foreground: theme.background}} style={styles.littleCard}>
                        <Text style={styles.title(theme)}>Tuteur : {post.tutorsIds.length}/{post.tutorsCapacity}</Text>
                        <View style={styles.progressBarContainer(theme)}>
                          <View style={styles.progressBar(theme, theme.tuteur, post.tutorsIds.length/post.tutorsCapacity)}/>
                        </View>
                        {
                          user.permissions.includes('tuteur') && (
                            <TouchableOpacity
                              disabled={!(post.tutorsIds.includes(user._id) || (user.permissions.includes('tuteur') && post.tutorsIds.length/post.tutorsCapacity!=1))}
                              onPress={() => this.toggleSubscription('tuteur')}
                            >
                              <View style={!(post.tutorsIds.includes(user._id) || post.tutorsIds.length/post.tutorsCapacity!=1) ? styles.buttonDisabled(theme.tuteur) : styles.button(theme.tuteur)}>
                                <Text style={styles.buttonLabel(theme)}>
                                  {post.tutorsIds.includes(user._id) ? "Inscrit" : post.tutorsIds.length/post.tutorsCapacity==1 ? "Complet !" : "S'inscrire"}
                                </Text>
                                {
                                  post.tutorsIds.includes(user._id) && <Icon name='check' size={20} color={theme.buttonLabel}/>
                                }
                              </View>
                            </TouchableOpacity>
                          )
                        }
                      </Card>
                    )
                  }

                </View>
                {
                  post.tutors && (
                    null
                  )
                  //// TODO: List all tutors names here ////
                }
              </Card>
            )
          }

          {
            post?.creator && (
              <InformationsCard
                title="À PROPOS DE L'AUTEUR"
                titleStyle={{fontSize: 17, paddingVertical: 5}}
                customUser={post.creator}
                style={styles.authorCard}
              />
            )
          }

        </ScrollView>
      </NavBar>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: '5%'
  },
  littleCard: {
    marginHorizontal: '1%',
    padding: '2%'
  },
  card: {
    marginBottom: '5%',
  },
  progressBar: (theme, color, percentage) => ({
    flex: 1,
    borderRadius: 20,
    width: percentage*100 + '%',
    backgroundColor: color
  }),
  progressBarContainer: (theme) => ({
    height: 10,
    borderRadius: 20,
    margin: '5%',
    backgroundColor: theme.foreground
  }),
  authorCard: {
    paddingHorizontal: '5%',
    marginTop: 0,
    marginBottom: '5%'
  },
  iconContainer: {
    width: 40,
    alignItems: 'center'
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10
  },
  title: (theme) => ({
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    color: theme.title
  }),
  button: (color) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: '5%',
    height: 30,
    paddingHorizontal: '10%',
    backgroundColor: color,
  }),
  buttonDisabled: (color) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: '5%',
    height: 30,
    paddingHorizontal: '10%',
    backgroundColor: color+'55',
  }),
  buttonLabel: (theme) => ({
    color: theme.buttonLabel,
    fontWeight: 'bold',
    paddingHorizontal: 10
  })
})

const mapStateToProps = (store) => {
  return {
    theme: store.themeFunctions.theme,
    user: store.apiFunctions.user
  }
}

export default connect(mapStateToProps)(PostDetails)
