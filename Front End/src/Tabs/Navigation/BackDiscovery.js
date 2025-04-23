import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import {View, Image, TouchableOpacity} from 'react-native';
import Svg, { Circle, Path, Rect} from 'react-native-svg';
import { useTheme } from '@react-navigation/native';

import { ThemeContext } from './../../Contexts/theme-context';

const BackDiscovery = (props) => {
const { dark, sport, theme, toggle, sportToggle } = useContext(ThemeContext);

  return (
    <View>
      <TouchableOpacity
                onPress={() => props.navigationProps.pop()}
        >
        {/* !!!! translate svg sizes to adaptive sieze !!!! */}
        <Svg width="46" height="45" fill="none">
          <Path d="M27.0586 30.4414L18.9409 22.5002L27.0586 14.5591" stroke= { theme.colorName} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>
    </View>
  );
};
export default BackDiscovery;
