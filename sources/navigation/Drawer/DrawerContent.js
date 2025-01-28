import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../constants";
import { Colors } from "../../theme";

const DrawerContent = (props) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>johndoe@example.com</Text>
      </View>

      <View style={styles.navLinks}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Scan")}
        >
          <Image source={Images.Scan} style={styles.navIcon} />
          <Text style={styles.navText}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("History")}
        >
          <Image source={Images.History} style={styles.navIcon} />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image source={Images.Profile} style={styles.navIcon} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Image source={Images.Signout} style={styles.navIcon} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: Colors.Purple,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
  },
  navLinks: {
    marginTop: 20,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  navIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  navText: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff5252",
    padding: 15,
    borderRadius: 5,
    marginTop: "auto",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});

{
  /* <Ionicons name="scan-outline" size={20} color="#000" />; */
}
