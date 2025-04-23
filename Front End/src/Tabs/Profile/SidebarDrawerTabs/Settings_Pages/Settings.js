// Import React
import { Switch, TouchableOpacity, Modal, ActivityIndicator, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View , Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import "react-native-gesture-handler";
import BackProfiles from '../../../Navigation/BackProfiles';
import { Avatar, Overlay, Header} from "react-native-elements";
import { ThemeContext } from './../../../../Contexts/theme-context';
import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import * as Location from 'expo-location';
// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

/// figure out how to turn off location services in app.
export default function Settings()  {
  const navigation = useNavigation();
  const [filled, setFilled] = useState(false);
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(false);
    const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

    const [isLocationEnabled, setLocationEnabled] = useState(false);
    useEffect(() => {
    (async () => {
      let locationOn = await Location.hasServicesEnabledAsync();
      if (locationOn == true) {
        console.log(locationOn);
        setLocation(await Location.getCurrentPositionAsync({}));
        setLocationEnabled(true);
        console.log(location);
      } else {setLocationEnabled(false);
        setErrorMsg('Permission to access location was denied');
        return;}

    })();
  }, []);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  }
  const toggleLocation = () => {
    setLocationEnabled(previousState => !previousState);
   }

  return (
    <View style={{backgroundColor: theme.backgroundColor, flex: 1}}>
    <Header
      barStyle= {theme.barColor}
      centerComponent={{text: 'Settings', style: { color:theme.colorName , fontWeight: '600', fontSize: 30} }}
      placement="left"
      containerStyle={{
        backgroundColor:theme.settingsHeader,
        borderBottomWidth:0,
        paddingTop: 20,
        paddingBottom: 20,
      }}
      leftComponent={<BackProfiles navigationProps={navigation}/>}
    />
    <View style={{
      paddingTop: "4%",
      marginHorizontal: "4%",
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    }}>

      <Text style = {{color: theme.settingsGeneral, fontSize: 20, textAlign: "left", paddingHorizontal: "2%", fontWeight: "bold", paddingTop: "4%", paddingBottom: "4%", }}>General Settings</Text>

      <TouchableOpacity onPress={() => {
          navigation.navigate('AccountSettings');
            }}>
          <Text style={{color: theme.settingsText, fontSize: 17, textAlign: "left", paddingHorizontal: "2%", fontWeight: "400", paddingTop: "4%", paddingBottom: "4%", }}>Account Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
          navigation.navigate('Themes');
            }}>
          <Text style={{color: theme.settingsText, fontSize: 17, textAlign: "left", paddingHorizontal: "2%", fontWeight: "400", paddingTop: "4%", paddingBottom: "4%", }}>Themes</Text>
      </TouchableOpacity>



      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
        <Text style={{color: theme.settingsText, fontSize: 17, textAlign: "left", paddingHorizontal: "2%", fontWeight: "400", paddingTop: "4%", paddingBottom: "4%", }}>Location Services</Text>
        <Switch
                 trackColor={{ false: theme.settingsSwitchOff, true: theme.settingsSwitchOn}}
                 thumbColor={'white'}
                 onValueChange={toggleLocation}
                value={isLocationEnabled}/>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: '10%', alignItems:'center'}}>
        <Text style={{color: theme.settingsText, fontSize: 17, textAlign: "left", paddingHorizontal: "2%", fontWeight: "400", paddingTop: "4%", paddingBottom: "4%", }}>Push Notifications</Text>
        <Switch
                 trackColor={{ false: theme.settingsSwitchOff, true: theme.settingsSwitchOn}}
                 thumbColor={'white'}
                 onValueChange={toggleSwitch}
                value={isEnabled}/>
      </View>

        <View style={{borderWidth: 1, borderColor:theme.settingsDivider, marginHorizontal:"1%", marginVertical: "5%"}} />

      <Text style = {{color: theme.settingsGeneral, fontSize: 20, textAlign: "left", paddingHorizontal: "2%", fontWeight: "bold", paddingTop: "10%", paddingBottom: "4%", }}>More Information</Text>

      <TouchableOpacity onPress={() => {
          navigation.navigate('AboutUs');
            }}>
          <Text style={{color: theme.settingsText, fontSize: 17, textAlign: "left", paddingHorizontal: "2%", fontWeight: "400", paddingTop: "4%", paddingBottom: "4%", }}>About Us</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
          navigation.navigate('PrivacyPolicy');
            }}>
          <Text style={{color: theme.settingsText, fontSize: 17, textAlign: "left", paddingHorizontal: "2%", fontWeight: "400", paddingTop: "4%", paddingBottom: "4%", }}>Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
          navigation.navigate('TermsAndConditions');
            }}>
          <Text style={{color: theme.settingsText, fontSize: 17, textAlign: "left", paddingHorizontal: "2%", fontWeight: "400", paddingTop: "4%", paddingBottom: "4%", }}>Terms and Conditions</Text>
      </TouchableOpacity>

    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  descriptor: {
    paddingVertical: 18,
    alignItems: 'center'
  },
  button: {
    paddingVertical: 18,
    alignItems: 'center'


  }
});