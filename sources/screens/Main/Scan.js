import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useMemo } from "react";
import {
  RNButton,
  RNContainer,
  RNHeader,
  RNStyles,
  RNText,
} from "../../common";
import { FontFamily, FontSize, hp, normalize, wp } from "../../theme";
import { Images } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useThemeColors } from "../../theme/ThemeColors";

const Scan = () => {
  const navigation = useNavigation();
  const Colors = useThemeColors();
  const [Active, SetActive] = useState("1");

  const Data = [
    { Id: "1", Name: "Scan", Type: "QRCode", Content: "scannerView" },
    { Id: "2", Name: "RFCode", Type: "RFCode", Content: "renderTextView" },
    { Id: "3", Name: "Manually", Type: "Manually", Content: "renderTextView" },
  ];

  const handleActiveSection = ({ Id }) => SetActive(Id);

  const scannerView = useMemo(
    () => (
      <View style={styles(Colors).centerView}>
        <Text>Camera view</Text>
        <RNButton title="Scan" />
      </View>
    ),
    []
  );

  const renderTextView = useMemo(() => {
    const isRFCode = Active === "2";
    return (
      <View style={styles(Colors).centerView}>
        <View style={{ gap: hp(0.5), ...RNStyles.center }}>
          <RNText
            children={isRFCode ? "Enter RFCode" : "Enter ID"}
            size={FontSize.font24}
            family={FontFamily.SemiBold}
            color={Colors.Black}
          />
          <RNText
            children={
              isRFCode ? "Enter your RFCode here" : "Enter your ID here"
            }
            size={FontSize.font17}
            family={FontFamily.Regular}
            color={Colors.Placeholder}
          />
        </View>
        <TextInput
          placeholder="01234567"
          style={styles(Colors).textInput}
          placeholderTextColor={Colors.Grey}
        />
        <RNButton style={styles(Colors).buttonView} title="Send" />
      </View>
    );
  }, [Active]);

  return (
    <RNContainer>
      <RNHeader
        Onleftpress={() => navigation.navigate("Index")}
        leftimagestyle={{ tintColor: Colors.imagecolor }}
        LeftImage={Images.drawer}
        style={{ marginHorizontal: wp(3) }}
        Touch={{
          backgroundColor: Colors.Grey,
          borderRadius: normalize(50),
          padding: wp(0),
          height: hp(2),
          width: wp(3),
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      <View style={styles(Colors).container}>
        {Data.map((item) => (
          <View key={item.Id} style={{ width: wp(27) }}>
            <RNButton
              title={item.Name}
              style={styles(Colors, Active === item.Id).button}
              onPress={() => handleActiveSection(item)}
              textStyle={styles(Colors, Active === item.Id).buttonText}
            />
          </View>
        ))}
      </View>

      <View style={{ ...RNStyles.flexCenter, paddingBottom: hp(12) }}>
        {Active === "1" ? scannerView : renderTextView}
      </View>
    </RNContainer>
  );
};

export default Scan;

const styles = (Colors, isActive = false) =>
  StyleSheet.create({
    container: {
      justifyContent: "space-between",
      flexDirection: "row",
      marginHorizontal: wp(7),
      marginTop: hp(3),
    },
    buttonView: {
      alignSelf: "center",
      backgroundColor: Colors.Purple,
      width: wp(90),
      marginTop: hp(3),
    },
    textInput: {
      width: wp(90),
      borderBottomWidth: normalize(2),
      borderBottomColor: Colors.Grey,
      fontSize: FontSize.font36,
      fontFamily: FontFamily.Medium,
      color: Colors.Black,
      textAlign: "center",
    },
    centerView: {
      ...RNStyles.center,
      gap: hp(5),
    },
    button: {
      backgroundColor: isActive ? Colors.Purple : Colors.Grey,
      marginHorizontal: wp(0),
      borderRadius: normalize(7),
      paddingVertical: hp(1.5),
      paddingHorizontal: wp(0),
    },
    buttonText: {
      fontSize: FontSize.font14,
      color: isActive ? Colors.White : Colors.DarkGrey,
    },
  });
