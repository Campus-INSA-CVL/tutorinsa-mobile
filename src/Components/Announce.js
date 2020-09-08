import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Separator from './Separator'
import { getDepartmentIcon } from '../Screens/ProfileCards/InformationsCard'
import { Feather as Icon } from '@expo/vector-icons'
import moment from 'moment'
import { connect } from 'react-redux'

function RowItem(props) {
  const { icon, value, iconColor, textColor } = props.item

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: props.lastItem ? 0 : 5}}>
      <Icon
        name={icon}
        color={iconColor}
        size={20}
      />
      <Text style={{paddingLeft: 3, color: textColor}}> {value}</Text>
    </View>
  )
}

class Announce extends React.Component {
  render() {
    let theme = (this.props.themeOverride)
      ? this.props.themeOverride
      : this.props.theme

    const post = this.props.item

    const subject = post?.subject?.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
    const departmentName = post?.creator?.department?.name
    const fullCreatorName = (post?.creator?.firstName && post.creator.lastName)
      ? post.creator.firstName.charAt(0).toUpperCase()
          + post.creator.firstName.slice(1)
          + " "
          + post.creator.lastName.charAt(0).toUpperCase()
          + post.creator.lastName.slice(1)
      : undefined
    var campus = post?.campus || post?.room?.campus
    if (campus) {
      campus = campus.charAt(0).toUpperCase() + campus.slice(1)
    }
    const startAt = post?.startAt
    const endAt = post?.endAt

    const content = []
    if (post.type=='eleve') {
      fullCreatorName && content.push({ icon: 'user', value: fullCreatorName, iconColor: theme.eleve, textColor: theme.subtitle})
      departmentName && content.push({ icon: getDepartmentIcon(departmentName), value: departmentName.toUpperCase(), iconColor: theme.eleve, textColor: theme.subtitle})
      campus && content.push({ icon: 'home', value: campus, iconColor: theme.eleve, textColor: theme.subtitle})
    }
    else {
      startAt && content.push({ icon: 'calendar', value: moment(startAt).local().format('dddd LL'), iconColor: theme.tuteur, textColor: theme.subtitle})
      startAt && endAt && content.push({ icon: 'clock', value: moment(startAt).local().format('LT')+' - '+moment(endAt).local().format('LT'), iconColor: theme.tuteur, textColor: theme.subtitle})
      fullCreatorName && content.push({ icon: 'user', value: fullCreatorName, iconColor: theme.tuteur, textColor: theme.subtitle})
      campus && content.push({ icon: 'home', value: campus, iconColor: theme.tuteur, textColor: theme.subtitle})
    }

    return (
      <View style={{
        backgroundColor: theme.background,
        flex: 1,
        borderRadius: 6,
        overflow: 'hidden',
        marginRight: 10
      }}>
        <View style={{
          backgroundColor: post.type=='eleve' ? theme.eleve : theme.tuteur,
          ...styles.announce
        }}>
          <View style={{ backgroundColor: theme.foreground, ...styles.container }}>
            <Text style={{paddingLeft: 10, fontWeight: 'bold', color: theme.title}}>{subject}</Text>
            <Separator backgroundColor={theme.separator}/>
            { content.map((item, index) => <RowItem key={'item_'+index} item={item} lastItem={index==content.length-1}/>) }
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  announce: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    width: "98.5%",
    padding: 10,
  },
})


const mapStateToProps = (store) => {
  return {
    theme: store.themeFunctions.theme,
  }
}

export default connect(mapStateToProps)(Announce)
