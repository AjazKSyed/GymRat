import { View, Text } from "react-native";
// import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext} from '../../../Contexts/theme-context';
import React, { Component, useEffect, useState, useCallback, useContext } from "react";


const GradientText = (props) => {
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);

  return (
        <View>

        <Text {...props} style={[props.style, {  color:theme.gradientL, opacity: 0 }]} />
        </View>

  );
};

export default GradientText;