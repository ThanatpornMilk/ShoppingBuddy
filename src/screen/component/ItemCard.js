import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";  

const ItemCard = ({ name, price, image, onEdit, isPurchased, togglePurchase, category }) => {
  return (
    <View style={[styles.card, isPurchased && styles.purchasedCard]}>
      <TouchableOpacity onPress={togglePurchase}>
        <Icon 
          name={isPurchased ? "checkbox-marked-outline" : "checkbox-blank-outline"} 
          size={24} 
          color={isPurchased ? "#CD3333" : "#ccc"} 
        />
      </TouchableOpacity>

      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={[styles.name, isPurchased && styles.purchasedText]}>
          {name}
        </Text>
        <Text style={[styles.category, isPurchased && styles.purchasedText]}>
          {category}
        </Text>
        <Text style={[styles.price, isPurchased && styles.purchasedText]}>
          {`฿${price}`}
        </Text>
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    marginHorizontal: 30,
    borderRadius: 8,
    margin: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  purchasedCard: {
    backgroundColor: "#D3D3D3", 
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginLeft: 10,  
  },
  textContainer: {
    flex: 1,
    padding: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  category: {
    fontSize: 14,
    color: "#888",
    marginVertical: 4,  
  },
  price: {
    fontSize: 16,
    marginVertical: 5,
  },
  purchasedText: {
    textDecorationLine: "line-through", // ขีดฆ่าในชื่อและราคาสินค้าที่ซื้อแล้ว
    color: "#A9A9A9", 
  },
  editButton: {
    position: "absolute",
    right: 10,
    bottom: 35,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default ItemCard;
