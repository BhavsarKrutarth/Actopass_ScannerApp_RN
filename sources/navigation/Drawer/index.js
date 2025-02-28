import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import { History, Login, Profile, Scan } from "../../screens";
import { useThemeColors } from "../../theme/ThemeColors";

const Drawer = createDrawerNavigator();

const Index = () => {
  const Colors = useThemeColors();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#f5f5f5" },
      }}
    >
      <Drawer.Screen name="Scanner" component={Scan} options={{}} />
      <Drawer.Screen name="History" component={History} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default Index;
