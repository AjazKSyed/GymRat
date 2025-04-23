import axios from "axios";
import {
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
    FlatList,
    Text,
    View,
} from "react-native";
import { Avatar, Overlay, Button, Icon, CheckBox } from "react-native-elements";
import { ThemeContext} from '../../../../Contexts/theme-context';
import React, { Component, useEffect, useState, useCallback, useContext } from "react";

// import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function InterestItem(props) {


  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);

    return (
        <View style={{
        backgroundColor: theme.gradientL,
        borderRadius: 8}}>

  {/* <LinearGradient start={[0, 0]}
                  end={[1, 0]}
                  colors={[theme.gradientL, theme.gradientR]}
                  style={{borderRadius: 15}}> */}
    <View style={{
        margin: 2,
        backgroundColor: theme.backgroundColor,
        borderRadius: 6
    }}>
      <Text style={{
        margin: 6,
        marginHorizontal: 10,
        paddingHorizontal: 6,
        textAlign: "center",
        backgroundColor: theme.backgroundColor,
        color:theme.colorName,
        fontSize: 12
      }}>{props.interestName}</Text>
    </View>
  {/* </LinearGradient> */}


        </View>
    );
}
const styles = StyleSheet.create({

    names: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
});