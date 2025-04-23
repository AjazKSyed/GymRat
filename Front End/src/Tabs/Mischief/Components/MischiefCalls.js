import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import { TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
 import { Avatar, Overlay, Button, Icon, CheckBox} from 'react-native-elements';
import axios from 'axios';

import { useFocusEffect,useIsFocused } from '@react-navigation/native';

import MessageCard from './MessageCard';
import { ThemeContext } from '../../../Contexts/theme-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

export default function MischiefCalls ({navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const isFocused = useIsFocused();

    const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
    const [currentId, setCurrent] = useState('');
    useEffect(() => {
      AsyncStorage.getItem('id').then((currentId) => {
            if(currentId){
                setCurrent(currentId);
            }
        });
    });
useFocusEffect(
    useCallback(() => {
    fetch("http://" + ip_address + "/v1/user_friends/approved/" + currentId)
          .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(()=>setLoading(false));
  }, [currentId])
  );
      const renderitem = (user) => (
        <MessageCard
          friendId={user.item.friendUserId}
          userId={user.item.userId}
          horizontal={false}
          firstName={user.item.friend_first_name}
          lastName = {user.item.friend_last_name}
        />
      )
    return (
      <View style={{   marginHorizontal: 15,
      flex: 11,
      alignItems: 'center',}}>
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
          }}>Recent Messages</Text>}/>

      }

      </View>
    );

}