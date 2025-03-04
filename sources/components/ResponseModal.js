import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { RNImage, RNStyles } from "../common";
import { Images } from "../constants";
import { useThemeColors } from "../theme/ThemeColors";
import { hp, normalize, wp } from "../theme";
import LinearGradient from "react-native-linear-gradient";

export default function ResponseModal({ message, onClose }) {
  const Colors = useThemeColors();
  return (
    <Modal transparent={true} visible={!!message} animationType="fade">
      <TouchableOpacity
        style={{
          ...RNStyles.flexCenter,
          backgroundColor: Colors.modal,
        }}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles(Colors).messageContainer}>
          <View style={styles(Colors).successContainer}>
            <LinearGradient
              colors={["#ffe0b3", "#FFFFFF"]}
              style={styles(Colors).successMessages}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: wp(100),
                  gap: 20,
                  alignItems: "center",
                  padding: 20,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    height: wp(10),
                    width: wp(10),
                    backgroundColor: "#FFF",
                    borderRadius: normalize(20),
                    ...RNStyles.center,
                  }}
                >
                  <RNImage
                    source={Images.checkmark}
                    resizeMode="stretch"
                    style={{ height: wp(6), width: wp(6) }}
                  />
                </View>
                <View style={{ width: wp(60), overflow: "hidden", gap: 5 }}>
                  <Text
                    style={{ fontFamily: "Montserrat-SemiBold", fontSize: 16 }}
                  >
                    {message}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = (Colors) =>
  StyleSheet.create({
    modalContents: {
      ...RNStyles.flexCenter,
      backgroundColor: Colors.Red,
    },
    messageContainer: {
      position: "absolute",
      top: hp(5),
      alignSelf: "center",
    },
    successContainer: {
      alignSelf: "center",
      width: wp(90),
    },
    successMessages: {
      borderRadius: normalize(15),
      borderWidth: 2,
      borderColor: "#FFFFFF",
    },
  });
