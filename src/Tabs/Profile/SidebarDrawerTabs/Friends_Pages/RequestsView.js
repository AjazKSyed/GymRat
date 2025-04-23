// simlar again to discovery but another request
import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import { Avatar, Overlay, Button, Icon} from 'react-native-elements';
import { TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View } from 'react-native';
import axios from 'axios';
import "react-native-gesture-handler";
 import { ThemeContext } from '../../../../Contexts/theme-context';
import RequestCard from './RequestCard';
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
 import { useFocusEffect,useIsFocused } from '@react-navigation/native';

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //



export default function RequestsView()  {


  const [data, setData] = useState();
  const [friendData, setFriendData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [uidNumber, setuidNumber] = useState("");
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
  const isFocused = useIsFocused();

  // AysncStorage call to get these parameters
  useEffect(() => {
    AsyncStorage.getItem('id').then((uidNumber) => {
          if(uidNumber){
              setuidNumber(uidNumber);
          }
      });
  });

useFocusEffect(
    useCallback(() => {
     fetch("http://"+ ip_address + "/v1/user_friends/pending/" + uidNumber)
      .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(()=>setLoading(false));
    }, [uidNumber])
    );

  const renderRequests = (user) => (

    <RequestCard
      listId={user.item.friendUserId}
      listUserId={user.item.userId}
      sentId={user.item.sentId}
      horizontal={false}
      firstName={user.item.friend_first_name}
      lastName = {user.item.friend_last_name}
    />
  )


  return (

<SafeAreaView style={{backgroundColor: theme.backgroundColor, flex: 1}}>

      <View style={{
        backgroundColor: theme.backgroundColor, flex: 11,paddingTop: "2%", marginHorizontal:"3%",alignItems:'center'
      }}>
      {isLoading ? <Text>Not Loaded</Text> :
        <FlatList
          refreshing = {true}
          data = {data}
          keyExtractor= {(item) => item.id.toString()}
          renderItem = {renderRequests}
          showsVerticalScrollIndicator={false}/>

      }
      </View>
    </SafeAreaView>



  );
}

const styles = StyleSheet.create({

    container: {

backgroundColor: '#FBFBFB',


      // overflow: 'hidden',
    },



});
