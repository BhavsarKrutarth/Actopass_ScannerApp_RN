import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useThemeColors } from "../theme/ThemeColors";

const RNSkeletonLoader = ({ style }) => {
  const shimmerValue = useRef(new Animated.Value(-1)).current;
  const Colors = useThemeColors();

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerValue]);

  const shimmerTranslate = shimmerValue.interpolate({
    inputRange: [-1, 1],
    outputRange: [-200, 200],
  });

  return (
    <View style={[styles(Colors).skeleton, style]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX: shimmerTranslate }],
          },
        ]}
      >
        <LinearGradient
          colors={[Colors.Grey, Colors.Loading, Colors.Grey]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = (Colors) =>
  StyleSheet.create({
    skeleton: {
      overflow: "hidden",
      backgroundColor: Colors.Grey,
    },
  });

export default RNSkeletonLoader;
