import {
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { RNImage, RNStyles, RNText } from "../common";
import { Images } from "../constants";
import { useThemeColors } from "../theme/ThemeColors";
import { FontFamily, hp, wp } from "../theme";

export default function ProfileModal({ visible, data, hideProfileModal }) {
  const Colors = useThemeColors();
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={hideProfileModal}>
        <View style={styles(Colors).modalContents}>
          <TouchableOpacity
            hitSlop={40}
            style={{ position: "absolute", top: hp(6), right: wp(6) }}
            onPress={hideProfileModal}
          >
            <RNImage
              tintColor={Colors.Black}
              source={Images.close}
              style={{ width: wp(7), height: wp(7) }}
            />
          </TouchableOpacity>
          <RNText style={[styles(Colors).subtitle, { fontSize: 25 }]}>
            ID: {data?.RegistrationId}
          </RNText>
          <View style={{ ...RNStyles.center, marginBottom: 20 }}>
            <RNImage
              source={
                data?.profilephoto?.length === 0
                  ? Images.Profile
                  : { uri: data?.profilephoto }
              }
              style={styles(Colors).profileImage}
            />
            <View style={styles(Colors).ringContainer}>
              <View style={styles(Colors).outerRing} />
              <View style={styles(Colors).middleRing} />
              <View style={styles(Colors).innering} />
            </View>
          </View>
          <View style={{ alignItems: "center", gap: hp(2) }}>
            <RNText style={styles(Colors).title}>{data?.Vendor}</RNText>
            <RNText style={styles(Colors).title}>
              {data?.group} - {data?.KhelaiyaGroupType}
            </RNText>
            <View style={{ alignItems: "center", gap: hp(0.5) }}>
              <RNText style={styles(Colors).nameText}>{data?.name} </RNText>
            </View>
          </View>

          <RNImage
            source={Images.ActoscriptLogo}
            style={styles(Colors).logoImage}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = (Colors) =>
  StyleSheet.create({
    modalContents: {
      ...RNStyles.flexCenter,
      backgroundColor: Colors.White,
      padding: 20,
      gap: hp(5),
    },
    profileImage: {
      width: wp(40),
      height: wp(40),
      borderRadius: wp(50),
    },
    title: {
      fontFamily: FontFamily.Bold,
      fontSize: 26,
      color: Colors.White,
    },
    subtitle: {
      fontFamily: FontFamily.Bold,
      fontSize: 28,
      color: Colors.Red,
      marginBottom: hp(5),
    },
    ringContainer: {
      position: "absolute",
      top: -20,
      left: -20,
      right: -20,
      bottom: -20,
      justifyContent: "center",
      alignItems: "center",
    },
    outerRing: {
      position: "absolute",
      width: wp(56),
      height: wp(56),
      borderRadius: wp(50),
      borderWidth: 2.2,
      borderColor: "rgba(140, 140, 140, 0.4)",
    },
    innering: {
      position: "absolute",
      width: wp(45),
      height: wp(45),
      borderRadius: wp(50),
      borderWidth: 1.5,
      borderColor: "rgba(89, 89, 89, 0.4)",
    },
    middleRing: {
      position: "absolute",
      width: wp(50),
      height: wp(50),
      borderRadius: wp(50),
      borderWidth: 2,
      borderColor: "rgba(128, 128, 128, 0.2)",
    },
    logoImage: {
      height: wp(50),
      width: wp(50),
      position: "absolute",
      bottom: -hp(2),
    },
  });
