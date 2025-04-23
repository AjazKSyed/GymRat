import React from 'react';
import {Icon} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';


export default function TabNavigatorItem({itemName, iconName, isFocused}) {

    const focusedOpacity = {opacity:isFocused ? 1 : .7}
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon
                    size= {25}
                    style={focusedOpacity}
                    name={iconName}
                    activeOpacity={.5}
                    color='white'
                />
            </View>

            <View style={styles.textContainer}>
            <Text style={[styles.itemText, focusedOpacity]}>{itemName}</Text>
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        width: '100%',
        paddingLeft: 45,
        paddingRight: 35,
        marginTop: 10,
    },
    iconContainer: {
        width: 'auto',
        marginRight: 30,
        display: 'flex',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'flex-start',
        width: '90%',
    },
    itemText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }

})