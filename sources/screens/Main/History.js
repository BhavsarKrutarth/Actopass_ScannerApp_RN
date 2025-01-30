import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RNContainer, RNHeader, RNImage, RNStyles, RNText } from "../../common";
import { HistoryData } from "../../api/Api";
import { useThemeColors } from "../../theme/ThemeColors";
import { FontFamily, FontSize, hp, normalize, wp } from "../../theme";
import { useSelector } from "react-redux";
import { Images } from "../../constants";

const History = () => {
  const [data, setData] = useState([]);
  const Colors = useThemeColors();
  const { AsyncValue } = useSelector((state) => state.Auth);

  useEffect(() => {
    const fetchData = async () => {
      const response = await HistoryData(AsyncValue.ScannerLoginId);
      console.log("response", response);
      setData(response);
    };
    fetchData();
  }, []);

  return (
    <RNContainer>
      <RNHeader title={"History"} />
      {data.length === 0 ? (
        <RNImage
          source={Images.Nodata}
          style={{
            ...RNStyles.flexCenter,
            width: wp(40),
            height: wp(40),
            alignSelf: "center",
          }}
        />
      ) : (
        data?.map((item, index) => (
          <View style={styles(Colors).historyData} key={index}>
            <RNImage
              source={{ uri: item.EventMainImage }}
              style={{ width: wp(30), height: wp(40) }}
            />
            <View style={{ gap: hp(1) }}>
              <RNText
                color={Colors.Black}
                size={FontSize.font17}
                family={FontFamily.Medium}
                numOfLines={2}
                style={{ width: wp(55) }}
              >
                {item.EventName}
              </RNText>
              <RNText
                color={Colors.DarkGrey}
                size={FontSize.font13}
                family={FontFamily.Regular}
                numOfLines={1}
              >
                {`${item.EventDate} | ${item.EventTime}`}
              </RNText>
              <RNText
                color={Colors.DarkGrey}
                size={FontSize.font13}
                family={FontFamily.Regular}
                style={{ width: wp(55) }}
                numOfLines={2}
              >
                {item.EventAddress}
              </RNText>
              <RNText
                color={Colors.DarkGrey}
                size={FontSize.font13}
                family={FontFamily.Medium}
                style={{ width: wp(55) }}
                numOfLines={2}
              >
                {`${item.SacnneTicketQty} Tickets`}
              </RNText>
            </View>
          </View>
        ))
      )}
    </RNContainer>
  );
};

export default History;

const styles = (Colors) =>
  StyleSheet.create({
    historyData: {
      ...RNStyles.flexRow,
      gap: wp(3),
      margin: wp(5),
      backgroundColor: Colors.Grey,
      borderRadius: normalize(15),
    },
  });
