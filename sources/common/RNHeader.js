import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FontFamily, FontSize, wp } from "../theme";
import RNText from "./RNText";
import { Images } from "../constants";
import { useNavigation } from "@react-navigation/native";
import RNStyles from "./RNStyles";
import { useThemeColors } from "../theme/ThemeColors";

const RNHeader = ({
  title,
  style,
  Touch,
  LeftImage,
  Onleftpress,
  leftimagestyle,
}) => {
  const navigation = useNavigation();
  const Colors = useThemeColors();
  return (
    <SafeAreaView
      style={[
        { ...RNStyles.flexRowBetween, backgroundColor: Colors.White },
        style,
      ]}
    >
      <TouchableOpacity
        style={[Touch, { padding: wp(6) }]}
        onPress={() => {
          navigation.goBack();
          if (typeof Onleftpress === "function") {
            Onleftpress();
          }
        }}
      >
        <Image
          source={LeftImage}
          style={[
            leftimagestyle,
            {
              width: wp(5),
              height: wp(5),
              resizeMode: "contain",
              tintColor: Colors.Black,
            },
          ]}
        />
      </TouchableOpacity>
      <RNText
        size={FontSize.font16}
        family={FontFamily.Medium}
        color={Colors.Black}
      >
        {title}
      </RNText>
      <TouchableOpacity style={{ padding: wp(6) }}>
        <Image
          source={null}
          style={{ width: wp(3), height: wp(3), resizeMode: "contain" }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RNHeader;

const styles = StyleSheet.create({
  headerContainer: {},
});
