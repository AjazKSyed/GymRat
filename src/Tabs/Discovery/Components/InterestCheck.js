import {
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
    FlatList,
    Text,
    View,
} from "react-native";
import React, {useContext, useEffect, useState, useRef, useMemo } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Avatar, Overlay, Button, Icon, CheckBox } from "react-native-elements";

import { ThemeContext } from '../../../Contexts/theme-context';

export default function InterestCheck(props) {
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
  const [checked, setChecked] = useState(false);
  return (
          <View style={{
            flexDirection: 'row',
            marginHorizontal: 15,

          }}>
          <CheckBox
            center
            title={props.interestName}
            checked={checked}
            containerStyle={{
              backgroundColor:theme.bottomModalBack,
              borderWidth: 0,
            }}
            textStyle={{
              color: checked ? theme.checkedColor : ('grey'),
            }}
            checkedColor={theme.checkedColor}
            uncheckedColor= "grey"
            onPress={() => {
              setChecked(!checked);
              // props.setCleared(false);
              props.i_set.add(props.id);
              }
            }
          />
    </View>
  );
}