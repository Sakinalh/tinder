import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  useWindowDimensions,
  Image,
} from 'react-native';
import Card from './src/components/TinderCard';
import users from './assets/data/users';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  useDerivedValue,
  interpolate,
  runOnJS,
  RotateOutDownRight,
} from 'react-native-reanimated';
import Like from './assets/images/LIKE.png';
import nope from './assets/images/nope.png';

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const currentProfile = users[currentIndex];
  const nextProfile = users[nextIndex];

  const {width: screenWidth} = useWindowDimensions();

  const hiddenTranslateX = 2 * screenWidth;
  const translateX = useSharedValue(0); // -width   0  width = input range

  const rotate = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) +
      'deg',
  ); // -60deg 0deg 60deg = output range

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        rotate: rotate.value,
      },
    ],
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.5, 1],
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.55, 1],
    ),
  }));

  const imageLikeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, hiddenTranslateX / 6], [0, 1]),
  }));

  const imageNopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-hiddenTranslateX / 5, 6], [1, 0]),
  }));

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      //use gesture context
      context.startX = translateX.value;
      console.warn('Touche start');
    },
    onActive: (event, context) => {
      //context.startX = event.translationX;
      translateX.value = context.startX + event.translationX;
    },
    onEnd: (event, context) => {
      // context.startX = event.translationX;
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);
        return;
      }

      translateX.value = withSpring(
        hiddenTranslateX * Math.sign(event.velocityX),
        {},
        () => runOnJS(setCurrentIndex)(currentIndex + 1),
      );
    },
  });

  useEffect(() => {
    translateX.value = 0;
    setNextIndex(currentIndex + 1);
  }, [currentIndex, translateX]);

  return (
    <View style={styles.pageContainer}>
      {nextProfile && (
        <View style={styles.nextCardContainer}>
          <Animated.View style={[styles.animatedCard, nextCardStyle]}>
            <Card user={nextProfile} />
          </Animated.View>
        </View>
      )}
      {currentProfile && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.animatedCard, cardStyle]}>
            <Animated.Image
              source={Like}
              style={[styles.like, {left: 10}, imageLikeStyle]}
              resizeMode="contain"
            />

            <Animated.Image
              source={nope}
              style={[styles.like, {right: 10}, imageNopeStyle]}
              resizeMode="contain"
            />

            <Card key={users[0].id} user={currentProfile} />
          </Animated.View>
        </PanGestureHandler>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  animatedCard: {
    width: '90%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextCardContainer: {
    // width: '100%',
    // position: 'absolute', replace with absoluteFillObject
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  like: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 0,
    zIndex: 3,
    elevation: 1, //for android
    fontWeight: 'bold',
  },
});

export default App;
