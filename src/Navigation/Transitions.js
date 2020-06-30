import { forFade, CardStyleInterpolators } from '@react-navigation/stack';
import { Easing, Animated } from 'react-native';

const { add, multiply } = Animated;

export const FadeTransition = {
  gestureEnabled: false,
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
            outputRange: [0, -screen.width],
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

const easeOutExpoConfig = {
  animation: 'timing',
  config: {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    duration: 600
  }
}

export const SlideFromBottomTransition = {
  transitionSpec: {
    open: easeOutExpoConfig,
    close: easeOutExpoConfig,
  },
  cardStyleInterpolator: ({current, next, inverted, layouts: { screen }}) => {

    const translateFocused = multiply(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [screen.height, 0],
        extrapolate: 'clamp',
      }),
      inverted
    );

    const translateUnfocused = next
      ? multiply(
          next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -screen.height],
            extrapolate: 'clamp',
          }),
          inverted
        )
      : 0;


    return {
      cardStyle: {
        transform: [
          // Translation for the animation of the current card
          { translateY: translateFocused },
          // Translation for the animation of the card on top of this
          { translateY: translateUnfocused },
        ],
      },
    };
  },
};
