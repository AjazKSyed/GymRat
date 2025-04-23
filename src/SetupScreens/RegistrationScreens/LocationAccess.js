import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import { StyleSheet, TextInput, SafeAreaView, Alert, FlatList,View, useWindowDimensions, Text,Pressable, Modal, ActivityIndicator, Image, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView, Appearance } from 'react-native';
import axios from 'axios';
import "react-native-gesture-handler";
import Back from '../../Tabs/Navigation/Back';
import { Avatar, Overlay, Button, Header} from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import GradientButton from 'react-native-gradient-buttons';
import * as Location from 'expo-location';
import Loader from '../../Tabs/Navigation/Loader.js';
import Svg, { Rect } from "react-native-svg";
import LocationSVG from './Components/LocationSVG'

import { ThemeContext } from '../../Contexts/theme-context';
import { useRegistrationState, useRegistrationDispatch } from '../../Contexts/RegistrationContext';

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //
const LocationAccess = () => {
  const navigation = useNavigation();
  const { dark, sport, deep, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
  const { height, width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);

  const dispatch = useRegistrationDispatch();
  const {longitude, latitude,  } = useRegistrationState();
  const handleSubmitPress = () => {
      // console.log(longitude);
      // console.log(latitude);

        if (!latitude) {
            alert("Please allow location services");
            return;
        }
      navigation.navigate('ProfilePhoto');
  };



  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
        dispatch({type:'update', value:"longitude",data:location.coords.longitude});
        dispatch({type:'update', value:"latitude",data:location.coords.latitude});
    })();
  }, []);
      // console.log(longitude);
      // console.log(latitude);

  return (
    <View style={{backgroundColor:theme.splash,flex: 1}}>
    <Header
      barStyle= {theme.barColor}
      centerComponent={{text: 'Location Services', style: { color:theme.colorName , fontWeight: '600', fontSize: 25, paddingTop: "1%"} }}
      containerStyle={{
        backgroundColor:"transparent",
        borderBottomWidth:0,
        paddingVertical: 20,
      }}
      leftComponent={<Back navigationProps={navigation}/>}

    />


           <View style={{ alignItems:'center'}}>

 <Text style={{
        paddingHorizontal: '10%',
                width: '95%',
                color: theme.colorText,
                fontSize: 20,
                fontWeight: '500',
                textAlign: "left",
                paddingBottom: '2%',
                lineHeight: 26,
              }}>We need to access your location.</Text>


      <Text style={{
        paddingHorizontal: '10%',
                width: '95%',
                color: theme.colorText,
                fontSize: 15,
                fontWeight: '400',
                textAlign: "left",
                lineHeight: 22,
                paddingBottom: '10%'
              }}>Your location helps our system to map down possible users new you!</Text>

    <LocationSVG/>

</View>
              <View style={{marginVertical: '26.3%',  alignItems:'center'}}>
          <GradientButton
              style={{
                    marginTop: "2%",
                    marginBottom: '3%',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                        },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
              gradientBegin= {theme.updateButtonL}
              gradientEnd={theme.updateButtonR}
              gradientDirection="diagonal"
              height={0.06 * height}
              width={0.8 * width}
              radius={8}
              textStyle={{textAlign: 'center', color: '#FFFFFF',fontSize: 17, fontWeight: "500"}}
              onPressAction={handleSubmitPress}
              >
              CONTINUE
              </GradientButton>
<View style ={{paddingTop: "7.5%"}}>
      <Svg
    width={width}
    height={4}
    viewBox="0 0 290 4"
  >
          <Rect x={261} width={0.07 * width} height={4} rx={2} fill={theme.inactiveTabProg} />
          <Rect x={228} width={0.07 * width} height={4} rx={2} fill={theme.inactiveTabProg} />
          <Rect x={195} width={0.07 * width} height={4} rx={2} fill={theme.inactiveTabProg} />
          <Rect x={163} width={0.07 * width} height={4} rx={2} fill={theme.inactiveTabProg} />
          <Rect x={131} width={0.07 * width} height={4} rx={2} fill={theme.inactiveTabProg} />
          <Rect x={98} width={0.07 * width} height={4} rx={2} fill={theme.inactiveTabProg} />
          <Rect x={65} width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
          <Rect x={32} width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
          <Rect  width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
        </Svg>
      </View>
              </View>

    </View>

  );
}

export default LocationAccess;