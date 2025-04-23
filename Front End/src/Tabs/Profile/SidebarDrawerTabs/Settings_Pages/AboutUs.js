// Import React
import { Switch, TouchableOpacity, Modal, ActivityIndicator, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View , Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

import "react-native-gesture-handler";
import Back from '../../../Navigation/Back';
import { Avatar, Overlay, Header} from "react-native-elements";
import { ThemeContext } from './../../../../Contexts/theme-context';
import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import Svg, {
  Circle,
  SvgCss,
  Ellipse,
  G,
  TSpan,
  TextPath,
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

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //


const AboutUs = () => {
  const navigation = useNavigation();
  const [filled, setFilled] = useState(false);
  const { dark, sport, deep, theme, toggle, sportToggle, deepToggle, setSport} = useContext(ThemeContext);

  return (
    <View style={{backgroundColor: theme.backgroundColor, flex: 1}}>
        <Header
          barStyle= {theme.barColor}
          centerComponent={{text: 'About GymRat', style: { color:theme.colorName , fontWeight: '600', fontSize: 30} }}
          placement="left"
          containerStyle={{
            backgroundColor:theme.settingsHeader,
            borderBottomWidth:0,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          leftComponent={<Back navigationProps={navigation}/>}
        />
                <ScrollView>

        <View style={{
          paddingTop: "4%",
          marginHorizontal: "4%",
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems:'center',
        }}>

          <Text style = {{color: theme.settingsGeneral, fontSize: 20, textAlign: "left", paddingHorizontal: "2%", fontWeight: "600", paddingTop: "4%", paddingBottom: "4%", }}>Who we are</Text>
            <Text style={{color: theme.settingsText, fontSize: 17, textAlign: "left", paddingHorizontal: "2%", fontWeight: "400", paddingTop: "4%", paddingBottom: "4%", }}>
              GymRat is a ...
            </Text>

        </View>
                </ScrollView>

      </View>

  );
};

export default AboutUs;
