import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  RNButton,
  RNContainer,
  RNImage,
  RNInput,
  RNLoader,
  RNText,
} from "../../common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontFamily, FontSize, hp, wp } from "../../theme";
import { Images } from "../../constants";
import { loginUser } from "../../api/Api";
import { useDispatch } from "react-redux";
import {
  onAuthChange,
  setAsyncStorageValue,
} from "../../redux/Reducers/AuthReducers";
import { Functions, Validation } from "../../utils";
import { useThemeColors } from "../../theme/ThemeColors";

const Login = () => {
  const Colors = useThemeColors();
  const [Input, setInput] = useState({
    Id: "SCL-0047",
    Password: "8BB8F240",
  });
  const [toggle, settoggle] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState("");
  const [Fieldvalidation, setfieldvalidation] = useState(false);
  const dispatch = useDispatch();

  const Idvalidation = Fieldvalidation && Input.Id.trim("");
  const Passwordvalidation =
    Fieldvalidation && Validation.isPasswordValid(Input.Password);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await loginUser(Input.Id, Input.Password);
      if (response) {
        setError("");
        await Functions.setUserData(response);
        dispatch(onAuthChange(true));
        dispatch(setAsyncStorageValue(response));
      }
    } catch (error) {
      setError("Id or password not match.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading)
    return (
      <RNLoader
        visible={isLoading}
        style={{ backgroundColor: Colors.White }}
        color={Colors.Black}
      />
    );

  return (
    <RNContainer>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: wp(4) }}
        enableAutomaticScroll={Platform.OS === "ios"}
      >
        <View style={style(Colors).flex1}>
          <View style={style(Colors).imageview}>
            <RNImage
              tintColor={Colors.Black}
              source={Images.Lock}
              style={{ height: wp(8), width: wp(8) }}
            />
          </View>
          <View style={{ marginTop: hp(2.5), alignItems: "center" }}>
            <RNText
              children="LOGIN"
              size={FontSize.font22}
              family={FontFamily.SemiBold}
              color={Colors.Black}
            />
            <RNText
              children="Add your some profile details"
              size={FontSize.font15}
              family={FontFamily.Medium}
              mTop="5"
              color={Colors.Placeholder}
            />
          </View>
        </View>
        <View style={style(Colors).flex2}>
          <View>
            <RNInput
              Containerstyle={{
                borderBottomWidth: 2,
                borderColor: Colors.Grey,
              }}
              Tinewstyle={{
                color: Colors.Black,
                fontFamily: FontFamily.Medium,
              }}
              Lefticon={Images.User}
              tintColor={Colors.Black}
              Tiheight={50}
              Tipadding={10}
              Tiplaceholder="Enter Username"
              Tiflex={1}
              value={Input.Id}
              onchangetext={(v) => setInput((prev) => ({ ...prev, Id: v }))}
            />
          </View>
          <View>
            <RNInput
              Containerstyle={{
                borderBottomWidth: 2,
                borderColor: Colors.Grey,
              }}
              Tinewstyle={{
                color: Colors.Black,
                fontFamily: FontFamily.Medium,
              }}
              tintColor={Colors.Black}
              Lefticon={Images.Lock}
              Righticon={toggle ? Images.Eyeoff : Images.Eye}
              Tiheight={50}
              Tipadding={10}
              Tiplaceholder="Enter Psssword"
              Tiflex={1}
              value={Input.Password}
              onchangetext={(v) =>
                setInput((prev) => ({ ...prev, Password: v }))
              }
              securetextentry={toggle}
              onPress={() => settoggle(!toggle)}
            />
            {isError && (
              <RNText
                children={isError}
                color={Colors.Red}
                size={FontSize.font11}
                pTop={hp(1)}
              />
            )}
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <RNButton
            onPress={() => handleLogin()}
            style={{
              marginHorizontal: wp(0),
              backgroundColor: Colors.Purple,
              borderRadius: wp(2),
            }}
            textStyle={{ fontFamily: FontFamily.Medium }}
            title={"Login"}
          ></RNButton>
        </View>
      </KeyboardAwareScrollView>
    </RNContainer>
  );
};

export default Login;

const style = (Colors) =>
  StyleSheet.create({
    flex1: {
      flex: 1.3,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: hp(2),
    },
    imageview: {
      backgroundColor: Colors.Grey,
      justifyContent: "center",
      alignItems: "center",
      height: hp(10),
      width: hp(10),
      borderRadius: hp(10),
    },
    flex2: {
      flex: 1.5,
      justifyContent: "center",
      rowGap: hp(2),
    },
    textinput: {
      hpght: 40,
      borderwpth: 1,
      padding: 10,
      borderRadius: 5,
      marginLeft: wp(2),
      marginRight: wp(2),
    },
    buttontext: {
      color: Colors.White,
      fontFamily: FontFamily.Medium,
      fontSize: FontSize.font16,
    },
    seperator: {
      justifyContent: "space-between",
      flexDirection: "row",
      paddingHorizontal: wp(1.7),
      alignItems: "center",
      columnGap: wp(4),
    },
    line: {
      borderColor: Colors.bordercolor,
      borderwpth: 1,
      flex: 1,
    },
  });
