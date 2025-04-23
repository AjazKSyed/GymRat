import React, { Component, useEffect, useState, useContext} from "react";
import { ImageBackground, View, StyleSheet } from 'react-native';
import Svg, { SvgCss, Defs, Rect, LinearGradient, RadialGradient, Stop } from 'react-native-svg';

import { ThemeContext } from './../../Contexts/theme-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FROM_COLOR = 'rgb(255, 255, 255)';
const TO_COLOR = 'rgb(0,102,84)';

const Background = ({ children }) => {
  const { dark, deep, sport, theme, toggle, sportToggle } = useContext(ThemeContext);
console.log(sport);
    return (
    (sport ?
        <View style={ styles.view }>
                <ImageBackground source={require("../../../assets/spBack.png")} resizeMode="cover" style={styles.cover}>
                    { children }
                </ImageBackground>
        </View>
        :
        <View style={ styles.view }>
            <Svg width="100%" height="926" style={ StyleSheet.absoluteFillObject }>
                <Rect width="100%" height="926" fill={deep ? "url(#paint0_radial_610_856)" : (dark ? "url(#paint0_radial_610_854)" : "url(#paint0_radial_610_855)")}/>
                <Defs>
                    <RadialGradient id="paint0_angular_691_1364" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(33.5 846.5) rotate(-67.5474) scale(408.463 4.55819)">
                        <Stop stopColor="#BE2E85"/>
                        <Stop offset="1" stopColor="#3E126A"/>
                    </RadialGradient>
                </Defs>
                <Defs>
                    <RadialGradient id="paint0_radial_610_854" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(210.5 24.5) rotate(103.841) scale(817.229 249.728)">
                        <Stop stopColor={ '#37325F' }/>
                        <Stop offset="1" stopColor={ '#1E1E30' }/>
                    </RadialGradient>
                </Defs>
                <Defs>
                    <RadialGradient id="paint0_radial_610_855" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(210.5 24.5) rotate(103.841) scale(817.229 249.728)">
                        <Stop stopColor={ '#8F4C94' }/>
                        <Stop offset="0.8" stopColor={ '#300E41' }/>
                    </RadialGradient>
                </Defs>
                <Defs>
                    <RadialGradient id="paint0_radial_610_856" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(210.5 24.5) rotate(103.841) scale(817.229 249.728)">
                        <Stop stopColor={ '#234A61' }/>
                        <Stop offset="1" stopColor={ '#1B1E2A' }/>
                    </RadialGradient>
                </Defs>
            </Svg>
            { children }
        </View>
    ));
};

export default Background;

const styles = StyleSheet.create({
    view: { flex:1, paddingTop: 60},
    cover: { flex: 1, paddingTop: 60, ...StyleSheet.absoluteFillObject,
  },
});
