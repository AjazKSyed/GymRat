import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  useWindowDimensions,
  FlatList,
  Text,
  View,
  Picker,
} from "react-native";
import ImageView from 'react-native-image-view';import { Avatar, Overlay, Button, Header} from "react-native-elements";
import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
 import Svg, { Circle, SvgCss, Ellipse,G,TSpan,TextPath,Path,Polygon,Polyline,Line,Rect,Use,Symbol,Defs,LinearGradient,RadialGradient,Stop,ClipPath,Pattern,Mask,} from 'react-native-svg';
import { useFocusEffect,useIsFocused } from '@react-navigation/native';
import { SliderBox } from "react-native-image-slider-box";
import FriendHeader2 from '../../../Navigation/FriendHeader2';
import Back from '../../../Navigation/Back';
import { ThemeContext } from '../../../../Contexts/theme-context';
import InstagramLink from '../../../Navigation/Components/InstagramLink';
import TikTokLink from '../../../Navigation/Components/TikTokLink';
import SpotifyLink from '../../../Navigation/Components/SpotifyLink';
import FacebookLink from '../../../Navigation/Components/FacebookLink';
import AsyncStorage from '@react-native-async-storage/async-storage';



// import GradientText from '../../../Navigation/Components/GradientText';
// import GradientSmallText from '../../../Navigation/Components/GradientSmallText';
import InterestItem from '../Profile_Pages/InterestItem';




// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //


import {getDistance, getPreciseDistance} from 'geolib';

