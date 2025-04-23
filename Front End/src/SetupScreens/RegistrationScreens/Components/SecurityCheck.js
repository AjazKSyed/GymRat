import {
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
    FlatList,
    Text,
    Pressable,
    View,
} from "react-native";
import React, {useContext, useEffect, useState, useRef, useMemo } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Avatar, Overlay, Button, Icon } from "react-native-elements";
import { RadioButton } from 'react-native-paper';

// contexts
import { ThemeContext } from '../../../Contexts/theme-context';
import { useRegistrationState, useRegistrationDispatch } from '../../../Contexts/RegistrationContext';

export default function SecurityCheck(props) {
  const dispatch = useRegistrationDispatch();
  const {questionOne, questionTwo, questionThree, q1text, q2text, q3text} = useRegistrationState();
  const { dark, sport, theme, toggle, deep, sportToggle, setSport} = useContext(ThemeContext);
  var isDisabled = q1text === props.question || q2text === props.question || q3text === props.question ? true : false;
  return (
          <Pressable
            disabled={isDisabled}
            onPress={() => {
            dispatch({type:'update', value:props.questionNumber, data:props.id});
            dispatch({type:'update', value:props.questionText, data:props.question});
            props.setModalVisible(!props.modalVisible);
            }}
            >
          <View style={{
            flexDirection: 'row',
            alignItems:'center',
            marginHorizontal: 15,
          }}>
          <RadioButton
            value="first"
            color={  sport ? theme.updateButtonL : theme.gradientR}
            uncheckedColor={ theme.colorText}
            status={ isDisabled ? 'checked' : 'unchecked' }

           />
          <Text style ={{ color: isDisabled ? (deep ? '#1B7FC0' : (sport ? theme.updateButtonL : theme.gradientL)) : theme.colorText}}>{props.id}. {props.question}</Text>
    </View>
    </Pressable>
  );
}