import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import { Button, SearchBar, Header} from 'react-native-elements';
import { TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
 import Svg, { Circle, Path, Rect} from 'react-native-svg';

import Back from '../../Navigation/Back';
import { ThemeContext } from '../../../Contexts/theme-context';

import UserCard from '../Components/UserCard';
import AsyncStorage from '@react-native-async-storage/async-storage';


// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

export default function Profile({navigation}) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);

  // lcoation autofilter
  const [userLocation, setLocation] = useState('');

  // lcoation autofilter
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [distance, setDistance] = useState('');

  // makes sure user doesn't show up on the screen
  const [currentId, setCurrent] = useState('');

  const [searchInput, setInput] = useState('');
  const [count, setCount] = useState(0);

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
  useEffect(() => {
    console.log(searchInput);
    fetch('http://' + ip_address + '/v1/users/getUsersByName', {
        method: 'POST',
        body: JSON.stringify({
          fullName: searchInput,
          userId: currentId
        }),
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(()=>setLoading(false));
  },[searchInput,count]);
  console.log(data);

  const renderitem = (user) => (

    <UserCard
      listId={user.item.id}
      horizontal={false}
      my_latitude={latitude}
      my_longitude={longitude}
      firstName={user.item.firstName}
      lastName = {user.item.lastName}
      email= {user.item.email}
      age= {user.item.age}
      gender={user.item.gender}
      city={user.item.city}
      state={user.item.state}
      bio={user.item.bio}
      longitude={user.item.longitude}
      latitude={user.item.latitude}
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
      containerStyle={{
        backgroundColor: "transparent",
        borderBottomWidth:0,
        bottomBorderColor: 'white',
        paddingVertical: 5,
        transform: [{translateY: -1}],
      }}
    />
          {/* specify which platform later */}

      {/* <View style={{flexDirection: 'row', backgroundColor:isDark ? "#161617" : "transparent",}}> */}
        <SearchBar
          placeholder="Search Account Here..."
          placeholderTextColor={theme.searchText}
          platform= {theme.platform}
          lightTheme
          containerStyle={{backgroundColor:'transparent', width:"100%", borderBottomWidth:0,}}
          inputContainerStyle={dark ? theme.searchInputContainer : {borderRadius: 1} }
          inputStyle={{color:theme.searchInputText}}
          onChangeText={text => {
            setInput(text);
            setCount(count+1);
          }}
          onClear={text => {
            setInput('');
            setCount(count+1);
          }}
          value={searchInput}
          showCancel={true}
        />
      {/* </View> */}
      {/* <TopBar/> */}
      <View style={styles.container}>

      {isLoading ? <Text>Not Loaded</Text> :
        <FlatList
          refreshing = {true}
          data = {data}
          keyExtractor= {(item) => item.id.toString()}
          renderItem = {renderitem}
          showsVerticalScrollIndicator={false}
          />

      }

      </View>
    </View>


  )
}

const styles = StyleSheet.create({
    container: {

      flex: 11,
      alignItems: 'center',

      // overflow: 'hidden',
    },



});


