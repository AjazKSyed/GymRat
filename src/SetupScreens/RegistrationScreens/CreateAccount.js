import React, {  createRef, FC,Component, useEffect, useState, useCallback, useContext } from "react";
import Svg, { Path, Rect, Defs, LinearGradient, RadialGradient, Stop, ClipPath, Pattern, Mask } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text,TextInput, useWindowDimensions, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView, Button, Appearance, SafeAreaView } from "react-native";
import axios from 'axios';
import "react-native-gesture-handler";
import BackLogin from '../../Tabs/Navigation/BackLogin';
import { HelperText } from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GradientButton from 'react-native-gradient-buttons';
import { Avatar, Overlay, Header} from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import Loader from '../../Tabs/Navigation/Loader.js';

import { useRegistrationState, useRegistrationDispatch } from '../../Contexts/RegistrationContext';
import { ThemeContext } from '../../Contexts/theme-context';
import * as SecureStore from 'expo-secure-store';


/*
 fix the keyboard scroll
*/

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //
const CreateAccount = () => {
  const navigation = useNavigation();
  const { dark, sport, deep, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [address, setAddress] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const { height, width } = useWindowDimensions();

  const dispatch = useRegistrationDispatch();
  const {id,  } = useRegistrationState();

    const passwordInputRef = createRef();
    // theme identifier
    const hasErrors = () => {
        const nameRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/);
        if (nameRegex.test(address)) {
            return false;
        }
        return true;
    };



    const handleSubmitPress = () => {
      console.log(id);
        setErrortext("");
        if (!address) {
            alert("Please fill Email");
            return;
        }
        if (!pass) {
            alert("Please fill Password");
            return;
        }
        setLoading(true);
    fetch("http://" + ip_address + "/v1/users/", {
      method: 'POST',
      body: JSON.stringify({
        email: address,
        password: pass,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((user_data) => {
        console.log(user_data.id);
        dispatch({type:'update', value:"id", data:user_data.id});
        //Hide Loader
        setLoading(false);
        setIsRegistraionSuccess(navigation.navigate('Security'));
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };




  return (
    <View style={{backgroundColor: theme.splash,
                 flex:1}}>
    <Header
      barStyle= {theme.barColor}
      centerComponent={{text: 'Create Account', style: { color:theme.colorName , fontWeight: '600', fontSize: 25, paddingTop: "1%", } }}
      containerStyle={{
        backgroundColor:"transparent",
        borderBottomWidth:0,
        paddingVertical: 20,
      }}
      leftComponent={<BackLogin navigationProps={navigation}/>}

    />

        <KeyboardAwareScrollView style={{backgroundColor: theme.splash, width: width}}>

        <SafeAreaView style={{marginTop: '5%',flex:1}}>

            <Loader loading={loading} />
<View style={{alignItems: 'center', }}>
{ dark && !deep ?
  <Svg
    width={202}
    height={201}
    viewBox="0 0 202 201"
    fill="none"
  >
    <Path
      d="M192.636 81.4444C192.636 59.2214 174.599 41.1842 152.376 41.1842H117.671V68.0497H152.376C159.758 68.0497 165.77 74.0621 165.77 81.4444C165.77 88.8267 159.758 94.8391 152.376 94.8391H117.671C117.671
      105.342 109.147 113.79 98.7206 113.79H85.3259V148.494H112.191V121.629H152.452C153.974 121.629 155.42 121.552 156.866 121.4L165.922 148.494H192.788L180.154 110.669C187.841 103.363 192.636 93.0126 192.636 81.4444ZM31.6709 34.4868V74.7471C31.6709 78.4763 34.639 81.4444 38.3682 81.4444H78.6285C82.3577 81.4444 85.3259 78.4763 85.3259 74.7471V68.0497H58.4603V41.1842H112.191V94.8391C112.191 102.221 106.179 108.234 98.7967 108.234H18.2762C10.8938 108.234 4.88143 102.221 4.88143 94.8391V14.3947C4.88143 7.01241 10.8938 1 18.2762 1H98.7967C106.179 1 112.191 7.01241 112.191 14.3947V34.4868H85.3259C85.3259 30.7576 82.3577 27.7894 78.6285 27.7894H38.3682C34.639 27.7894 31.6709 30.7576 31.6709 34.4868ZM7.24073 182.361V191.646C7.24073 192.484 7.92569 193.169 8.76286 193.169H18.0478C18.885 193.169 19.57 192.484 19.57 191.646V190.124H13.4053V183.96H25.7346V196.289C25.7346 197.963 24.3646 199.409 22.6142 199.409H4.12037C2.44603 199.409 1 198.039 1 196.289V177.795C1 176.121 2.36992 174.675 4.12037 174.675H22.6142C24.2885 174.675 25.7346 176.045 25.7346 177.795V182.438H19.57C19.57 181.6 18.885 180.915 18.0478 180.915H8.76286C7.92569 180.839 7.24073 181.524 7.24073 182.361ZM56.101 174.675V196.289C56.101 198.039 54.7311 199.409 52.9807 199.409H31.3664V193.245H49.8603V190.124H34.4107C32.6602 190.124 31.2903 188.754 31.2903 187.004V174.675H37.4549V183.96H49.7842V174.675H56.101V174.675ZM159.53 174.675H141.036C139.361 174.675 137.915 176.045 137.915 177.795V199.409H144.08V193.245H156.409V199.409H162.574V177.795C162.65 176.045 161.204 174.675 159.53 174.675ZM144.08 187.004V182.361C144.08 181.524 144.765 180.839 145.602 180.839H154.887C155.724 180.839 156.409 181.524 156.409 182.361V187.004H144.08ZM132.283 183.96C132.283 178.861 128.098 174.675 122.999 174.675H107.549V199.409H113.714V193.245H122.999C123.303 193.245 123.683 193.245 123.988 193.169L126.043 199.409H132.207L129.315 190.733C131.142 188.983 132.283 186.623 132.283 183.96ZM113.714 187.004V180.839H122.999C124.673 180.839 126.119 182.209 126.119 183.96C126.119 185.634 124.749 187.08 122.999 187.08H113.714V187.004ZM192.94 174.675V180.839H183.655V199.333H177.491V180.839H168.206V174.675H192.94ZM86.5435 174.675V199.409H80.3789V182.97L74.2143 191.266L68.0497 182.97V199.409H61.8851V174.675H68.0497L74.2143 182.894L80.3789 174.675H86.5435Z"
      stroke="url(#paint0_linear_1340_2239)"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M199.795 178.177C199.719 178.1 199.719 178.024 199.719 178.024C199.948 177.948 200.252 177.72 200.252 177.263C200.252 176.654 199.871 176.274 199.263 176.274H197.969V179.394H198.654V178.253H199.034L199.567 179.394H200.328L199.795 178.177ZM199.034 177.644H198.654V176.73H199.034C199.339 176.73 199.491 176.883 199.491 177.187C199.491 177.492 199.339 177.644 199.034 177.644Z"
      fill="url(#paint1_linear_1340_2239)"
    />
    <Path
      d="M198.956 174.676C197.282 174.676 195.988 176.046 195.988 177.796C195.988 179.47 197.358 180.916 198.956 180.916C200.631 180.916 202.001 179.546 202.001 177.796C202.001 176.046 200.631 174.676 198.956 174.676ZM198.956 180.155C197.663 180.155 196.673 179.09 196.673 177.72C196.673 176.35 197.663 175.284 198.956 175.284C200.25 175.284 201.24 176.35 201.24 177.72C201.24 179.09 200.25 180.155 198.956 180.155Z"
      fill="url(#paint2_linear_1340_2239)"
    />
    <Path
      d="M199.795 178.177C199.719 178.1 199.719 178.024 199.719 178.024C199.948 177.948 200.252 177.72 200.252 177.263C200.252 176.654 199.871 176.274 199.263 176.274H197.969V179.394H198.654V178.253H199.034L199.567 179.394H200.328L199.795 178.177ZM199.034 177.644H198.654V176.73H199.034C199.339 176.73 199.491 176.883 199.491 177.187C199.491 177.492 199.339 177.644 199.034 177.644Z"
      fill="url(#paint3_linear_1340_2239)"
    />
    <Path
      d="M199.795 178.177C199.719 178.1 199.719 178.024 199.719 178.024C199.948 177.948 200.252 177.72 200.252 177.263C200.252 176.654 199.871 176.274 199.263 176.274H197.969V179.394H198.654V178.253H199.034L199.567 179.394H200.328L199.795 178.177ZM199.034 177.644H198.654V176.73H199.034C199.339 176.73 199.491 176.883 199.491 177.187C199.491 177.492 199.339 177.644 199.034 177.644Z"
      fill="url(#paint4_linear_1340_2239)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1340_2239"
        x1={170.938}
        y1={39.6632}
        x2={-7.29064}
        y2={188.589}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={theme.updateButtonL} />
        <Stop offset={0.9951} stopColor={theme.updateButtonR} />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_1340_2239"
        x1={200.235}
        y1={176.822}
        x2={197.656}
        y2={178.977}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={theme.updateButtonL} />
        <Stop offset={0.9951} stopColor={theme.updateButtonR} />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_1340_2239"
        x1={201.322}
        y1={175.802}
        x2={196.635}
        y2={179.718}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={theme.updateButtonL} />
        <Stop offset={0.9951} stopColor={theme.updateButtonR} />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_1340_2239"
        x1={200.235}
        y1={176.822}
        x2={197.656}
        y2={178.977}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={theme.updateButtonL} />
        <Stop offset={0.9951} stopColor={theme.updateButtonR} />
      </LinearGradient>
      <LinearGradient
        id="paint4_linear_1340_2239"
        x1={200.235}
        y1={176.822}
        x2={197.656}
        y2={178.977}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={theme.updateButtonL} />
        <Stop offset={0.9951} stopColor={theme.updateButtonR} />
      </LinearGradient>
    </Defs>
  </Svg>

      :
      <Svg width="201" height="198">
      <Path d="M191.639 80.2785C191.639 58.1013 173.601 40.1013 151.378 40.1013H116.673V66.9114H151.378C158.76 66.9114 164.773 72.9114 164.773 80.2785C164.773 87.6456 158.76 93.6456 151.378 93.6456H116.673C116.673 104.127 108.149 112.557 97.7221 112.557H84.3272V147.19H111.193V120.38H151.454C152.976 120.38 154.422 120.304 155.868 120.152L164.925 147.19H191.791L179.157 109.443C186.844 102.152 191.639 91.8228 191.639 80.2785ZM30.6713 33.4177V73.5949C30.6713 77.3165 33.6395 80.2785 37.3688 80.2785H77.6297C81.359 80.2785 84.3272 77.3165 84.3272 73.5949V66.9114H57.4612V40.1013H111.193V93.6456C111.193
       101.013 105.181 107.013 97.7982 107.013H17.2764C9.89399 107.013 3.88149 101.013 3.88149 93.6456V13.3671C3.88149 6 9.89399 0 17.2764 0H97.7982C105.181 0 111.193 6 111.193 13.3671V33.4177H84.3272C84.3272 29.6962 81.359 26.7342 77.6297 26.7342H37.3688C33.6395 26.7342 30.6713 29.6962
        30.6713 33.4177ZM6.24083 180.987V190.253C6.24083 191.089 6.92579 191.772 7.76298 191.772H17.0481C17.8853 191.772 18.5702 191.089 18.5702 190.253V188.734H12.4055V182.582H24.7349V194.886C24.7349 196.557 23.365 198 21.6145 198H3.12041C1.44605 198 0 196.633 0 194.886V176.43C0 174.759 1.36994 173.316 3.12041 173.316H21.6145C23.2889 173.316 24.7349 174.684 24.7349 176.43V181.063H18.5702C18.5702 180.228 17.8853 179.544 17.0481 179.544H7.76298C6.92579 179.468 6.24083 180.152 6.24083 180.987ZM55.1018 173.316V194.886C55.1018 196.633 53.7319 198 51.9815 198H30.3669V191.848H48.861V188.734H33.4112C31.6607 188.734 30.2908 187.367 30.2908 185.62V173.316H36.4555V182.582H48.7849V173.316H55.1018ZM158.532 173.316H140.038C138.363 173.316 136.917 174.684 136.917 176.43V198H143.082V191.848H155.412V198H161.576V176.43C161.652 174.684 160.206 173.316 158.532 173.316ZM143.082 185.62V180.987C143.082 180.152 143.767 179.468 144.604 179.468H153.889C154.727 179.468 155.412 180.152 155.412 180.987V185.62H143.082ZM131.285 182.582C131.285 177.494 127.1 173.316 122 173.316H106.551V198H112.715V191.848H122C122.305 191.848 122.685 191.848 122.99 191.772L125.045 198H131.209L128.317 189.342C130.144 187.595 131.285 185.241 131.285 182.582ZM112.715 185.62V179.468H122C123.675 179.468 125.121 180.835 125.121 182.582C125.121 184.253 123.751 185.696 122 185.696H112.715V185.62ZM191.943 173.316V179.468H182.658V197.924H176.493V179.468H167.208V173.316H191.943ZM85.5449 173.316V198H79.3802V181.595L73.2155 189.873L67.0507 181.595V198H60.886V173.316H67.0507L73.2155 181.519L79.3802 173.316H85.5449ZM197.956 173.316C199.63 173.316 201 174.684 201 176.43C201 178.101 199.63 179.544 197.956 179.544C196.281 179.544 194.911 178.177 194.911 176.43C194.988 174.684 196.281 173.316 197.956 173.316ZM197.956 178.785C199.25 178.785 200.239 177.722 200.239 176.354C200.239 174.987 199.25 173.924 197.956 173.924C196.662 173.924 195.672 174.987 195.672 176.354C195.672 177.722 196.662 178.785 197.956 178.785ZM196.89 174.835H198.184C198.793 174.835 199.173 175.215 199.173 175.823C199.173 176.278 198.869 176.582 198.641 176.658C198.641 176.658 198.717 176.734 198.717 176.81L199.326 177.949H198.565L198.032 176.81H197.651V177.949H196.966V174.835H196.89ZM198.032 176.278C198.336 176.278 198.488 176.127 198.488 175.823C198.488 175.519 198.336 175.367 198.032 175.367H197.651V176.278H198.032Z"
       fill={deep ? "url(#paint1_radial_1159_1410)" :"url(#paint0_radial_1159_1410)"  }/>
      <Defs>
        <RadialGradient id="paint0_radial_1159_1410" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200.352 38.5271) rotate(107.089) scale(232.435 234.946)">
        <Stop offset="0.00360405" stopColor="#71347E"/>
        <Stop offset="1" stopColor="#2D1E48"/>
        </RadialGradient>
        <RadialGradient id="paint1_radial_1159_1410" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200.352 38.5271) rotate(107.089) scale(232.435 234.946)">
        <Stop offset="0.00360405" stopColor="#2C6281"/>
        <Stop offset="1" stopColor="#2C4D80"/>
        </RadialGradient>
      </Defs>
      </Svg>
}
</View>

 <View style={{
                flex: 1,
                alignItems: 'left',
                paddingTop:"10%",
                paddingHorizontal: '10%', flexDirection:'column',
            }}>

       <Text  style = {{paddingTop: "5%",paddingBottom: "2%",fontSize: 14,fontWeight: '400',color: sport ? theme.updateButtonL : theme.settingsGeneral,}}>Email Address</Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.cardBackground,
          borderWidth: 0.5,
          borderColor: '#000',
          height: 0.07 * height,
          borderRadius: 5,
        }}>
        <TextInput
            style={{flex: 1, paddingHorizontal: "4%",
            color: theme.settingsText, fontSize: 18,
            }}
            onChangeText={(address) => setAddress(address)}
            placeholderTextColor={theme.inactiveTintColor}
            placeholder="Enter Email"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            keyboardAppearance={dark ? 'dark' : 'light'}

            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
              </View>
          <HelperText style={{color: sport ? '#3A6781' : theme.settingsGeneral}} type="error" visible={hasErrors()}>
            Email address is invalid!
          </HelperText>


       <Text  style = {{paddingTop: "8%",paddingBottom: "2%",fontSize: 14,fontWeight: '400',color: sport ? theme.updateButtonL : theme.settingsGeneral}}>Password</Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.cardBackground,
          borderWidth: 0.5,
          borderColor: '#000',
          height: 0.07 * height,
           borderRadius: 5,
        }}>
        <TextInput
            style={{flex: 1, paddingHorizontal: "4%",
            color: theme.settingsText, fontSize: 18,
            }}
            onChangeText={(pass) => setPass(pass)}
            placeholderTextColor={theme.inactiveTintColor}
            placeholder="Enter Password"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            ref={passwordInputRef}
            keyboardAppearance={dark ? 'dark' : 'light'}
            keyboardType="default"
            returnKeyType="next"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
          />


        </View>

                        {errortext != "" ? (
                    <Text style={{
                        color: theme.settingsButton,
                        textAlign: "center",
                        fontSize: 14,
                    }}>
                        {" "}
                        {errortext}{" "}
                    </Text>
                ) : null}
                              </View>

                 <View style={{marginVertical: '19.6%',alignItems:'center'}}>


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




        </View>
              </SafeAreaView>
      </KeyboardAwareScrollView>

                </View>





  );
}
export default CreateAccount;