import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { RNButton, RNContainer, RNInput, RNText } from "../../common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors, FontFamily, FontSize, hp, wp } from "../../theme";
import { Images } from "../../constants";
import { loginUser } from "../../api/Api";
import { useDispatch } from "react-redux";
import {
  onAuthChange,
  setAsyncStorageValue,
} from "../../redux/Reducers/AuthReducers";
import { Functions } from "../../utils";

const Login = () => {
  const [Input, setInput] = useState({
    Id: "SCL-0001",
    Password: "96CE8347",
  });
  const [toggle, settoggle] = useState(true);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await loginUser(Input.Id, Input.Password);
      if (response) {
        await Functions.setUserData(response);
        dispatch(onAuthChange(true));
        dispatch(setAsyncStorageValue(response));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <RNContainer>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: wp(4) }}
        enableAutomaticScroll={Platform.OS === "ios"}
      >
        <View style={style.flex1}>
          <View style={style.imageview}>
            <Image source={Images.User} style={style.manimage} />
          </View>
          <View style={style.textview}>
            <RNText
              children="LOGIN"
              size={FontSize.font22}
              family={FontFamily.SemiBold}
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
        <View style={style.flex2}>
          <View>
            <RNInput
              Containerstyle={{
                borderColor: Colors.lable,
              }}
              Lefticon={Images.User}
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
                borderColor: Colors.lable,
              }}
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
          </View>
        </View>
        <View style={style.flex3}>
          <RNButton
            onPress={() => handleLogin()}
            style={{
              marginHorizontal: wp(0),
              backgroundColor: Colors.Purple,
              borderRadius: wp(2),
              marginVertical: hp(0),
            }}
            title={"Login"}
          ></RNButton>
        </View>
      </KeyboardAwareScrollView>
    </RNContainer>
  );
};

export default Login;

const style = StyleSheet.create({
  scrollviewstyle: {
    flexGrow: 1,
    // paddingLeft: 13,
    // paddingRight: 13,
    // backgroundColor:"red",
    paddingHorizontal: wp(4),
  },
  flex1: {
    flex: 1.3,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: hp(2),
    // backgroundColor: "pink",
  },
  imageview: {
    backgroundColor: Colors.LightGrey,
    justifyContent: "center",
    alignItems: "center",
    height: hp(10),
    width: hp(10),
    borderRadius: hp(10),
  },
  manimage: {
    height: wp(10),
    width: wp(10),
  },
  textview: {
    marginTop: hp(2.5),
    alignItems: "center",
  },
  flex2: {
    flex: 1.5,
    justifyContent: "center",
    rowGap: hp(2),
    // backgroundColor: "red",
  },
  textinput: {
    hpght: 40,
    borderwpth: 1,
    padding: 10,
    borderRadius: 5,
    marginLeft: wp(2),
    marginRight: wp(2),
  },

  flex3: {
    flex: 1,
    // backgroundColor: "blue",
    justifyContent: "center",
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
