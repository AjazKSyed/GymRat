import React, { Component, useRef, useEffect, useState, useCallback, useContext } from "react";
import { Avatar, Overlay, Icon, Header} from 'react-native-elements';
import { TouchableOpacity,Dimensions, ActivityIndicator, StyleSheet, SafeAreaView, Button, Image, ScrollView, FlatList, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Paragraph,
  Checkbox,
  Colors,
} from 'react-native-paper';
 import Svg, { Circle, SvgCss, Ellipse,G,TSpan,TextPath,Path,Polygon,Polyline,Line,Rect,Use,Symbol,Defs,LinearGradient,RadialGradient,Stop,ClipPath,Pattern,Mask,} from 'react-native-svg';
import { useTheme } from '@react-navigation/native';

import InterestCheck from '../Discovery/Components/InterestCheck'
import RBSheet from "react-native-raw-bottom-sheet";
import { ThemeContext} from '../../Contexts/theme-context';
import Slider from '@react-native-community/slider';
import * as loc from 'expo-location';
// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //
import { useNavigation } from "@react-navigation/native";
const window = Dimensions.get("window");

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const DiscoveryNavigationDrawerHeader = (props) => {
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);
  const [filled, setFilled] = useState(false);
  const ogVals = props.ogVals;
  const i_set = new Set();
  const refRBSheet = useRef();
  const [isCleared, setCleared] = useState(false);
  const [allInterests, setAllInterests] = useState([]);
    const navigation = useNavigation();
  const [DistanceValue, setDistanceValue] = useState(15);
  const [dimensions, setDimensions] = useState({ window });
  useEffect(()=>{
    axios.get('http://' + ip_address + '/v1/interests/')
      .then(res=> {setAllInterests(res.data)})
      .catch(err=>console.log('get all interests'+ err));

       const subscription = Dimensions.addEventListener(
      "change",
      ({ window }) => {
        setDimensions({ window });
      }
    );
    return () => subscription?.remove();
  },[]);

