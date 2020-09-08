import React from 'react'
import client, { handleAllErrors } from '../feathers-client';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import Announce from '../Components/Announce';
import NavBar, { NAVBAR_HEIGHT } from '../Components/NavBar';
import LoadingWheel from '../Components/LoadingWheel';
import AnimatedAnnounce from '../Components/AnimatedAnnounce';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const ADDBUTTON_SIZE = Dimensions.get('window').width/7;

class Posts extends React.Component {
  state = {
    loadingPosts: true,
    postsData: [],
    refreshing: false,
    offset: 0,
    limit: 0,
    total: 0,
    page: 0
  }

  componentDidMount() {
    this._getFirstPosts()
  }

  _errorHandler = () => {
    this.setState({
      refreshing: false,
    })
    handleAllErrors()
  }

  _getFirstPosts = () => {
    client.service('posts').find()
          .then((res) => {
            this.setState({
              loadingPosts: false,
              refreshing: false,
              postsData: res.data,
              limit: res.limit,
              total: res.total,
              page: 1,
            });
          })
          .catch(this._errorHandler);
  }

  _loadMorePosts = () => {
    const { total, limit, page } = this.state;
    if (limit*page < total && !this.state.loadingPosts) {
      this.setState({loadingPosts: true});
      client.service('posts')
      .find({
        query: {
          $skip: limit * page
        }
      })
      .then((res) => {
        this.setState({
          offset: this.state.postsData.length,
          postsData: [...this.state.postsData, ...res.data],
          loadingPosts: false,
          page: page+1,
        });
      })
      .catch(this._errorHandler);
    }
  }

  render() {
    const { theme } = this.props;

    return (
      <NavBar title="Posts" navigation={this.props.navigation}>
        <FlatList
          contentContainerStyle={{ backgroundColor: theme.background, ...styles.flatlistContainer }}
          refreshing={this.state.refreshing}
          onRefresh={this._getFirstPosts}
          data={this.state.postsData}
          onEndReachedThreshold={0.75}
          onEndReached={this._loadMorePosts}
          keyExtractor={(item, index) => item._id}
          ListFooterComponent={<LoadingWheel style={{height: 60, justifyContent: 'flex-end'}} display={this.state.loadingPosts}/>}
          renderItem={({item, index}) => {
            return (
              <AnimatedAnnounce
                offset={this.state.offset}
                theme={theme}
                item={item}
                index={index}
                navigation={this.props.navigation}
              />
            );
          }}
        />
        <View style={{backgroundColor: theme.foreground, ...styles.addButton, ...styles.overButton}}>
          <TouchableOpacity
            style={{backgroundColor: theme.button, ...styles.addButton}}
            onPress={() => {this.props.navigation.navigate("NewPost")}}
          >
            <Feather name='plus' size={ADDBUTTON_SIZE} color={theme.buttonLabel}/>
          </TouchableOpacity>
        </View>
        { // This feature will be enabled in the next update
          // <View style={{backgroundColor: theme.foreground, ...styles.addButton, ...styles.overButton2}}>
          //   <TouchableOpacity
          //     style={{backgroundColor: theme.foreground, ...styles.addButton}}
          //     onPress={() => {this.props.navigation.navigate("FilterPosts")}}
          //   >
          //     <MaterialIcons name='filter-list' size={ADDBUTTON_SIZE*0.75} color={theme.title}/>
          //   </TouchableOpacity>
          // </View>
        }
      </NavBar>
    );
  }
}

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingBottom: 20,
    paddingTop: 10
  },
  overButton: {
    position: 'absolute',
    elevation: 5,
    right: 15,
    top: -ADDBUTTON_SIZE/2 -15,
  },
  overButton2: {
    position: 'absolute',
    elevation: 5,
    bottom: 15,
    right: 15,
  },
  addButton: {
    alignItems: 'center',
    elevation: 5,
    justifyContent: 'center',
    borderRadius: ADDBUTTON_SIZE,
    width: ADDBUTTON_SIZE*1.1,
    height: ADDBUTTON_SIZE*1.1,
  }

});

const mapStateToProps = (store) => {
  return {
    theme: store.themeFunctions.theme,
  }
}

export default connect(mapStateToProps)(Posts)
