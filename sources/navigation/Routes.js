import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavConfigs, NavRoutes } from "./index";
import { Login } from "../screens";
import Index from "./Drawer";
import { useDispatch, useSelector } from "react-redux";
import { RNLoader } from "../common";
import { Functions } from "../utils";
import {
  onAuthChange,
  setAsyncStorageValue,
} from "../redux/Reducers/AuthReducers";

const Stack = createStackNavigator();

const Routes = () => {
  const [isLoading, setLoading] = useState(true);
  const { isAuth } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  useEffect(() => {
    userData();
  }, []);

  const userData = async () => {
    const data = await Functions.getUserData();
    console.log(data);
    if (data) {
      dispatch(onAuthChange(true));
      dispatch(setAsyncStorageValue(data));
    } else {
      dispatch(onAuthChange(false));
      dispatch(setAsyncStorageValue(""));
    }
    setLoading(false);
  };

  if (isLoading) {
    return <RNLoader visible={isLoading} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={NavConfigs.screenOptions}>
        {isAuth ? (
          <Stack.Screen name={"Index"} component={Index} />
        ) : (
          <Stack.Screen name={"Login"} component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
