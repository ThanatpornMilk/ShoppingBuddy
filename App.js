import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screen/HomeScreen';
import AddItemScreen from './src/screen/AddItemScreen';
import ShoppingScreen from './src/screen/ShoppingScreen';
import EditItemScreen from './src/screen/EditItemScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AddItem" component={AddItemScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Shopping" component={ShoppingScreen} options={{ headerShown: false }} />      
        <Stack.Screen name="EditItem" component={EditItemScreen} options={{ headerShown: false }} />      
      </Stack.Navigator>
    </NavigationContainer>


  );
};

export default App;
