import {View, Image, TouchableOpacity} from 'react-native';

import Svg, { Circle, SvgCss, Ellipse,G,TSpan,TextPath,Path,Polygon,Polyline,Line,Rect,Use,Symbol,Defs,LinearGradient,RadialGradient,Stop,ClipPath,Pattern,Mask,} from 'react-native-svg';
import { ThemeContext} from '../../Contexts/theme-context';
import React, { Component, useEffect, useState, useCallback, useContext } from "react";


const NavigationDrawerHeader = (props) => {

  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);


  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{transform: [{ translateX: "5%" }]}}>
      <TouchableOpacity onPress={toggleDrawer}>
      <Svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <Rect width="34" height="34" rx="8"/>
          <Rect x="8" y="10" width="18" height="2" rx="1" fill={theme.colorMenu1} />
          <Rect x="8" y="16" width="12.96" height="2" rx="1"  fill={theme.colorMenu1} />
          <Rect x="8" y="22" width="18" height="2" rx="1"  fill={theme.colorMenu1}/>
          <Defs>
            <LinearGradient id="paint0_linear_676_2011" x1="8.89213" y1="11" x2="26" y2="11" gradientUnits="userSpaceOnUse">
              <Stop stopColor="#C22E83"/>
              <Stop offset="1" stopColor="#8027A1"/>
            </LinearGradient>
          </Defs>
          <Defs>
            <LinearGradient id="paint1_linear_676_2011" x1="8.64233" y1="17" x2="20.96" y2="17" gradientUnits="userSpaceOnUse">
              <Stop stopColor="#C22E83"/>
              <Stop offset="1" stopColor="#8027A1"/>
            </LinearGradient>
          </Defs>
          <Defs>
            <LinearGradient id="paint2_linear_676_2011" x1="8.89213" y1="23" x2="26" y2="23" gradientUnits="userSpaceOnUse">
              <Stop stopColor="#C22E83"/>
              <Stop offset="1" stopColor="#8027A1"/>
            </LinearGradient>
          </Defs>
          </Svg>

      </TouchableOpacity>
    </View>
  );
};
export default NavigationDrawerHeader;
