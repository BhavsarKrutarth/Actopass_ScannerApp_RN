import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { RNButton, RNContainer, RNHeader } from "../../common";
import { FontSize, hp, normalize, wp } from "../../theme";
import { Images } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useThemeColors } from "../../theme/ThemeColors";

const Scan = () => {
  const navigation = useNavigation();
  const Colors = useThemeColors()
  const Data = [
    {
      Id: "1",
      Name: "Scan",
    },
    {
      Id: "2",
      Name: "RFCode",
    },
    {
      Id: "3",
      Name: "Manually",
    },
  ];

  const [Active,Setactive] = useState(1)
  const [Onview,Setonview] = useState(Data[0])

  const activedata = (item) => {
    Setactive(item.Id)
    Setonview(item)
  }


  return (
    <RNContainer>
      <RNHeader
        Onleftpress={() => navigation.goBack()}
        leftimagestyle={{tintColor:Colors.imagecolor}}
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
      <View style={styles.container}>
        {Data.map((item, index) => (
          <View key={index} style={styles.btnview}>
            <RNButton
              title={item.Name}
              style={{
                backgroundColor: Active == item.Id ? Colors.Purple : Colors.LightGrey,
                marginHorizontal: wp(0),
                borderRadius: normalize(7),
                paddingVertical: hp(1.5),
                paddingHorizontal: wp(0),
              }}
              onPress={() => activedata(item)}
              textStyle={{ 
                fontSize: FontSize.font14,
                 color: Active == item.Id ? Colors.White : Colors.Placeholder
                }}
            />
          </View>
        ))}
      </View>
      <View style={{backgroundColor:'red'}}>
          <Text>f</Text>
      </View>
    </RNContainer>
  );
};

export default Scan;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: wp(7),
    marginTop: hp(3),
    // backgroundColor:'green'
  },
  btnview: {
    width: wp(27),
    // backgroundColor: "red",
  },

});
