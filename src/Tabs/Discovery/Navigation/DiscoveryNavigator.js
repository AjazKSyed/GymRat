// Import React
import React from 'react';
import { TouchableOpacity, Modal, ActivityIndicator, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View , Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';



// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import Screens
import Discovery from '../Screens/Discovery';
import UserCard from '../Components/UserCard';
import Profile from '../Screens/Profile';
import SearchDiscover from '../Screens/SearchDiscover';


const Stack = createStackNavigator();

const DiscoveryNavigator = ({navigation}) => {


  return (

    <Stack.Navigator initialRouteName="Discovery">
      <Stack.Screen
        name="Discovery"
        component={Discovery}
        options={{
          title: "Discovery", //Set Header Title
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile", //Set Header Title
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchDiscover"
        component={SearchDiscover}
        options={{
          title: "Search", //Set Header Title
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};


export default DiscoveryNavigator;
