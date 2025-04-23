import React, { Component, useEffect, useState, useCallback, useContext } from "react";
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
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  SvgXml,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import { useNavigation } from "@react-navigation/native";
import { Avatar, Overlay, Button, Icon, CheckBox } from "react-native-elements";

import { ThemeContext } from '../../../Contexts/theme-context';


// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

export default function MessageBubble(props) {
    const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
    const currentUserBool = props.sentId == props.friendId;
    return (
        <View  style={{
                    flex: 1,
                    marginTop: "4%",
                    marginBottom: "1%",
                    width: "60vw%",
                    transform: currentUserBool ? [{ translateX: 0}] : [{ translateX: 145}],
                    padding: 5,
                    borderTopLeftRadius: 14.81,
                    borderTopRightRadius: 14.81,
                    borderBottomRightRadius: currentUserBool ? 14.81 : 0,
                    borderBottomLeftRadius: currentUserBool ? 0 : 14.81,
                    flexDirection: "row",
                    backgroundColor:currentUserBool ? theme.userMessageBackground : theme.friendMessageBackground,
                    overflow: "visible",
                }}>
                      <Text style={{
                            fontWeight: "500",
                            fontSize: 14,
                            padding: 5,
                            color: theme.messageTextColors
                        }}>
                            {props.text}
                        </Text>
                    </View>

    );
}