import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TotalSummary = ({ totalAmount }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Total: {totalAmount} ฿</Text>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    textAlign: "left",
    marginLeft: 20,
    fontSize: 20,
    color: "#555",
    fontWeight: "bold",
  },
});

export default TotalSummary;
