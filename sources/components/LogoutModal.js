import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { RNImage, RNText } from "../common";
import { FontFamily, FontSize, hp, normalize, wp } from "../theme";
import { Images } from "../constants";
import { useThemeColors } from "../theme/ThemeColors";
import { BlurView } from "@react-native-community/blur";

const LogoutModal = ({ isVisible, onClose, onLogout }) => {
  const Colors = useThemeColors();

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles(Colors).modalOverlay}>
        {/* <BlurView
          style={styles(Colors).blurView}
          blurType="light"
          blurAmount={1}
        /> */}

        <View style={styles(Colors).modalContainer}>
          <View style={{ gap: hp(2) }}>
            <View style={styles(Colors).iconContainer}>
              <RNImage
                source={Images.Signout}
                tintColor={Colors.Purple}
                style={styles(Colors).logoutIcon}
              />
            </View>
            <View style={{ gap: hp(0.8) }}>
              <RNText align="left" style={styles(Colors).modalTitle}>
                Sign out From Fastticket Scanner?
              </RNText>
              <RNText align="left" style={styles(Colors).modalMessage}>
                Are you sure you would like to sign out of your Fastticket
                Scanner?
              </RNText>
            </View>
          </View>
          <View style={{ gap: wp(2) }}>
            <View style={styles(Colors).modalButtonsContainer}>
              <TouchableOpacity
                style={styles(Colors).modalButton}
                onPress={onClose}
              >
                <RNText style={styles(Colors).modalButtonText}>Cancel</RNText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles(Colors).modalButton,
                  { backgroundColor: "#ead8f3" },
                ]}
                onPress={onLogout}
              >
                <RNText
                  style={[
                    styles(Colors).modalButtonText,
                    { color: Colors.Purple },
                  ]}
                >
                  Sign out
                </RNText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = (Colors) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingVertical: wp(5),
      backgroundColor: Colors.modal,
    },
    blurView: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    modalContainer: {
      width: "90%",
      backgroundColor: Colors.Grey,
      borderRadius: normalize(20),
      padding: wp(5),
      gap: hp(3),
    },
    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ead8f3",
      borderRadius: normalize(7),
      height: wp(11),
      width: wp(11),
    },
    logoutIcon: {
      width: wp(5.5),
      height: wp(5.5),
    },
    modalTitle: {
      fontSize: FontSize.font16,
      fontFamily: FontFamily.Medium,
      color: Colors.Black,
    },
    modalMessage: {
      fontSize: FontSize.font12,
      fontFamily: FontFamily.Light,
      color: Colors.DarkGrey,
    },
    modalButtonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: wp(82),
    },
    modalButton: {
      flex: 1,
      alignItems: "center",
      paddingVertical: hp(1.5),
      borderRadius: normalize(7),
      backgroundColor: "#8f30e8",
      marginRight: wp(2),
    },
    modalButtonText: {
      color: "#FFFFFF",
      fontSize: FontSize.font16,
      fontFamily: FontFamily.Medium,
    },
  });

export default LogoutModal;
