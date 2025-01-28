import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNText } from '../../Common';
import { Colors, FontSize, hp, isIOS, wp } from "../../theme";
import { Images } from '../../Constants';
import { useRNStyles } from '../../Hooks';
const TabContent = ({ state, descriptors, navigation }) => {
  const RNStyles = useRNStyles();
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        const ICONS = [
          Images.image_1,
          Images.image_2,
          Images.image_3,
          Images.image_4,
          Images.image_1,
        ];
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole={'button'}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={RNStyles.flexCenter}>
            <Image
              source={ICONS[index]}
              resizeMode={'contain'}
              style={[
                styles.icons,
                { tintColor: isFocused ? Colors.Black : Colors.White },
              ]}
            />
            <RNText pTop={hp(1)} size={FontSize.font8}>
              {label}
            </RNText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.Red,
    height: hp(10),
    paddingHorizontal: wp(4),
    paddingBottom: isIOS ? hp(2) : 0,
  },
  icons: {
    width: wp(6),
    height: wp(6),
  },
});
export default TabContent;
