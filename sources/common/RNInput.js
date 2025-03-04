import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Colors, FontFamily, FontSize, hp, wp } from "../theme";
import RNImage from "./RNImage";

const RNInput = ({
  Lefticon,
  Righticon,
  Containerstyle,
  Tiheight,
  Tiwidth,
  Tipadding,
  Tiflex,
  Tifontsize,
  Tiplaceholder,
  Tiplacrholdertextcolor,
  Tifontfamily,
  Tinewstyle,
  onPress,
  value,
  onchangetext,
  securetextentry,
  tintColor,
}) => {
  const Tistyle = {
    height: Tiheight ?? 30,
    padding: Tipadding ?? 10,
    flex: Tiflex ?? 1,
    fontSize: Tifontsize ?? FontSize.font16,
    FontFamily: Tifontfamily ?? FontFamily.Regular,
    width: Tiwidth,
    // backgroundColor:'pink'
  };

  const Tiprops = {
    placeholder: Tiplaceholder ?? "",
    placeholderTextColor: Tiplacrholdertextcolor ?? Colors.Placeholder,
  };

  return (
    <View style={[style.container, Containerstyle]}>
      {Lefticon ? (
        <RNImage
          source={Lefticon}
          style={style.imagestyle}
          tintColor={tintColor || Colors.Black}
        />
      ) : null}
      <TextInput
        style={[Tistyle, Tinewstyle]}
        placeholderTextColor={Tiprops.placeholderTextColor}
        placeholder={Tiprops.placeholder}
        value={value}
        onChangeText={onchangetext}
        secureTextEntry={securetextentry}
      />
      {Righticon ? (
        <TouchableOpacity onPress={onPress}>
          <RNImage
            source={Righticon}
            style={style.imagestyle}
            tintColor={tintColor || Colors.Black}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.bordercolor,
    paddingHorizontal: wp(1.7),
    // backgroundColor:'red'
  },
  imagestyle: {
    height: wp(5),
    width: wp(5),
  },
});
export default RNInput;
