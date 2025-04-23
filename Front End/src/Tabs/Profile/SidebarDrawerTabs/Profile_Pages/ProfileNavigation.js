// Import React
import React from 'react';
import { TouchableOpacity, Modal, ActivityIndicator, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View , Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { ProfileContextProvider } from '../../../../Contexts/ProfileContext';


// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import Screens
import EditProfile from './EditProfileScreen';
import ProfileScreen from './ProfileScreen';



const Stack = createStackNavigator();

const ProfileNavigation = ({navigation}) => {
  return (
        <ProfileContextProvider>

  <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
        </ProfileContextProvider>

  );
};


export default ProfileNavigation;
