import {View, Image, TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import Svg, { Circle, SvgCss, Ellipse,G,TSpan,TextPath,Path,Polygon,Polyline,Line,Rect,Use,Symbol,Defs,LinearGradient,RadialGradient,Stop,ClipPath,Pattern,Mask,} from 'react-native-svg';
import { ThemeContext} from '../../../Contexts/theme-context';
import React, { Component, useEffect, useState, useCallback, useContext } from "react";

const SpotifyLink = (props) => {
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);

  return (
    <View>
      <TouchableOpacity
          onPress={()=>Linking.openURL(props.spotify)}  style={{paddingHorizontal: "4%"}}
        >
        <Svg width="66" height="64" fill="none"style={{
              shadowColor: theme.shadowSpotify,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.52,
              shadowRadius: 4,
              elevation: 3,
          }}>
          <Rect width="65.3875" height="63.6891" rx="16.9838" fill={ theme.backgroundColor}/>
          <Circle cx="32.5869" cy="31.9458" r="16.1611" fill={theme.gradientSpotify}/>
          <Path
            d="M41.2226 30.2075C36.3439 27.2921 28.2964 27.024 23.6391 28.4466C22.8913 28.6748
 22.1004 28.25 21.8737 27.4974C21.6471 26.7445 22.0689 25.9492 22.8173 25.7205C28.1636 24.0873
  37.0511 24.4029 42.6675 27.7577C43.3402 28.1594 43.5609 29.0336 43.1622 29.7094C42.7631 30.3863 41.8936 30.6095 41.2226 30.2075ZM41.0628 34.5257C40.7205 35.0845 39.9943 35.2598 39.4396 34.9167C35.3723 32.401 29.1701 31.6723 24.3581 33.1419C23.734 33.3317 23.0749 32.9777 22.8855 32.351C22.6973 31.723 23.0494 31.061 23.6722 30.8701C29.1694 29.1917 36.003 30.0046 40.6746 32.8933C41.2293 33.237 41.4038 33.9683 41.0628 34.5257ZM39.2108 38.6727C38.9388 39.1215 38.3581 39.2621 37.9137 38.9886C34.3594 36.8028 29.886 36.3092 24.6176 37.52C24.1099 37.6371 23.6041 37.3171 23.4882 36.8062C23.372 36.2955 23.6888
 35.7863 24.1978 35.6698C29.963 34.3436 34.9085 34.9143 38.8978 37.3673C39.3426 37.6406 39.4827 38.2253 39.2108 38.6727Z"
            fill={theme.backgroundColor}
          />
          <Defs>
          <LinearGradient id="paint0_linear_781_1385" x1="16.3668" y1="31.4677" x2="48.5748" y2="31.4677" gradientUnits="userSpaceOnUse">
         <Stop stopColor="#D67EEE"/>
         <Stop offset="1" stopColor="#E9B4F5"/>
         </LinearGradient>
          </Defs>
          <Defs>
          <LinearGradient id="paint0_linear_781_1384" x1="13" y1="32.0002" x2="52" y2="31.5002" gradientUnits="userSpaceOnUse">
         <Stop stopColor="#715AB0"/>
         <Stop offset="0.94" stopColor="#4525A0"/>
         </LinearGradient>
          </Defs>
          <Defs>
          <LinearGradient id="paint0_linear_717_1567" x1="13" y1="32.0002" x2="52" y2="31.5002" gradientUnits="userSpaceOnUse">
         <Stop stopColor="#1F650C"/>
         <Stop offset="1" stopColor="#A8E902"/>
         </LinearGradient>
          </Defs>

          <Defs>
          <LinearGradient id="paint0_linear_781_1386" x1="16.3668" y1="31.4677" x2="48.5748" y2="31.4677" gradientUnits="userSpaceOnUse">
         <Stop stopColor="#7EEECC"/>
         <Stop offset="1" stopColor="#B4EDF5"/>
         </LinearGradient>
          </Defs>

          </Svg>


        </TouchableOpacity>
    </View>
  );
};
export default SpotifyLink;