const RendallInterests = (interest) => (
    <InterestCheck
      interestName={interest.item.interestName}
      horizontal={false}
      id={interest.item.id}
      i_set={i_set}
      setCleared={setCleared}
      isCleared={isCleared}
    />
  )

  const handleFilteredPress = () => {
    var interests_sheet = '';
    for (const item of i_set) { interests_sheet+=item +','; }
    console.log('[' + interests_sheet.slice(0,-1) + ']');

    var form_details = {
      'interests': '[' + interests_sheet.slice(0,-1) + ']',
      'userId': props.currentId,
      'userLat': props.latitude,
      'userLong': props.longitude,
      'prefDist': DistanceValue,
      'offset': 0
    };
    var formBody = [];
    for (var property in form_details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(form_details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

      props.setLoading(true);
      fetch('http://' + ip_address + '/v1/user_interests/getUsersByInterestId/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      })
      .then((response) => response.json())
      .then((json) => props.setData(json))
      .catch((error) => console.error(error))
      .finally(() => {
          props.setLoading(false);
        }
      );
  }
    console.log("**************");
  const handleClear = () => {
    props.setData(ogVals);
    props.setCount(props.f_count + 1);
    i_set.clear();
    setCleared(true);
  }
  console.log();


   return (
    <View style={{flexDirection: 'row', }}>
    <View style={{paddingRight: "10%"}}>
      <TouchableOpacity
          style={{
              height: 27,
              width:30,
              transform: [{ translateY: "5%" }],

              alignItems: 'flex-end',
              elevation: 3,
          }}
          onPress={() => navigation.navigate("SearchDiscover")}
        >



        {/* !!!! translate svg sizes to adaptive sieze !!!! */}

            <Svg width="30" height="27" >

            <Mask id="path-1-inside-1_834_1418" fill="white">
              <Path d="M3.19422 0C2.34706 0 1.5346 0.336534 0.935566 0.935567C0.336533 1.5346 0 2.34706 0 3.19422V19.5203C0 19.9397 0.0826211 20.3551 0.243146 20.7426C0.403671 21.1302 0.638955 21.4823 0.935566 21.7789C1.23218 22.0755 1.58431 22.3108 1.97185 22.4713C2.35939 22.6319 2.77475 22.7145 3.19422 22.7145H14.5614C14.0336 22.0756 13.6109 21.3568 13.3093 20.585H3.19422C2.91184 20.585 2.64102 20.4728 2.44134 20.2731C2.24166 20.0735 2.12948 19.8026 2.12948 19.5203V3.19422C2.12948 2.91184 2.24166 2.64102 2.44134 2.44134C2.64102 2.24166 2.91184 2.12948 3.19422 2.12948H25.1989C25.4813 2.12948 25.7521 2.24166 25.9518 2.44134C26.1514 2.64102 26.2636 2.91184 26.2636 3.19422V12.3865C27.5839 13.7848 28.3931 15.6716 28.3931 17.7457V3.19422C28.3931 2.34706 28.0566 1.5346 27.4575 0.935567C26.8585 0.336534 26.046 0 25.1989 0H3.19422ZM25.7923 21.4467C26.7205 20.1412 27.1244 18.5345 26.9239 16.9452C26.7233 15.3559 25.9331 13.9 24.7096 12.8659C23.4862 11.8318 21.919 11.2951 20.3185 11.3621C18.718 11.4291 17.2011 12.0949 16.0683 13.2276C14.9356 14.3603 14.2698 15.8773 14.2028 17.4777C14.1358 19.0782 14.6725 20.6455 15.7066 21.8689C16.7407 23.0923 18.1967 23.8826 19.786 24.0831C21.3753 24.2837 22.9819 23.8798 24.2875 22.9516L27.9956 26.6611C28.0931 26.7657 28.2106 26.8496 28.3412 26.9078C28.4718 26.966 28.6128 26.9973 28.7558 26.9998C28.8988 27.0024 29.0408 26.9761 29.1733 26.9225C29.3059 26.869 29.4263 26.7893 29.5275 26.6881C29.6286 26.587 29.7083 26.4666 29.7618 26.334C29.8154 26.2014 29.8417 26.0594 29.8391 25.9165C29.8366 25.7735 29.8053 25.6325 29.7471 25.5019C29.6889 25.3713 29.605 25.2538 29.5004 25.1563L25.7923 21.4467ZM24.844 17.7457C24.844 18.8752 24.3952 19.9585 23.5965 20.7572C22.7978 21.5559 21.7145 22.0047 20.585 22.0047C19.4554 22.0047 18.3722 21.5559 17.5735 20.7572C16.7747 19.9585 16.326 18.8752 16.326 17.7457C16.326 16.6161 16.7747 15.5329 17.5735 14.7341C18.3722 13.9354 19.4554 13.4867 20.585 13.4867C21.7145 13.4867 22.7978 13.9354 23.5965 14.7341C24.3952 15.5329 24.844 16.6161 24.844 17.7457Z"/>
            </Mask>
            <Path d="M3.19422 0L3.19422 -2.83931L3.19422 0ZM0 3.19422H-2.83931H0ZM3.19422 22.7145V25.5538V22.7145ZM14.5614 22.7145V25.5538H20.5903L16.7503 20.906L14.5614 22.7145ZM13.3093 20.585L15.9538 19.5514L15.248 17.7457H13.3093V20.585ZM3.19422 2.12948L3.19422 -0.709827L3.19422 2.12948ZM26.2636 12.3865H23.4243V13.5151L24.1991 14.3357L26.2636 12.3865ZM28.3931 3.19422L31.2324 3.19422L28.3931 3.19422ZM25.7923 21.4467L23.4782 19.8015L22.0879 21.757L23.7842 23.454L25.7923 21.4467ZM24.2875 22.9516L26.2955 20.9442L24.5985 19.2466L22.6422 20.6375L24.2875 22.9516ZM27.9956 26.6611L30.0729 24.7255L30.0389 24.689L30.0037 24.6538L27.9956 26.6611ZM29.5004 25.1563L27.4924 27.1636L27.528 27.1992L27.5648 27.2336L29.5004 25.1563ZM24.844 17.7457H27.6833H24.844ZM20.585 22.0047L20.585 24.844L20.585 22.0047ZM20.585 13.4867L20.585 10.6474L20.585 13.4867ZM3.19422 -2.83931C1.59403 -2.83931 0.0593777 -2.20364 -1.07213 -1.07213L2.94326 2.94326C3.00982 2.8767 3.1001 2.83931 3.19422 2.83931L3.19422 -2.83931ZM-1.07213 -1.07213C-2.20364 0.0593784 -2.83931 1.59403 -2.83931 3.19422L2.83931 3.19422C2.83931 3.10009 2.8767 3.00982 2.94326 2.94326L-1.07213 -1.07213ZM-2.83931 3.19422V19.5203H2.83931V3.19422H-2.83931ZM-2.83931 19.5203C-2.83931 20.3126 -2.68325 21.0972 -2.38003 21.8292L2.86633 19.6561C2.84849 19.613 2.83931 19.5669
             2.83931 19.5203H-2.83931ZM-2.38003 21.8292C-2.07682 22.5612 -1.63239 23.2263 -1.07213 23.7866L2.94326 19.7712C2.9103 19.7383 2.88416 19.6991 2.86633 19.6561L-2.38003 21.8292ZM-1.07213 23.7866C-0.511867 24.3469 0.153264 24.7913 0.88529 25.0945L3.0584 19.8482C3.01535 19.8303 2.97622 19.8042 2.94326 19.7712L-1.07213 23.7866ZM0.88529 25.0945C1.61732 25.3977 2.40189 25.5538 3.19422 25.5538L3.19422 19.8752C3.14761 19.8752 3.10146 19.866 3.0584 19.8482L0.88529 25.0945ZM3.19422 25.5538H14.5614V19.8752H3.19422V25.5538ZM16.7503 20.906C16.4145 20.4996 16.1457 20.0424 15.9538 19.5514L10.6648 21.6185C11.0762 22.6712 11.6527 23.6516 12.3725 24.5229L16.7503 20.906ZM13.3093 17.7457H3.19422V23.4243H13.3093V17.7457ZM3.19422 17.7457C3.66486 17.7457 4.11623 17.9326 4.44903 18.2654L0.433642 22.2808C1.1658 23.013 2.15881 23.4243 3.19422 23.4243V17.7457ZM4.44903 18.2654C4.78183 18.5982 4.96879 19.0496 4.96879 19.5203H-0.709827C-0.709827 20.5557 -0.298511 21.5487 0.433642 22.2808L4.44903 18.2654ZM4.96879 19.5203V3.19422H-0.709827V19.5203H4.96879ZM4.96879 3.19422C4.96879 3.66487 4.78183 4.11624 4.44903 4.44903L0.433642 0.433642C-0.29851 1.16579 -0.709827 2.15881 -0.709827 3.19422H4.96879ZM4.44903 4.44903C4.11624 4.78183 3.66487 4.96879 3.19422 4.96879L3.19422 -0.709827C2.15881 -0.709827 1.16579 -0.29851 0.433642 0.433642L4.44903 4.44903ZM3.19422
              4.96879H25.1989V-0.709827H3.19422V4.96879ZM25.1989 4.96879C24.7282 4.96879 24.2769 4.78183 23.9441 4.44903L27.9595 0.433642C27.2273 -0.298511 26.2343 -0.709827 25.1989 -0.709827V4.96879ZM23.9441 4.44903C23.6113 4.11623 23.4243 3.66486 23.4243 3.19422H29.1029C29.1029 2.15881 28.6916 1.1658 27.9595 0.433642L23.9441 4.44903ZM23.4243 3.19422V12.3865H29.1029V3.19422H23.4243ZM24.1991 14.3357C25.0414 15.2278 25.5538 16.4245 25.5538 17.7457H31.2324C31.2324 14.9187 30.1264 12.3419 28.3281 10.4373L24.1991 14.3357ZM31.2324 17.7457V3.19422H25.5538V17.7457H31.2324ZM31.2324 3.19422C31.2324 1.59403 30.5967 0.0593778 29.4652 -1.07213L25.4498 2.94326C25.5164 3.00982 25.5538 3.1001 25.5538 3.19422L31.2324 3.19422ZM29.4652 -1.07213C28.3337 -2.20363 26.7991 -2.83931 25.1989 -2.83931V2.83931C25.293 2.83931 25.3833 2.8767 25.4498 2.94326L29.4652 -1.07213ZM25.1989 -2.83931H3.19422V2.83931H25.1989V-2.83931ZM28.1063 23.092C29.4471 21.2062 30.0305 18.8855 29.7408 16.5898L24.1069 17.3007C24.2183 18.1836 23.9939 19.0762 23.4782 19.8015L28.1063 23.092ZM29.7408 16.5898C29.4512 14.2942 28.3097 12.1911 26.5425 10.6974L22.8768 15.0344C23.5564 15.6088 23.9955 16.4177 24.1069 17.3007L29.7408 16.5898ZM26.5425 10.6974C24.7754 9.20375 22.5116 8.42848 20.1997 8.52525L20.4372 14.1989C21.3264 14.1617 22.1971 14.4599 22.8768 15.0344L26.5425 10.6974ZM20.1997 8.52525C17.8879 8.62202 15.6968 9.58378 14.0607 11.2199L18.076
              15.2353C18.7053 14.606 19.5481 14.2361 20.4372 14.1989L20.1997 8.52525ZM14.0607 11.2199C12.4245 12.8561 11.4628 15.0472 11.366 17.359L17.0396 17.5965C17.0769 16.7073 17.4468 15.8646 18.076 15.2353L14.0607 11.2199ZM11.366 17.359C11.2692 19.6708 12.0445 21.9346 13.5382 23.7018L17.8751 20.036C17.3006 19.3564 17.0024 18.4857 17.0396 17.5965L11.366 17.359ZM13.5382 23.7018C15.0318 25.4689 17.1349 26.6105 19.4305 26.9001L20.1414 21.2662C19.2584 21.1548 18.4496 20.7157 17.8751 20.036L13.5382 23.7018ZM19.4305 26.9001C21.7262 27.1897 24.0469 26.6064 25.9327 25.2656L22.6422 20.6375C21.9169 21.1532 21.0243 21.3776 20.1414 21.2662L19.4305 26.9001ZM22.2794 24.9589L25.9875 28.6684L30.0037 24.6538L26.2955 20.9442L22.2794 24.9589ZM25.9183 28.5967C26.2757 28.9803 26.7068 29.288 27.1856 29.5013L29.4968 24.3143C29.7145 24.4113 29.9104 24.5511 30.0729 24.7255L25.9183 28.5967ZM27.1856 29.5013C27.6646 29.7147 28.1815 29.8295 28.7057 29.8387L28.8059 24.161C29.0441 24.1652 29.2791 24.2173 29.4968 24.3143L27.1856 29.5013ZM28.7057 29.8387C29.2299 29.848 29.7506 29.7515 30.2367 29.5552L28.11 24.2898C28.3309 24.2006 28.5676 24.1568 28.8059 24.161L28.7057 29.8387ZM30.2367 29.5552C30.7228 29.3588 31.1644 29.0666 31.5352 28.6958L27.5198 24.6805C27.6883 24.5119 27.889 24.3791 28.11 24.2898L30.2367 29.5552ZM31.5352 28.6958C31.9059 28.3251 32.1981 27.8835 32.3945 27.3974L27.1292 25.2706C27.2184 25.0497 27.3513 24.849 27.5198 24.6805L31.5352 28.6958ZM32.3945 27.3974C32.5908 26.9113 32.6873 26.3906 32.678 25.8664L27.0003 25.9666C26.9961 25.7283 27.0399 25.4916 27.1292 25.2706L32.3945 27.3974ZM32.678 25.8664C32.6688 25.3422 32.554 24.8252 32.3406 24.3463L27.1536 26.6575C27.0566 26.4398 27.0045 26.2048 27.0003 25.9666L32.678 25.8664ZM32.3406 24.3463C32.1273 23.8674 31.8196 23.4364 31.436 23.079L27.5648 27.2336C27.3905 27.0711 27.2506 26.8752 27.1536 26.6575L32.3406 24.3463ZM31.5085 23.149L27.8004 19.4394L23.7842 23.454L27.4924 27.1636L31.5085 23.149ZM22.0047 17.7457C22.0047 18.1222 21.8551 18.4833 21.5888 18.7495L25.6042 22.7649C26.9354 21.4337
               27.6833 19.6283 27.6833 17.7457L22.0047 17.7457ZM21.5888 18.7495C21.3226 19.0158 20.9615 19.1653 20.585 19.1653L20.585 24.844C22.4676 24.844 24.273 24.0961 25.6042 22.7649L21.5888 18.7495ZM20.585 19.1653C20.2085 19.1653 19.8474 19.0158 19.5811 18.7495L15.5658 22.7649C16.8969 24.0961 18.7024 24.844 20.585 24.844L20.585 19.1653ZM19.5811 18.7495C19.3149 18.4833 19.1653 18.1222 19.1653 17.7457H13.4867C13.4867 19.6283 14.2346 21.4337 15.5658 22.7649L19.5811 18.7495ZM19.1653 17.7457C19.1653 17.3692 19.3149 17.0081 19.5811 16.7418L15.5658 12.7264C14.2346 14.0576 13.4867 15.8631 13.4867 17.7457H19.1653ZM19.5811 16.7418C19.8474 16.4756 20.2085 16.326 20.585 16.326L20.585 10.6474C18.7024 10.6474 16.8969 11.3953 15.5658 12.7264L19.5811 16.7418ZM20.585 16.326C20.9615 16.326 21.3226 16.4756 21.5888 16.7418L25.6042 12.7264C24.273 11.3953 22.4676 10.6474 20.585 10.6474V16.326ZM21.5888 16.7418C21.8551 17.0081 22.0047 17.3692 22.0047 17.7457H27.6833C27.6833 15.8631 26.9354 14.0576 25.6042 12.7264L21.5888 16.7418Z"
             fill={theme.search1} mask="url(#path-1-inside-1_834_1418)"/>
           <Defs>
            <LinearGradient id="paint0_linear_834_1414" x1="1.47892" y1="13.5" x2="29.8393" y2="13.5" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FFFFFF"/>
            <Stop offset="0.760417" stopColor="#FFFFFF"/>
            </LinearGradient>
            </Defs>

            <Defs>
            <LinearGradient id="paint0_linear_834_1415" x1="1.47892" y1="13.5" x2="29.8393" y2="13.5" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#1E0C41"/>
            <Stop offset="0.760417" stopColor="#1E0C41"/>
            </LinearGradient>
            </Defs>

            <Defs>
            <LinearGradient id="paint0_linear_834_1416" x1="1.47892" y1="13.5" x2="29.8393" y2="13.5" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#C22E83"/>
            <Stop offset="0.760417" stopColor="#8027A1"/>
            </LinearGradient>
            </Defs>
                       <Defs>
            <LinearGradient id="paint0_linear_834_1417" x1="1.47892" y1="13.5" x2="29.8393" y2="13.5" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#0C9DCB"/>
            <Stop offset="0.760417" stopColor="#26B9CD"/>
            </LinearGradient>
            </Defs>
            </Svg>

        </TouchableOpacity>
    </View>
    <View>

      <TouchableOpacity
          style={{
            shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              paddingRight: "20%",
              transform: [{ translateY: "5%" }],
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
          }}
          onPress={() => {
            refRBSheet.current.open();
          }}
        >

        <Svg width="27" height="27" viewBox="0 0 27 27" fill="none">
          <Path d="M6.46602 8.26766C4.24849 5.95955 2.04192 3.57414 1.24384 1H25.8672C25.6265 1.95622 25.0711 3.03164 24.2856 4.19256C23.4487 5.42948 22.3995 6.69363 21.3197 7.9331C20.9435 8.36486 20.5598 8.79786 20.1813 9.22499C19.4923 10.0025 18.8205 10.7605 18.243 11.4563C17.3645 12.5148 16.5698 13.582 16.2283 14.5206C16.1443 14.7514 16.122 14.9694 16.122 15.1507V25.0936C16.122 25.0938 16.122 25.094 16.122 25.0942C16.1218 25.0942 16.1217 25.0943 16.1215 25.0944L10.878 21.4752L10.878 15.0216C10.9264 13.7954 10.2516 12.6248 9.47145 11.5994C8.71843 10.6096 7.71084 9.562 6.69345 8.50421C6.61767 8.42541 6.54182 8.34655 6.46602 8.26766Z"
          fill={theme.backgroundColor} stroke={theme.filterBorder} strokeWidth="2"/>
          <Defs>
            <LinearGradient id="paint1_linear_683_1390" x1="1.33819" y1="13.5" x2="27" y2="13.5" gradientUnits="userSpaceOnUse">
              <Stop stopColor="white"/>
              <Stop offset="1" stopColor="white"/>
            </LinearGradient>
          </Defs>

          <Defs>
            <LinearGradient id="paint1_linear_683_1391" x1="1.33819" y1="13.5" x2="27" y2="13.5" gradientUnits="userSpaceOnUse">
              <Stop stopColor="#1E0C41"/>
              <Stop offset="1" stopColor="#1E0C41"/>
            </LinearGradient>
          </Defs>

          <Defs>
            <LinearGradient id="paint1_linear_683_1392" x1="1.33819" y1="13.5" x2="27" y2="13.5" gradientUnits="userSpaceOnUse">
              <Stop stopColor="#C22E83"/>
              <Stop offset="1" stopColor="#8027A1"/>
            </LinearGradient>
          </Defs>

          <Defs>
            <LinearGradient id="paint1_linear_683_1393" x1="1.33819" y1="13.5" x2="27" y2="13.5" gradientUnits="userSpaceOnUse">
              <Stop stopColor="#0C9DCB"/>
            <Stop offset="0.760417" stopColor="#26B9CD"/>
            </LinearGradient>
          </Defs>
        </Svg>
        </TouchableOpacity>
          <RBSheet
          animationType="slide"
          ref={refRBSheet}
          closeOnPressMask={true}
          onOpen={()=> setFilled(true)}
          onClose={()=> {
              setFilled(false);
          }}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent"
            },
            container: {
              height: "45%",
              backgroundColor:theme.bottomModalBack,
            }
          }}
        >

        <View style={{
          flex: 1,
          paddingHorizontal: 8,
          backgroundColor:theme.bottomModalBack,
        }}>
         <Text style = {{color: theme.settingsGeneral, fontSize: 17, textAlign: "left", paddingHorizontal: "2%", fontWeight: "600", paddingTop: "5%", paddingBottom: "4%", }}>Select Distance</Text>
                          <View style={{ paddingHorizontal: "2%", }}>
 <Text style = {{color: theme.settingsText, fontSize: 15,textAlign: "left", }}>
                 Value of distance: {Math.round(DistanceValue / 1.609)} mi
                 </Text>

        {/*Slider with max, min, step and initial value*/}
        <Slider
          maximumValue={65}
          minimumValue={0}
          minimumTrackTintColor={theme.sliderMin}
          maximumTrackTintColor={theme.sliderMax}
          step={1}
          style={{width: (.871 * dimensions.window.width),opacity: 1,height: 50, marginRight: "2%", marginTop: '3%',}}
          value={DistanceValue}
          onValueChange={
            (DistanceValue) => setDistanceValue(DistanceValue)
          }
           onSlidingComplete={(DistanceValue) => setDistanceValue(DistanceValue)}
        />
            </View>
                    <View style={{borderWidth: 1, borderColor:theme.cardBackground, marginHorizontal:"1%", marginVertical: "5%"}} />

        <View style={{
          flexDirection:'row',
           height:"50%",
         }}>

            <FlatList
              data = {allInterests}
              keyExtractor= {(item) => item.id.toString()}
              renderItem = {RendallInterests}
              showsVerticalScrollIndicator={false}
            />

          <View style={{flex:1, flexDirection:'column', justifyContent: 'space-evenly', alignItems: 'flex-end', paddingRight: '7%'}}>
              <TouchableOpacity
                style={{
                  width:75,
                  height: 65,
                  borderRadius: 5,
                  backgroundColor:theme.filterButtonColor,
                  justifyContent: 'center',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
              }}
                onPress={handleFilteredPress}
              >
              <Text style={{color:theme.filterTextColor, alignSelf:'center'}}>Filter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                 width:75,
                  height: 65,
                  borderRadius: 5,
                  backgroundColor:theme.resetButtonColor,
                  justifyContent: 'center',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
              }}
                onPress={handleClear}>
               <Text style={{color:theme.resetTextColor,alignSelf:'center'}}>Reset</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
        </RBSheet>
    </View>
        </View>

  );
};
export default DiscoveryNavigationDrawerHeader;