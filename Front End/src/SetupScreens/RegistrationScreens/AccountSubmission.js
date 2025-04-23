import React, {  createRef, FC,Component, useEffect, useState, useCallback, useContext } from "react";
import Svg, { Path, Rect, Defs, LinearGradient, RadialGradient, Stop, ClipPath, Pattern, Mask } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text,Pressable,TextInput, useWindowDimensions, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView, Button, Modal, Appearance, SafeAreaView } from "react-native";
import axios from 'axios';
import "react-native-gesture-handler";
import Back from '../../Tabs/Navigation/Back';
import { HelperText } from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GradientButton from 'react-native-gradient-buttons';
import { Avatar, Overlay, Header} from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import Loader from '../../Tabs/Navigation/Loader.js';
import Gender from './Components/Gender'


import { ThemeContext } from '../../Contexts/theme-context';
import { useRegistrationState, useRegistrationDispatch } from '../../Contexts/RegistrationContext';
import * as SecureStore from 'expo-secure-store';



// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //
const AccountSubmission = () => {
  const navigation = useNavigation();
  const { dark, sport, deep, theme} = useContext(ThemeContext);
  const { height, width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");

  const dispatch = useRegistrationDispatch();
  const {id, firstName, lastName, gender, age,
    city, _state, longitude, latitude, gym, bio,
    spotify, instagram, facebook, tiktok,
    questionOne, answerOne, questionTwo, answerTwo,
    questionThree, answerThree, profileImgPath, generalImgPath_0,
    generalImgPath_1, generalImgPath_2, generalImgPath_3, interests} = useRegistrationState();


  const [result, setResult] = useState("");

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key) {
    const result = await SecureStore.getItemAsync(key).then(data => {
        // console.log(data);
        setResult(data);
    });

  }

    // keeps calling post calls for interests
    const onPressSubmit = () => {

      getValueFor("user_id");
      console.log("user's id number " + result);

      submitInfo();
      submitInterests();
      submitImages();

      if(result == info)
        onRecievedData();
    };
    const onRecievedData = () => {
        navigation.replace("drawerRoot");
    }


    const submitInterests = async () => {
      let interest_array = Array.from(interests);
      const field_name = "interests";
      const url_encoded_interest = interest_array.map(
          value =>
              `${encodeURIComponent(field_name)}=${encodeURIComponent(value)}`
      );
      const form_encoded = url_encoded_interest.join("&");
      const headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'};
      const response = await axios.post(`http://${ip_address}/v1/user_interests/${id}`, form_encoded, { headers }).then(output => {
        console.log(output.data);
      console.log("interests uploaded");
    });
      // console.log(response.request._response);
    }
    const submitImages = async () => {
      let data = new FormData();
      data.append('previousProfille_id', 0);
      data.append('previousGeneral_ids', 0);
      data.append('previousGeneral_ids', 0);
      data.append('previousGeneral_ids', 0);
      data.append('previousGeneral_ids', 0);
      if(profileImgPath !== " " && profileImgPath !== "") {
         data.append('profile', {
          name: `user${id}-${profileImgPath}`,
          type: 'image/jpeg',
          uri: profileImgPath,
        });
      } else {
        data.append('profile', undefined);
      }
      let genImgArr= [generalImgPath_0, generalImgPath_1,generalImgPath_2,generalImgPath_3];
      if (genImgArr.length > 0) {
        genImgArr.forEach(function(img, index, genImgArr) {
              if(img !== "" && img !== " ") {
                data.append('general', {
                  name: `user${id}-${img}`,
                  type: 'image/jpeg',
                  uri: img,
                });
              }
        });
          } else {
            data.append('general', undefined);
        }
      const headers = {'Content-Type': 'multipart/form-data'};
      const response = await axios.post(`http://${ip_address}/v1/user_pics/fullset/${id}`, data, { headers }).then(output => {
        console.log(output.data);
      console.log("image uploaded");
    });
    }

    const submitInfo = async () => {
      const data_body = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender,
        city: city,
        state: _state,
        longitude: longitude,
        latitude: latitude,
        bio: bio,
        gym: gym,
        fullName: firstName + " " + lastName,
        tiktok: tiktok,
        facebook: facebook,
        instagram: instagram,
        spotify: spotify,
        questionOne: questionOne,
        answerOne: answerOne,
        questionTwo: questionTwo,
        answerTwo: answerTwo,
        questionThree: questionThree,
        answerThree: answerThree
      };
      const headers = {Accept: 'application/json', 'Content-Type': 'application/json',};
      const response = await axios.put(`http://${ip_address}/v1/users/registration/${id}`, data_body, { headers }).then(output => {
        setInfo(output.data.userId);
        console.log(output.data.userId);

    });
    }


  return (
    <View style={{backgroundColor:theme.splash, flex: 1}}>
    <Header
      barStyle= {theme.barColor}
      centerComponent={{text: 'Confirm', style: { color:theme.colorName , fontWeight: '600', fontSize: 25, paddingTop: "1%"} }}
      containerStyle={{
        backgroundColor:"transparent",
        borderBottomWidth:0,
        paddingVertical: 20,
      }}
      leftComponent={<Back navigationProps={navigation}/>}

    />

    <View style={{alignItems: 'center', flex:1, paddingTop: '15%'}}>
      <Svg
          width={110}
          height={110}
          viewBox="0 0 110 110"
          fill="none"
        >
          <Path
            d="M0.999997 55C1 25.1766 25.1766 1 55 1C84.8234 1.00001 109 25.1766 109 55C109 84.8234 84.8234 109 55 109C25.1766 109 0.999995 84.8234 0.999997 55Z"
            fill= {theme.updateButtonL}
            stroke= {theme.updateButtonL}
            strokeWidth={2}
          />
          <Path
            d="M76 40L47.125 70L34 56.3636"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>


        <Text style={{
        paddingHorizontal: '10%',
                width: '95%',
                 paddingTop: '10%',
                color: theme.colorText,
                fontSize: 20,
                fontWeight: '500',
                textAlign: "left",
                paddingBottom: '2%',
                lineHeight: 26,
              }}>You are all set!</Text>


      <Text style={{
        paddingHorizontal: '10%',
                width: '95%',
                color: theme.colorText,
                fontSize: 15,
                fontWeight: '400',
                textAlign: "left",
                lineHeight: 22,
                paddingBottom: '10%'
              }}>Make sure to check all your information and then press submit!</Text>

    </View>



           <View style={{marginVertical: '24.4%',alignItems:'center'}}>
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
              onPressAction={onPressSubmit}
              >
              SUBMIT
              </GradientButton>
  <View style ={{paddingTop: "7.5%"}}>
      <Svg
    width={width}
    height={4}
    viewBox="0 0 290 4"
  >
          <Rect x={261} width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
          <Rect x={228} width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
          <Rect x={195} width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
          <Rect x={163} width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
          <Rect x={131} width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
          <Rect x={98} width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
          <Rect x={65} width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
          <Rect x={32} width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
          <Rect  width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
        </Svg>
      </View>
              </View>
          </View>

  );
}

export default AccountSubmission;

