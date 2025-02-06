import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomHeader = ({ navigation, title }) => {
  const currentScreen = navigation.getState().routes[navigation.getState().index].name; //ตรวจชื่อหน้าปัจจุบัน

  const handleBackPress = () => {
    if (currentScreen === "Shopping") {
      navigation.navigate("Home");  
    } else if (currentScreen === "AddItem") {
      navigation.navigate("Shopping");  
    } else if (currentScreen === "EditItem") {
      navigation.navigate("Shopping"); 
    } 
  };

  return (
    <View style={styles.Header}>
      <TouchableOpacity style={styles.IconContainer} onPress={handleBackPress}>
        <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.HeaderText}>{title}</Text>

      <TouchableOpacity style={styles.IconContainer}>
        <Icon name="theme-light-dark" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EFCC00",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  HeaderText: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 45,
  },
  IconContainer: {
    marginTop: 45,
  },
});

export default CustomHeader;
