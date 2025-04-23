import {
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
    FlatList,
    Pressable,
    Modal,
    View,
} from "react-native";
import React, {useContext, useEffect, useState, useRef, useMemo } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Avatar, Overlay, Button, Icon } from "react-native-elements";
import { RadioButton, Text } from 'react-native-paper';

// contexts
import { ThemeContext } from '../../../Contexts/theme-context';
import { useRegistrationState, useRegistrationDispatch } from '../../../Contexts/RegistrationContext';
const Gender = (props) => {
  const dispatch = useRegistrationDispatch();
  const {gender} = useRegistrationState();
  const [value, setValue] = React.useState('');
  const handleSelect = () => {
    props.setModalVisible(!props.modalVisible);
  };
  const { dark, sport, theme, toggle, deep, sportToggle, setSport} = useContext(ThemeContext);
  return (
    <RadioButton.Group onValueChange={newGenderValue => {
        setValue(newGenderValue);
        dispatch({type:'update', value:"gender",data:newGenderValue})
        handleSelect();}
     } value={gender}>
      <View>
      <RadioButton.Item label="Male" value="male" labelStyle={{color:dark ? 'white' : 'black'}} color={sport ? theme.updateButtonL : theme.gradientR}/>
      </View>
      <View>
      <RadioButton.Item label="Female" value="female" labelStyle={{color:dark ? 'white' : 'black'}} color={sport ? theme.updateButtonL : theme.gradientR}/>

      </View>
      <View>
      <RadioButton.Item label="Other" value="other" labelStyle={{color:dark ? 'white' : 'black'}} color={sport ? theme.updateButtonL : theme.gradientR}/>
      </View>
     <View>
      <RadioButton.Item label="Prefer Not Say" labelStyle={{color:dark ? 'white' : 'black'}} value="prefer_not_to_say" color={sport ? theme.updateButtonL : theme.gradientR}/>
      </View>
    </RadioButton.Group>
  );
};

export default Gender;