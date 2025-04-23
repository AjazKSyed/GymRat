
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
import { ThemeContext } from '../../../../Contexts/theme-context';

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

export default function FriendCard(props) {
    const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);

    const navigation = useNavigation();

    return (

         <View>
            <TouchableOpacity
                style={{
                    flex: 1,
                    marginTop: "4%",
                    marginBottom: "3%",
                    width: "100vw%",
                    minHeight: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 14.81,
                    flexDirection: "row",
                    backgroundColor:theme.cardBackground,
                    overflow: "hidden",
                }}
                onPress={() =>
                    navigation.navigate("FriendsProfile", {itemId: props.listId, firstName: props.firstName, lastName: props.lastName})
                }
            >
                      <View style={styles.picture}>
                    <Svg  width="60" height="60">
                    <Rect width="60" height="60" rx="30" fill={theme.cardAvatarBorder}/>
                    <Path d="M29.5005 54.0864C43.0792 54.0864 54.0869 43.0787 54.0869 29.5C54.0869 15.9213 43.0792 4.91357 29.5005 4.91357C15.9218 4.91357 4.91406 15.9213 4.91406 29.5C4.91406 43.0787 15.9218 54.0864 29.5005 54.0864Z" fill={theme.cardAvatarBackground}/>
                    <Defs>
                        <LinearGradient id="paint0_linear_834_1398" x1="-0.228726" y1="25.4446" x2="86.4758" y2="26.0076" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#4E17B5"/>
                        <Stop offset="1" stopColor="#270C5A"/>
                        </LinearGradient>
                        <LinearGradient id="paint1_linear_834_1398" x1="29.9992" y1="4.99707" x2="29.9992" y2="55.0033" gradientUnits="userSpaceOnUse">
                        <Stop offset="0.0001" stopColor="#FFFFFF"/>
                        <Stop offset="1" stopColor="#FFFFFF"/>
                        </LinearGradient>
                    </Defs>
                    <Defs>
                        <LinearGradient id="paint0_linear_835_1398"  x1="39.4112" y1="15.7645" x2="6.7562" y2="54.0496" gradientUnits="userSpaceOnUse">
                        <Stop offset="0.020991" stopColor="#8158CE"/>
                        <Stop offset="1" stopColor="#7A3F89"/>
                        </LinearGradient>
                        <LinearGradient id="paint1_linear_835_1398" x1="48.4187" y1="7.88204" x2="9.00759" y2="55.1754" gradientUnits="userSpaceOnUse">
                        <Stop offset="0.0001" stopColor="#222222"/>
                        <Stop offset="1" stopColor="#222222"/>
                        </LinearGradient>
                    </Defs>
                    <Defs>
                        <LinearGradient id="paint0_linear_836_1398" x1="-0.228726" y1="25.4446" x2="86.4758" y2="26.0076" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#D781EE"/>
                        <Stop offset="1" stopColor="#E8B0F5"/>
                        </LinearGradient>
                        <LinearGradient id="paint1_linear_836_1398" x1="29.9992" y1="4.99658" x2="29.9992" y2="55.0028" gradientUnits="userSpaceOnUse">
                        <Stop offset="0.0001" stopColor="#222239"/>
                        <Stop offset="1" stopColor="#282841"/>
                        </LinearGradient>
                    </Defs>
                                        <Defs>
                        <LinearGradient id="paint0_linear_836_1399" x1="-0.228726" y1="25.4446" x2="86.4758" y2="26.0076" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#4D94A4"/>
                        <Stop offset="1" stopColor="#1A303D"/>
                        </LinearGradient>
                        <LinearGradient id="paint1_linear_836_1399" x1="29.9992" y1="4.99658" x2="29.9992" y2="55.0028" gradientUnits="userSpaceOnUse">
                        <Stop offset="0.0001" stopColor="#232527"/>
                        <Stop offset="1" stopColor="#232527"/>
                        </LinearGradient>
                    </Defs>
                </Svg>

                <Text
                      style={{
                        position: 'absolute',
                        color: theme.friendColorName,
                        fontSize:22,
                        fontWeight: '500',
                      }}
                    >
                      {props.firstName.charAt(0) + props.lastName.charAt(0)}
                    </Text>
                </View>
                <View style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: 0,
                    height: "100%",
                    width: "60vw%",
                    backgroundColor:theme.cardBackground,
                    transform: [{ translateX: 20 }],
                    overflow: "visible",
                }}>
                    <View style={styles.names}>
                        <Text style={{
                            fontWeight: "500",
                            fontSize: 17,
                            color:theme.colorName,
                             flexWrap: 'wrap'
                        }}>
                            {props.firstName} {props.lastName}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
   picture: {
        justifyContent: "center",
        alignItems: "center",
        transform: [{ translateX: -10 }],
    },


    names: {
        width: "100vw%",
        display: "flex",
        justifyContent: "center",
    },
});
