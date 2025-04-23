
// Import React
import { Switch, TouchableOpacity, Modal, ActivityIndicator, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View , Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

import "react-native-gesture-handler";
import Back from '../../../Navigation/Back';
import { Avatar, Overlay, Header} from "react-native-elements";
import { ThemeContext } from './../../../../Contexts/theme-context';
import React, { Component, useEffect, useState, useCallback, useContext } from "react";
// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //


const PrivacyPolicy = () => {
  const navigation = useNavigation();
  const [filled, setFilled] = useState(false);
  const { dark, sport, deep, theme, toggle, sportToggle, deepToggle, setSport} = useContext(ThemeContext);




  return (
    <View style={{backgroundColor: theme.backgroundColor, flex: 1}}>
        <Header
          barStyle= {theme.barColor}
          centerComponent={{text: 'Privacy Policy', style: { color:theme.colorName , fontWeight: '600', fontSize: 30} }}
          placement="left"
          containerStyle={{
            backgroundColor:theme.settingsHeader,
            borderBottomWidth:0,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          leftComponent={<Back navigationProps={navigation}/>}
        />
          <ScrollView>

        <View style={{
          paddingTop: "4%",
          marginHorizontal: "4%",
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems:'center',
        }}>

            <Text style={{color: theme.settingsText, fontSize: 17, textAlign: "left", paddingHorizontal: "2%", fontWeight: "400", paddingTop: "4%", paddingBottom: "4%", }}>

Protecting the user’s (“You”) private information is GymRat’s priority. This Statement of Privacy applies to the GymRat application (“the App”) and GymRat LLC, and governs data collection and usage. For the purposes of this Privacy Policy,  unless otherwise noted, all references to GymRat LLC include GymRat. The GymRat application matches users with their most compatible workout partner application. By using the GymRat application, You consent to the data practices described in this statement.{`\n`}

Collection of your Personal Information{`\n`}
In order to better provide You with products and services offered, GymRat may collect personally identifiable information, such as Your:{`\n`}
{`\n`}
- First and Last Name{`\n`}
- E-mail Address{`\n`}
{`\n`}
GymRat may also collect anonymous demographic information, which is not unique to you, such as  your:{`\n`}
{`\n`}
- Age{`\n`}
- Gender{`\n`}
{`\n`}
GymRat does not collect any personal information about You unless You voluntarily provide it to GymRat.  However, You may be required to provide certain personal information to GymRat when You elect to use certain products or services. These may include: (a) registering for an account; (b) entering a  sweepstakes or contest sponsored by us or one of our partners; (c) signing up for special offers  from selected third parties; (d) sending us an email message; (e) submitting your credit card or  other payment information when ordering and purchasing products and services. To wit, we will  use your information for, but not limited to, communicating with you in relation to services and/or  products you have requested from us. We also may gather additional personal or non-personal  information in the future.{`\n`}
{`\n`}
Use of your Personal Information{`\n`}
GymRat collects and uses Your personal information to operate and deliver the services You have requested.{`\n`}
{`\n`}
GymRat may also use Your personally identifiable information to inform You of other products or services available from GymRat and its affiliates.{`\n`}
{`\n`}
Sharing Information with Third Parties{`\n`}
GymRat does not sell, rent or lease its customer lists to third parties.{`\n`}
{`\n`}
GymRat may share data with trusted partners to help perform statistical analysis, send you email or  postal mail, provide customer support, or arrange for deliveries. All such third parties are  prohibited from using your personal information except to provide these services to GymRat, and they are required to maintain the confidentiality of Your information.{`\n`}
{`\n`}
GymRat may disclose Your personal information, without notice, if required to do so by law or in  the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply  with legal process served on GymRat or the site; (b) protect and defend the rights or property of  GymRat; and/or (c) act under exigent circumstances to protect the personal safety of users of GymRat, or the public.{`\n`}
{`\n`}
Right to Deletion{`\n`}
Subject to certain exceptions set out below, on receipt of a verifiable request from You,{`\n`}
GymRat will:{`\n`}
• Delete Your personal information from its records; and{`\n`}
• Direct any service providers to delete Your personal information from their records.{`\n`}
Please note that GymRat may not be able to comply with requests to delete Your personal information if  it is necessary to:{`\n`}
• Complete the transaction for which the personal information was collected, fulfill the  terms of a written warranty or product recall conducted in accordance with federal  law, provide a good or service requested by you, or reasonably anticipated within the  context of our ongoing business relationship with you, or otherwise perform a contract  between you and us;{`\n`}
• Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal  activity; or prosecute those responsible for that activity;{`\n`}
• Debug to identify and repair errors that impair existing intended functionality;{`\n`}
• Exercise free speech, ensure the right of another consumer to exercise his or her right  of free speech, or exercise another right provided for by law;{`\n`}
• Comply with the California Electronic Communications Privacy Act;{`\n`}
• Engage in public or peer-reviewed scientific, historical, or statistical research in the  public interest that adheres to all other applicable ethics and privacy laws, when our  deletion of the information is likely to render impossible or seriously impair the  achievement of such research, provided we have obtained your informed consent;{`\n`}
• Enable solely internal uses that are reasonably aligned with Your expectations based on  your relationship with us;{`\n`}
• Comply with an existing legal obligation; or{`\n`}
• Otherwise use your personal information, internally, in a lawful manner that is compatible with the context in which You provided the information.{`\n`}
{`\n`}
Children Under Thirteen{`\n`}
GymRat does not knowingly collect personally identifiable information from children under the age of thirteen. If You are under the age of thirteen,You must ask Your parent or guardian for  permission to use this application.{`\n`}
{`\n`}
E-mail Communications{`\n`}
From time to time, GymRat may contact you via email for the purpose of providing  announcements, promotional offers, alerts, confirmations, surveys, and/or other general communication.{`\n`}

{`\n`}

Changes to this Statement{`\n`}
GymRat reserves the right to change this Privacy Policy from time to time. We will notify You  about significant changes in the way we treat personal information by sending a notice to the  primary email address specified in Your account, by placing a prominent notice on our application,  and/or by updating any privacy information. Your continued use of the application and/or Services  available after such modifications will constitute your: (a) acknowledgment of the modified Privacy  Policy; and (b) agreement to abide and be bound by that Policy.{`\n`}
{`\n`}
Contact Information{`\n`}
GymRat welcomes Your questions or comments regarding this Statement of Privacy. If you believe that GymRat has not adhered to this Statement, please contact GymRat at:{`\n`}

GymRat LLC{`\n`}
4361 Ventura Canyon Ave, #2{`\n`}
Los Angeles, California 91423{`\n`}

Email Address:{`\n`}
ggymratco@gmail.com{`\n`}

Telephone number:{`\n`}
3104221779{`\n`}

Effective as of January 06, 2022{`\n`}


            </Text>

        </View>
                </ScrollView>

      </View>

  );
};

export default PrivacyPolicy;
