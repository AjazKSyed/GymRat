import { Switch, TouchableOpacity, Modal, ActivityIndicator, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Text, View , Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import "react-native-gesture-handler";
import Back from '../../../Navigation/Back';
import { Avatar, Overlay, Header} from "react-native-elements";
import { ThemeContext } from './../../../../Contexts/theme-context';
import React, { Component, useEffect, useState, useCallback, useContext } from "react";


// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //

const ip_address = "10.0.0.110:3000";

// !!!! VARIABLE TO CHANGE IP ADDRESS !!!! //


const TermsAndConditions = () => {
  const navigation = useNavigation();
  const [filled, setFilled] = useState(false);
  const { dark, sport, deep, theme, toggle, sportToggle, deepToggle, setSport} = useContext(ThemeContext);

  return (
    <View style={{backgroundColor: theme.backgroundColor, flex: 1}}>
        <Header
          barStyle= {theme.barColor}
          centerComponent={{text: 'Terms & Service', style: { color:theme.colorName , fontWeight: '600', fontSize: 30, } }}
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
              Terms and Conditions
Agreement between User and GymRat LLC
Welcome to GymRat! The GymRat App (the "Site") is comprised of various web pages operated  by GymRat LLC ("GymRat"). The service is offered to the user (“You”) conditioned on Your acceptance without modification of the terms, conditions, and notices contained herein (the "Terms"). Your use of Gymrat constitutes your agreement to all such Terms. Please read these terms carefully, and keep a copy of them for Your reference.
GymRat is a Social Networking/mathing based application.
Our app matches users with their most comparable workout partner.
Electronic Communications
Using GymRat or sending emails to GymRat constitutes electronic communications. You consent to receive electronic communications and You agree that all agreements, notices, disclosures and other communications that we provide to You electronically, via email and on the Site, satisfy any legal requirement that such communications be in writing.
Your Account
If You use this Site, You are responsible for maintaining the confidentiality of Your account and  password and for restricting access to Your computer or other device, and You agree to accept responsibility for all activities that occur under Your account or password. You may not assign or otherwise transfer Your account to any other person or entity. You acknowledge that GymRat is not responsible for third party access to Your account that results from theft or misappropriation of Your account. GymRat and its associates reserve the right to refuse or cancel service, terminate accounts, or remove or edit content in our sole discretion.
Children Under Thirteen
GymRat does not knowingly collect, either online or offline, personal information from persons under the age of thirteen. If You are under 18, You may use GymRat only with permission of a parent or guardian.
Links to Third Party Sites/Third Party Services
GymRat may contain links to other websites ("Linked Sites"). The Linked Sites are not under the  control of GymRat and GymRat is not responsible for the contents of any Linked Site, including  without limitation any link contained in a Linked Site, or any changes or updates to a Linked Site. GymRat is providing these links to You only as a convenience, and the inclusion of any link does not imply endorsement of the Linked Site by GymRat or any association with its operators.
Certain services made available via GymRat are delivered by third party sites and organizations. By using any product, service or functionality originating from the domain, You hereby acknowledge and consent that GymRat may share such information and data with any third party with whom GymRat has a contractual relationship to provide the requested product, service or functionality on behalf of GymRat users and customers.

No Unlawful or Prohibited Use/Intellectual Property
You are granted a non-exclusive, non-transferable, revocable license to access and use  GymRat strictly in accordance with these Terms of Use. As a condition of Your use of the Site, You warrant to GymRat that You will not use the Site for any purpose that is unlawful or prohibited by these Terms. You may not use the Site in any manner which could damage, disable, overburden, or impair the Site or interfere with any other party's use and enjoyment of the Site. You may not obtain or attempt to obtain any materials or information through any means not intentionally made available or provided for through the Site.
All content included as part of the Service, such as text, graphics, logos, images, as well as the  compilation thereof, and any software used on the Site, is the property of GymRat or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights. You agree to observe and abide by all copyright and other proprietary notices, legends or other  restrictions contained in any such content and will not make any changes thereto.
You will not modify, publish, transmit, reverse engineer, participate in the transfer or sale, create  derivative works, or in any way exploit any of the content, in whole or in part, found on the Site.  GymRat content is not for resale. Your use of the Site does not entitle you to make any  unauthorized use of any protected content, and in particular you will not delete or alter any  proprietary rights or attribution notices in any content. You will use protected content solely for  Your personal use, and will make no other use of the content without the express written  permission of GymRat and the copyright owner. You agree that You do not acquire any ownership  rights in any protected content. GymRat does not grant You any licenses, express or implied, to the intellectual property of GymRat or its licensors except as expressly authorized by these Terms.
Use of Communication Services
The Site may contain bulletin board services, chat areas, news groups, forums, communities,  personal web pages, calendars, and/or other message or communication facilities designed to  enable You to communicate with the public at large or with a group (collectively, "Communication  Services"). You agree to use the Communication Services only to post, send and receive messages and material that are proper and related to the particular Communication Service.
By way of example, and not as a limitation, You agree that when using a Communication Service, You will not: defame, abuse, harass, stalk, threaten or otherwise violate the legal rights (such as  rights of privacy and publicity) of others; publish, post, upload, distribute or disseminate any  inappropriate, profane, defamatory, infringing, obscene, indecent or unlawful topic, name, material or information; upload files that contain software or other material protected by intellectual  property laws (or by rights of privacy of publicity) unless you own or control the rights thereto or  have received all necessary consents; upload files that contain viruses, corrupted files, or any other similar software or programs that may damage the operation of another's computer; advertise or offer to sell or buy any goods or services for any business purpose, unless such Communication Service specifically allows such messages; conduct or forward surveys, contests, pyramid schemes or chain letters; download any file posted by another user of a Communication Service that You know, or reasonably should know, cannot be legally distributed in such manner; falsify or delete  any author attributions, legal or other proper notices or proprietary designations or labels of the origin or source of software or other material contained in a file that is uploaded; restrict or inhibit  any other user from using and enjoying the Communication Services; violate any code of conduct  or other guidelines which may be applicable for any particular Communication Service; harvest or otherwise collect information about others, including e-mail addresses, without their consent; or violate any applicable laws or regulations.
GymRat has no obligation to monitor the Communication Services. However, GymRat reserves  the right to review materials posted to a Communication Service and to remove any materials in its sole discretion. GymRat reserves the right to terminate Your access to any or all of the  Communication Services at any time without notice for any reason whatsoever.
GymRat reserves the right at all times to disclose any information as necessary to satisfy any  applicable law, regulation, legal process or governmental request, or to edit, refuse to post or to  remove any information or materials, in whole or in part, in GymRat's sole discretion.
Always use caution when giving out any personally identifying information about Yourself or Your children in any Communication Service. GymRat does not control or endorse the content,  messages or information found in any Communication Service and, therefore, GymRat specifically disclaims any liability with regard to the Communication Services and any actions resulting from Your participation in any Communication Service. Managers and hosts are not authorized GymRat spokespersons, and their views do not necessarily reflect those of GymRat.
Materials uploaded to a Communication Service may be subject to posted limitations on usage, reproduction and/or dissemination. You are responsible for adhering to such limitations if you upload the materials.

Materials Provided to GymRat or Posted on Any GymRat Web Page
GymRat does not claim ownership of the materials you provide to (including feedback and  suggestions) or post, upload, input or submit to any GymRat Site or its associated services  (collectively "Submissions"). However, by posting, uploading, inputting, providing or submitting Your Submission, You are granting GymRat, its affiliated companies, and necessary sublicensees permission to use Your Submission in connection with the operation of their Internet businesses, including, without limitation, the rights to: copy, distribute, transmit, publicly display, publicly perform, reproduce, edit, translate and reformat Your Submission; and to publish your name in connection with Your Submission.
No compensation will be paid with respect to the use of Your Submission, as provided herein.  GymRat is under no obligation to post or use any Submission You may provide and may remove any Submission at any time in GymRat's sole discretion.
By posting, uploading, inputting, providing or submitting Your Submission, You warrant and  represent that you own or otherwise control all of the rights to Your Submission as described in this section including, without limitation, all the rights necessary for You to provide, post, upload, input or submit the Submissions.



Third Party Accounts
You will be able to connect Your GymRat account to third party accounts. By connecting your  GymRat account to Your third party account, You acknowledge and agree that You are consenting to the continuous release of information about You to others (in accordance with Your privacy settings on those third party sites). If You do not want information about You to be shared in this manner, do not use this feature.
International Users
The Service is controlled, operated and administered by GymRat from its offices within the United States of America.  If You access the Service from a location outside the United States of America, You are responsible for compliance with all local laws. You agree that You will not use the GymRat Content accessed through GymRat  in any country or in any manner prohibited by any applicable laws, restrictions or regulations.
Indemnification
You agree to indemnify, defend and hold harmless GymRat, its officers, directors, employees,  agents and third parties, for any losses, costs, liabilities and expenses (including reasonable  attorney's fees) relating to or arising out of Your use of or inability to use the Site or services, any user postings made by You, Your violation of any terms of this Agreement or Your violation of any rights of a third party, or Your violation of any applicable laws, rules or regulations. GymRat reserves the right, at its own cost, to assume the exclusive defense and control of any matter otherwise subject to indemnification by You, in which event You will fully cooperate with GymRat in  asserting any available defenses.
Arbitration
In the event that You and GymRat (“the Parties”) are not able to resolve any dispute between them arising out of or concerning these Terms and Conditions, or any provisions hereof, whether in contract, tort, or otherwise at law or in equity for damages or any other relief, then such dispute shall be resolved only by final and binding arbitration pursuant to the Federal Arbitration Act, conducted by a single  neutral arbitrator and administered by the American Arbitration Association, or a similar arbitration service selected by the Parties, in a location mutually agreed upon by the Parties. The arbitrator's award shall be final, and judgment may be entered upon it in any court having jurisdiction. In the event that any legal or equitable action, proceeding or arbitration arises out of or concerns these Terms and Conditions, the prevailing Party shall be entitled to recover its costs and reasonable attorney's fees. The Parties agree to arbitrate all disputes and claims in regards to these Terms and Conditions or any disputes arising as a result of these Terms and Conditions, whether directly or indirectly, including tort claims that are a result of these Terms and Conditions. The Parties agree that the Federal Arbitration Act governs the interpretation and enforcement of this provision. The  entire dispute, including the scope and enforceability of this arbitration provision shall be  determined by the Arbitrator. This arbitration provision shall survive the termination of these Terms and Conditions.





Liability Disclaimer

THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE SITE MAY INCLUDE INACCURACIES OR  TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE  INFORMATION HEREIN. GYMRAT LLC AND/OR ITS SUPPLIERS MAY MAKE  IMPROVEMENTS AND/OR CHANGES IN THE SITE AT ANY TIME.
GYMRAT LLC AND/OR ITS SUPPLIERS MAKE NO REPRESENTATIONS ABOUT THE  SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, AND ACCURACY OF  THE INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED  GRAPHICS CONTAINED ON THE SITE FOR ANY PURPOSE. TO THE MAXIMUM  EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH INFORMATION,  SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS ARE PROVIDED "AS  IS" WITHOUT WARRANTY OR CONDITION OF ANY KIND. GYMRAT LLC AND/OR  ITS SUPPLIERS HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH  REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND  RELATED GRAPHICS, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND  NON-INFRINGEMENT.
TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT  SHALL GYMRAT LLC AND/OR ITS SUPPLIERS BE LIABLE FOR ANY DIRECT,  INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR  ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES  FOR LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY  CONNECTED WITH THE USE OR PERFORMANCE OF THE SITE, WITH THE DELAY  OR INABILITY TO USE THE SITE OR RELATED SERVICES, THE PROVISION OF OR  FAILURE TO PROVIDE SERVICES, OR FOR ANY INFORMATION, SOFTWARE,  PRODUCTS, SERVICES AND RELATED GRAPHICS OBTAINED THROUGH THE SITE,  OR OTHERWISE ARISING OUT OF THE USE OF THE SITE, WHETHER BASED ON  CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF  GYMRAT LLC OR ANY OF ITS SUPPLIERS HAS BEEN ADVISED OF THE  POSSIBILITY OF DAMAGES. BECAUSE SOME STATES/JURISDICTIONS DO NOT  ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL  OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU.  IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SITE, OR WITH ANY OF  THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO  DISCONTINUE USING THE SITE.
Termination/Access Restriction
GymRat reserves the right, in its sole discretion, to terminate Your access to the Site and the  related services or any portion thereof at any time, without notice. To the maximum extent  permitted by law, this agreement is governed by the laws of the State of California and You hereby consent to the exclusive jurisdiction and venue of courts in California in all disputes arising out of or relating to the use of the Site. Use of the Site is unauthorized in any jurisdiction that does not give  effect to all provisions of these Terms, including, without limitation, this section.

You agree that no joint venture, partnership, employment, or agency relationship exists between  You and GymRat as a result of this agreement or use of the Site. GymRat's performance of this  agreement is subject to existing laws and legal process, and nothing contained in this agreement is  in derogation of GymRat's right to comply with governmental, court and law enforcement requests or requirements relating to Your use of the Site or information provided to or gathered by GymRat with respect to such use. If any part of this agreement is determined to be invalid or unenforceable  pursuant to applicable law including, but not limited to, the warranty disclaimers and liability limitations set forth above, then the invalid or unenforceable provision will be deemed superseded  by a valid, enforceable provision that most closely matches the intent of the original provision and  the remainder of the agreement shall continue in effect.
Unless otherwise specified herein, this agreement constitutes the entire agreement between the user and GymRat with respect to the Site and it supersedes all prior or contemporaneous  communications and proposals, whether electronic, oral or written, between You and GymRat with respect to the Site. A printed version of this agreement and of any notice given in electronic  form shall be admissible in judicial or administrative proceedings based upon or relating to this  agreement to the same extent and subject to the same conditions as other business documents and  records originally generated and maintained in printed form. It is the express wish to the Parties that this agreement and all related documents be written in English.
Changes to Terms
GymRat reserves the right, in its sole discretion, to change the Terms under which GymRat is offered. The most current version of theTerms will supersede all previous versions. GymRat encourages you to periodically review the Terms to stay informed of our updates.
Contact Us
GymRat welcomes your questions or comments regarding the Terms:
GymRat LLC
4361 Ventura Canyon Ave, #2
Los Angeles, California 91423
Email Address:
ggymratco@gmail.com
Telephone number:
3104221779
Effective as of January 06, 2022

            </Text>

        </View>
        </ScrollView>
      </View>

  );
};

export default TermsAndConditions;
