import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TotalSummary = ({ totalAmount }) => {
  const validAmount = totalAmount || 0; 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Total: {validAmount} ฿</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 5,
    position: 'relative',
  },
  text: {
    textAlign: "left",
    marginLeft: 20,
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});

export default TotalSummary;