export default function FriendsProfile({route, navigation}) {
    const {itemId} = route.params;
    console.log();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [userInterests, setUserInterests] = useState([]);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const window = useWindowDimensions();
  const windowHeight = window.height;
  const windowWidth = window.width;
  const imageHeightM = 0.71 * windowHeight;
  const isFocused = useIsFocused();
   const renderItem = (interest) => (
    <InterestItem
      interestName = {interest.item.interestName}
      horizontal={true}
    />
  );

const [generalImages, setGeneralImages] = useState([
        {uri:"https://mocah.org/uploads/posts/952665-JoeyJazz-moth-space-jungle.jpg"},
        {uri:"https://w.wallha.com/ws/3/m5CafQgI.jpg"},
        {uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0rerfockvXqEe43Ly0hgfpIVyACt_srHTg&usqp=CAU"},
        {uri:"https://p4.wallpaperbetter.com/wallpaper/290/484/904/joeyjazz-science-fiction-landscape-space-art-hd-wallpaper-preview.jpg"},
        ]);




const imagesModalViews = [
    {
        source: {
            uri:"https://mocah.org/uploads/posts/952665-JoeyJazz-moth-space-jungle.jpg",
        },
        title: 'Jungle',
        width: windowWidth,
        height: imageHeightM,
    },
    {
        source: {
            uri:"https://w.wallha.com/ws/3/m5CafQgI.jpg",
        },
        title: 'Unity',
        width: windowWidth,
        height: imageHeightM,
    },
    {
        source: {
            uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0rerfockvXqEe43Ly0hgfpIVyACt_srHTg&usqp=CAU",
        },
        title: 'Etheral Sky',
        width: windowWidth,
        height: imageHeightM,
    },
    {
        source: {
            uri:"https://p4.wallpaperbetter.com/wallpaper/290/484/904/joeyjazz-science-fiction-landscape-space-art-hd-wallpaper-preview.jpg",
        },
        title: 'joey Jazz artwork',
        width: windowWidth,
        height: imageHeightM,
    },
];
   const [dist, setDist] = useState('');
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);


    const finUrl = "http://" + ip_address + "/v1/users/" + JSON.stringify(itemId);
  useFocusEffect(
    useCallback(() => {
    axios.get(finUrl)
      .then(function (response) {
        console.log(response.data);
        setData(response.data[0]);
        setUserInterests(response.data[0]["interests"]);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, [])
  );




  let gymVal = !isLoading && data["gym"];



  let firstNameVal = !isLoading && data["firstName"];
  let lastNameVal = !isLoading && data["lastName"];
  let ageVal = !isLoading && data["age"];
  let cityVal = !isLoading && data["city"];
  let gender = !isLoading && data["gender"]

  let stateVal = !isLoading && data["state"];
  let bioVal = !isLoading && data["bio"];
  let fullName = !isLoading && data["fullName"];

  // let bioText = "" + bioVal;

  let instagram = !isLoading && data["instagram"];
  let instagramUrl = 'https://www.instagram.com/' + instagram;

  let spotify = !isLoading && data["spotify"];
  let spotifyUrl = 'https://open.spotify.com/user/' + spotify;

  let tiktok = !isLoading && data["tiktok"];
  let tiktokUrl = 'https://www.tiktok.com/@' + tiktok;

  let facebook = !isLoading && data["facebook"];
  let facebookUrl = 'https://www.facebook.com/' + facebook;


  // add variable to back end and actual links
  let hasIg = instagram !== null && instagram !== "";
  let hasSp = spotify !== null &&  spotify !== "";
  let hasTk = tiktok !== null &&  tiktok !== "";
  let hasFb = facebook !== null && facebook !== "";


  let interestString = "";
  let i_size = userInterests.length > 3 ? 3 : userInterests.length;
  for (var i = 0; i < i_size; i++) {
    if(i === userInterests.length - 1) {
      interestString += userInterests[i]["interestName"];
    } else {
      interestString += userInterests[i]["interestName"] + ' | ';
    }
  }
    return (
  <View style={{backgroundColor: theme.backgroundColor, flex: 1}}>
  <Header

      barStyle= {theme.barColor}
      rightComponent={(props) => <FriendHeader2 {...props} navigationProps={navigation} itemId={itemId} firstName={firstNameVal} lastName={lastNameVal}  /> }
      centerComponent={{text: " ", style: {color:theme.colorName, fontWeight: '600', fontSize: 1} }}
      leftComponent={<Back navigationProps={navigation}/> }
      containerStyle={{
        backgroundColor:"transparent",
        borderBottomWidth:0,
        paddingTop: 20,
        paddingBottom: 10,
      }}
    />
        {/* edit button */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.UserDetails}>

              <View style={styles.img}>
                <Svg width="150" height="150" viewBox="0 0 150 150" fill="none">
                  <Path d="M142.865 74.9961C142.865 112.479 112.479 142.865 74.9961 142.865C37.5131 142.865 7.12715 112.479 7.12715 74.9961C7.12715 37.5131 37.5131 7.12715 74.9961 7.12715C112.479 7.12715 142.865 37.5131 142.865 74.9961Z"  stroke={theme.profileImg} strokeWidth="10.13711"/>
                  <Defs>
                  <LinearGradient id="paint0_radial_575_887" x1="10.6399" y1="74.9961" x2="146.434" y2="74.9961" gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#913E98"/>
                    <Stop offset="1" stopColor="#2D1E48"/>
                  </LinearGradient>
                  </Defs>
                  <Defs>
                  <LinearGradient id="paint0_radial_478_2717" x1="10.6399" y1="74.9961" x2="146.434" y2="74.9961" gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#8160BE"/>
                    <Stop offset="1" stopColor="#2D1E48"/>
                  </LinearGradient>
                  </Defs>
                  <Defs>
                  <LinearGradient id="paint0_radial_676_1945" x1="10.6399" y1="74.9961" x2="146.434" y2="74.9961" gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#C22E83"/>
                    <Stop offset="1" stopColor="#8027A1"/>
                  </LinearGradient>
                  </Defs>
                  <Defs>
                  <RadialGradient id="paint0_radial_676_1946" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(111.847 21.7427) rotate(106.881) scale(131.029)">
                    <Stop stopColor="#234A61"/>
                    <Stop offset="1" stopColor="#1B1E2A"/>
                  </RadialGradient>
                  </Defs>
                </Svg>

                    <Text
                      style={{
                        paddingTop: "5%",
                        position: 'absolute',
                        color: theme.colorName,
                        fontSize:60.4,
                        fontWeight: '500',
                      }}
                    >
                      {!isLoading && firstNameVal.charAt(0) + lastNameVal.charAt(0)}
                    </Text>
                    </View>

              <Text style={{
                color: theme.colorName,
                fontSize: 27,
                paddingTop: "5%",
                fontWeight: "bold",
                textAlign: "center",

              }}>
                {fullName},{" "}
                {ageVal}
              </Text>

              <Text style={{
                color: theme.colorCity,
                fontSize: 18,
                paddingTop: "3%",
                textAlign: "center",
              }}>
                {cityVal}, {stateVal}
              </Text>


            <View>

              <Text style={{color:theme.gradientL,
                fontSize: 18,
                textAlign: "left",
                paddingHorizontal: "2%",
                fontWeight: "bold",
                paddingTop: "8%",
                paddingBottom: "2%",
              }}>Bio</Text>
              <Text style={{
                width: '95%',
                color: theme.colorText,
                fontSize: 15,
                fontWeight: '400',
                textAlign: "left",
                transform: [{ translateX: 8}],
                lineHeight: 22,
              }}>{bioVal}</Text>
              <Text style={{color:theme.gradientL,
                fontSize: 18,
                textAlign: "left",
                paddingHorizontal: "2%",
                fontWeight: "bold",
                paddingTop: "4%",
                paddingBottom: "2%",
              }}>Gym</Text>
              <Text style={{
                color:theme.colorText,
                fontSize: 15,
                paddingHorizontal: "2%",
                textAlign: "left",
              }}>{gymVal}</Text>

                <Text style={{color:theme.gradientL,
                fontSize: 18,
                textAlign: "left",
                paddingHorizontal: "2%",
                fontWeight: "bold",
                paddingTop: "4%",
                paddingBottom: "2%",
                }}>Interests</Text>
                <View style={{    paddingHorizontal: "2%", paddingBottom: "4%"}}>
                    <FlatList
                      refreshing = {true}
                      data = {userInterests}
                      keyExtractor= {(item) => item.id.toString()}
                      renderItem = {renderItem}
                      ItemSeparatorComponent={() => <View style={{ width: '2%'}}/>}
                      horizontal={true}
                      contentContainerStyle={{ paddingRight: '30%' }}
                      showsHorizontalScrollIndicator={false}
                      />
                  </View>




              <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={generalImages}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setImageModalVisible(true)}>
                      <Image
                          source={item}
                          style={{
                              width:160,
                              height:160,
                              borderRadius:8,
                              resizeMode:'cover',
                              margin:8,
                              marginRight: 30,
                          }}
                      />
                      </TouchableOpacity>
                  )}
              />

               <View style={styles.socials}>
                  {hasIg ? <InstagramLink instagram={instagramUrl}/> : null }
                  {hasFb ? <FacebookLink facebook={facebookUrl}/> : null }
                  {hasSp ? <SpotifyLink spotify={spotifyUrl}/> : null }
                  {hasTk ? <TikTokLink tiktok={tiktokUrl}/> : null }
                </View>
        </View>

          </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({

  UserDetails: {
    marginHorizontal: "2%",


  },
  img: {
    paddingTop: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  socials: {
        paddingTop: "5%",
        paddingLeft: '2%',
          marginRight: '4%',


    flexDirection: 'row',
  },
  SocSec: {
        paddingTop: "5%",
  }
});