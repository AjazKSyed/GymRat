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
import * as SecureStore from 'expo-secure-store';

import { ThemeContext } from '../../Contexts/theme-context';
import { useRegistrationState, useRegistrationDispatch } from '../../Contexts/RegistrationContext';

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //




const PersonalInformation = () => {
  const navigation = useNavigation();
  const { dark, sport, deep, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
  const dispatch = useRegistrationDispatch();
  const {firstName, lastName,gender,age,city,_state,  } = useRegistrationState();
  const { height, width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState("");

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key) {
    const result = await SecureStore.getItemAsync(key).then(data => {
        console.log('id gotten');
    });
    if (result)
      setResult(result);
  }


    const handleSubmitPress = () => {
      console.log(firstName);
      console.log(lastName);
      console.log(gender);
      console.log(age);
      console.log(city);
      console.log(_state);
      getValueFor("user_id");
      console.log("user's id  " + result);

        if (!firstName) {
            alert("Please fill first name");
            return;
        }
        if (!lastName) {
            alert("Please fill last name");
            return;
        }
        if (!gender) {
            alert("Please fill gender");
            return;
        }
        if (!age) {
            alert("Please enter age");
            return;
        }
        if (!city) {
            alert("Please fill in city");
            return;
        }
        if (!lastName) {
            alert("Please enter state");
            return;
        }

      navigation.navigate('LocationAccess');
  };




  return (
    <View style={{
            backgroundColor: theme.splash,flex:1,
        }}>
    <Header
      barStyle= {theme.barColor}
      centerComponent={{text: 'Information', style: { color:theme.colorName , fontWeight: '600', fontSize: 25, paddingTop: "1%"} }}
      containerStyle={{
        backgroundColor:"transparent",
        borderBottomWidth:0,
        paddingVertical: 20,
      }}
      leftComponent={<Back navigationProps={navigation}/>}

    />
        <KeyboardAwareScrollView style={{backgroundColor: theme.splash, width: width}}>

        <SafeAreaView style={{}}>


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
        <View style={{   backgroundColor:theme.cardBackground, paddingTop: "5%",  alignItems: "center",}}>

              <Text style={{color: theme.settingsGeneral,  fontWeight: '600', fontSize: 20,paddingTop: "10%",paddingBottom: "4%"}}>Gender</Text>
            </View>
      <View style={{flex: 1, borderWidth: .3, borderColor: theme.backgroundColor, backgroundColor:theme.cardBackground,  paddingVertical: "5%"}}>
          <Gender
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
          />
            </View>
        </Modal>


      <View style={{
          flex: 1,
          alignItems: 'left',
          paddingTop:0.01*height,
          paddingHorizontal: '10%', flexDirection:'column',
      }}>

        {/*first name*/}

          <Text  style = {{paddingTop: "5%",paddingBottom: "2%",fontSize: 14,fontWeight: '400',color: theme.settingsGeneral,}}>First Name</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderWidth: 0.5,
            borderColor: '#000',
            height: 0.05 * height,
            borderRadius: 5,
          }}>
          <TextInput
              style={{flex: 1, paddingHorizontal: "4%", color: theme.settingsText, fontSize: 15}}
              onChangeText={(first) => dispatch({type:'update', value:"firstName",data:first})}
              placeholderTextColor={theme.inactiveTintColor}
              placeholder="Enter First Name"
              autoCapitalize="none"
              returnKeyType="next"
              keyboardAppearance={dark ? 'dark' : 'light'}
              defaultValue={firstName}
              blurOnSubmit={false}
            />
        </View>


        {/*last name*/}
            <Text  style = {{paddingTop: "5%",paddingBottom: "2%",fontSize: 14,fontWeight: '400',color: theme.settingsGeneral,}}>Last Name</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderWidth: 0.5,
            borderColor: '#000',
            height: 0.05 * height,
            borderRadius: 5,
          }}>
          <TextInput
              style={{flex: 1, paddingHorizontal: "4%", color: theme.settingsText, fontSize: 15}}
              onChangeText={(last) => dispatch({type:'update', value:"lastName",data:last})}
              placeholderTextColor={theme.inactiveTintColor}
              placeholder="Enter Last Name"
              autoCapitalize="none"
              keyboardAppearance={dark ? 'dark' : 'light'}
              defaultValue={lastName}
              returnKeyType="next"
              blurOnSubmit={false}
            />
        </View>

        {/*gender*/}
            <Text style = {{paddingTop: "5%",paddingBottom: "2%",fontSize: 14,fontWeight: '400',color: theme.settingsGeneral,}}>Gender</Text>

          <Pressable onPress={() => {setModalVisible(true); }}>
          <View style={{
            flexDirection: 'row',
            paddingHorizontal: "4%",
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderWidth: 0.5,
            borderColor: '#000',
            height: 0.05 * height,
            width:0.8 * width,
            borderRadius: 5,
          }}>
          <Text style={{ color: theme.settingsText, fontSize: 15}}>{gender}</Text>
          </View>
          </Pressable>

        {/*age*/}
            <Text  style = {{paddingTop: "5%",paddingBottom: "2%",fontSize: 14,fontWeight: '400',color: theme.settingsGeneral,}}>Age</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderWidth: 0.5,
            borderColor: '#000',
            height: 0.05 * height,
            borderRadius: 5,
          }}>
          <TextInput
              style={{flex: 1, paddingHorizontal: "4%", color: theme.settingsText, fontSize: 15}}
              onChangeText={(age) => dispatch({type:'update', value:"age",data:age})}
              placeholderTextColor={theme.inactiveTintColor}
              placeholder="Enter Age"
              keyboardType="number-pad"
              keyboardAppearance={dark ? 'dark' : 'light'}
              autoCapitalize="none"
              defaultValue={age.toString()}
              returnKeyType="next"
              blurOnSubmit={false}
            />
        </View>

        {/*City*/}
            <Text  style = {{paddingTop: "5%",paddingBottom: "2%",fontSize: 14,fontWeight: '400',color: theme.settingsGeneral,}}>City</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderWidth: 0.5,
            borderColor: '#000',
            height: 0.05 * height,
            borderRadius: 5,
          }}>
          <TextInput
              style={{flex: 1, paddingHorizontal: "4%", color: theme.settingsText, fontSize: 15}}
              onChangeText={(city) => dispatch({type:'update', value:"city",data:city})}
              placeholderTextColor={theme.inactiveTintColor}
              placeholder="Enter City"
              autoCapitalize="none"
              keyboardAppearance={dark ? 'dark' : 'light'}
              defaultValue={city}
              returnKeyType="next"
              blurOnSubmit={false}
            />
        </View>

        {/*state*/}
            <Text  style = {{paddingTop: "5%",paddingBottom: "2%",fontSize: 14,fontWeight: '400',color: theme.settingsGeneral,}}>State</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderWidth: 0.5,
            borderColor: '#000',
            height: 0.05 * height,
            borderRadius: 5,
          }}>
          <TextInput
              style={{flex: 1, paddingHorizontal: "4%", color: theme.settingsText, fontSize: 15}}
              onChangeText={(state) => dispatch({type:'update', value:"_state",data:state})}
              placeholderTextColor={theme.inactiveTintColor}
              placeholder="Enter State"
              autoCapitalize="none"
              defaultValue={_state}
              keyboardAppearance={dark ? 'dark' : 'light'}
              returnKeyType="next"
              blurOnSubmit={false}
            />
        </View>
      </View>

        <View style={{marginVertical: '18%', alignItems:'center'}}>
          <GradientButton
              style={{
                    marginTop: "2%",
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




    <View style ={{paddingTop: "9.5%"}}>
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
          <Rect x={65} width={0.07 * width} height={4} rx={2} fill={theme.inactiveTabProg} />
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

export default PersonalInformation;