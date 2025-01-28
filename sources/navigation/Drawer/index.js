import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import { History, Login, Profile, Scan } from "../../screens";

const Drawer = createDrawerNavigator();

const Index = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerStyle: { backgroundColor: "#f5f5f5" },
      }}
    >
      <Drawer.Screen name={"Scan"} component={Scan} />
      <Drawer.Screen name={"History"} component={History} />
      <Drawer.Screen name={"Profile"} component={Profile} />
    </Drawer.Navigator>
  );
};

export default Index;
