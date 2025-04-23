import {TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View} from 'react-native';
import { Avatar, Overlay, Button, Header} from "react-native-elements";
import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemeContext } from '../../Contexts/theme-context';


// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //



const FriendHeader = (props) => {
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);

  const reqUrl = 'http://' + ip_address + '/v1/user_friends/';
  const [uidNumber, setuidNumber] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [loading, setLoading] = useState(true);
  // AysncStorage call to get these parameters
  useEffect(() => {
      AsyncStorage.getItem('id').then((uidNumber) => {
          if(uidNumber){
              setuidNumber(uidNumber);
          }
      });
      AsyncStorage.getItem('fName').then((first) => {
          if(first){
            setFirst(first.replace(/['"]+/g, ''));
          }
      });
      AsyncStorage.getItem('lName').then((last) => {
          if(last){
            setLast(last.replace(/['"]+/g, ''));
          }
      });
  });

  console.log(uidNumber);
  console.log(first);
  console.log(last);
  console.log(props.itemId);
  console.log(props.firstName);
  console.log(props.lastName);

  const handleOnPress = () => {
      alert('Friend Request Sent');
        fetch(reqUrl, {
            method: "POST",
            body: JSON.stringify({
              userId: uidNumber,
              friendUserId: props.itemId,
              friend_first_name: props.firstName,
              friend_last_name: props.lastName,
              user_first_name: first,
              user_last_name: last,
              status: 'PENDING'
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
             if(!loading) {
              props.navigationProps.pop();
            }
  }
  return (
    <View>
      <TouchableOpacity
          style={{
            shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
                            paddingRight: "5%",


              elevation: 3,
          }}
                onPress={handleOnPress}

        >
        {/* !!!! translate svg sizes to adaptive sieze !!!! */}
        <Svg width="99" height="34" fill="none">
          <Rect width="99" height="34" rx="17" fill={theme.editProfileButton} />
          <Path
                    d= "M33.492 19.0282H30.2115L29.5251 21H27.9953L31.1945 12.531H32.5148L35.7198 21H34.1842L33.492 19.0282ZM30.6244 17.8416H33.079L31.8517
                     14.3284L30.6244 17.8416ZM36.284 17.8067C36.284 16.8372 36.5089 16.0598 36.9587 15.4742C37.4085 14.8848 38.0115 14.5901 38.7677 14.5901C39.4346
                      14.5901 39.9737 14.8228 40.3847 15.2881V12.0657H41.7981V21H40.5185L40.4487 20.3485C40.026 20.8604 39.4618 21.1163 38.756 21.1163C38.0193 21.1163 37.4221 20.8197 36.9645
                       20.2264C36.5108 19.6331 36.284 18.8265 36.284 17.8067ZM37.6974 17.9288C37.6974 18.5687 37.8196 19.0689 38.0639 19.4295C38.312 19.7863 38.663 19.9646 39.1167 19.9646C39.6945
                        19.9646 40.1171 19.7068 40.3847 19.191V16.5038C40.1249 15.9997 39.7061 15.7476 39.1283 15.7476C38.6707 15.7476 38.3179 15.9299 38.0697 16.2944C37.8215 16.655 37.6974 17.1998
                         37.6974 17.9288ZM43.008 17.8067C43.008 16.8372 43.2329 16.0598 43.6827 15.4742C44.1325 14.8848 44.7355 14.5901 45.4917 14.5901C46.1586 14.5901 46.6977 14.8228 47.1087
                          15.2881V12.0657H48.5221V21H47.2425L47.1727 20.3485C46.75 20.8604 46.1858 21.1163 45.48 21.1163C44.7433 21.1163 44.1461 20.8197 43.6885 20.2264C43.2348 19.6331 43.008
                           18.8265 43.008 17.8067ZM44.4214 17.9288C44.4214 18.5687 44.5436 19.0689 44.7879 19.4295C45.036 19.7863 45.387 19.9646 45.8407 19.9646C46.4185 19.9646 46.8411 19.7068
                            47.1087 19.191V16.5038C46.8489 15.9997 46.4301 15.7476 45.8523 15.7476C45.3947 15.7476 45.0419 15.9299 44.7937 16.2944C44.5455 16.655 44.4214 17.1998 44.4214 17.9288ZM57.9799
                             17.4112H54.5714V21H53.0998V12.531H58.4802V13.7176H54.5714V16.2362H57.9799V17.4112ZM62.6565 15.9977C62.4704 15.9667 62.2784 15.9512 62.0806 15.9512C61.4331 15.9512 60.9968
                              16.1994 60.7719 16.6957V21H59.3585V14.7064H60.7079L60.7428 15.4102C61.0841 14.8635 61.5571 14.5901 62.1621 14.5901C62.3637 14.5901 62.5305 14.6172 62.6623 14.6715L62.6565 15.9977ZM65.0529 21H63.6395V14.7064H65.0529V21ZM63.5522 13.072C63.5522 12.8548 63.6201 12.6745 63.7558 12.531C63.8954 12.3875 64.0932 12.3158 64.3491 12.3158C64.605 12.3158 64.8028 12.3875 64.9424 12.531C65.082 12.6745 65.1518 12.8548 65.1518 13.072C65.1518 13.2852 65.082 13.4636 64.9424 13.6071C64.8028 13.7467 64.605 13.8165 64.3491 13.8165C64.0932 13.8165 63.8954 13.7467 63.7558 13.6071C63.6201 13.4636 63.5522 13.2852 63.5522 13.072ZM69.3688 21.1163C68.4731 21.1163 67.746 20.8352 67.1876 20.2729C66.6331 19.7068 66.3558 18.9545 66.3558 18.0161V17.8416C66.3558 17.2134 66.4761 16.6531 66.7165 16.1606C66.9608 15.6642 67.302 15.2784 67.7402 15.0031C68.1784 14.7278 68.667 14.5901 69.206 14.5901C70.063 14.5901 70.7241 14.8635 71.1894 15.4102C71.6587 15.957 71.8933 16.7306 71.8933 17.7311V18.3011H67.7809C67.8236 18.8207 67.9961 19.2318 68.2986 19.5342C68.6049 19.8367 68.9888 19.9879 69.4503 19.9879C70.0979 19.9879 70.6252 19.7262 71.0324 19.2027L71.7944 19.9297C71.5423 20.3059 71.205 20.5987 70.7823 20.8081C70.3635 21.0136 69.8923 21.1163 69.3688 21.1163ZM69.2002 15.7243C68.8124 15.7243 68.4983 15.8601 68.2579 16.1315C68.0213 16.4029 67.8701 16.781 67.8042 17.2657H70.4973V17.161C70.4662 16.688 70.3402 16.3312 70.1192 16.0908C69.8982 15.8465 69.5918 15.7243 69.2002 15.7243ZM74.3071 14.7064L74.3479 15.4335C74.8132 14.8712 75.4239 14.5901 76.1801 14.5901C77.4908 14.5901 78.1577 15.3404 78.181 16.8411V21H76.7676V16.9226C76.7676 16.5232 76.6803 16.2284 76.5058 16.0384C76.3352 15.8445 76.0541 15.7476 75.6624 15.7476C75.0924 15.7476 74.6678 16.0055 74.3886 16.5212V21H72.9751V14.7064H74.3071ZM79.3618 17.8067C79.3618 16.8372 79.5867 16.0598 80.0365 15.4742C80.4863 14.8848 81.0893 14.5901 81.8455 14.5901C82.5124 14.5901 83.0514 14.8228 83.4625 15.2881V12.0657H84.8759V21H83.5963L83.5265 20.3485C83.1038 20.8604 82.5396 21.1163 81.8338 21.1163C81.0971 21.1163 80.4999 20.8197 80.0423 20.2264C79.5886 19.6331 79.3618 18.8265 79.3618 17.8067ZM80.7752 17.9288C80.7752 18.5687 80.8974 19.0689 81.1417 19.4295C81.3898 19.7863 81.7408 19.9646 82.1945 19.9646C82.7722 19.9646 83.1949 19.7068 83.4625 19.191V16.5038C83.2027 15.9997 82.7839 15.7476 82.2061 15.7476C81.7485 15.7476 81.3956 15.9299 81.1475 16.2944C80.8993 16.655 80.7752 17.1998 80.7752 17.9288Z"
                             fill= {theme.editOutline}
                />
                <Path d="M16.7226 12.9785V16.7011M16.7226 20.4238V16.7011M16.7226 16.7011H20.4453M16.7226 16.7011H13" stroke= { theme.friendText} strokeWidth="1.48905" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>
    </View>
  );
};
export default FriendHeader;
