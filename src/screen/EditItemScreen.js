import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import CustomHeader from "./component/CustomHeader";

const EditItemScreen = ({ route, navigation }) => {
  const { item } = route.params;

  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price.toString());
  const [image, setImage] = useState(item.image);
  const [category, setCategory] = useState(item.category);
  const [isOpen, setIsOpen] = useState(false);

  const isValidUrl = (url) => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
  };

  const handleSave = async () => {
    if (!name || !price || !image || !category) {
      Alert.alert("Please fill in all the fields");
    } else if (isNaN(price) || parseFloat(price) < 0) {
      Alert.alert("Price cannot be negative");
    } else if (!isValidUrl(image)) {
      Alert.alert("Please enter a valid image URL");
    } else {
      const updatedItem = {
        ...item,
        name,
        price: parseFloat(price),
        image,
        category,
      };

      try {
        const storageCards = await AsyncStorage.getItem("@card_data");
        const cards = storageCards ? JSON.parse(storageCards) : [];

        const index = cards.findIndex((card) => card.id === item.id);
        if (index !== -1) {
          cards[index] = updatedItem;
          await AsyncStorage.setItem("@card_data", JSON.stringify(cards));
        }
      } catch (error) {
        console.error("Failed to save updated card:", error);
      }

      route.params.refreshCards();
      navigation.goBack();
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title="Edit Item" />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Item name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Item price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Item image URL"
          value={image}
          onChangeText={setImage}
        />
        <View style={{ zIndex: 1000, marginBottom: 20 }}>
          <DropDownPicker
            open={isOpen}
            value={category}
            items={[
              { label: "Food", value: "food" },
              { label: "Beauty", value: "beauty" },
              { label: "Clothing", value: "clothing" },
              { label: "Electronics", value: "electronics" },
            ]}
            setOpen={setIsOpen}
            setValue={setCategory}
            placeholder="Select Category"
            style={styles.dropdown}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
  },
  form: {
    flex: 1,  
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    marginBottom: 15,
    padding: 13,
    fontSize: 16,
  },
  dropdown: {
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 50,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,  
    marginBottom: 50, 
  },
  button: {
    backgroundColor: "#EFCC00",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: "#D3D3D3",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
});

export default EditItemScreen;
