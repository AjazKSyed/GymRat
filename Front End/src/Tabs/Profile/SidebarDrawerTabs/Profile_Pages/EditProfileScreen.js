import React, {useState,useEffect,  Component,useCallback,useContext, createRef, FC, ReactElement} from 'react';
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActionSheetIOS,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  TouchableOpacity,
  Appearance,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Picker,
  TextInput,
} from 'react-native';
// import {  } from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';

import { Avatar, Overlay, Button, Header} from "react-native-elements";
import axios from 'axios';
// import DropDownPicker from 'react-native-dropdown-picker';
import GradientButton from 'react-native-gradient-buttons';
import Loader from '../../../Navigation/Loader.js';
import BackEditProfile from '../../../Navigation/BackEditProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemeContext } from '../../../../Contexts/theme-context';
// import GradientText from '../../../Navigation/Components/GradientText';
// import GradientSmallText from '../../../Navigation/Components/GradientSmallText';
// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //



export default function EditProfileScreen({ navigation, route }) {
    const { data } = route.params;
    const { dark, deep,sport, theme, toggle, sportToggle, setSport} = useContext(ThemeContext);
    let hasProf = route.params.profImg !== null && route.params.profImg !== '';
    const [pickedImagePath, setPickedImagePath] = useState(hasProf ? route.params.profImg : (dark ? 'https://i.pinimg.com/474x/8f/e6/66/8fe66626ec212bb54e13fa94e84c105c.jpg': 'https://i.pinimg.com/474x/76/94/84/769484dafbe89bf2b8a22379658956c4.jpg'));
    const [result, setResult] = useState('');
    // form states
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState("");
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
    const [imageAdded, setImageAdded] = useState(false);
    const firstNameRef = createRef();
    const lastNameRef = createRef();
    const ageRef = createRef();
    const citRef = createRef();
    const stateRef = createRef();
    const gymRef = createRef();
    const genderRef = createRef();

    const bioRef = createRef();
    const instagramRef = createRef();
    const spotifyRef = createRef();
    const tiktokRef = createRef();
    const facebookRef = createRef();
     // Get call to fill items in
    const [id, setId] = useState();

    useEffect(() => {
        AsyncStorage.getItem("userId").then((id) => {
            if (id) {
                setId(id);
            }
        });
    });

    const [first, setFirst] = useState(data["firstName"]);
    const [last, setLast] = useState(data["lastName"]);
    const [age, setAge] = useState(0);
    const [city, setCity] = useState(data["city"]);
    const [livState, setLivState] = useState(data["state"]);
    const [gym, setGym] = useState(data["gym"]);
    const [bio, setBio] = useState(data["bio"]);
    const [open, setOpen] = useState(false);
    const [gender, setGender] = useState(data["gender"]);
    const [items, setItems] = useState([
      {label: 'male', value: 'male'},
      {label: 'female', value: 'female'},
      {label: 'other', value: 'other'}
    ]);


    const [instagram, setInstagram] = useState(data["instagram"]);
    const [facebook, setFacebook] = useState(data["facebook"]);
    const [tiktok, setTiktok] = useState(data["tiktok"]);
    const [spotify, setSpotify] = useState(data["spotify"]);



  // This function is triggered when the "Select an image" button pressed
    const showImagePicker = async () => {
      // Ask the user for the permission to access the media library
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your photos!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({      mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,});

      // Explore the result
      console.log(result);

      if (!result.cancelled) {
        setPickedImagePath(result.uri);
        console.log(result.uri);
      }
    }

    // This function is triggered when the "Open camera" button pressed
    const openCamera = async () => {
      // Ask the user for the permission to access the camera
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
      }
      const result = await ImagePicker.launchCameraAsync();

      // Explore the result
      console.log(result);

      if (!result.cancelled) {
        setPickedImagePath(result.uri);
        console.log(result.uri);
      }
    }

    const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel','Choose from library', 'Take a photo'],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          showImagePicker();
        } else if (buttonIndex === 2) {
          openCamera();
        }
      }
    );

    const onUpdateSuccess = () => {
      navigation.navigate("ProfileScreen");
    }
    // multiple calls

    const putEdits = () => {
      fetch("http://"+ ip_address + "/v1/users/" + id, {
            method: "PUT",
            body: JSON.stringify({
                firstName: first,
                lastName: last,
                age: age,
                city: city,
                state: livState,
                gym: gym,
                gender: gender,
                bio: bio,
                fullName: first + " " + last,
                instagram: instagram,
                spotify: spotify,
                tiktok: tiktok,
                facebook: facebook
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                                setLoading(false);

                setIsUpdateSuccess(onUpdateSuccess);
            })
            .catch((error) => {
                              setLoading(false);

                console.error(error);
            });
    };
    const changePic = () => {

      const form = new FormData();

        form.append('image', {
          uri: pickedImagePath,
          type: 'image/jpg',
          name: 'profile.jpg',
        });
        form.append('imgType', 'profile');
        form.append('previousImgId', route.params.previousImgId);
        fetch("http://"+ ip_address + "/v1/user_pics/exp/" + id, {
          method: 'POST',
          body: form
        }).then((response) => {
                console.log(response);
                setImageAdded(true);
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };
    const handleSubmitButton = () => {
      changePic();
        putEdits();
    };

    return (

        <View style={{
            backgroundColor: theme.backgroundColor,flex:1
        }}>
     <Header
      barStyle= {theme.barColor}
      centerComponent={{text: 'Edit Profile', style: { color:theme.colorName , fontWeight: '600', fontSize: 25,paddingTop: "2%"} }}
      // placement="left"
      containerStyle={{
        backgroundColor:"transparent",
        borderBottomWidth:0,
        paddingTop: 20,
        paddingBottom: 10,
      }}
      leftComponent={<BackEditProfile navigationProps={navigation} />}
      rightComponent={{
          text: 'Update',
          onPress: () => handleSubmitButton(),
          style: { color: theme.gradientR,   fontWeight: '600', fontSize: 15,paddingTop: "13%", paddingRight: "10%"}
      }}
    />
                     <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            >
          <KeyboardAvoidingView enabled behavior = 'padding'>

      <Loader loading={loading} />
        <View style={{
                paddingTop: "10%",


            }}>
            <View style={{alignItems: 'center', paddingBottom: '10%'}}>
            <Avatar
              rounded
                source={{ uri: pickedImagePath }}
              size="xlarge"
              onPress={onPress}

            />
          </View>
          <View style={styles.SectionStyle}>
          <Text style={{color:theme.gradientL,
                fontSize: 15,
                textAlign: "left",
                fontWeight: "300",
                paddingVertical: 5,
              }}>First Name</Text>
            <TextInput
              style={{
                    color: theme.profileActive,
                    textAlign: 'left',
                    fontSize: 15,
                    height: "65%",
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderWidth: 1.5,
                    paddingLeft: 15,
                    borderRadius: 5,
                    borderColor: theme.cardBackground,
                    backgroundColor: theme.cardBackground,
              }}
              mode={'flat'}
              onChangeText={(first) => setFirst(first)}
              placeholder="Enter First Name"
              placeholderTextColor={dark ? '#5F5F5F' : '#B8B8B8'}
              autoCapitalize="sentences"
              returnKeyType="next"
              defaultValue={first}
              onSubmitEditing={() =>
                firstNameRef.current && firstNameRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

        {/* last name */}
        <View style={styles.SectionStyle}>
          <Text style={{color:theme.gradientL,
                fontSize: 15,
                textAlign: "left",
                fontWeight: "300",
                paddingVertical: 5,
              }}>Last Name</Text>
            <TextInput
              style={{
                    color: theme.profileActive,
                    textAlign: 'left',
                    fontSize: 15,
                    height: "65%",
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderWidth: 1.5,
                    paddingLeft: 15,
                    borderRadius: 5,
                    borderColor: theme.cardBackground,
                    backgroundColor: theme.cardBackground,
              }}
              mode={'flat'}
              onChangeText={(last) => setLast(last)}
              placeholder="Enter Last Name"
              placeholderTextColor={dark ? '#5F5F5F' : '#B8B8B8'}
              autoCapitalize="sentences"
              returnKeyType="next"
              defaultValue={last}
              onSubmitEditing={() =>
                lastNameRef.current && lastNameRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

        {/* gender */}
      <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingVertical: 20, }}>
      <View style = {{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '10%',
        height: 200,
        }}>
        <View style={styles.SectionPicker}>
           <Text style={{color:theme.gradientL,
                fontSize: 15,
                textAlign: "left",
                fontWeight: "300",
                paddingVertical: 5,
              }}>Gender</Text>
          {/* <DropDownPicker
              open={open}
              defaultValue={gender}
              value={gender}
              items={items}
              setOpen={setOpen}
              setValue={setGender}
              setItems={setItems}
              onChangeItem={(gender) => {
                setGender(gender)
              }}
              onChangeValue={(gender) => {
                setGender(gender)
              }}
              disableBorderRadius={true}
              dropDownContainerStyle={{
                borderColor: theme.cardBackground,
                backgroundColor: theme.cardBackground,
              }}
              dropDownDirection='DEFAULT'
              bottomOffset={10}
              style={{
                borderColor: theme.cardBackground,
                borderWidth: 1.5,
                borderRadius: 5,
                paddingVertical: 10,
                backgroundColor: theme.cardBackground,
                 height: 50,
              }}
              arrowStyle={{ borderColor:theme.profileActive }}
              containerStyle={{
                width: "90%",
              }}
              textStyle={{
                fontSize: 15,
                color: dark ? '#BDBADE' : '#CF93E4',
              }}
              labelStyle={{
                color: theme.profileActive,
              }}
              itemStyle={{
                color: "pink",
              }}
              placeholder="Select Gender"
              placeholderStyle={{
                color: dark ? '#5F5F5F' : '#B8B8B8',
              }}
          /> */}
        </View>

        {/* age */}
        <View style={styles.SectionSmall}>
          <Text style={{color:theme.gradientL,
                fontSize: 15,
                paddingLeft: 15,
                textAlign: "left",
                fontWeight: "300",
                paddingVertical: 5,
              }}>Age</Text>
            <TextInput
              style={{
                    color: theme.profileActive,
                    textAlign: 'center',
                    fontSize: 15,
                    height: 50,
                    width: 50,
                    marginLeft: 14,
                    borderWidth: 1.5,
                    borderRadius: 5,
                    borderColor: theme.cardBackground,
                    backgroundColor: theme.cardBackground,
              }}
              mode={'flat'}
              onChangeText={(age) => setAge(age)}
              placeholderTextColor={dark ? '#5F5F5F' : '#B8B8B8'}
              returnKeyType="next"
              ref={ageRef}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>

        </View>

      {/* city */}
      <View style = {{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '10%',
        }}>
        <View style={styles.sectionBigger}>
                    <Text style={{color:theme.gradientL,
                textAlign: "left",
                fontWeight: "300",
                paddingVertical: 5,
              }}>City</Text>
            <TextInput
              style={{
                color: theme.profileActive,
                textAlign: 'left',
                fontSize: 15,
                height: 50,
                width: "90%",
                paddingLeft: 15,
                paddingRight: 15,
                borderWidth: 1.5,
                paddingLeft: 15,
                borderRadius: 5,
                borderColor: theme.cardBackground,
                backgroundColor: theme.cardBackground,
              }}
              onChangeText={(city) => setCity(city)}
              placeholder="Enter City Name"
              placeholderTextColor={dark ? '#5F5F5F' : '#B8B8B8'}
              returnKeyType="next"
              defaultValue={city}
              autoCapitalize="sentences"
              ref={citRef}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>

        {/* state */}
        <View style={styles.SectionSmalls}>
                   <Text style={{color:theme.gradientL,
                fontSize: 15,
                textAlign: "left",
                fontWeight: "300",
                paddingVertical: 5,
              }}>State</Text>
            <TextInput
              style={{
                color: theme.profileActive,
                textAlign: 'center',
                fontSize: 15,
                width: 50,
                borderWidth: 1.5,
                height: 50,
                borderRadius: 5,
                borderColor: theme.cardBackground,
                backgroundColor: theme.cardBackground,
              }}
              mode={'flat'}
              onChangeText={(livState) => setLivState(livState)}
              placeholder="AA"
              placeholderTextColor={dark ? '#5F5F5F' : '#B8B8B8'}
              returnKeyType="next"
              defaultValue={livState}
              autoCapitalize="sentences"
              ref={stateRef}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
        </View>
      </View>
             {/* gym name */}
        <View style={styles.SectionStyle}>
                   <Text style={{color:theme.gradientL,
                fontSize: 15,
                textAlign: "left",
                fontWeight: "300",
                paddingVertical: 5,
              }}>Gym</Text>
            <TextInput
              style={{
                    color: theme.profileActive,
                    textAlign: 'left',
                    fontSize: 15,
                    height: "65%",
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderWidth: 1.5,
                    paddingLeft: 15,
                    borderRadius: 5,
                    borderColor: theme.cardBackground,
                    backgroundColor: theme.cardBackground,
              }}
              mode={'flat'}
              onChangeText={(gym) => setGym(gym)}
              placeholder="Enter Gym Name"
              placeholderTextColor={dark ? '#5F5F5F' : '#B8B8B8'}
              autoCapitalize="sentences"
              returnKeyType="next"
              defaultValue={gym}
              onSubmitEditing={() =>
                gymRef.current && gymRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>




        {/* bio */}
                <View style={styles.SectionStyle}>
                     <Text style={{color:theme.gradientL,
                fontSize: 15,
                textAlign: "left",
                fontWeight: "300",
                paddingVertical: 5,
              }}>Bio</Text>
            <TextInput
              style={{
                    color: theme.profileActive,
                    textAlign: 'left',
                    fontSize: 15,
                    textAlignVertical: "top",
                    height: "100%",
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderWidth: 1.5,
                    paddingTop:10,
                    borderRadius: 5,
                    borderColor: theme.cardBackground,
                    backgroundColor: theme.cardBackground,
              }}
              onChangeText={(bio) => setBio(bio)}
              placeholder="Tell me about yourself"
              placeholderTextColor={dark ? '#5F5F5F' : '#B8B8B8'}
              returnKeyType="next"
              defaultValue={bio}
              mode={'flat'}
              autoCapitalize="sentences"
              maxLength = {300}
              ref={bioRef}
              multiline={true}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>

           {/* ig name */}
        <View style={styles.SectionStyle}>
                    <Text style={{color:theme.gradientL,
                fontSize: 15,
                textAlign: "left",
                fontWeight: "300",
                paddingVertical: 5,
              }}>Instagram</Text>
            <TextInput
              style={{
                    color: theme.profileActive,
                    textAlign: 'left',
                    fontSize: 15,
                    height: "65%",
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderWidth: 1.5,
                    paddingLeft: 15,
                    borderRadius: 5,
                    borderColor: theme.cardBackground,
                    backgroundColor: theme.cardBackground,
              }}
              onChangeText={(instagram) => setInstagram(instagram)}
              placeholder="Enter Instagram username"
              placeholderTextColor={dark ? '#5F5F5F' : '#B8B8B8'}
              returnKeyType="next"
              defaultValue={instagram}
              onSubmitEditing={() =>
                instagramRef.current && instagramRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

           {/* Spotify name */}
        <View style={styles.SectionStyle}>
                    <Text style={{color:theme.gradientL,
                fontSize: 15,
                textAlign: "left",
                fontWeight: "300",
                paddingVertical: 5,
              }}>Spotify</Text>
            <TextInput
              style={{
                    color: theme.profileActive,
                    textAlign: 'left',
                    fontSize: 15,
                    height: "65%",
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderWidth: 1.5,
                    paddingLeft: 15,
                    borderRadius: 5,
                    borderColor: theme.cardBackground,
                    backgroundColor: theme.cardBackground,
              }}
              onChangeText={(spotify) => setSpotify(spotify)}
              placeholder="Enter Spotify Username"
              placeholderTextColor={dark ? '#5F5F5F' : '#B8B8B8'}
              returnKeyType="next"
              defaultValue={spotify}
              onSubmitEditing={() =>
                spotifyRef.current && spotifyRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
          <Text style={{color:theme.gradientL,
                fontSize: 15,
                textAlign: "left",
                fontWeight: "300",
                paddingVertical: 5,
              }}>Tiktok</Text>
            <TextInput
              style={{
                    color: theme.profileActive,
                    textAlign: 'left',
                    fontSize: 15,
                    height: "65%",
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderWidth: 1.5,
                    paddingLeft: 15,
                    borderRadius: 5,
                    borderColor: theme.cardBackground,
                    backgroundColor: theme.cardBackground,
              }}
              onChangeText={(tiktok) => setTiktok(tiktok)}
              placeholder="Enter Tiktok Username"
              placeholderTextColor={dark ? '#5F5F5F' : '#B8B8B8'}
              returnKeyType="next"
              defaultValue={tiktok}
              onSubmitEditing={() =>
                tiktokRef.current && tiktokRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
           <Text style={{color:theme.gradientL,
                fontSize: 15,
                textAlign: "left",
                fontWeight: "300",
                paddingVertical: 5,
              }}>Facebook</Text>
            <TextInput
              style={{
                    color: theme.profileActive,
                    textAlign: 'left',
                    fontSize: 15,
                    height: "65%",
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderWidth: 1.5,
                    paddingLeft: 15,
                    borderRadius: 5,
                    borderColor: theme.cardBackground,
                    backgroundColor: theme.cardBackground,
              }}
              onChangeText={(facebook) => setFacebook(facebook)}
              placeholder="Enter Facebook Username"
              placeholderTextColor={dark ? '#5F5F5F' : '#B8B8B8'}
              returnKeyType="next"
              defaultValue={facebook}
              onSubmitEditing={() =>
                facebookRef.current && facebookRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>


          {errortext != '' ? (
            <Text style={{
              color: dark ? '#5F5F5F' : '#DB7093',
              textAlign: "center",
              fontSize: 14,
            }}> {errortext} </Text>
          ) : null}


                <View style={{height: 50,}}/>
                    </View>
        </KeyboardAvoidingView>

            </ScrollView>


                 </View>

    );
}

const styles = StyleSheet.create({
  SectionStyle: {
    height: "6%",
    marginBottom: "10%",
    marginHorizontal: "10%",
  },
  SectionPicker: {
    height: "27%",
    width: "80%",
  },
  SectionSmall: {
    height: "27%",
    width: "20%",
  },
  sectionBigger:{
    height: "27%",
    width: "80%",
  },
  socials: {
    width: "50%",
    marginLeft: '50%',
    marginTop:50,
    paddingRight:5,
    flexDirection: 'row',
    justifyContent:'space-evenly'
  },
  Button: {
    paddingVertical:"5%",
  },
});

