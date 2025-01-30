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
};

export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? DarkTheme : LightTheme;
};
