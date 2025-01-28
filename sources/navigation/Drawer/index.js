import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NavRoutes from "../NavRoutes";
import NavConfigs from "../NavConfigs";
import DrawerContent from "./DrawerContent";
import { Login } from "../../screens";

const Drawer = createDrawerNavigator();

const Index = () => {
  return (
    <Drawer.Navigator
    // drawerContent={(p) => <DrawerContent {...p} />}
    >
      <Drawer.Screen name={"Login"} component={Login} />
    </Drawer.Navigator>
  );
};

export default Index;
