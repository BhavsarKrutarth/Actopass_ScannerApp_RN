import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavConfigs, NavRoutes } from "./index";
import { Login } from "../screens";

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={NavConfigs.screenOptions}>
        <Stack.Screen name={"Login"} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
