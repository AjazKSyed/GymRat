import "react-native-gesture-handler";
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
import ImageView from 'react-native-image-view';
import axios from 'axios';
import * as Linking from 'expo-linking';
import { List } from 'react-native-paper';
import { Avatar, Overlay, Button, Header} from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { Component, useEffect, useState, useCallback, useContext } from "react";
import Svg, { Circle, SvgCss, Ellipse,G,TSpan,TextPath,Path,Polygon,Polyline,Line,Rect,Use,Symbol,Defs,LinearGradient,RadialGradient,Stop,ClipPath,Pattern,Mask,} from 'react-native-svg';

import ProfileNavigationDrawerHeader from '../../../Navigation/ProfileNavigationDrawerHeader';
import NavigationDrawerHeader from '../../../Navigation/NavigationDrawerHeader';
import * as FileSystem from 'expo-file-system';
import TikTokLink from '../../../Navigation/Components/TikTokLink';
import InterestItem from './InterestItem';
import InstagramLink from '../../../Navigation/Components/InstagramLink';
import SpotifyLink from '../../../Navigation/Components/SpotifyLink';
import FacebookLink from '../../../Navigation/Components/FacebookLink';
import * as SecureStore from 'expo-secure-store';
import { useProfileState, useProfileDispatch } from '../../../../Contexts/ProfileContext';

import { ThemeContext } from '../../../../Contexts/theme-context';

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";



// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //
export default function ProfileScreen({navigation}) {
  const { dark, sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
  const dispatch = useProfileDispatch();
  const {url, id, firstName, lastName, gender, age, city, _state, longitude, latitude, gym, bio, spotify, instagram, tiktok, facebook, profileImgPath,
        generalImgPath_0, generalImgPath_1, generalImgPath_2, generalImgPath_3, interests, imgPaths, profileImgId, generalImgId1, generalImgId2, generalImgId3, generalImgId4 } = useProfileState();
  const { height, width } = useWindowDimensions();
  const imageHeightM = 0.71 * height;
  const [token, setToken] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState("");



    const renderItem = (interest) => (
    <InterestItem
      interestName = {interest.item.interestName}
      horizontal={true}
    />
  );

  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getToken() {
      await SecureStore.getItemAsync('user_id').then((data_id)=> {
        setToken(data_id);
        dispatch({type:'update', value:"id",data:data_id});
      });
  };
  getToken();
    fetch("http://" + ip_address + "/v1/users/" + id)
          .then((response) => response.json())
            .then((json) => {
        setData(json);
        dispatch({type:'update', value:"interests",data:json[0]["interests"]});
        dispatch({type:'update', value:"imgPaths",data:json[0].user_pics});

        dispatch({type:'update', value:"firstName", data: json[0]["firstName"]});
        dispatch({type:'update', value:"lastName", data: json[0]["lastName"]});
        dispatch({type:'update', value:"gender", data: json[0]["gender"]});
        dispatch({type:'update', value:"age", data: json[0]["age"]});
        dispatch({type:'update', value:"city", data: json[0]["city"]});
        dispatch({type:'update', value:"_state", data: json[0]["state"]});
        dispatch({type:'update', value:"longitude", data: json[0]["longitude"]});
        dispatch({type:'update', value:"latitude", data: json[0]["latitude"]});
        dispatch({type:'update', value:"gym", data: json[0]["gym"]});
        dispatch({type:'update', value:"bio", data: json[0]["bio"]});
        dispatch({type:'update', value:"spotify", data: json[0]["spotify"]});
        dispatch({type:'update', value:"instagram", data: json[0]["instagram"]});
        dispatch({type:'update', value:"tiktok", data: json[0]["tiktok"]});
        dispatch({type:'update', value:"facebook", data: json[0]["facebook"]});
      })
            .catch((error) => console.error(error))
            .finally(()=>{
              setLoading(false);
            });


   }, [id]);

