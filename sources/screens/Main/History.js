import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RNContainer, RNHeader, RNImage, RNStyles, RNText } from "../../common";
import { HistoryData } from "../../api/Api";
import { useThemeColors } from "../../theme/ThemeColors";
import { normalize, wp } from "../../theme";

const History = () => {
  const [data, setData] = useState([]);
  const Colors = useThemeColors();

  useEffect(() => {
    const fetchData = async () => {
      const response = await HistoryData();
      console.log(response);
      setData(response);
    };
    fetchData();
  }, []);

  return (
    <RNContainer>
      <RNHeader title={"History"} />
      {data?.map((item, index) => (
        <View style={styles(Colors).historyData}>
          <RNImage
            source={{ uri: item.EventMainImage }}
            style={{ width: wp(30), height: wp(30) }}
          />
          <View>
            <RNText children={item.EventName} />
            <RNText children={`${item.EventDate} | ${item.EventTime}`} />
            <RNText children={item.EventAddress} numOfLines={2} />
            <RNText children={`${item.SacnneTicketQty} Tickets`} />
          </View>
        </View>
      ))}
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
