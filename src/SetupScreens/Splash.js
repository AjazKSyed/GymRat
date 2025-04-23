// Import React and Component
import {View, Image,ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import Svg, { Circle, SvgCss, Ellipse,G,TSpan,TextPath,Path,Polygon,Polyline,Line,Rect,Use,Symbol,Defs,LinearGradient,RadialGradient,Stop,ClipPath,Pattern,Mask,} from 'react-native-svg';
import { ThemeContext} from '../Contexts/theme-context';
import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const { dark, deep, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);  // console.log("SplashScreen.js " + isDark);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('dd').then((value) =>
        navigation.replace(value === null ? 'Auth' : 'drawerRoot'),
      );
    }, 5000);
  }, []);

  return (
    <View
      style = {{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.splash,
      }}>
      {
        sport ?
        <Svg width="266" height="263">
          <Path d="M252.8 106.7C252.8 77.5 229.1 53.8 199.9 53.8H154.3V89.1H199.9C209.6 89.1 217.5 97 217.5 106.7C217.5 116.4 209.6 124.3 199.9 124.3H154.3C154.3 138.1 143.1 149.2 129.4 149.2H111.8V194.8H147.1V159.5H200C202 159.5 203.9 159.4 205.8 159.2L217.7 194.8H253L236.4 145.1C246.5 135.5 252.8 121.9 252.8 106.7ZM41.3 45V97.9C41.3 102.8 45.2 106.7 50.1 106.7H103C107.9 106.7 111.8 102.8 111.8 97.9V89.1H76.5V53.8H147.1V124.3C147.1 134 139.2 141.9 129.5 141.9H23.7C14 141.9 6.10001 134 6.10001 124.3V18.6C6.10001 8.90001 14 1 23.7 1H129.5C139.2 1 147.1 8.90001 147.1 18.6V45H111.8C111.8 40.1 107.9 36.2 103 36.2H50.1C45.2 36.2 41.3 40.1 41.3 45ZM9.20001 239.3V251.5C9.20001 252.6 10.1 253.5 11.2 253.5H23.4C24.5 253.5 25.4 252.6 25.4 251.5V249.5H17.3V241.4H33.5V257.6C33.5 259.8 31.7 261.7 29.4 261.7H5.10001C2.90001 261.7 1 259.9 1 257.6V233.3C1 231.1 2.80001 229.2 5.10001 229.2H29.4C31.6 229.2 33.5 231 33.5 233.3V239.4H25.4C25.4 238.3 24.5 237.4 23.4 237.4H11.2C10.1 237.3 9.20001 238.2 9.20001 239.3ZM73.4 229.2V257.6C73.4 259.9 71.6 261.7 69.3 261.7H40.9V253.6H65.2V249.5H44.9C42.6 249.5 40.8 247.7 40.8 245.4V229.2H48.9V241.4H65.1V229.2H73.4V229.2ZM209.3 229.2H185C182.8 229.2 180.9 231 180.9 233.3V261.7H189V253.6H205.2V261.7H213.3V233.3C213.4 231 211.5 229.2 209.3 229.2ZM189 245.4V239.3C189 238.2 189.9 237.3 191 237.3H203.2C204.3 237.3 205.2 238.2 205.2 239.3V245.4H189ZM173.5 241.4C173.5 234.7 168 229.2 161.3 229.2H141V261.7H149.1V253.6H161.3C161.7 253.6 162.2 253.6 162.6 253.5L165.3 261.7H173.4L169.6 250.3C172 248 173.5 244.9 173.5 241.4ZM149.1 245.4V237.3H161.3C163.5 237.3 165.4 239.1 165.4 241.4C165.4 243.6 163.6 245.5 161.3 245.5H149.1V245.4ZM253.2 229.2V237.3H241V261.6H232.9V237.3H220.7V229.2H253.2ZM113.4 229.2V261.7H105.3V240.1L97.2 251L89.1 240.1V261.7H81V229.2H89.1L97.2 240L105.3 229.2H113.4Z" stroke="url(#paint0_linear_1159_1412)" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <Path d="M262.203 233.801C262.103 233.701 262.103 233.601 262.103 233.601C262.403 233.501 262.803 233.201 262.803 232.601C262.803 231.801 262.303 231.301 261.503 231.301H259.803V235.401H260.703V233.901H261.203L261.903 235.401H262.903L262.203 233.801ZM261.203 233.101H260.703V231.901H261.203C261.603 231.901 261.803 232.101 261.803 232.501C261.803 232.901 261.603 233.101 261.203 233.101Z" fill="url(#paint1_linear_1159_1412)"/>
          <Path d="M261.103 229.201C258.903 229.201 257.203 231.001 257.203 233.301C257.203 235.501 259.003 237.401 261.103 237.401C263.303 237.401 265.103 235.601 265.103 233.301C265.103 231.001 263.303 229.201 261.103 229.201ZM261.103 236.401C259.403 236.401 258.103 235.001 258.103 233.201C258.103 231.401 259.403 230.001 261.103 230.001C262.803 230.001 264.103 231.401 264.103 233.201C264.103 235.001 262.803 236.401 261.103 236.401Z" fill="url(#paint2_linear_1159_1412)"/>
          <Path d="M262.203 233.801C262.103 233.701 262.103 233.601 262.103 233.601C262.403 233.501 262.803 233.201 262.803 232.601C262.803 231.801 262.303 231.301 261.503 231.301H259.803V235.401H260.703V233.901H261.203L261.903 235.401H262.903L262.203 233.801ZM261.203 233.101H260.703V231.901H261.203C261.603 231.901 261.803 232.101 261.803 232.501C261.803 232.901 261.603 233.101 261.203 233.101Z" fill="url(#paint3_linear_1159_1412)"/>
          <Path d="M262.203 233.801C262.103 233.701 262.103 233.601 262.103 233.601C262.403 233.501 262.803 233.201 262.803 232.601C262.803 231.801 262.303 231.301 261.503 231.301H259.803V235.401H260.703V233.901H261.203L261.903 235.401H262.903L262.203 233.801ZM261.203 233.101H260.703V231.901H261.203C261.603 231.901 261.803 232.101 261.803 232.501C261.803 232.901 261.603 233.101 261.203 233.101Z" fill="url(#paint4_linear_1159_1412)"/>
          <Defs>
          <LinearGradient id="paint0_linear_1159_1412" x1="224.29" y1="51.8016" x2="-9.8935" y2="247.483" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#8027A1"/>
          <Stop offset="0.9951" stopColor="#C22E83"/>
          </LinearGradient>
          <LinearGradient id="paint1_linear_1159_1412" x1="262.78" y1="232.022" x2="259.392" y2="234.853" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#8027A1"/>
          <Stop offset="0.9951" stopColor="#C22E83"/>
          </LinearGradient>
          <LinearGradient id="paint2_linear_1159_1412" x1="264.211" y1="230.681" x2="258.053" y2="235.827" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#8027A1"/>
          <Stop offset="0.9951" stopColor="#C22E83"/>
          </LinearGradient>
          <LinearGradient id="paint3_linear_1159_1412" x1="262.78" y1="232.022" x2="259.392" y2="234.853" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#8027A1"/>
          <Stop offset="0.9951" stopColor="#C22E83"/>
          </LinearGradient>
          <LinearGradient id="paint4_linear_1159_1412" x1="262.78" y1="232.022" x2="259.392" y2="234.853" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#8027A1"/>
          <Stop offset="0.9951" stopColor="#C22E83"/>
          </LinearGradient>
          </Defs>
        </Svg>

      :
      <Svg width="265" height="261">
      <Path d="M251.8 105.7C251.8 76.5 228.1 52.8 198.9 52.8H153.3V88.1H198.9C208.6 88.1 216.5 96 216.5 105.7C216.5 115.4 208.6 123.3 198.9 123.3H153.3C153.3 137.1 142.1 148.2 128.4 148.2H110.8V193.8H146.1V158.5H199C201 158.5 202.9 158.4 204.8 158.2L216.7 193.8H252L235.4 144.1C245.5 134.5 251.8 120.9 251.8 105.7ZM40.3 44V96.9C40.3 101.8 44.2 105.7 49.1 105.7H102C106.9 105.7 110.8 101.8 110.8 96.9V88.1H75.5V52.8H146.1V123.3C146.1 133 138.2 140.9 128.5 140.9H22.7C13 140.9 5.10001 133 5.10001 123.3V17.6C5.10001 7.90001 13 0 22.7 0H128.5C138.2 0 146.1 7.90001 146.1 17.6V44H110.8C110.8 39.1 106.9 35.2 102 35.2H49.1C44.2 35.2 40.3 39.1 40.3 44ZM8.20001 238.3V250.5C8.20001 251.6 9.10001 252.5 10.2 252.5H22.4C23.5 252.5 24.4 251.6 24.4 250.5V248.5H16.3V240.4H32.5V256.6C32.5 258.8 30.7 260.7 28.4 260.7H4.10001C1.90001 260.7 0 258.9 0 256.6V232.3C0 230.1 1.80001 228.2 4.10001 228.2H28.4C30.6 228.2 32.5 230 32.5 232.3V238.4H24.4C24.4 237.3 23.5 236.4 22.4 236.4H10.2C9.10001 236.3 8.20001 237.2 8.20001 238.3ZM72.4 228.2V256.6C72.4 258.9 70.6 260.7 68.3 260.7H39.9V252.6H64.2V248.5H43.9C41.6 248.5 39.8 246.7 39.8 244.4V228.2H47.9V240.4H64.1V228.2H72.4ZM208.3 228.2H184C181.8 228.2 179.9 230 179.9 232.3V260.7H188V252.6H204.2V260.7H212.3V232.3C212.4 230 210.5 228.2 208.3 228.2ZM188 244.4V238.3C188 237.2 188.9 236.3 190 236.3H202.2C203.3 236.3 204.2 237.2 204.2 238.3V244.4H188ZM172.5 240.4C172.5 233.7 167 228.2 160.3 228.2H140V260.7H148.1V252.6H160.3C160.7 252.6 161.2 252.6 161.6 252.5L164.3 260.7H172.4L168.6 249.3C171 247 172.5 243.9 172.5 240.4ZM148.1 244.4V236.3H160.3C162.5 236.3 164.4 238.1 164.4 240.4C164.4 242.6 162.6 244.5 160.3 244.5H148.1V244.4ZM252.2 228.2V236.3H240V260.6H231.9V236.3H219.7V228.2H252.2ZM112.4 228.2V260.7H104.3V239.1L96.2 250L88.1 239.1V260.7H80V228.2H88.1L96.2 239L104.3 228.2H112.4ZM260.1 228.2C262.3 228.2 264.1 230 264.1 232.3C264.1 234.5 262.3 236.4 260.1 236.4C257.9 236.4 256.1 234.6 256.1 232.3C256.2 230 257.9 228.2 260.1 228.2ZM260.1 235.4C261.8 235.4 263.1 234 263.1 232.2C263.1 230.4 261.8 229 260.1 229C258.4 229 257.1 230.4 257.1 232.2C257.1 234 258.4 235.4 260.1 235.4ZM258.7 230.2H260.4C261.2 230.2 261.7 230.7 261.7 231.5C261.7 232.1 261.3 232.5 261 232.6C261 232.6 261.1 232.7 261.1 232.8L261.9 234.3H260.9L260.2 232.8H259.7V234.3H258.8V230.2H258.7ZM260.2 232.1C260.6 232.1 260.8 231.9 260.8 231.5C260.8 231.1 260.6 230.9 260.2 230.9H259.7V232.1H260.2Z"
       fill={deep ? "url(#paint0_radial_1159_1411)" : (dark ? "url(#paint0_radial_1159_1409)" : "url(#paint0_radial_1159_1410)")}/>
      <Defs>
        <RadialGradient id="paint0_radial_1159_1409" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200.352 38.5271) rotate(107.089) scale(232.435 234.946)">
          <Stop offset="0.00360405" stopColor="#D9D3FF"/>
          <Stop offset="1" stopColor="#9A4EE7"/>
        </RadialGradient>
      </Defs>
      <Defs>
        <RadialGradient id="paint0_radial_1159_1410" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200.352 38.5271) rotate(107.089) scale(232.435 234.946)">
        <Stop offset="0.00360405" stopColor="#71347E"/>
        <Stop offset="1" stopColor="#2D1E48"/>
        </RadialGradient>
      </Defs>
      <Defs>
        <RadialGradient id="paint0_radial_1159_1411" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200.352 38.5271) rotate(107.089) scale(232.435 234.946)">
        <Stop stopColor="#2C6281"/>
        <Stop offset="1" stopColor="#303F55"/>
        </RadialGradient>
      </Defs>
      </Svg>


}
      <ActivityIndicator
        animating={animating}
        color = {theme.splash}
        size = "small"
        style = {{ alignItems: 'center', height: "20%"}}
      />
    </View>
  );
};

export default Splash;