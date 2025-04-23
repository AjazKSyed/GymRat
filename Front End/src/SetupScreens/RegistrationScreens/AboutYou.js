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

import { ThemeContext } from '../../Contexts/theme-context';
import { useRegistrationState, useRegistrationDispatch } from '../../Contexts/RegistrationContext';


// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //
const AboutYou = () => {
  const navigation = useNavigation();
  const { dark, sport, deep, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
  const {id, gym, bio,  } = useRegistrationState();
  const { height, width } = useWindowDimensions();
  const dispatch = useRegistrationDispatch();


  const handleSubmitPress = () => {
      navigation.navigate('SocialMedia');

  };
  return (
     <View style={{
            backgroundColor: theme.splash,flex:1, alignItems: 'center'
        }}>
    <Header
      barStyle= {theme.barColor}
      centerComponent={{text: 'About You', style: { color:theme.colorName , fontWeight: '600', fontSize: 25, paddingTop: "1%"} }}
      containerStyle={{
        backgroundColor:"transparent",
        borderBottomWidth:0,
        paddingVertical: 20,
      }}
      leftComponent={<Back navigationProps={navigation}/>}

    />
        <KeyboardAwareScrollView style={{backgroundColor: theme.splash, width: width}}>

        <SafeAreaView style={{}}>

 <View style={{
          flex: 1,
          alignItems: 'left',
          paddingTop:0.01*height,
          paddingHorizontal: '10%', flexDirection:'column',
      }}>
      <Text style={{
                width: '95%',
                color: theme.colorText,
                fontSize: 15,
                fontWeight: '400',
                textAlign: "left",
                lineHeight: 22,
              }}>We want to know more about you. List you preferred gym where you work out and write your bio.</Text>


              <Text  style = {{paddingTop: "5%",paddingBottom: "2%",fontSize: 14,fontWeight: '400',color: theme.settingsGeneral,}}>Where do you work out</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderWidth: 0.5,
            borderColor: '#000',
            height: 0.06 * height,
            borderRadius: 5,
          }}>
          <TextInput
              style={{flex: 1, paddingHorizontal: "4%", color: theme.settingsText, fontSize: 16}}
              onChangeText={(gym) => dispatch({type:'update', value:"gym",data:gym})}
              placeholderTextColor={theme.inactiveTintColor}
              placeholder="Enter Gym"
              defaultValue={gym}
              autoCapitalize="none"
              keyboardAppearance={dark ? 'dark' : 'light'}
              returnKeyType="next"
              blurOnSubmit={false}
            />
        </View>

      <Text  style = {{paddingTop: "5%",paddingBottom: "2%",fontSize: 14,fontWeight: '400',color: theme.settingsGeneral,}}>Bio</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: theme.cardBackground,
            borderWidth: 0.5,
            borderColor: '#000',
            height: 0.32 * height,
            borderRadius: 5,
          }}>
          <TextInput
              style={{flex: 1, paddingHorizontal: "4%", paddingTop: "4%", textAlignVertical: 'top', color: theme.settingsText, fontSize: 16}}
              onChangeText={(bio) => dispatch({type:'update', value:"bio",data:bio})}
              placeholderTextColor={theme.inactiveTintColor}
              placeholder="Enter Bio"
              autoCapitalize="none"
              keyboardAppearance={dark ? 'dark' : 'light'}
              maxLength={250}
              multiline={true}
              defaultValue={bio}
              numberOfLines={5}
              blurOnSubmit={false}
            />
        </View>
            </View>

      <View style={{paddingTop: '2%', textAlign: 'center',
       flex: 1,
          alignItems: 'center', flexDirection:'column',}}>
        <Text style={{ color: theme.gradientR, }}>
          Characters Left: {250 - bio.length}
        </Text>
        </View>
           <View style={{marginVertical: '17%',alignItems:'center'}}>
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
          <Rect x={163} width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
          <Rect x={131} width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
          <Rect x={98} width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
          <Rect x={65} width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
          <Rect x={32} width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
          <Rect  width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
        </Svg>
      </View>


              </View>




      </SafeAreaView>
      </KeyboardAwareScrollView>



    </View>
  );
}

export default AboutYou;