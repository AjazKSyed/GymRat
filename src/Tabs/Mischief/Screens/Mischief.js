import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import { Avatar, Overlay, Button, Icon, Header,CheckBox} from 'react-native-elements';
import { TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
 import Svg, { Circle, Path, Rect} from 'react-native-svg';

import MischiefNavHeader from '../../Navigation/MischiefNavHeader';
import { ThemeContext } from '../../../Contexts/theme-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


import MischiefCalls from "../Components/MischiefCalls";
import MessageCard from "../Components/MessageCard";



// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const Mischief = ({ navigation }) => {
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);

  return (
    <View style={{backgroundColor:theme.backgroundColor, flex: 1}}>
    <Header

      barStyle= {theme.barColor}
      rightComponent={<MischiefNavHeader navigationProps={navigation}/>}
      centerComponent={{text: 'Mischief', style: { color:theme.colorName , fontWeight: '600', fontSize: 30, paddingLeft: "5%"} }}
      placement="left"
      containerStyle={{
        backgroundColor:"transparent",
        borderBottomWidth:0,
        paddingVertical: 20,
      }}

    />
      <MischiefCalls navigation={navigation}></MischiefCalls>
    </View>
  );
};

export default Mischief;


