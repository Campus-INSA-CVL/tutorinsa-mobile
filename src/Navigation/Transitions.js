import { forFade } from '@react-navigation/stack';
import { Easing } from 'react-native';
import { Animated } from 'react-native';

const { add, multiply } = Animated;

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


export const SlideFromRightTransition = {
  gestureDirection: 'horizontal',
  gestureEnabled: true,
   transitionSpec: {
     open: {
       animation: 'spring',
       config: {
         stiffness: 1000,
         damping: 500,
         mass: 3,
         overshootClamping: true,
         restDisplacementThreshold: 0.01,
         restSpeedThreshold: 0.01,
       },
     },
     close: {
       animation: 'spring',
       config: {
         stiffness: 1000,
         damping: 500,
         mass: 3,
         overshootClamping: true,
         restDisplacementThreshold: 0.01,
         restSpeedThreshold: 0.01,
       },
     },
   },
  cardStyleInterpolator: ({current, next, inverted, layouts: { screen }}) => {
    const translateFocused = multiply(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [screen.width, 0],
        extrapolate: 'clamp',
      }),
      inverted
    );

    const translateUnfocused = next
      ? multiply(
          next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, screen.width * -0.3],
            extrapolate: 'clamp',
          }),
          inverted
        )
      : 0;

    return {
      cardStyle: {
        transform: [
          // Translation for the animation of the current card
          { translateX: translateFocused },
          // Translation for the animation of the card on top of this
          { translateX: translateUnfocused },
        ],
      },
    };
  },
  headerStyleInterpolator: forFade,
};
