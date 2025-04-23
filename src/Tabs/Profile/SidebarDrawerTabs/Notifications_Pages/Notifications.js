import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import { StyleSheet, TextInput, Alert, View, Text, Modal, ActivityIndicator, Image, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView, Appearance } from 'react-native';
import axios from 'axios';
import "react-native-gesture-handler";

import BackProfiles from '../../../Navigation/BackProfiles';
import { ThemeContext } from '../../../../Contexts/theme-context';

import { Avatar, Overlay, Button, Header} from "react-native-elements";


// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //


export default function Notifications({ navigation})  {
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);

  return (
    <View style={{backgroundColor:theme.backgroundColor, flex: 1}}>
    <Header
      barStyle= {theme.barColor}
      centerComponent={{text: 'Notifications', style: { color:theme.colorName , fontWeight: '600', fontSize: 30, paddingTop: "1%"} }}
      placement="left"
      containerStyle={{
        backgroundColor:"transparent",
        borderBottomWidth:0,
        paddingVertical: 20,
      }}
      leftComponent={<BackProfiles navigationProps={navigation}/>}

    />

    </View>
  );
}