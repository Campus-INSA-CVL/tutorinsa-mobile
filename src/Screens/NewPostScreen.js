import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import NavBar from '../Components/NavBar';
import { connect } from 'react-redux';

class NewPost extends React.Component {
  render() {
    const { theme } = this.props;

    return (
      <NavBar navigation={this.props.navigation} title="New Post" goBack>
        <View style={{backgroundColor: theme.background, ...styles.container}}>
        </View>
      </NavBar>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 10,
    alignItems: 'center',
    paddingHorizontal: "8%"
  },
});


const mapStateToProps = (store) => {
  return {
    theme: store.themeFunctions.theme,
  }
}

export default connect(mapStateToProps)(NewPost)
