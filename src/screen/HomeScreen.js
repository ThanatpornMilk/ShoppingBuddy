import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.ViewStyle}>
            <Image 
                style={styles.ImageStyle}
                source={require('../img/girlduck.jpeg')}
            />
            <Text style={styles.TextCombined}><Text style={styles.TextBK}>Your Shopping </Text><Text style={styles.TextYL}>Buddy</Text></Text>
            <Text style={styles.TextCombined}><Text style={styles.TextBK}>Managing Your </Text><Text style={styles.TextYL}>List</Text><Text style={styles.TextBK}> with Ease</Text></Text>
            <TouchableOpacity 
                style={styles.ButtonStyle} 
                onPress={() => navigation.navigate('Shopping')} 
            >
                <Text style={styles.ButtonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({ 
    ViewStyle: { 
        backgroundColor: '#F2F2F2',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    ImageStyle: {
        width: 310, 
        height: 310, 
        marginTop: 160, 
        marginBottom: 40,
    },
    TextBK: {
        color: '#1C1C1C',
        fontSize: 22,
        fontWeight: 'bold',
    },
    TextYL: {
        color: '#EFCC00',
        fontSize: 22,
        fontWeight: 'bold',
    },
    TextCombined: {
        flexDirection: 'row',
        fontSize: 22,
        fontWeight: 'bold',
        margin: 10,
    },
    ButtonStyle: {
        backgroundColor: '#EFCC00',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 40,
        alignItems: 'center',
        marginTop: 70,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    ButtonText: {
        color: '#1C1C1C',
        fontSize: 18,
        fontWeight: '500',
    },
});

export default HomeScreen;
