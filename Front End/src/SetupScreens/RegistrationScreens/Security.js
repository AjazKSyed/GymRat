import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import { StyleSheet, TextInput, SafeAreaView, Alert, FlatList,View, useWindowDimensions, Text,Pressable, Modal, ActivityIndicator, Image, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView, Appearance } from 'react-native';
import axios from 'axios';
import "react-native-gesture-handler";
import Back from '../../Tabs/Navigation/Back';
import { Avatar, Overlay, Button, Header, CheckBox} from "react-native-elements";
import SecurityCheck from './Components/SecurityCheck'
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import GradientButton from 'react-native-gradient-buttons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Svg, { Rect } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
// contexts
import { ThemeContext } from '../../Contexts/theme-context';
import { useRegistrationState, useRegistrationDispatch } from '../../Contexts/RegistrationContext';
// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //


async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    alert('No values stored under that key.');
  }
}

const Security = () => {
  const navigation = useNavigation();
  const { dark, sport, deep, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
  const [ questionList, setQuestionList ] = useState([]);
  const { height, width } = useWindowDimensions();

  const dispatch = useRegistrationDispatch();
  const {id, questionOne, answerOne, questionTwo, answerTwo, questionThree, answerThree, q1text, q2text,q3text } = useRegistrationState();
  const [modalVisible, setModalVisible] = useState(false);
  const [ questionNumber, setQuestionNumber ] = useState('');
  const [ questionText, setQuestionText ] = useState('');

  const [value, onChangeValue] = React.useState('auth key:');
 useEffect(()=>{
    axios.get('http://' + ip_address + '/v1/security_questions/get')
      .then(res=> {setQuestionList(res.data)});
  },[]);

  const renderQuestions = (sec_question) => (
    <SecurityCheck
      id={sec_question.item.id}
      question={sec_question.item.question}
      questionNumber={questionNumber}
      questionText={questionText}
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
      horizontal={false}
    />
  )

    const handleSubmitPress = () => {
      console.log(questionOne);
      console.log(answerOne);

      console.log(questionTwo);
      console.log(answerTwo);

      console.log(questionThree);
      console.log(answerThree);
      console.log(id);


        if (!questionOne) {
            alert("Please select question 1");
            return;
        }
        if (!answerOne) {
            alert("Please fill answer 1");
            return;
        }
        if (!questionTwo) {
            alert("Please select question 2");
            return;
        }
        if (!answerTwo) {
            alert("Please fill answer 2");
            return;
        }
        if (!questionThree) {
            alert("Please select question 3");
            return;
        }
        if (!answerThree) {
            alert("Please fill answer 3");
            return;
        }
      AsyncStorage.setItem("id", JSON.stringify(id));
      save("user_id", JSON.stringify(id));
      save("auth_key", JSON.stringify(value));
      navigation.navigate('PersonalInformation');
  };

  return (
    <View style={{
            backgroundColor: theme.splash,flex:1
        }}>
    <Header
      barStyle= {theme.barColor}
      centerComponent={{text: 'Security', style: { color:theme.colorName , fontWeight: '600', fontSize: 25, paddingTop: "1%"} }}
      containerStyle={{
        backgroundColor:"transparent",
        borderBottomWidth:0,
        paddingVertical: 20,
      }}
      leftComponent={<Back navigationProps={navigation}/>}

    />
        <KeyboardAwareScrollView style={{backgroundColor: theme.splash, width: width}}>

        <SafeAreaView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
                <View style={{   backgroundColor:theme.backgroundColor, paddingTop: "5%",  alignItems: "center",}}>

              <Text style={{color: sport ? theme.updateButtonL : theme.settingsGeneral,  fontWeight: '600', fontSize: 20,paddingTop: "10%",paddingBottom: "4%"}}>Select a question</Text>
            </View>
      <View style={{flex: 1, borderWidth: .3, borderColor: theme.backgroundColor, backgroundColor:theme.backgroundColor,  paddingVertical: "5%"}}>
          <FlatList
            data = {questionList}
            keyExtractor= {(item) => item.id.toString()}
            renderItem = {renderQuestions}
            showsVerticalScrollIndicator={false}
          />
            </View>



        </Modal>


      <View style={{
          flex: 1,
          alignItems: 'left',
          paddingTop:0.01*height,
          paddingHorizontal: '10%', flexDirection:'column',
      }}>
      <Text style={{
                width: '95%',
                color: theme.colorText,
                fontSize: 15,
                fontWeight: '400',
                textAlign: "left",
                lineHeight: 22,
              }}>In order to secure your account please choose three (3) security questions.</Text>

        {/*question 1*/}
            <Text style = {{paddingTop: "5%",paddingBottom: "2%",fontSize: 14,fontWeight: '400',color: theme.settingsGeneral,}}>Security Question 1</Text>
          <Pressable onPress={() => { setQuestionNumber("questionOne"); setQuestionText("q1text"); setModalVisible(true); }}>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderWidth: 0.5,
            borderColor: '#000',
            height: 0.05 * height,
            width:0.8 * width,
            borderRadius: 5,
          }}>
            <ScrollView horizontal style={{marginHorizontal: "4%"}}>
              <Text style={{ color: theme.settingsText, fontSize: 15}}>{q1text}</Text>
            </ScrollView>
          </View>
          </Pressable>


          <Text  style = {{paddingTop: "5%",paddingBottom: "2%",fontSize: 14,fontWeight: '400',color: theme.settingsGeneral,}}>Answer 1</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderWidth: 0.5,
            borderColor: '#000',
            height: 0.05 * height,
            borderRadius: 5,
          }}>
          <TextInput
              style={{flex: 1, paddingHorizontal: "4%", color: theme.settingsText, fontSize: 15}}
              onChangeText={(answerOne) => dispatch({type:'update', value:"answerOne",data:answerOne})}
              placeholderTextColor={theme.inactiveTintColor}
              placeholder="Enter Answer"
              autoCapitalize="none"
              keyboardAppearance={dark ? 'dark' : 'light'}
              returnKeyType="next"
              blurOnSubmit={false}
            />
        </View>


        {/*question 2*/}
            <Text style = {{paddingTop: "5%",paddingBottom: "2%",fontSize: 14,fontWeight: '400',color: theme.settingsGeneral,}}>Security Question 2</Text>
          <Pressable onPress={() => { setQuestionNumber("questionTwo"); setQuestionText("q2text");console.log(questionNumber); setModalVisible(true); }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderWidth: 0.5,
            borderColor: '#000',
            height: 0.05 * height,
            width:0.8 * width,
            borderRadius: 5,
          }}>
            <ScrollView horizontal style={{marginHorizontal: "4%"}}>
              <Text style={{ color: theme.settingsText, fontSize: 15}}>{q2text}</Text>
            </ScrollView>
          </View>
          </Pressable>

          <Text  style = {{paddingTop: "5%",paddingBottom: "2%",fontSize: 14,fontWeight: '400',color: theme.settingsGeneral,}}>Answer 2</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderWidth: 0.5,
            borderColor: '#000',
            height: 0.05 * height,
            borderRadius: 5,
          }}>
          <TextInput
              style={{flex: 1, paddingHorizontal: "4%", color: theme.settingsText, fontSize: 15}}
              onChangeText={(answerTwo) => dispatch({type:'update', value:"answerTwo",data:answerTwo})}
              placeholderTextColor={theme.inactiveTintColor}
              placeholder="Enter Answer"
              keyboardAppearance={dark ? 'dark' : 'light'}
              autoCapitalize="none"
              returnKeyType="next"
              blurOnSubmit={false}
            />
        </View>

        {/*question 3*/}
            <Text style = {{paddingTop: "5%",paddingBottom: "2%",fontSize: 14,fontWeight: '400',color: theme.settingsGeneral,}}>Security Question 3</Text>

          <Pressable onPress={() => { setQuestionNumber("questionThree"); setQuestionText("q3text");console.log(questionNumber); setModalVisible(true); }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderWidth: 0.5,
            borderColor: '#000',
            height: 0.05 * height,
            width:0.8 * width,
            borderRadius: 5,
          }}>
            <ScrollView horizontal style={{marginHorizontal: "4%"}}>
              <Text style={{ color: theme.settingsText, fontSize: 15}}>{q3text}</Text>
            </ScrollView>
          </View>
          </Pressable>

          <Text  style = {{paddingTop: "5%",paddingBottom: "2%",fontSize: 14,fontWeight: '400',color: theme.settingsGeneral,}}>Answer 3</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderWidth: 0.5,
            borderColor: '#000',
            height: 0.05 * height,
            borderRadius: 5,
          }}>
          <TextInput
              style={{flex: 1, paddingHorizontal: "4%", color: theme.settingsText, fontSize: 15}}
              onChangeText={(answerThree) => dispatch({type:'update', value:"answerThree",data:answerThree})}
              placeholderTextColor={theme.inactiveTintColor}
              placeholder="Enter Answer"
              autoCapitalize="none"
              returnKeyType="next"
              keyboardAppearance={dark ? 'dark' : 'light'}
              blurOnSubmit={false}
            />
        </View>



              </View>


        <View style={{marginVertical: '6.5%', alignItems:'center'}}>

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


    <View style ={{alignItems: 'center'}}>
      <Svg
    width={width}
    height={4}
    viewBox="0 0 290 4"
  >
          <Rect x={261} width={0.07 * width} height={4} rx={2} fill={theme.inactiveTabProg} />
          <Rect x={228} width={0.07 * width} height={4} rx={2} fill={theme.inactiveTabProg} />
          <Rect x={195} width={0.07 * width} height={4} rx={2} fill={theme.inactiveTabProg} />
          <Rect x={163} width={0.07 * width} height={4} rx={2} fill={theme.inactiveTabProg} />
          <Rect x={131} width={0.07 * width} height={4} rx={2} fill={theme.inactiveTabProg} />
          <Rect x={98} width={0.07 * width} height={4} rx={2} fill={theme.inactiveTabProg} />
          <Rect x={65} width={0.07 * width} height={4} rx={2} fill={theme.inactiveTabProg} />
          <Rect x={32} width={0.07 * width} height={4} rx={2} fill={theme.inactiveTabProg} />
          <Rect  width={0.07 * width} height={4} rx={2}  fill={theme.updateButtonL} />
        </Svg>
      </View>
  </SafeAreaView>
      </KeyboardAwareScrollView>
      </View>

  );
}

export default Security;