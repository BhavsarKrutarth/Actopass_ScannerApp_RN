import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const RNSkeletonLoader = ({style}) => {
  const shimmerValue = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmerValue]);

  const shimmerTranslate = shimmerValue.interpolate({
    inputRange: [-1, 1],
    outputRange: [-200, 200],
  });

  return (
    <View style={[styles.skeleton, style]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{translateX: shimmerTranslate}],
          },
        ]}>
        <LinearGradient
          colors={['#e0e0e0', '#f5f5f5', '#e0e0e0']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{flex: 1}}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
});

export default RNSkeletonLoader;
