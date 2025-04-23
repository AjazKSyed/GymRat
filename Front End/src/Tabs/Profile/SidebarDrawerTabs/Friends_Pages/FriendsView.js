// like discovery
// like the discovery.js
import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import { Avatar, Overlay, Button, Icon, CheckBox,Header} from 'react-native-elements';
import { TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import "react-native-gesture-handler";
 import { ThemeContext } from '../../../../Contexts/theme-context';

import FriendCard from './FriendCard';

import AsyncStorage from '@react-native-async-storage/async-storage';


// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //


export default function FriendsView()  {


  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [friendData, setFriendData] = useState();
  const [uidNumber, setuidNumber] = useState("");
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);

  // AysncStorage call to get these parameters
  useEffect(() => {
    AsyncStorage.getItem('id').then((uidNumber) => {
          if(uidNumber){
              setuidNumber(uidNumber);
          }
      });
  });

   useEffect(() => {
    fetch("http://" + ip_address + "/v1/user_friends/approved/" + uidNumber)
      .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(()=>setLoading(false));
    }, [uidNumber]);
console.log(data);

  const renderFriends = (user) => (

    <FriendCard
      listId={user.item.friendUserId}
      horizontal={false}
      firstName={user.item.friend_first_name}
      lastName = {user.item.friend_last_name}
    />
  )


  return (
    <SafeAreaView style={{backgroundColor: theme.backgroundColor, flex: 1}}>

      <View style={{
        backgroundColor: theme.backgroundColor, flex: 11, paddingTop: "2%", marginHorizontal:"3%",alignItems:'center'
      }}>
      {isLoading ? <Text>Not Loaded</Text> :
        <FlatList
          refreshing = {true}
          data = {data}
          keyExtractor= {(item) => item.id.toString()}
          renderItem = {renderFriends}
          showsVerticalScrollIndicator={false}/>

      }
      </View>
    </SafeAreaView>
  );
}

