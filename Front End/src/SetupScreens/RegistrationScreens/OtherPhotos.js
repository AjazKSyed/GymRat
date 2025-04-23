import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActionSheetIOS,
  KeyboardAvoidingView,
  Pressable,
  Alert,
  Keyboard,
  TouchableOpacity,
  useWindowDimensions,
  Appearance,
  ScrollView,
  Modal,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Picker,
  TextInput,
} from 'react-native';
import axios from 'axios';
import "react-native-gesture-handler";
import Back from '../../Tabs/Navigation/Back';
import { Avatar, Overlay, Button, Header} from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import GradientButton from 'react-native-gradient-buttons';
import Loader from '../../Tabs/Navigation/Loader.js';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Rect } from "react-native-svg";

import { ThemeContext } from '../../Contexts/theme-context';

import { useRegistrationState, useRegistrationDispatch } from '../../Contexts/RegistrationContext';



// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //
const OtherPhotos = () => {
  const navigation = useNavigation();
  const { dark, sport, deep, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);

  const [loading, setLoading] = useState(false);

  const dispatch = useRegistrationDispatch();
  const {id, generalImgPath_0,generalImgPath_1,generalImgPath_2,generalImgPath_3,  } = useRegistrationState();
  const { height, width } = useWindowDimensions();

// need to add multiselect



    const showImagePicker = async (index) => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your photos!");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,});
      if (!result.cancelled) {
        dispatch({type:'update', value:`generalImgPath_${index}`, data:result.uri});
      }
    }

    const openCamera = async (index) => {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
      }
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        dispatch({type:'update', value:`generalImgPath_${index}`, data:result.uri});

      }
    }
    const removeImage = async (index) => {
        dispatch({type:'update', value:`generalImgPath_${index}`, data:" "});
      };

    const onPress = (index) => {
            ActionSheetIOS.showActionSheetWithOptions({
          options: ['Cancel','Choose from library', 'Take a photo', 'Remove photo'],
          cancelButtonIndex: 0,
        destructiveButtonIndex:3,

          userInterfaceStyle: dark ? 'dark' : 'light',
          },
        buttonIndex => {
          if (buttonIndex === 0) {
            // cancel action
          } else if (buttonIndex === 1) {
            showImagePicker(index);
          } else if (buttonIndex === 2) {
            openCamera(index);
          } else if(buttonIndex == 3) {
            removeImage(index);
          }
        }
    );
    }




    const changePic = () => {
      navigation.navigate('AboutYou');
    };


  return (
    <View style={{backgroundColor:theme.splash, flex: 1}}>
    <Header
      barStyle= {theme.barColor}
      centerComponent={{text: 'Photos', style: { color:theme.colorName , fontWeight: '600', fontSize: 25, paddingTop: "1%"} }}
      containerStyle={{
        backgroundColor:"transparent",
        borderBottomWidth:0,
        paddingVertical: 20,
      }}
      leftComponent={<Back navigationProps={navigation}/>}
    />
      <Loader loading={loading} />

           <View style={{paddingTop: "5%",alignItems:'center'}}>

      <Text style={{
        paddingHorizontal: '10%',
                width: '95%',
                color: theme.colorText,
                fontSize: 15,
                fontWeight: '400',
                textAlign: "left",
                lineHeight: 22,
                paddingBottom: '10%'
              }}>Choose up to four (4) of your best pictures you want to show off to the world!</Text>
        </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginBottom: 30,}}>
              <Avatar
                avatarStyle={{borderRadius: 10, borderWidth: 1, borderColor: theme.gradientL}}
                size="xlarge"
                containerStyle={{borderRadius: 10, borderWidth: 1, borderColor: theme.gradientL, borderStyle:'solid', backgroundColor:theme.backgroundColor }}
                title="+"
                titleStyle={{fontSize: 60, fontWeight: '300', color: deep ? 'white' : '#43176C'}}
                source={((generalImgPath_0 && generalImgPath_0!= " ") ? { uri: generalImgPath_0 } : {})}
                onPress={() => onPress(0)}
              />
              <Avatar
                avatarStyle={{borderRadius: 10, borderWidth: 1, borderColor: theme.gradientL}}
                size="xlarge"
                containerStyle={{borderRadius: 10, borderWidth: 1, borderColor: theme.gradientL, borderStyle:'solid', backgroundColor:theme.backgroundColor }}
                title="+"
                titleStyle={{fontSize: 60, fontWeight: '300', color: deep ? 'white' : '#43176C'}}
                source={((generalImgPath_1 && generalImgPath_1!= " ") ? { uri: generalImgPath_1 } : {})}
                onPress={() => onPress(1)}
              />
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginBottom: 20,}}>
            <Avatar
                avatarStyle={{borderRadius: 10, borderWidth: 1, borderColor: theme.gradientL}}
                size="xlarge"
                containerStyle={{borderRadius: 10, borderWidth: 1, borderColor: theme.gradientL, borderStyle:'solid', backgroundColor:theme.backgroundColor }}
                title="+"
                titleStyle={{fontSize: 60, fontWeight: '300', color: deep ? 'white' : '#43176C'}}
                source={((generalImgPath_2 && generalImgPath_2!= " ") ? { uri: generalImgPath_2 } : {})}
                onPress={() => onPress(2)}
              />
              <Avatar
                avatarStyle={{borderRadius: 10, borderWidth: 1, borderColor: theme.gradientL}}
                size="xlarge"
                containerStyle={{borderRadius: 10, borderWidth: 1, borderColor: theme.gradientL, borderStyle:'solid', backgroundColor:theme.backgroundColor }}
                title="+"
                titleStyle={{fontSize: 60, fontWeight: '300', color: deep ? 'white' : '#43176C'}}
                source={((generalImgPath_3 && generalImgPath_3!= " ") ? { uri: generalImgPath_3 } : {})}
                onPress={() => onPress(3)}
              />
            </View>
           <View style={{ alignItems:'center'}}>
         <Text style={{ color: (generalImgPath_0.startsWith(" ") || generalImgPath_1.startsWith(" ") || generalImgPath_2.startsWith(" ") || generalImgPath_3.startsWith(" ")) ? theme.gradientR : theme.splash, fontWeight: '300'}}>
         Images Removed!
        </Text>
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
              onPressAction={changePic}
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
          <Rect x={131} width={0.07 * width} height={4} rx={2} fill={theme.updateButtonL} />
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

export default OtherPhotos;