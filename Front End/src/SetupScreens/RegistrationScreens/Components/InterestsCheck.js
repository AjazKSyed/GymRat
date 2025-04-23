import {
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    Image,
    useWindowDimensions,
    ScrollView,
    FlatList,
    Text,
    Pressable,
    View,
} from "react-native";
import React, {useContext, useEffect, useState, useRef, useMemo } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Avatar, Overlay, Button, Icon, CheckBox } from "react-native-elements";

// contexts
import { ThemeContext } from '../../../Contexts/theme-context';
import { useRegistrationState, useRegistrationDispatch } from '../../../Contexts/RegistrationContext';

export default function InterestsCheck(props) {
  const dispatch = useRegistrationDispatch();
  const {interests} = useRegistrationState();
  const { dark, sport, theme, deep} = useContext(ThemeContext);
  const checked = interests.has(props.id);
  const { height, width } = useWindowDimensions();

  // console.log(interests);

  return (

          <View style={{  flexDirection: 'row',flex: 1, height: 0.06* height, maxWidth: '50%'}} >

          <CheckBox
            center
            title={props.interestName}
            checked={checked}
            containerStyle={{
              backgroundColor:theme.splash,
              borderWidth: 0,
            }}
            textStyle={{
              color: (dark ? 'white' : theme.checkedColor),
            }}
            checkedColor={(sport ? theme.updateButtonL : theme.checkedColor)}
            uncheckedColor= "grey"
            onPress={() => {
              checked
                ? dispatch({ type: "removeInterest", interest: props.id })
                : dispatch({ type: "addInterest", interest: props.id });
            }}
          />
    </View>
  );
}
