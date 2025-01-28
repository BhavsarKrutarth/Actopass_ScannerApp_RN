import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../constants";
import { Colors, hp, wp } from "../../theme";
import { RNContainer, RNImage, RNStyles, RNText } from "../../common";

const DrawerContent = (props) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <RNContainer style={{ gap: hp(5) }}>
      <View style={styles.profileSection}>
        <RNImage
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
        <RNText style={styles.userName}>John Doe</RNText>
        <RNText style={styles.userEmail}>johndoe@example.com</RNText>
      </View>

      <View style={styles.navLinks}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Scan")}
        >
          <RNImage source={Images.Scan} style={styles.navIcon} />
          <RNText style={styles.navText}>Scan</RNText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("History")}
        >
          <RNImage source={Images.History} style={styles.navIcon} />
          <RNText style={styles.navText}>History</RNText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <RNImage source={Images.Profile} style={styles.navIcon} />
          <RNText style={styles.navText}>Profile</RNText>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <RNImage source={Images.Signout} style={styles.navIcon} />
        <RNText style={styles.logoutText}>Logout</RNText>
      </TouchableOpacity>
    </RNContainer>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  profileSection: {
    alignItems: "center",
    backgroundColor: Colors.Purple,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  navLinks: {
    paddingHorizontal: wp(5),
    gap: hp(4),
  },
  navItem: {
    ...RNStyles.flexRow,
  },
  navIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.Black,
  },
  logoutButton: {
    ...RNStyles.flexRow,
    gap: wp(5),
    marginTop: "auto",
  },
});
