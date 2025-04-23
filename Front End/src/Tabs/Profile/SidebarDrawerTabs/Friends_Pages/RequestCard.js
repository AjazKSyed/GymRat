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



export default function RequestCard(props) {
    const navigation = useNavigation();
    const updateUrl = 'http://' + ip_address + '/v1/user_friends/' + JSON.stringify(props.listUserId) + "/" +JSON.stringify(props.listId) ;
    const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
    const isAllowed = props.sentId !== props.listUserId;

  const handleOnPressYes = () => {
    console.log('APPROVED');
        fetch(updateUrl, {
            method: "PUT",
            body: JSON.stringify({
                status: "APPROVED"
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
  }

 const handleOnPressNo = () => {
        console.log('DENIED');
        fetch(updateUrl, {
            method: "PUT",
            body: JSON.stringify({
                status: "DENIED"
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
  }

  const handleCurrentRemoval = () => {
        console.log('Cancelled');
        fetch(updateUrl, {
            method: "DELETE",
            body: JSON.stringify({
              userId: props.listUserId,
              friendUserId: props.listId
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
  }
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
                    navigation.navigate("RequestProfile", { itemId: props.listId })
                }
            >

                <View style={styles.picture}>
                    <Svg  width="60" height="60">
                    <Rect width="60" height="60" rx="30" fill={theme.cardAvatarBorder}/>
                    <Path d="M29.5005 54.0864C43.0792 54.0864 54.0869 43.0787 54.0869 29.5C54.0869 15.9213 43.0792 4.91357 29.5005 4.91357C15.9218 4.91357 4.91406 15.9213 4.91406 29.5C4.91406 43.0787 15.9218 54.0864 29.5005 54.0864Z" fill={theme.cardAvatarBackground}/>
                    <Defs>
                        <LinearGradient id="paint0_linear_834_1398" x1="-0.228726" y1="25.4446" x2="86.4758" y2="26.0076" gradientUnits="userSpaceOnUse">
                        <Stop offset="0.020991" stopColor="#24292E"/>
                        <Stop offset="1" stopColor="#530AB1"/>
                        </LinearGradient>
                        <LinearGradient id="paint1_linear_834_1398" x1="29.9992" y1="4.99707" x2="29.9992" y2="55.0033" gradientUnits="userSpaceOnUse">
                        <Stop offset="0.0001" stopColor="#FFFFFF"/>
                        <Stop offset="1" stopColor="#FFFFFF"/>
                        </LinearGradient>
                    </Defs>
                    <Defs>
                        <LinearGradient id="paint0_linear_835_1398"  x1="39.4112" y1="15.7645" x2="6.7562" y2="54.0496" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#A27ED0"/>
                        <Stop offset="1" stopColor="#530AB1"/>
                        </LinearGradient>
                        <LinearGradient id="paint1_linear_835_1398" x1="48.4187" y1="7.88204" x2="9.00759" y2="55.1754" gradientUnits="userSpaceOnUse">
                        <Stop offset="0.0001" stopColor="#222222"/>
                        <Stop offset="1" stopColor="#222222"/>
                        </LinearGradient>
                    </Defs>
                    <Defs>
                        <LinearGradient id="paint0_linear_836_1398" x1="-0.228726" y1="25.4446" x2="86.4758" y2="26.0076" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#FFA192"/>
                        <Stop offset="1" stopColor="#FD1892"/>
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
                        color: theme.requestColorName,
                        fontSize:22,
                        fontWeight: '500',
                      }}
                    >
                      {props.firstName.charAt(0) + props.lastName.charAt(0)}
                    </Text>
                </View>

                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    padding:0,
                    height: "100%",
                    width: "60vw%",
                    backgroundColor:theme.cardBackground,
                    overflow: "visible",
                }}>
                    <View style={styles.names}>
                        <Text style={{
                            fontWeight: "500",
                            fontSize: 17,
                            width: "65%",
                            color:theme.colorName,
                            paddingRight:"5%"

                        }}>
                            {props.firstName} {props.lastName}
                        </Text>

                <View style={{flexDirection:'row'}}>
                    {isAllowed ? <TouchableOpacity onPress={handleOnPressYes} >
                    <Svg width="37" height="37" viewBox="0 0 37 37" fill="none">
                            <Rect width="37" height="37" rx="18.5" fill={theme.approveBack}/>
                            <Path d="M25.1055 13.5453L15.8555 23.4561L11.2305 19.1614" stroke={sport ? theme.backgroundColor : "white"} strokeWidth="1.67505" strokeLinecap="round"/>
                    </Svg>
                    </TouchableOpacity>
                    :
                    <Svg width="37" height="37" viewBox="0 0 37 37" fill="none">
                            <Rect width="37" height="37" rx="18.5" fill={theme.cardBackground}/>
                            <Path d="M25.1055 13.5453L15.8555 23.4561L11.2305 19.1614" stroke={theme.cardBackground} strokeWidth="1.67505" strokeLinecap="round"/>
                    </Svg>}
                    {isAllowed ? <TouchableOpacity
                                style={{
                                    paddingLeft: "5%",
                                }}
                                onPress={() =>
                                    navigation.navigate("Profile", { itemId: props.listId })
                                }
                                onPress={ handleOnPressNo  }
                            >

                            <Svg width="37" height="37" viewBox="0 0 37 37" fill="none">
                                    <Rect width="37" height="37" rx="18.5" fill={theme.rejectBack}/>
                                    <Path d="M22.4637 22.4637L18.4994 18.4994M18.4994 18.4994L14.5352 22.4637M18.4994 18.4994L14.5352 14.5352M18.4994 18.4994L22.4637 14.5352" stroke={sport ? theme.backgroundColor : "white"} strokeWidth="1.67505" strokeLinecap="round"/>
                            </Svg>
                        </TouchableOpacity>

                    :
                    <TouchableOpacity
                                style={{
                                    paddingLeft: "5%",
                                }}
                                onPress={() =>
                                    navigation.navigate("Profile", { itemId: props.listId })
                                }
                                onPress={ handleCurrentRemoval  }
                            >

                            <Svg width="37" height="37" viewBox="0 0 37 37" fill="none">
                                    <Rect width="37" height="37" rx="18.5" fill={theme.deleteBack}/>
                                    <Path d="M22.4637 22.4637L18.4994 18.4994M18.4994 18.4994L14.5352 22.4637M18.4994 18.4994L14.5352 14.5352M18.4994 18.4994L22.4637 14.5352" stroke={sport ? theme.backgroundColor : "white"} strokeWidth="1.67505" strokeLinecap="round"/>
                            </Svg>
                        </TouchableOpacity>
}



                    </View>
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
        justifyContent: "space-between",
        flex: 1,flexDirection:'row',  alignItems:'center',
    },
});
