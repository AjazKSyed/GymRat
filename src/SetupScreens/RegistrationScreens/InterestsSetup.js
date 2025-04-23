import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import { StyleSheet, TextInput, SafeAreaView, Alert, FlatList,View, useWindowDimensions, Text,Pressable, Modal, ActivityIndicator, Image, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView, Appearance } from 'react-native';
import axios from 'axios';
import "react-native-gesture-handler";
import Back from '../../Tabs/Navigation/Back';
import { Avatar, Overlay, Button, Header, CheckBox} from "react-native-elements";
import InterestsCheck from './Components/InterestsCheck'
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import GradientButton from 'react-native-gradient-buttons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Svg, { Rect } from "react-native-svg";

// contexts
import { ThemeContext } from '../../Contexts/theme-context';
import { useRegistrationState, useRegistrationDispatch } from '../../Contexts/RegistrationContext';
// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //
/*

  Modal with all the questions
  Select a question it goes back to security screen with that field and it becomes unclickable
  Then repeat. On continue update context
*/
const InterestsSetup = () => {
  const navigation = useNavigation();
  const { dark, sport, deep, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
  const [ allInterests, setAllInterests ] = useState([]);
  const { height, width } = useWindowDimensions();
  const dispatch = useRegistrationDispatch();
  const {id,interests, } = useRegistrationState();

 useEffect(()=>{
    axios.get('http://' + ip_address + '/v1/interests/')
      .then(res=> {setAllInterests(res.data)});
  },[]);

  const renderInterest = (interest) => (
    <InterestsCheck
      id={interest.item.id}
      interestName={interest.item.interestName}
    />
  );


    const handleSubmitPress = () => {
      navigation.navigate('AccountSubmission');
      console.log(interests);

  };
  // console.log('dds');

  return (
    <View style={{
            backgroundColor: theme.splash,flex:1,
        }}>
    <Header
      barStyle= {theme.barColor}
      centerComponent={{text: 'Interests', style: { color:theme.colorName , fontWeight: '600', fontSize: 25, paddingTop: "1%"} }}
      containerStyle={{
        backgroundColor:"transparent",
        borderBottomWidth:0,
        paddingVertical: 20,
      }}
      leftComponent={<Back navigationProps={navigation}/>}

    />


      <Text style={{paddingHorizontal: '10%',
                width: '95%',
                color: theme.colorText,
                fontSize: 15,
                fontWeight: '400',
                textAlign: "left",
                lineHeight: 22,
              }}>Select all the fitness and health items that interest you!</Text>

            <View style={{backgroundColor: theme.splash,paddingHorizontal: '10%', paddingTop: '5%',height: 0.58* height, width: width}}>

          <FlatList
            data = {allInterests}
            columnWrapperStyle={{ justifyContent: "space-between"}}
            numColumns={2}
            keyExtractor= {(item) => item.id.toString()}
            renderItem = {renderInterest}
            showsVerticalScrollIndicator={false}
          />
                </View>


          <View style={{marginVertical: '7.9%',alignItems:'center'}}>

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

export default InterestsSetup;