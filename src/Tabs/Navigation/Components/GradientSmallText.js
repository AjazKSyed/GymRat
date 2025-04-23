import { View, Text } from "react-native";
import MaskedView from "@react-native-community/masked-view";
import { ThemeContext} from '../../../Contexts/theme-context';
import React, { Component, useEffect, useState, useCallback, useContext } from "react";


const GradientText = (props) => {
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);

  return (
    // <MaskedView maskElement={<Text  {...props} style={props.style} />}>
    //   <LinearGradient
    //     colors={[theme.gradientTextL, theme.gradientTextR]}
    //     start={[0, 0]}
    //     end={[0.1, 0]}
    //   >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
    //   </LinearGradient>
    // </MaskedView>
  );
};

export default GradientText;