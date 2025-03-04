import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavConfigs, NavRoutes } from "./index";
import { History, Login, Profile, Scan } from "../screens";
import Index from "./Drawer";
import { useDispatch, useSelector } from "react-redux";
import { RNHeader, RNLoader } from "../common";
import { Functions } from "../utils";
import {
  onAuthChange,
  setAsyncStorageValue,
} from "../redux/Reducers/AuthReducers";
import { Images } from "../constants";
import { Colors } from "../theme";

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
    if (data) {
      dispatch(onAuthChange(true));
      dispatch(setAsyncStorageValue(data));
    } else {
      dispatch(onAuthChange(false));
      dispatch(setAsyncStorageValue(""));
    }
    setLoading(false);
  };

  if (isLoading) return <RNLoader visible={isLoading} />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={NavConfigs.screenOptions} header>
        {isAuth ? (
          <>
            <Stack.Screen name="Index" component={Index} />
            <Stack.Screen
              name="Scanner"
              component={Scan}
              options={{
                headerShown: true,
                header: () => (
                  <RNHeader
                    leftimagestyle={{ tintColor: Colors.Black }}
                    LeftImage={Images.Back}
                    title={"Scan"}
                  />
                ),
              }}
            />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