const imagesModalViews = [
    {
        source: {
            uri:"https://mocah.org/uploads/posts/952665-JoeyJazz-moth-space-jungle.jpg",
        },
        title: 'Jungle',
        width: width,
        height: imageHeightM,
    },
    {
        source: {
            uri:"https://w.wallha.com/ws/3/m5CafQgI.jpg",
        },
        title: 'Unity',
        width: width,
        height: imageHeightM,
    },
    {
        source: {
            uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0rerfockvXqEe43Ly0hgfpIVyACt_srHTg&usqp=CAU",
        },
        title: 'Etheral Sky',
        width: width,
        height: imageHeightM,
    },
    {
        source: {
            uri:"https://p4.wallpaperbetter.com/wallpaper/290/484/904/joeyjazz-science-fiction-landscape-space-art-hd-wallpaper-preview.jpg",
        },
        title: 'joey Jazz artwork',
        width: width,
        height: imageHeightM,
    },
];

  let instagramUrl = 'https://www.instagram.com/' + instagram;
  let spotifyUrl = 'https://open.spotify.com/user/' + spotify;
  let tiktokUrl = 'https://www.tiktok.com/@' + tiktok;
  let facebookUrl = 'https://www.facebook.com/' + facebook;

  let fullName = firstName + " " + lastName;

  let hasIg = instagram !== null && instagram !== "";
  let hasSp = spotify !== null &&  spotify !== "";
  let hasTk = tiktok !== null &&  tiktok !== "";
  let hasFb = facebook !== null && facebook !== "";
  let hasProfImg = profileImgPath !== null && profileImgPath !== '';
  let hasGenImg = generalImgPath_0 !== null && generalImgPath_0 !== '';

   return (
    <View style={{backgroundColor: theme.backgroundColor, flex: 1}}>
          <ImageView
        images={imagesModalViews}
        imageIndex={0}
        animationType="slide"
        isVisible={imageModalVisible}
        onClose={() => {
          setImageModalVisible(!imageModalVisible);
        }}
        renderFooter={(currentImage) => (<View><Text>{currentImage.title}</Text></View>)}

      />
    <Header
      barStyle= {theme.barColor}
      rightComponent={(props) => <ProfileNavigationDrawerHeader {...props} navigationProps={navigation}/>}
      centerComponent={{text: 'Profile', style: { color:theme.colorName , fontWeight: '600', fontSize: 30} }}
      placement="left"
      containerStyle={{
        backgroundColor:"transparent",
        borderBottomWidth:0,
        paddingTop: 20,
        paddingBottom: 10,
      }}
      leftComponent={<NavigationDrawerHeader navigationProps={navigation} />}
    />

        {/* edit button */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.UserDetails}>


                {hasProfImg ?
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
                  <LinearGradient id="paint0_radial_676_1946" x1="10.6399" y1="74.9961" x2="146.434" y2="74.9961" gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#1B1E2A"/>
                    <Stop offset="1" stopColor="#234A61"/>
                  </LinearGradient>
                  </Defs>
                </Svg>
                <Image style={{position: 'absolute', borderRadius: 130,height: 127,
                                width: 127, transform: [{ translateY: 9}] }}
                              source={ profileImgFileRoute}/>



               </View>



                  :
                <View style={styles.img}>


                                  <Svg width="147.13" height="147.13" viewBox="0 0 117 117" fill="none">
                  <Path d="M58.4587 116.917C90.7446 116.917 116.917 90.7446 116.917 58.4587C116.917 26.1729 90.7446 0 58.4587 0C26.1729 0 0 26.1729 0 58.4587C0 90.7446 26.1729 116.917 58.4587 116.917Z" fill={theme.profileImg}/>
                  <Defs>
                  <RadialGradient id="paint0_radial_575_887" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(88.696 17.2785) rotate(106.881) scale(104.126)">
                    <Stop stopColor="#913E98"/>
                    <Stop offset="1" stopColor="#2D1E48"/>
                  </RadialGradient>
                  </Defs>
                  <Defs>
                  <RadialGradient id="paint0_radial_478_2717" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(88.696 17.2785) rotate(106.881) scale(104.126)">
                    <Stop stopColor="#8160BE"/>
                    <Stop offset="1" stopColor="#2D1E48"/>
                  </RadialGradient>
                  </Defs>
                  <Defs>
                  <RadialGradient id="paint0_radial_676_1945" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(111.847 21.7427) rotate(106.881) scale(131.029)">
                    <Stop stopColor="#BF2E85"/>
                    <Stop offset="1" stopColor="#3E126A"/>
                  </RadialGradient>
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
                        color: 'white',
                        fontSize:60.4,
                        fontWeight: '500',
                      }}
                    >
                      {firstName.charAt(0) + lastName.charAt(0)}
                    </Text>
              </View>

                }



              <Text style={{
                color: theme.colorName,
                fontSize: 27,
                paddingTop: "4%",
                fontWeight: "bold",
                textAlign: "center",

              }}>
                {fullName},{" "}
                {age}
              </Text>

              <Text style={{
                color: theme.colorCity,
                fontSize: 18,
                paddingTop: "2%",
                textAlign: "center",
              }}>
                {city}, {_state}
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
              }}>{bio}</Text>
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
              }}>{gym}</Text>

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
                      data = {interests}
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
                  data={imgPaths}
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