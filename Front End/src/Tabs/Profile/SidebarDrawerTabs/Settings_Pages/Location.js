// Import React
import { Switch,TouchableOpacity,Dimensions, Modal, ActivityIndicator, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View , Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

import "react-native-gesture-handler";
import Back from '../../../Navigation/Back';
import { Avatar, Overlay, Header} from "react-native-elements";
import { ThemeContext } from './../../../../Contexts/theme-context';
import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import Svg, {
  Circle,
  SvgCss,
  Ellipse,
  G,
  TSpan,
  TextPath,
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
import Slider from '@react-native-community/slider';
import * as loc from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //
const window = Dimensions.get("window");


const Location = () => {
  const navigation = useNavigation();
  const [filled, setFilled] = useState(false);
  const { dark, sport, deep, theme, toggle, sportToggle, deepToggle, setSport} = useContext(ThemeContext);
  const [DistanceValue, setDistanceValue] = useState(15);
  const [dimensions, setDimensions] = useState({ window });
  const [id, setId] = useState();
    const [loading, setLoading] = useState(false);
   const [latitude, setLatitude] = useState(null); // users current lat
  const [longitude, setLongitude] = useState(null);
    const [located, setLocating] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    locateMe();
  }

  useEffect(() => {
     AsyncStorage.getItem("userId").then((id) => {
            if (id) {
                setId(id);
            }
        });
         AsyncStorage.getItem("longitude").then((longitude) => {
            if (longitude) {
                setLongitude(longitude);
            }
        });
         AsyncStorage.getItem("latitude").then((latitude) => {
            if (latitude) {
                setLatitude(latitude);
            }
        });
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window }) => {
        setDimensions({ window });
      }
    );
    return () => subscription?.remove();
  });
  const locateMe = () => {
    (async () => {
      let { status } = await loc.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let locMine = await loc.getCurrentPositionAsync({});
      if(locMine != null) {
        setLatitude(locMine.coords.latitude);
        setLongitude(locMine.coords.longitude);
        setLocating(true);
      }
    })();
  };

  const handleChangeDistance = () => {
        fetch("http://"+ ip_address + "/v1/users/" + id, {
            method: "PUT",
            body: JSON.stringify({
                distance: DistanceValue
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                //Hide Loader
                setLoading(false);
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };
const putLocation = () => {
        fetch("http://"+ ip_address + "/v1/users/" + id, {
            method: "PUT",
            body: JSON.stringify({
                latitude: latitude,
                longitude: longitude
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                //Hide Loader
             })
            .catch((error) => {
                //Hide Loader
                 console.error(error);
            });
    };
  return (
    <View style={{backgroundColor: theme.backgroundColor, flex: 1}}>
        <Header
          barStyle= {theme.barColor}
          centerComponent={{text: 'Location Services', style: { color:theme.colorName , fontWeight: '600', fontSize: 30} }}
          placement="left"
          containerStyle={{
            backgroundColor:theme.settingsHeader,
            borderBottomWidth:0,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          leftComponent={<Back navigationProps={navigation}/>}
        />
        <View style={{
          paddingTop: "4%",
          marginHorizontal: "4%",
          flexDirection: 'column',
          alignItems: 'left',
          justifyContent: 'space-evenly',
        }}>

          <Text style = {{color: theme.settingsGeneral, fontSize: 20,  textAlign: "left", paddingHorizontal: "2%",fontWeight: "600", paddingTop: "4%"  }}>
          Find Location</Text>
          <View style={{
          paddingTop: "4%",
          flexDirection: 'row',
          alignItems:'center',paddingBottom: "3%",
          justifyContent: 'space-evenly',
        }}>
        <Text style={{color: theme.settingsText, fontSize: 15, textAlign: "left", paddingHorizontal: "2%", fontWeight: "400", paddingTop: "4%", paddingBottom: "4%", }}>In a new area?{`\n`}Relocate youself</Text>
        <Switch
                 trackColor={{ false: theme.settingsSwitchOff, true: theme.settingsSwitchOn}}
                 thumbColor={'white'}
                 onValueChange={toggleSwitch}
                value={isEnabled}/>
      </View>

          <Text style = {{color: theme.settingsGeneral, fontSize: 20, textAlign: "left", paddingHorizontal: "2%", fontWeight: "600", paddingTop: "4%", paddingBottom: "4%", }}>Select Distance</Text>
                          <View style={{ paddingHorizontal: "2%", }}>
 <Text style = {{color: theme.settingsText, fontSize: 17,textAlign: "left", }}>
                 Value of distance: {DistanceValue} km
                 </Text>

        {/*Slider with max, min, step and initial value*/}
        <Slider
          maximumValue={30}
          minimumValue={0}
          minimumTrackTintColor={theme.sliderMin}
          maximumTrackTintColor={theme.sliderMax}
          step={1}
          style={{width: (.871 * dimensions.window.width),opacity: 1,height: 50, marginRight: "2%", marginTop: 10,}}
          value={DistanceValue}
          onValueChange={
            (DistanceValue) => setDistanceValue(DistanceValue)
          }
           onSlidingComplete={handleChangeDistance}
        />
            </View>

        </View>
      </View>

  );
};

export default Location;
/// fix locate with context