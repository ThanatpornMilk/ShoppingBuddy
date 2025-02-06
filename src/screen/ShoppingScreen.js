import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Swipeable } from "react-native-gesture-handler";  
import CustomHeader from "./component/CustomHeader";
import ItemCard from "./component/ItemCard";
import TotalSummary from "./component/TotalSummary";

const STORAGE_KEY = "@card_data";

const ShoppingScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filteredCard, setFilteredCard] = useState([]);
  const [card, setCard] = useState([]);

  const loadCards = async () => {
    try {
      const storageCards = await AsyncStorage.getItem(STORAGE_KEY);
      if (storageCards) {
        setCard(JSON.parse(storageCards));
      }
    } catch (error) {
      console.error("Failed to load: ", error);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    setFilteredCard(card);
  }, [card]);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = text
      ? card.filter((card) =>
          card.name.toLowerCase().includes(text.toLowerCase())
        )
      : card;
    setFilteredCard(filtered);
  };

  const renderItem = ({ item }) => {
    const rightSwipe = () => (
      <View style={styles.swipeAction}>
        <TouchableOpacity
          onPress={() => deleteCard(item.id)}  
          style={styles.swipeButton}
        >
          <Icon name="trash-can" size={25} color="white" />
        </TouchableOpacity>
      </View>
    );

    const togglePurchase = async (id) => {
      const updatedCards = card.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      );
      setCard(updatedCards);
      setFilteredCard(updatedCards);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
    };

    return (
      <Swipeable renderRightActions={rightSwipe}>
        <ItemCard
          name={item.name}
          price={item.price}
          image={item.image}
          onEdit={() => navigateToEdit(item)}  
          isPurchased={item.purchased}
          togglePurchase={() => togglePurchase(item.id)}
          category={item.category}
        />
      </Swipeable>
    );
  };

  const deleteCard = (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          const updatedCards = card.filter(item => item.id !== id);
          setCard(updatedCards);
          setFilteredCard(updatedCards);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
        },
      },
    ]);
  };

  const refreshCards = async () => {
    try {
      const storageCards = await AsyncStorage.getItem(STORAGE_KEY);
      if (storageCards) {
        setCard(JSON.parse(storageCards));
        setFilteredCard(JSON.parse(storageCards));  
      }
    } catch (error) {
      console.error("Failed to refresh cards:", error);
    }
  };

  const clearAllCards = () => {
    Alert.alert("Confirm Clear All", "Are you sure you want to remove all items?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          setCard([]);
          setFilteredCard([]);
          await AsyncStorage.removeItem(STORAGE_KEY);
        },
      },
    ]);
  };

  const navigateToEdit = (item) => {
    navigation.navigate("EditItem", { 
      item: item, 
      refreshCards: refreshCards 
    });
  };

  const calculateTotal = () => {
    const total = filteredCard
      .filter(item => !item.purchased) 
      .reduce((total, item) => total + parseFloat(item.price || 0), 0); 
    return total;
  };

  const calculateTotalItems = () => {
    return filteredCard.filter(item => !item.purchased).length;
  };

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title="Shopping List" />

      <FlatList
        data={filteredCard}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            <View style={styles.searchItem}>
              <Icon name="magnify" size={20} color="gray" style={styles.searchIcon} />
              <TextInput
                style={styles.input}
                placeholder="Search Item ..."
                placeholderTextColor="gray"
                value={search}
                onChangeText={handleSearch}
              />
            </View>

            <View style={styles.headerRow}>
              <Text style={styles.itemCount}>Total Items: {calculateTotalItems()}</Text>
              <TouchableOpacity onPress={clearAllCards} style={styles.clearAllContainer}>
                <Text style={styles.clearAllText}>Clear All</Text>
                <Icon name="trash-can" size={20} color="#696565" style={styles.clearAllIcon} />
              </TouchableOpacity>
            </View>
          </View>
        }
      />
      
      <View style={styles.footer}>
        <TotalSummary totalAmount={calculateTotal()} />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddItem", { refreshCards })} 
        >
          <Icon name="plus" size={30} color="white" />
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
  searchItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding: 13,
    width: "85%",
    alignSelf: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 19,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  addButton: {
    backgroundColor: "#EFCC00",
    borderRadius: 50,
    padding: 20,
    position: "absolute",
    bottom: 40,
    right: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 35,
    paddingRight: 35,
    marginTop: 15,
  },
  clearAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  clearAllText: {
    textAlign: "right",
    fontSize: 14,
    color: "#555",
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "500",
  },
  clearAllIcon: {
    marginLeft: 5,
    marginTop: 5,
  },
  itemCount: {
    fontSize: 15,
    fontWeight: "500",
    color: "#555",
    marginTop: 5,
  },
  swipeAction: {
    flexDirection: "row",
    backgroundColor: "#EFCC00",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center", 
    height: "80%", 
    width: 70,
    marginRight: 30,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});

export default ShoppingScreen;
