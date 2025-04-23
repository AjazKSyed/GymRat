import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import "react-native-gesture-handler";
import { StyleSheet, TextInput, Alert, View, Text, Modal, ActivityIndicator, Image,useWindowDimensions, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView, Appearance } from 'react-native';;
import GradientButton from 'react-native-gradient-buttons';
import Svg, { Circle, Path} from 'react-native-svg';
import * as Location from 'expo-location';
import { ThemeContext } from '../Contexts/theme-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import { Avatar, Header, Overlay, Button } from 'react-native-elements';
import BackLogin from '../Tabs/Navigation/BackLogin';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import screens
import CreateAccount from './RegistrationScreens/CreateAccount';
import Security from './RegistrationScreens/Security';
import PersonalInformation from './RegistrationScreens/PersonalInformation';
import LocationAccess from './RegistrationScreens/LocationAccess';
import ProfilePhoto from './RegistrationScreens/ProfilePhoto';
import OtherPhotos from './RegistrationScreens/OtherPhotos'; // post call add for muultiple
import AboutYou from './RegistrationScreens/AboutYou';
import SocialMedia from './RegistrationScreens/SocialMedia';
import InterestsSetup from './RegistrationScreens/InterestsSetup';
import AccountSubmission from './RegistrationScreens/AccountSubmission';

import {useRoute} from '@react-navigation/native';

import { RegistrationContextProvider} from '../Contexts/RegistrationContext';


const Stack = createStackNavigator();

const RegistrationNavigator = ({navigation}) => {
  const { dark, sport, deep, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
  const { height, width } = useWindowDimensions();
// const route = useRoute();
// console.log(route.key);
  StatusBar.setBarStyle(theme.barColor, true);
  return (
    <RegistrationContextProvider>
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <BackLogin navigationProps={navigation} />
        ),
            headerStyle: {
            height: 120,
            shadowColor: 'transparent',
          },
          headerTitleStyle: {
            fontSize: 32,
            fontWeight: '700',
          },

      }}
      >

      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{ headerShown: false}}

      />
      <Stack.Screen
        name="Security"
        component={Security}
        options={{ headerShown: false}}
      />

      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
        options={{ headerShown: false}}
      />

      <Stack.Screen
        name="LocationAccess"
        component={LocationAccess}
        options={{ headerShown: false}}
      />

      <Stack.Screen
        name="ProfilePhoto"
        component={ProfilePhoto}
        options={{ headerShown: false}}
      />

      <Stack.Screen
        name="OtherPhotos"
        component={OtherPhotos}
        options={{ headerShown: false}}
      />

      <Stack.Screen
        name="AboutYou"
        component={AboutYou}
        options={{ headerShown: false}}
      />

      <Stack.Screen
        name="SocialMedia"
        component={SocialMedia}
        options={{ headerShown: false}}
      />

      <Stack.Screen
        name="InterestsSetup"
        component={InterestsSetup}
        options={{ headerShown: false}}
      />

      <Stack.Screen
        name="AccountSubmission"
        component={AccountSubmission}
        options={{ headerShown: false}}
      />
    </Stack.Navigator>
    </RegistrationContextProvider>
  );
};

export default RegistrationNavigator;