// Import React
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet, Image, Text, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import Screens
import Mischief from "../Screens/Mischief";
import Notifications from '../../Profile/SidebarDrawerTabs/Notifications_Pages/Notifications.js';
import Messages from "../Screens/Messages";
import MessageProfile from '../Screens/MessageProfile';




// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //


const Stack = createStackNavigator();


const MischiefNavigator = ({ navigation }) => {

  return (
    <Stack.Navigator initialRouteName="Mischief">
      <Stack.Screen
        name="Mischief"
        component={Mischief}
        options={{
          title: " ", //Set Header Title
          headerShown: false,
        }}
      />
      <Stack.Screen name="Messages" component={Messages}
       options={{
          title: " ", //Set Header Title
          headerShown: false,
        }}/>
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Notifications', //Set Header Title
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MessageProfile"
        component={MessageProfile}
        options={{
          title: "MessageProfile", //Set Header Title
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MischiefNavigator;
