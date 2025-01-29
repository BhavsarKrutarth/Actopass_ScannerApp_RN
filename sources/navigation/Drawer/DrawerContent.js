import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../constants";
import { Colors, FontFamily, FontSize, hp, normalize, wp } from "../../theme";
import { RNContainer, RNImage, RNText, RNStyles } from "../../common";

const DrawerContent = () => {
  const [selectedPage, setSelectedPage] = useState("Scan");
  const navigation = useNavigation();

  const handleLogout = () => {
    console.log("User logged out");
  };

  const navLinks = [
    { name: "Scan", icon: Images.Scan },
    { name: "History", icon: Images.History },
    { name: "Profile", icon: Images.Profile },
  ];

  const handleNavPress = (page) => {
    setSelectedPage(page);
    navigation.navigate(page);
  };

  return (
    <RNContainer style={{ gap: hp(5), backgroundColor: Colors.LightGrey }}>
      <View style={{ backgroundColor: Colors.Purple }}>
        <SafeAreaView style={{ gap: hp(5), margin: wp(2) }}>
          <View style={styles.titleHeader}>
            <RNImage
              source={Images.Logo}
              style={{ width: wp(10), height: wp(10) }}
            />
            <RNText
              children={"ACTOPASS"}
              color={Colors.White}
              size={FontSize.font14}
              family={FontFamily.Regular}
            />
          </View>
          <View style={styles.profileSection}>
            <RNImage
              source={require("../../assets/images/user.jpeg")}
              resizeMode={"cover"}
              style={{
                width: wp(12),
                height: wp(12),
                borderRadius: normalize(30),
              }}
            />
            <View style={{ gap: hp(0.5) }}>
              <RNText
                children={"name"}
                size={FontSize.font12}
                color={Colors.White}
                family={FontFamily.Regular}
              />
              <RNText
                children={"surat"}
                size={FontSize.font18}
                color={Colors.White}
                family={FontFamily.SemiBold}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>

      <View style={styles.navLinks}>
        {navLinks.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              { ...RNStyles.flexRow, gap: wp(5), padding: wp(3) },
              selectedPage === item.name && styles.selectedNavItem,
            ]}
            onPress={() => handleNavPress(item.name)}
          >
            <RNImage
              source={item.icon}
              style={[
                styles.navIcon,
                selectedPage === item.name && { tintColor: Colors.White },
              ]}
            />
            <RNText
              size={FontSize.font17}
              color={selectedPage === item.name ? Colors.White : Colors.Grey}
              family={FontFamily.Medium}
            >
              {item.name}
            </RNText>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <RNImage source={Images.Signout} style={styles.navIcon} />
        <RNText
          size={FontSize.font17}
          color={Colors.Grey}
          family={FontFamily.Medium}
        >
          Sign Out
        </RNText>
      </TouchableOpacity>
    </RNContainer>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  titleHeader: {
    ...RNStyles.flexRow,
    gap: wp(1),
    borderBottomWidth: 0.4,
    borderColor: "#C997FC",
    paddingVertical: hp(1),
  },
  profileSection: { ...RNStyles.flexRow, gap: wp(2), padding: wp(3) },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  navLinks: {
    paddingHorizontal: wp(3),
    gap: hp(2),
  },
  selectedNavItem: {
    backgroundColor: Colors.Purple,
    borderRadius: wp(2),
  },
  navIcon: {
    width: wp(6),
    height: wp(6),
    tintColor: Colors.Grey,
  },
  selectedIcon: {},
  logoutButton: {
    ...RNStyles.flexRow,
    gap: wp(5),
    marginTop: "auto",
    paddingBottom: hp(4),
    paddingTop: hp(3),
    marginHorizontal: wp(5),
    borderTopWidth: 0.5,
    borderTopColor: "#CCC",
  },
});
