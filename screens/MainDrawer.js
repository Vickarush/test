import "react-native-gesture-handler";
import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
//import RNExitApp from 'react-native-exit-app';
import {
  Octicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  Ionicons
} from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { 
  createDrawerNavigator, 
  DrawerItemList, 
} from "@react-navigation/drawer";
//import { Alert } from "native-base";
//import * as Keychain from 'react-native-keychain';
//import { WithSplashScreen } from "./WithSPlashScreen";
//import { AuthProvider } from "./AuthProvider";
//import Spinner from "./components/Spinner";
//TO DO distinguish between male and female user icon
import User from "../assets/user-male.jpg";
//import Account from "./Account";
import Jobs from "./Jobs";
//import Inbox from "./Inbox";
//import Ticketmaster from "./Tickemaster";
import About from "./About";
import HelpCenter from "./HelpCenter";
import Home from "./Home";
import ProfileScreen from "./ProfileScreen";
//import Pay from "./Pay";
//import Articles from "./screens/Articles";
//import Members from "./Members";
//import Connections from "./screens/Connections";
//import SignIn from "./src/screens/Login/SignIn";
import VideoCall from "./VideoCall";
import AppStack from "../navigation/AppStack";
import {AuthContext} from '../navigation/AuthProvider';
//import SponsoredArticles from "./screens/SponsoredArticles";
//import Flipboard from "./screens/Flipboard";

const Drawer = createDrawerNavigator();

export default function MainDrawer() {

  return (
    <NavigationContainer independent={true}>
         <Drawer.Navigator
         drawerContent={props=><AppDrawerContent {...props} />}
         screenOptions={{
           drawerStyle: {
             backgroundColor: "#fff",
             width: 250,
             marginTop: 5,
             overflow: 'visible',
           },
           headerStyle: {
             backgroundColor: "#0D4402",
           },
           headerTintColor: "#fff",
           headerTitleStyle: {
             fontWeight: "bold"
           },
           drawerLabelStyle: {
             color: "#111"
           }
         }}
       >
         <Drawer.Screen
           name="Home"
           options={{
             drawerLabel: "Home",
             title: "Home",
             drawerIcon: () => (
               <Octicons name="home" size={24} color="#808080" />
             )
           }}
           component={Home}
         />
 
 <Drawer.Screen
           name="Connections"
           options={{
             drawerLabel: "Connections",
             title: "Connections",
             drawerIcon: () => (
               <MaterialIcons name="connect-without-contact" size={24} color="#808080" />
             )
           }}
           component={AppStack}
         />

 <Drawer.Screen
           name="Video Conferencing"
           options={{
             drawerLabel: "Video Conferencing",
             title: "Video Conferencing",
             drawerIcon: () => (
               <MaterialIcons name="videocam" size={24} color="#808080" />
             )
           }}
           component={VideoCall}
         />
 
         <Drawer.Screen
           name="Jobs"
           options={{
             drawerLabel: "Jobs",
             title: "Jobs",
             drawerIcon: () => (
               <Entypo name="briefcase" size={24} color="#808080" />
             )
           }}
           component={Jobs}
         />
         <Drawer.Screen
           name="About"
           options={{
             drawerLabel: "About",
             title: "About",
             drawerIcon: () => (
               <MaterialCommunityIcons name="lightbulb-variant" size={24} color="#808080" />
             )
           }}
           component={About}
         />
 
     <Drawer.Screen
           name="My Profile"
           options={{
             drawerLabel: "My Profile",
             title: "My Profile",
             drawerIcon: () => (
               <FontAwesome5 name="user" size={24} color="#808080" />
             )
           }}
           component={ProfileScreen}
         />
 
         <Drawer.Screen
           name="Help Center"
           options={{
             drawerLabel: "Help Center",
             title: "Help Center",
             drawerIcon: () => (
               <MaterialIcons name="live-help" size={20} color="#808080" />
             )
           }}
           component={HelpCenter}
         />
 
       </Drawer.Navigator>
  
        </NavigationContainer>
  );
}

const AppDrawerContent = (props) => {
  const {user, setUser} = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  // user._user
 // providerId: firebase
 // LOG  isAnonymous: false
 //  LOG  phoneNumber: null
  //LOG  displayName: null
  //LOG  providerData: [object Object]
  //LOG  multiFactor: [object Object]
  // LOG  email: ben@example.com
  //LOG  emailVerified: false
  //LOG  tenantId: null
  //LOG  photoURL: null
  //LOG  uid: BhpgGhhcHHRDYIWVcxwhHCixFLD3


  return (
    <View style={{flex: 1}}>
      <ScrollView>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
      {/* User Image */}
      <View
      style={{
        height: 150,
        marginBottom: 10,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#f4f4f4",
        borderBottomWidth: 1
      }}
    >
      <Image
        source={User}
        style={{
          height: 130,
          width: 130,
          borderRadius: 65
        }}
      />
      <Text
        style={{
          fontSize: 20,
          marginTop: -10,
          marginVertical: 1,
          fontWeight: "bold",
          color: "#111"
        }}
      >{user.email}</Text>
    </View>
       {/*all of the drawer items*/}
       <DrawerItemList {...props}  style={{borderWidth:1}}/>
     </SafeAreaView>
     </ScrollView>
     {/* Log Out*/}
     <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => logout()}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
     </View>
   );
 }
