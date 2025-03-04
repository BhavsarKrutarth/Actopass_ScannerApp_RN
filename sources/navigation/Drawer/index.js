import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import { History, Profile, Scan } from "../../screens";
import { useThemeColors } from "../../theme/ThemeColors";
import { Images } from "../../constants";
import { wp } from "../../theme";
import { RNImage } from "../../common";

const Drawer = createDrawerNavigator();

const Index = () => {
  const Colors = useThemeColors();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Scanner"
        component={Scan}
        options={{
          drawerStyle: { width: wp(70) },
          drawerType: "front",
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: Colors.White,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: Colors.Black,
        }}
      />
      <Drawer.Screen name="History" component={History} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default Index;
