import axios from "axios";
import React, { Component, useEffect, useState, useCallback, useContext } from "react";
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
// import { useNavigation } from "@react-navigation/native";
// import { Avatar, Overlay, Button, Icon, CheckBox } from "react-native-elements";
import { ThemeContext } from '../../../../Contexts/theme-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

export default function InterestCard(props) {
    // const navigation = useNavigation();
    const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
    const addInterest = () => {
        axios.post('http://' + ip_address + `/v1/user_interests/${props.userId}/${props.intId}`)
            .then(console.log("posted! userid: " + props.userId + " intId: " + props.intId))
            .catch(err => console.log("post interest - " + err))
            .finally(function () {
                props.setCount(props.count+1);
            })
    }

    const removeInterest = () => {
        axios.delete( 'http://' + ip_address + `/v1/user_interests/${props.userId}/${props.intId}`)
            .then(console.log("removed! userid: " + props.userId + " intId: " + props.intId))
            .catch(err => console.log("deleted interest - " + err))
            .finally(function () {
                props.setCount(props.count+1);
            })
    }

    return (
        <View style ={{paddingHorizontal: "5%", paddingVertical: '1%'}}>
            <TouchableOpacity
                style={{
                    flex: 1,
                    marginTop: "4%",
                    marginBottom: "3%",
                    padding: 15,
                    width: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 14.81,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    backgroundColor:theme.cardBackground,
                    overflow: "hidden",
                }}
                onPress={() => {
                    props.isUsers === true ? removeInterest(props.intId) : addInterest(props.intId)
                }}
            >
                <View style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                    width: "auto",
                    backgroundColor:theme.cardBackground,
                    overflow: "visible",
                    }}>
                    <View style={styles.names}>
                        <Text style={{
                            fontWeight: "500",
                            fontSize: 17,
                            color:theme.colorName,
                        }}>
                            {props.interestName}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    names: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },


});