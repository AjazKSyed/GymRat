import React, { Component, useState, useCallback,useContext, useEffect, useLayoutEffect } from "react";
import { Avatar, Overlay, Button, Icon, Header,CheckBox} from 'react-native-elements';
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  SvgXml,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import InputBar from "@paraboly/react-native-input-bar";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import { useFocusEffect,useIsFocused } from '@react-navigation/native';
import { ThemeContext } from '../../../Contexts/theme-context';
import MessageHeader from '../../Navigation/MessageHeader';
import Back from '../../Navigation/Back';
import MessageBubble from './MessageBubble';

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const Messages = ({ navigation, route }) => {

  const isFocused = useIsFocused();
  const axios = require('axios');
  const [entered, setEntered] = useState('');
  const [messages, setMessages] = useState([]);

  const [count, setCount] = useState(0);

  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);

  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');

  useEffect(() => {
      AsyncStorage.getItem('fName').then((fName) => {
              if(fName){
                  setFname(fName.replace(/['"]+/g, ''));
              }
          });
      AsyncStorage.getItem('lName').then((lName) => {
              if(lName){
                  setLname(lName.replace(/['"]+/g, ''));
              }
          });

  });

  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);

  const finUrl = "http://" + ip_address + "/v1/messages/groupchat/" + route.params.userId + "/" + route.params.friendId;

    useEffect(() => {
    axios.get(finUrl)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, [count]);
          console.log(data)

  const renderMessage = (index) => (

    <MessageBubble
      sentId={index.item.fromuserId}
      horizontal={false}
      text={index.item.body}
      createdAt = {new Date(index.item.createdAt)}
      currentId={route.params.userId}
      friendId={route.params.friendId}
      userFirstName={fName}
      friendFirstName={route.params.firstName}
    />
  )

  function sendValues(entered) {
      axios.post('http://' + ip_address + '/v1/messages/', {
      fromuserId: route.params.userId ,
      touserId: route.params.friendId,
      body: entered
    })
    .catch(err => console.log("message - " + err))
    .finally(function () {
        setCount(count+1);
        setEntered('');
    });
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{backgroundColor: theme.chatBackground, flex:1}}
    >

    <Header
      barStyle= {theme.barColor}
      leftComponent={<Back navigationProps={navigation}/> }
      centerComponent={(props) => <MessageHeader {...props} id={route.params.friendId} firstName={route.params.firstName} lastName={route.params.lastName}  />}
      containerStyle={{
        backgroundColor:theme.backgroundColor,
        borderBottomWidth:0,
        paddingVertical: 20,
        height: 110,
      }}
    />
 <View style={styles.container}>
      {/* <TopBar/> */}
      {isLoading ? <Text>Not Loaded</Text> :
        <FlatList
          refreshing = {true}
          data = {data}
          keyExtractor= {(item) => item.id.toString()}
          renderItem = {renderMessage}
          userMessageBackground = {true}
          showsVerticalScrollIndicator={false} inverted/>

      }
      </View>
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, justifyContent: "space-around"}}>
  {/* <SafeAreaView style={{backgroundColor:theme.inputBarBackground,}}> */}
     <InputBar multiline height={null} minHeight={50} disableSecondaryIcon={true}
      onChangeText={text => setEntered(text)}
      value={entered}
      onSendPress={() => sendValues(entered)}
    />
  {/* </SafeAreaView> */}
     </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>


  )
}

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 15,
      paddingBottom: 30,
      flex: 5,

      // overflow: 'hidden',
    },




});
export default Messages;
