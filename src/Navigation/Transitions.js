import { forFade } from '@react-navigation/stack';
import { Easing } from 'react-native';


export const FadeTransition = {
  gestureEnabled: false, // true ?
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.out(Easing.bezier(0.075, 0.82, 0.165, 1)),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.out(Easing.bezier(0.075, 0.82, 0.165, 1)),
      },
    },
  },
  cardStyleInterpolator: ({ current }) => {
    return {
      cardStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 0.5, 0.9, 1],
          outputRange: [0, 0.25, 0.7, 1],
        }),
      },
    };
  },
  headerStyleInterpolator: forFade,
};
