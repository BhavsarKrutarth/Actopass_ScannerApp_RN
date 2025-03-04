import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Routes } from "./navigation";
import { Provider } from "react-redux";
import Store from "./redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import NetInfo from "@react-native-community/netinfo";

export default function App() {
  // const [isConnected, setIsConnected] = useState(true);
  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     setIsConnected(state.isConnected);
  //   });
  //   NetInfo.fetch().then((state) => {
  //     setIsConnected(state.isConnected);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <SafeAreaProvider>
      <Provider store={Store}>
        <Routes />
      </Provider>
    </SafeAreaProvider>
  );
}
