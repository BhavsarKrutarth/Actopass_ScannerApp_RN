import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Routes } from "./navigation";
import { Provider } from "react-redux";
import Store from "./redux";

export default function App() {
  return (
    <Provider store={Store}>
      <Routes />
    </Provider>
  );
}
