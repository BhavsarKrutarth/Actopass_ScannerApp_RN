import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  RNContainer,
  RNHeader,
  RNImage,
  RNSkeletonLoader,
  RNStyles,
  RNText,
} from "../../common";
import { Images } from "../../constants";
import { FontFamily, FontSize, hp, normalize, wp } from "../../theme";
import { useThemeColors } from "../../theme/ThemeColors";
import { userProfile } from "../../api/Api";
import { useSelector } from "react-redux";

const Profile = () => {
  const Colors = useThemeColors();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { AsyncValue } = useSelector((state) => state.Auth);
  console.log("AsyncValue.ScannerLoginId", AsyncValue.ScannerLoginId);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await userProfile(AsyncValue.ScannerLoginId);
        console.log("response", response);
        setData(response[0]);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const profileFields = [
    { icon: Images.User, label: "User ID", value: data.Code },
    { icon: Images.User, label: "User Name", value: data.Name },
    { icon: Images.Mail, label: "Emai ID", value: data.EmailId },
    { icon: Images.Call, label: "Mobile No", value: data.MobileNo },
  ];

  return (
    <RNContainer>
      <RNHeader
        Onleftpress={() => navigation.goBack()}
        leftimagestyle={{ tintColor: Colors.Black }}
        LeftImage={Images.Back}
      />
      {isLoading ? (
        <View style={{ gap: hp(6) }}>
          <View style={{ ...RNStyles.center, gap: hp(1), paddingTop: hp(3) }}>
            <RNSkeletonLoader style={styles(Colors).profileView} />
            <RNSkeletonLoader
              style={{
                width: wp(25),
                height: hp(2),
                borderRadius: normalize(10),
              }}
            />
            <RNSkeletonLoader
              style={{
                width: wp(50),
                height: hp(2),
                borderRadius: normalize(10),
              }}
            />
          </View>
          <View style={{ gap: hp(4), paddingHorizontal: wp(8) }}>
            <View style={{ ...RNStyles.flexRow, gap: wp(5) }}>
              <RNSkeletonLoader
                style={[
                  styles(Colors).profileView,
                  { width: wp(10), height: wp(10) },
                ]}
              />
              <View style={{ gap: hp(1) }}>
                <RNSkeletonLoader
                  style={{
                    width: wp(70),
                    height: hp(3),
                    borderRadius: normalize(10),
                  }}
                />
                <RNSkeletonLoader
                  style={{
                    width: wp(70),
                    height: hp(3),
                    borderRadius: normalize(10),
                  }}
                />
              </View>
            </View>
            <View style={{ ...RNStyles.flexRow, gap: wp(5) }}>
              <RNSkeletonLoader
                style={[
                  styles(Colors).profileView,
                  { width: wp(10), height: wp(10) },
                ]}
              />
              <View style={{ gap: hp(1) }}>
                <RNSkeletonLoader
                  style={{
                    width: wp(70),
                    height: hp(3),
                    borderRadius: normalize(10),
                  }}
                />
                <RNSkeletonLoader
                  style={{
                    width: wp(70),
                    height: hp(3),
                    borderRadius: normalize(10),
                  }}
                />
              </View>
            </View>
            <View style={{ ...RNStyles.flexRow, gap: wp(5) }}>
              <RNSkeletonLoader
                style={[
                  styles(Colors).profileView,
                  { width: wp(10), height: wp(10) },
                ]}
              />
              <View style={{ gap: hp(1) }}>
                <RNSkeletonLoader
                  style={{
                    width: wp(70),
                    height: hp(3),
                    borderRadius: normalize(10),
                  }}
                />
                <RNSkeletonLoader
                  style={{
                    width: wp(70),
                    height: hp(3),
                    borderRadius: normalize(10),
                  }}
                />
              </View>
            </View>
            <View style={{ ...RNStyles.flexRow, gap: wp(5) }}>
              <RNSkeletonLoader
                style={[
                  styles(Colors).profileView,
                  { width: wp(10), height: wp(10) },
                ]}
              />
              <View style={{ gap: hp(1) }}>
                <RNSkeletonLoader
                  style={{
                    width: wp(70),
                    height: hp(3),
                    borderRadius: normalize(10),
                  }}
                />
                <RNSkeletonLoader
                  style={{
                    width: wp(70),
                    height: hp(3),
                    borderRadius: normalize(10),
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={{ gap: hp(6) }}>
          <View
            style={{
              ...RNStyles.center,
              gap: hp(1),
              paddingTop: hp(3),
            }}
          >
            <View style={styles(Colors).profileView}>
              <Image
                source={{
                  uri: data.PhotoPath,
                }}
                resizeMode={"cover"}
                style={styles(Colors).profileIcon}
              />
            </View>
            <RNText
              family={FontFamily.SemiBold}
              size={FontSize.font22}
              spacing={1}
              color={Colors.Black}
              children={"PROFILE"}
            />
            <RNText
              family={FontFamily.Regular}
              size={FontSize.font14}
              color={Colors.DarkGrey}
              children={"Hello, SCL-0001! Here’s your profile."}
              align={"center"}
            />
          </View>

          <View style={styles(Colors).profileInfoContainer}>
            {profileFields.map((item, index) => (
              <View key={index}>
                <View style={styles(Colors).profileField}>
                  <RNImage
                    source={item.icon}
                    style={styles(Colors).fieldIcon}
                  />
                  <View>
                    <RNText
                      family={FontFamily.Regular}
                      size={FontSize.font15}
                      color={Colors.DarkGrey}
                      spacing={1}
                      children={item.label}
                    />
                    <RNText
                      family={FontFamily.Regular}
                      size={FontSize.font15}
                      spacing={1}
                      color={Colors.Black}
                      children={item.value}
                    />
                  </View>
                </View>

                {index !== profileFields.length - 1 && (
                  <View style={styles(Colors).separator} />
                )}
              </View>
            ))}
          </View>
        </View>
      )}
    </RNContainer>
  );
};

export default Profile;

const styles = (Colors) =>
  StyleSheet.create({
    profileView: {
      width: wp(27),
      height: wp(27),
      backgroundColor: Colors.Grey,
      borderRadius: normalize(50),
      ...RNStyles.center,
    },
    profileIcon: {
      width: wp(22),
      height: wp(22),
      borderRadius: normalize(50),
    },
    profileInfoContainer: {
      marginTop: hp(2),
      paddingHorizontal: wp(6),
    },
    profileField: {
      ...RNStyles.flexRow,
      gap: wp(5),
    },
    fieldIcon: {
      width: wp(5),
      height: wp(5),
      tintColor: Colors.Black,
    },
    separator: {
      borderBottomWidth: 2,
      borderBottomColor: Colors.Grey,
      marginVertical: hp(2.5),
    },
  });
