import { useColorScheme } from "react-native";

const LightTheme = {
  Black: "#000000",
  White: "#ffffff",
  Transparent: "transparent",
  Red: "#ff0000",
  Green: "#00FF00",
  Blue: "#0000FF",
  Yellow: "#FFFF00",
  Grey: "#ECECEC",
  DarkGrey: "#5e5e5e",
  Pink: "#FFC0CB",
  Orange: "#FFA500",
  Purple: "#942FFA",
  Primary: "#0275d8",
  Placeholder: "#9A9A9A",
  Loading: "#f1f1f1",
  modal: "rgba(0, 0, 0, 0.5)",
};

const DarkTheme = {
  Black: "#ffffff",
  White: "#000000",
  Transparent: "transparent",
  Red: "#ff4444",
  Green: "#44FF44",
  Blue: "#4444FF",
  Yellow: "#FFFF44",
  Grey: "#202020",
  DarkGrey: "#888888",
  Pink: "#FF77AA",
  Orange: "#FF8800",
  Purple: "#942FFA",
  Primary: "#1E90FF",
  Placeholder: "#B0B0B0",
  Loading: "#404040",
  modal: "rgba(255, 255, 255, 0.2)",
};

export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? DarkTheme : LightTheme;
};
