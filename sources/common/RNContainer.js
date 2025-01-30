import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import RNLoader from "./RNLoader";
import { useThemeColors } from "../theme/ThemeColors";
const RNContainer = ({
  backgroundColor,
  isLoading,
  children,
  style,
  barStyle,
  translucent,
}) => {
  const styles = [{ flex: 1, backgroundColor: backgroundColor }, style];
  const Colors = useThemeColors();
  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: backgroundColor || Colors.White }]}
    >
      {isLoading && <RNLoader visible={isLoading} />}
      <View style={styles}>
        <StatusBar
          barStyle={barStyle ?? "light-content"}
          // backgroundColor={Colors.Transparent}
          // translucent={translucent ?? true}
        />
        {children}
      </View>
    </SafeAreaView>
  );
};
export default RNContainer;
