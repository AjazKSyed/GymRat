import {TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View} from 'react-native';
import { Avatar, Overlay, Button, Header} from "react-native-elements";
import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
 import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  SvgXml,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import { ThemeContext } from './../../Contexts/theme-context';

import AsyncStorage from '@react-native-async-storage/async-storage';


// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //


const MessageHeader = (props) => {

const { dark, sport, theme, toggle, sportToggle } = useContext(ThemeContext);
const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space=between', alignItems:'center',
        }}
>
      <TouchableOpacity
          style={{
            shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 1.22,
                            paddingRight: "5%",


              elevation: 3,
          }}
          onPress={() => navigation.navigate("MessageProfile", {itemId: props.id, firstName: props.firstName, lastName: props.lastName})}


        >
        <Avatar
                    size={40}
                    rounded
                    title={props.firstName.charAt(0) + props.lastName.charAt(0)}
                    titleStyle={{ color: theme.messageTextColors, fontSize: 15, fontWeight: '600'}}
                    overlayContainerStyle={{ backgroundColor: theme.userMessageBackground}}
                />
        </TouchableOpacity>
        <Text
            style={{
              color: theme.userMessageBackground,
              fontSize:15,
              fontWeight: '400',
                      }}
                    >
                      {props.firstName  + " "  + props.lastName}
                 </Text>
    </View>
  );
};
export default MessageHeader;
