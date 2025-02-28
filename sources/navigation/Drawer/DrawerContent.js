import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../constants";
import { FontFamily, FontSize, hp, normalize, wp } from "../../theme";
import { RNContainer, RNImage, RNText, RNStyles } from "../../common";
import { useDispatch, useSelector } from "react-redux";
import { useThemeColors } from "../../theme/ThemeColors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthChange } from "../../redux/Reducers/AuthReducers";
import { userProfile } from "../../api/Api";

const DrawerContent = () => {
  const Colors = useThemeColors();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState("Scanner");
  const [data, setData] = useState("Scanner");
  const { AsyncValue } = useSelector((state) => state.Auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userProfile(AsyncValue.ScannerLoginId);
        console.log("response", response);
        setData(response[0]);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    AsyncStorage.clear();
    dispatch(onAuthChange(false));
  };

  const navLinks = [
    { name: "Scanner", icon: Images.Scan },
    { name: "History", icon: Images.History },
    { name: "Profile", icon: Images.Profile },
  ];

  const handleNavPress = (page) => {
    setSelectedPage(page);
    navigation.navigate(page);
  };

  return (
    <RNContainer style={{ gap: hp(5), backgroundColor: Colors.Grey }}>
      <View style={{ backgroundColor: Colors.Purple }}>
        <SafeAreaView style={{ gap: hp(5), margin: wp(2) }}>
          <View style={styles(Colors).titleHeader}>
            <RNImage
              source={Images.Logo}
              style={{ width: wp(10), height: wp(10) }}
            />
            <RNText
              children={"ACTOPASS"}
              color={"#FFF"}
              size={FontSize.font14}
              family={FontFamily.Regular}
            />
          </View>
          <View style={styles(Colors).profileSection}>
            <RNImage
              source={{ uri: data.PhotoPath }}
              resizeMode={"cover"}
              style={{
                width: wp(12),
                height: wp(12),
                borderRadius: normalize(30),
              }}
            />
            <View style={{ gap: hp(0.5) }}>
              <RNText
                children={data.Code}
                size={FontSize.font12}
                color={"#FFF"}
                family={FontFamily.Regular}
              />
              <RNText
                children={data.Name}
                size={FontSize.font18}
                color={"#FFF"}
                family={FontFamily.SemiBold}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>

      <View style={styles(Colors).navLinks}>
        {navLinks.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              { ...RNStyles.flexRow, gap: wp(5), padding: wp(3) },
              selectedPage === item.name && {
                backgroundColor: Colors.Purple,
                borderRadius: wp(2),
              },
            ]}
            onPress={() => handleNavPress(item.name)}
          >
            <RNImage
              source={item.icon}
              style={[
                styles(Colors).navIcon,
                selectedPage === item.name && { tintColor: "#FFF" },
              ]}
            />
            <RNText
              size={FontSize.font17}
              color={selectedPage === item.name ? "#FFF" : Colors.DarkGrey}
              family={FontFamily.Medium}
            >
              {item.name}
            </RNText>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles(Colors).logoutButton}
        onPress={handleLogout}
      >
        <RNImage
          source={Images.Signout}
          style={[styles(Colors).navIcon, { tintColor: Colors.Black }]}
        />
        <RNText
          size={FontSize.font17}
          color={Colors.Black}
          family={FontFamily.Regular}
        >
          Sign Out
        </RNText>
      </TouchableOpacity>
    </RNContainer>
  );
};

export default DrawerContent;

const styles = (Colors) =>
  StyleSheet.create({
    titleHeader: {
      ...RNStyles.flexRow,
      gap: wp(1),
      borderBottomWidth: 0.4,
      borderColor: "#C997FC",
      paddingVertical: hp(1),
    },
    profileSection: { ...RNStyles.flexRow, gap: wp(3), padding: wp(3) },
    navLinks: {
      paddingHorizontal: wp(3),
      gap: hp(2),
    },
    navIcon: {
      width: wp(5.5),
      height: wp(5.5),
      tintColor: Colors.DarkGrey,
    },
    logoutButton: {
      ...RNStyles.flexRow,
      gap: wp(5),
      marginTop: "auto",
      paddingBottom: hp(4),
      paddingTop: hp(3),
      marginHorizontal: wp(5),
      borderTopWidth: 0.5,
      borderTopColor: Colors.DarkGrey,
    },
  });
