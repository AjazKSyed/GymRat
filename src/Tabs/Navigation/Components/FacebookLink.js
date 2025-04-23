import {View, Image, TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import Svg, { Circle, SvgCss, Ellipse,G,TSpan,TextPath,Path,Polygon,Polyline,Line,Rect,Use,Symbol,Defs,LinearGradient,RadialGradient,Stop,ClipPath,Pattern,Mask,} from 'react-native-svg';
import { ThemeContext} from '../../../Contexts/theme-context';
import React, { Component, useEffect, useState, useCallback, useContext } from "react";

const FacebookLink = (props) => {
    const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);

  return (
    <View>
      <TouchableOpacity
          onPress={()=>Linking.openURL(props.facebook)} style={{paddingHorizontal: "4%"}}
        >

        <Svg width="66" height="65"  fill="none"style={{
              shadowColor: theme.shadowFacebook,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.52,
              shadowRadius: 4,
              elevation: 3,
          }}>
          <Rect width="65.3875" height="63.6891" rx="14.8052"  fill={theme.backgroundColor}/>
          <Path
              d="M30.5423 48.3891C22.823 47.0268 16.9199 40.3064 16.9199 32.2238C16.9199 23.233 24.276 15.877 33.2668
               15.877C42.2576 15.877 49.6137 23.233 49.6137 32.2238C49.6137 40.3064 43.7106 47.0268 35.9913
                48.3891L35.0831 47.6625H31.4505L30.5423 48.3891Z"
                 fill={theme.gradientFacebook}
            />
          <Path d="M39.6234 36.7644L40.3499 32.2236H35.9908V29.0451C35.9908 27.7737 36.4448 26.7747 38.4428 26.7747H40.5316V22.5972C39.3509 22.4155 38.0795 22.2339 36.8989 22.2339C33.1755 22.2339 30.5418 24.5043 30.5418 28.591V32.2236H26.4551V36.7644H30.5418V48.2981C31.45 48.4797 32.3581 48.5705 33.2663 48.5705C34.1744 48.5705 35.0826 48.4797 35.9908 48.2981V36.7644H39.6234Z" fill={theme.outlineFacebook}/>
          <Defs>
          <LinearGradient id="paint1_linear_717_1554" x1="33.2668" y1="47.4391" x2="33.2668" y2="15.877" gradientUnits="userSpaceOnUse">
         <Stop stopColor="#523E89"/>
         <Stop offset="1" stopColor="#B378FF"/>
         </LinearGradient>
          </Defs>
          <Defs>
          <LinearGradient id="paint1_linear_717_1555" x1="33.2668" y1="47.4391" x2="33.2668" y2="15.877" gradientUnits="userSpaceOnUse">
         <Stop stopColor="#0062E0"/>
         <Stop offset="1" stopColor="#19AFFF"/>
         </LinearGradient>
          </Defs>
          <Defs>
          <LinearGradient id="paint0_linear_781_1380" x1="33.2668" y1="47.4391" x2="33.2668" y2="15.877" gradientUnits="userSpaceOnUse">
         <Stop stopColor="#2CB7E8"/>
         <Stop offset="1" stopColor="#08F1E0"/>
         </LinearGradient>
          </Defs>
          </Svg>


        </TouchableOpacity>
    </View>
  );
};
export default FacebookLink;

