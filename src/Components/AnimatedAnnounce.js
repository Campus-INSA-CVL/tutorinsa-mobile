import React from 'react'
import { StyleSheet, View, Animated, Easing, TouchableOpacity } from 'react-native';
import Announce from './Announce';

class AnimatedAnnounce extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topPosition: new Animated.Value(30),
      opacity: new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(
        this.state.topPosition,
        {
          delay: 100 * (this.props.index - this.props.offset),
          toValue: 0,
          duration: 2000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true
        }
      ),
      Animated.timing(
        this.state.opacity,
        {
          delay: 100 * (this.props.index - this.props.offset),
          toValue: 1,
          duration: 2000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true
        }
      )
    ]).start(() => {AnimatedAnnounce.offset = this.props.index})
  }

  render() {
    return (
      <Animated.View
        style={{
          opacity: this.state.opacity,
          transform: [{ translateY: this.state.topPosition }]
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("PostDetails", {post: this.props.item, theme: this.props.theme})
          }}
          style={styles.container}
        >
          <Announce item={this.props.item}/>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginBottom: 0,
  },
});

export default AnimatedAnnounce
