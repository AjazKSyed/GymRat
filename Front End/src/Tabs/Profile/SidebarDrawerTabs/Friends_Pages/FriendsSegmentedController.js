// two screens a friends nav page and requests page
import React, { Component, useEffect, useState, useCallback, useContext } from "react";

// import all the components we are going to use
import "react-native-gesture-handler";
import { Avatar, Overlay, Button, Icon, CheckBox,Header} from 'react-native-elements';
import { Animated, TouchableOpacity, ActivityIndicator, Dimensions, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// importing Segmented Control Tab

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import RequestsView from './RequestsView';
import FriendsView from './FriendsView';

import BackProfiles from '../../../Navigation/BackProfiles';
import NavigationDrawerHeader from '../../../Navigation/NavigationDrawerHeader';
import { ThemeContext } from '../../../../Contexts/theme-context';




const FriendsSegmentedController = ({navigation}) => {


  const renderTabBar = props => (
    <TabBar
    {...props}
    getLabelText={({ route }) => route.title}
    indicatorStyle={{ backgroundColor: theme.activeTintColor , height: 2}}
    style={{backgroundColor: theme.backgroundColor}}
    // tabStyle={{width: 'auto'}}
    renderLabel={({ route, focused, color }) => (
      <Text style={{ color: focused ? theme.activeTintColor : theme.inactiveTintColor, margin: 8, fontSize: 20, fontWeight: '500'}}>
        {route.title}
      </Text>
    )}
  />

  );

  const renderScene = SceneMap({
    first: FriendsView,
    second: RequestsView,
  });

  const { dark, deep, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first' , title: 'Friends' },
    { key: 'second',  title: 'Requests' },
  ]);

  return (
    <View style={{backgroundColor: theme.backgroundColor, flex: 1}}>
      <Header
      barStyle= {theme.barColor}
      centerComponent={{text: 'My Friends', style: {color:theme.colorName, fontWeight: '600', fontSize: 30, paddingTop: "1%"} }}
      containerStyle={{
        backgroundColor:"transparent",
        borderBottomWidth:0,
        paddingTop: 20,
      }}
      leftComponent={<BackProfiles navigationProps={navigation}/>}
      placement="left"
    />
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      style={styles.container}
      swipeEnabled={false}
    />





      {/* <View style={styles.container}>
        {/* Simple Segmented with Custom Styling
        <SegmentedControlTab
          values={['Friends', 'Requests']}
          selectedIndex={customStyleIndex}
          onTabPress={handleCustomIndexSelect}
          tabsContainerStyle={{ height: 50, backgroundColor: theme.backgroundColor }}
          tabStyle={{
            backgroundColor: 'transparent',
            borderWidth: 0,
            borderColor: 'transparent'
          }}
          tabTextStyle={{ color: theme.inactiveTintColor, fontWeight: '500', fontSize: 20}}
           activeTabStyle={{
             backgroundColor: theme.backgroundColor,
            borderBottomWidth: 2,
            borderRightWidth:0,
            borderColor: 'transparent',
            // borderRadius: 10
          }}
          activeTabTextStyle={{ color: theme.activeTintColor}}
        />
        {customStyleIndex === 0 && (
          <FriendsView />

        )}
        {customStyleIndex === 1 && (
          <RequestsView />
        )}
      </View>
      */}

            </View>

  );
};

export default FriendsSegmentedController;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },


});
