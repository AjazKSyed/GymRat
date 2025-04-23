import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import { Avatar, Overlay, Button, Icon, Header,CheckBox} from 'react-native-elements';
import { TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
 import Svg, { Circle, SvgCss, Ellipse,G,TSpan,TextPath,Path,Polygon,Polyline,Line,Rect,Use,Symbol,Defs,LinearGradient,RadialGradient,Stop,ClipPath,Pattern,Mask,} from 'react-native-svg';

import DiscoveryNavigationDrawerHeader from '../../Navigation/DiscoveryNavigationDrawerHeader';
import { ThemeContext } from '../../../Contexts/theme-context';
import { StatusBar } from 'react-native';
import { useFocusEffect,useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserCard from '../Components/UserCard';

type CheckboxComponentProps = {};


// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

export default function Discovery() {
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
  StatusBar.setBarStyle(theme.barColor, true);

  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [ogVals, setOg] = useState();

  const [interestData, setinterestData] = useState();

    // overlay
    const [offset, setOffset] = useState(0);

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // filter booleans to check if checked
  const [f_count, setCount] = useState(0);


  // lcoation autofilter
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [distance, setDistance] = useState('');

  // makes sure user doesn't show up on the screen
  const [currentId, setCurrent] = useState('');
  const [cityName, setCity] = useState('');
  const isFocused = useIsFocused();

  // AysncStorage call to get these parameters
  useEffect(() => {
    AsyncStorage.getItem('longitude').then((longitude) => {
          if(longitude){
              setLongitude(longitude.replace(/\"/g, ""));
          }
      });
     AsyncStorage.getItem('distance').then((distance) => {
          if(distance){
              setDistance(distance.replace(/\"/g, ""));
          }
      });
      AsyncStorage.getItem('userLocation').then((userLocation) => {
          if(userLocation){
              setCity(userLocation);
          }
      });
      AsyncStorage.getItem('latitude').then((latitude) => {
          if(latitude){
              setLatitude(latitude.replace(/\"/g, ""));
          }
      });
    AsyncStorage.getItem('id').then((currentId) => {
          if(currentId){
              setCurrent(currentId);
          }
      });

  });

useFocusEffect(
    useCallback(() => {
    fetch("http://" + ip_address + "/v1/users/getByLocation/" + currentId + "/" + offset + "/" + latitude+ "/"+longitude+"/" + distance)
      .then((response) => response.json())
        .then((json) => setData(json))
        .then((json) => setOg(json))
        .catch((error) => console.error(error))
        .finally(()=>setLoading(false));
  }, [currentId, f_count])
  );

  const renderitem = (user) => (

    <UserCard
      listId={user.item.id}
      horizontal={false}
      firstName={user.item.firstName}
      lastName = {user.item.lastName}
      email= {user.item.email}
      age= {user.item.age}
      gender={user.item.gender}
      city={user.item.city}
      my_latitude={latitude}
      my_longitude={longitude}
      longitude={user.item.longitude}
      latitude={user.item.latitude}
      state={user.item.state}
      bio={user.item.bio}
      gym={user.item.gym}
      fullName={user.item.fullName}
      instagram={user.item.instagram}
      spotify={user.item.spotify}
      interests={user.item.interests}
    />
  )
  return (
    <View style={{backgroundColor:theme.backgroundColor, flex: 1}}>
    <Header
      barStyle= {theme.barColor}
      leftComponent={{text: 'Discovery', style: { color:theme.colorName , fontWeight: '600', fontSize: 30, paddingLeft: "5%"} }}
      placement="left"
      containerStyle={{
        backgroundColor:"transparent",
        borderBottomWidth:0,
        paddingVertical: 20,
      }}
      rightComponent={(props) => <DiscoveryNavigationDrawerHeader {...props} cityName={cityName} distance={distance} currentId={currentId} f_count={f_count} setCount={setCount} longitude={longitude} latitude={latitude} data={data} setData={setData} setLoading={setLoading} isLoading={isLoading} ogVals={ogVals}/>}

    />

      <View style={styles.container}>
      {/* <TopBar/> */}
      {isLoading ? <Text>Not Loaded</Text> :
        <FlatList
          refreshing = {true}
          data = {data}
          keyExtractor= {(item) => item.id.toString()}
          renderItem = {renderitem}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={()=> <Text style={{
            paddingVertical: "5%",
            fontSize: 17,
            fontWeight: '400',
            color:theme.colorCity,
          }}>Top Profiles</Text>}/>

      }

      </View>
    </View>


  )
}

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 15,

      flex: 11,
      alignItems: 'center',

      // overflow: 'hidden',
    },



});
