import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { RNText } from "../../common";
import { DummyData } from "../../Utils";

const DrawerContent = ({}) => {
  const styles = useStyles();

  const RenderItems = ({ item, index }) => {
    const { Colors, setNewTheme } = useTheme();
    const { theme } = useSelector(({ ThemeReducer }) => ThemeReducer);

    const [State, setState] = useState({ isEnable: theme === item?.value });

    return (
      <View style={styles.renderContainer}>
        <RNText>{item.label}</RNText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DummyData.Themes}
        key={(v, i) => String(i)}
        renderItem={({ item, index }) => <RenderItems item={item} />}
      />
    </View>
  );
};

const useStyles = () => {
  const RNStyles = useRNStyles();
  const inset = useSafeAreaInsets();
  const { Colors, wp, hp } = useTheme();

  return StyleSheet.create({
    container: {
      ...RNStyles.container,
      paddingTop: inset.top,
    },
    renderContainer: {
      ...RNStyles.flexRowBetween,
      borderBottomWidth: 1,
      borderBottomColor: Colors.Placeholder,
      marginVertical: hp(0.5),
      paddingVertical: hp(2),
      paddingHorizontal: wp(2),
    },
  });
};

export default DrawerContent;
