import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import NavBar from '../Components/NavBar';
import Card from '../Components/Card';
import Separator from '../Components/Separator';
import { connect } from 'react-redux';

class FilterButton extends React.Component {
  render() {
    const { theme } = this.props;

    return (
      <TouchableOpacity
        style={{
          backgroundColor: this.props.selected ? theme.button : theme.button + '55',
          ...styles.filterButton
        }}
        onPress={this.props.onPress}
      >
        <Text style={{color: theme.buttonLabel}}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

class FilterPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      campus: (this.props.filterQuery && this.props.filterQuery.campus) || [],
      type: (this.props.filterQuery && this.props.filterQuery.type) || []
    }
  }

  validate = () => {
    var roomIds = []
    var query = {}

    console.log(this.props.rooms, roomIds);
    if (this.state.campus.length>0) {
      this.props.rooms.map(room => {
        if (this.state.campus.includes(room.campus)) {
          roomIds.push(room._id)
        }
      })
    }
    console.log(this.props.rooms, roomIds);

    if (this.state.type.length>0) {
      query.type = {
        $in: this.state.type
      }
    }

    console.log(query);
    this.props.navigation.goBack()
  }

  _switchCampus = (name) => {
    var campus = this.state.campus
    if (this.state.campus.includes(name)) {
      campus.splice(campus.indexOf(name), 1)
    }
    else {
      campus.push(name)
    }
    this.setState({campus})
  }

  _switchType = (name) => {
    var type = this.state.type
    if (this.state.type.includes(name)) {
      type.splice(type.indexOf(name), 1)
    }
    else {
      type.push(name)
    }
    this.setState({type})
  }

  render() {
    const { theme } = this.props;

    return (
      <NavBar
        navigation={this.props.navigation}
        title="Filtrer les posts"
        close
        validate={this.validate}
      >
        <View style={{backgroundColor: theme.background, ...styles.container}}>
          <View style={{backgroundColor: theme.foreground, ...styles.card}}>
            <View style={styles.row}>
              <Text style={{color: theme.title, ...styles.title}}>Par campus</Text>
              <FilterButton
                theme={theme}
                title="Blois"
                selected={this.state.campus.includes('blois')}
                onPress={() => this._switchCampus('blois')}
              />
              <FilterButton
                theme={theme}
                title="Bourges"
                selected={this.state.campus.includes('bourges')}
                onPress={() => this._switchCampus('bourges')}
              />
            </View>
            <Separator backgroundColor={theme.separator}/>
            <View style={styles.row}>
              <Text style={{color: theme.title, ...styles.title}}>Par type de post</Text>
              <FilterButton
                theme={theme}
                title="Tuteur"
                selected={this.state.type.includes('tuteur')}
                onPress={() => this._switchType('tuteur')}
              />
              <FilterButton
                theme={theme}
                title="Eleve"
                selected={this.state.type.includes('eleve')}
                onPress={() => this._switchType('eleve')}
              />
            </View>

          </View>
        </View>
      </NavBar>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    padding: '5%'
  },
  row : {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  card: {
    // flex: 1,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    padding: 10
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10
  }
});


const mapStateToProps = (store) => {
  return {
    theme: store.themeFunctions.theme,
    filterQuery: store.apiFunctions.filter,
    rooms: store.apiFunctions.rooms
  }
}

export default connect(mapStateToProps)(FilterPosts)
