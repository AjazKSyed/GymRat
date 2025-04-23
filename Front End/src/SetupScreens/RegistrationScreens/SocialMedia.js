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
import InstagramSVG from './Components/InstagramSVG';
import TiktokSVG from './Components/TiktokSVG';
import SpotifySVG from './Components/SpotifySVG';
import FacebookSVG from './Components/FacebookSVG';

import { ThemeContext } from '../../Contexts/theme-context';
import { useRegistrationState, useRegistrationDispatch } from '../../Contexts/RegistrationContext';


// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //
const SocialMedia = () => {
  const navigation = useNavigation();
  const { dark, sport, deep, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
  const { id, spotify, instagram, facebook, tiktok,   } = useRegistrationState();
  const { height, width } = useWindowDimensions();
  const dispatch = useRegistrationDispatch();

  const handleSubmitPress = () => {
      console.log(spotify);
      navigation.navigate('InterestsSetup');
  };
  return (
     <View style={{
            backgroundColor: theme.splash,flex:1,
        }}>
    <Header
      barStyle= {theme.barColor}
      centerComponent={{text: 'Social Media', style: { color:theme.colorName , fontWeight: '600', fontSize: 25, paddingTop: "1%"} }}
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
              }}>Share your social media accounts for others to check out!
              </Text>
      <Text style={{
                width: '95%',
                color: theme.colorText,
                fontSize: 12,
                fontWeight: '400',
                textAlign: "left",
                lineHeight: 22,
              }}>Just add your username</Text>



        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.cardBackground,
          borderWidth: 0.5,
          borderColor: '#000',
          height: 0.07 * height,
          borderRadius: 7,
          marginVertical: '3%',
          marginTop: '12%'
        }}>
        <View style={{paddingHorizontal: 12,
           alignItems: 'center',}}>
            <InstagramSVG/>
        </View>
        <TextInput
            style={{flex: 1,
            color: theme.settingsText, fontSize: 15,
            }}
            onChangeText={(instagram) => dispatch({type:'update', value:"instagram",data:instagram})}
            placeholderTextColor={theme.inactiveTintColor}
            placeholder="@username"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            defaultValue={instagram}
            keyboardAppearance={dark ? 'dark' : 'light'}
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={false}
          />
          </View>



        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.cardBackground,
          borderWidth: 0.5,
          borderColor: '#000',
          height: 0.07 * height,
          borderRadius: 7,
          marginVertical: '3%',
        }}>
        <View style={{paddingHorizontal: 12,
           alignItems: 'center',}}>
            <FacebookSVG/>
        </View>
        <TextInput
            style={{flex: 1,
            color: theme.settingsText, fontSize: 15,
            }}
            onChangeText={(facebook) => dispatch({type:'update', value:"facebook",data:facebook})}
            placeholderTextColor={theme.inactiveTintColor}
            placeholder="@username"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            defaultValue={facebook}
            keyboardAppearance={dark ? 'dark' : 'light'}
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={false}
          />
          </View>


        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.cardBackground,
          borderWidth: 0.5,
          borderColor: '#000',
          height: 0.07 * height,
          borderRadius: 7,
          marginVertical: '3%',
        }}>
        <View style={{paddingHorizontal: 12,
           alignItems: 'center',}}>
            <SpotifySVG/>
        </View>
        <TextInput
            style={{flex: 1,
            color: theme.settingsText, fontSize: 15,
            }}
            onChangeText={(spotify) => dispatch({type:'update', value:"spotify",data:spotify})}
            placeholderTextColor={theme.inactiveTintColor}
            placeholder="@username"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            defaultValue={spotify}
            keyboardAppearance={dark ? 'dark' : 'light'}
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={false}
          />
          </View>



        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.cardBackground,
          borderWidth: 0.5,
          borderColor: '#000',
          height: 0.07 * height,
          borderRadius: 7,
          marginVertical: '3%',
        }}>
        <View style={{paddingHorizontal: "6%",paddingRight: '5%',
           alignItems: 'center',}}>
               <TiktokSVG/>
        </View>
        <TextInput
            style={{flex: 1,
            color: theme.settingsText, fontSize: 15,
            }}
            onChangeText={(tiktok) => dispatch({type:'update', value:"tiktok",data:tiktok})}
            placeholderTextColor={theme.inactiveTintColor}
            placeholder="@username"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            defaultValue={tiktok}
            keyboardAppearance={dark ? 'dark' : 'light'}
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={false}
          />
          </View>

            </View>

           <View style={{marginVertical: '38.5%',alignItems:'center'}}>
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




      </SafeAreaView>
      </KeyboardAwareScrollView>



    </View>
  );
}

export default SocialMedia;