import { View, Text } from "react-native";
import MaskedView from "@react-native-community/masked-view";
// import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext} from '../../../Contexts/theme-context';
import React, { Component, useEffect, useState, useCallback, useContext } from "react";


const GradientTextHeader = (props) => {
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);

  return (
            <View>


        <Text  {...props} style={[props.style, color:theme.gradientL]} />

            </View>

  );
};

export default GradientTextHeader;