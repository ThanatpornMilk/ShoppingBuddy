import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomHeader from "./component/CustomHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from 'react-native-dropdown-picker';

const STORAGE_KEY = "@card_data";

const AddItemScreen = ({ navigation, route }) => {
  const { refreshCards } = route.params;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(null);
  const [errors, setErrors] = useState({ name: "", price: "", image: "", category: "" });
  const [isOpen, setIsOpen] = useState(false);

  const isValidUrl = (url) => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
  };

  const validateField = (field, value) => {
    let error = "";
    if (!value.trim()) {
      error = "This field is required";
    } else if (field === "image" && value.trim() && !isValidUrl(value)) {
      error = "Please enter a valid image URL";
    } else if (field === "price" && value.trim() && parseFloat(value) < 0) {
      error = "Price cannot be negative";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    return error;
  };

  const addCard = async () => {
    const nameError = validateField("name", name);
    const priceError = validateField("price", price);
    const imageError = validateField("image", image);
    const categoryError = validateField("category", category);

    if (!nameError && !priceError && !imageError && !categoryError) {
      const newCard = {
        id: Date.now().toString(),
        name,
        price,
        image,
        category,
      };

      try {
        const storedCards = await AsyncStorage.getItem(STORAGE_KEY);
        const existingCards = storedCards ? JSON.parse(storedCards) : [];
        const updatedCards = [newCard, ...existingCards];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
        refreshCards();
        navigation.goBack();
      } catch (error) {
        console.error("Error: ", error);
      }
    } else {
      Alert.alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.Container}>
        <CustomHeader navigation={navigation} title="Add Item" />
        <KeyboardAvoidingView
          style={styles.Content}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.InputWrapper}>
            <View style={styles.InputContainer}>
              <Icon name="plus-circle-outline" size={20} color="gray" style={styles.Icon} />
              <TextInput
                style={styles.Input}
                placeholder="Item name ..."
                value={name}
                onChangeText={setName}
                onBlur={() => validateField("name", name)}
              />
            </View>
            {errors.name ? <Text style={styles.ErrorText}>{errors.name}</Text> : null}

            <View style={styles.InputContainer}>
              <Icon name="currency-usd" size={20} color="gray" style={styles.Icon} />
              <TextInput
                style={styles.Input}
                placeholder="Item price ..."
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                onBlur={() => validateField("price", price)}
              />
            </View>
            {errors.price ? <Text style={styles.ErrorText}>{errors.price}</Text> : null}

            <View style={styles.InputContainer}>
              <Icon name="image-outline" size={20} color="gray" style={styles.Icon} />
              <TextInput
                style={styles.Input}
                placeholder="Add Image url ..."
                value={image}
                onChangeText={setImage}
                onBlur={() => validateField("image", image)}
              />
            </View>
            {errors.image ? <Text style={styles.ErrorText}>{errors.image}</Text> : null}

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
                style={styles.DropDownStyle}
              />
            </View>
            {errors.category ? <Text style={styles.ErrorText}>{errors.category}</Text> : null}
          </View>

          <View style={styles.ButtonContainer}>
            <TouchableOpacity style={styles.Button} onPress={addCard}>
              <Text style={styles.ButtonText}>Add new item</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.CancelButton} onPress={() => navigation.goBack()}>
              <Text style={styles.ButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
  },
  Content: {
    flex: 1,
    justifyContent: "space-between",
  },
  InputWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  InputContainer: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#ccc",
    padding: 13,
    marginBottom: 15,
    alignItems: "center",
  },
  Icon: {
    marginRight: 10,
  },
  Input: {
    flex: 1,
    fontSize: 16,
  },
  DropDownStyle: {
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 50,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
  },
  ButtonContainer: {
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  Button: {
    backgroundColor: "#EFCC00",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  CancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  ButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
  ErrorText: {
    color: "red",
    fontSize: 13,
    marginBottom: 10,
  },
});

export default AddItemScreen;
