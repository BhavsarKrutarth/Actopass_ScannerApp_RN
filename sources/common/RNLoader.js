import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors } from "../theme";
import RNStyles from "./RNStyles";
const RNLoader = ({ visible, style, color, size }) => {
  return visible ? (
    <View style={[styles.Container, style]}>
      <ActivityIndicator size={size ?? "large"} color={color || Colors.Grey} />
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  Container: {
    ...RNStyles.center,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.White,
    zIndex: 10000,
  },
});
export default RNLoader;
