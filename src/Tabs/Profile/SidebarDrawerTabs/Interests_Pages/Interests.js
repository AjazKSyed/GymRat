import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import { Avatar, Overlay, Header} from 'react-native-elements';
import {TouchableOpacity, Button, ActivityIndicator, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View } from 'react-native';
import axios from 'axios';
import "react-native-gesture-handler";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import BackProfiles from '../../../Navigation/BackProfiles';
import InterestCard from './InterestCard';

import { ThemeContext } from '../../../../Contexts/theme-context';


// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //




export default function Interests({ navigation})  {
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
  const [userInterests, setUserInterests] = useState([]);
  const [userId, setUserId] = useState()
  const [count, setCount] = useState(0);

  const [allInterests, setAllInterests] = useState([]);
  const getAllInterests = () => {
    axios.get('http://' + ip_address + '/v1/interests/')
      // .then(res=>console.log(res.data))
      .then(res=> {setAllInterests(res.data)})
      .catch(err=>console.log('get all int'+ err))
  }

  const getUserInterests = () => {
    axios.get('http://' + ip_address + `/v1/user_interests/${userId}`)
      .then(console.log('***********************'))
      .then(res=>{
        console.log(res.data)
        setUserInterests(res.data)
        checkInterest()
      })
      .catch(err=>console.log('get user int - '+ err))
    }

  const getUserId = () => {
    AsyncStorage.getItem('id')
    .then((userId) => {setUserId(userId)});
  }

  useEffect(()=>{
    getUserId()
    getAllInterests()
    getUserInterests()
  },[userId, count])

  // console.log(userInterests)
  const checkInterest =() => {
    console.log('checking')
    let checkedInterests = [...allInterests]
    for (var i = 0; i < userInterests.length; i++) {
      checkedInterests.filter(int=>{int.id != userInterests[i].interestId})
    }
  }

  const renderAllInterests = (interest) => (
    <InterestCard
      // selected={selected}
      intId={interest.item.id}
      horizontal={false}
      interestName = {interest.item.interestName}
      userId={userId}
      setCount={setCount}
      count={count}
      isUsers={false}
    />
  )

  const renderUserInterests = (interest) => (

    <InterestCard
      // selected={selected}
      intId={interest.item.interestId}
      horizontal={false}
      interestName = {interest.item.interest.interestName}
      userId={userId}
      setCount={setCount}
      count={count}
      isUsers={true}
    />
  )

  return (
    <View style={{backgroundColor: theme.backgroundColor, flex: 1}}>
      <Header
       barStyle= {theme.barColor}
       centerComponent={{text: "Interests", style: {color:theme.colorName, fontWeight: '600', fontSize: 30, paddingTop: "1%"} }}
       containerStyle={{
        backgroundColor:"transparent",
        borderBottomWidth:0,
        paddingVertical: 20,
       }}
        placement="left"
        leftComponent={<BackProfiles navigationProps={navigation}/>}
      />
      {/* temporary, adds another list for user's interests but does not remove them from all interests below */}
      <View style={styles.container}>
        <FlatList
          refreshing = {true}
          data = {userInterests}
          keyExtractor= {(item) => item.interestId.toString()}
          renderItem = {renderUserInterests}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
      <View style={styles.container}>
        <Text style={{color: theme.colorCity, fontSize: 20, marginTop: 20, marginBottom: 10}}>-- All Interests --</Text>
        <FlatList
          refreshing = {true}
          data = {allInterests}
          keyExtractor= {(item) => item.id.toString()}
          renderItem = {renderAllInterests}
          showsVerticalScrollIndicator={false}
          // numColumns={(allInterests.length) / 2}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})