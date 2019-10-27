/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation";

import { Colors } from "../Themes/index";

import HomeScreen from "../../screens/Home/LandingPage";
import TicketScreen from "../../screens/Home/TicketScreen";
import WatchScreen from "../../screens/Home/WatchOnlinePage";
import ShopScreen from "../../screens/Shop/ShopHome";
import ClubScreen from "../../screens/Club/Clubscreen";
import GetStarted from "../../screens/Auth/GetStarted";
import { RFValue } from "react-native-responsive-fontsize";

const TabStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Image
              source={require("../../assets/image/icon/HomeActive.png")}
              style={{ width: RFValue(28), height: RFValue(27) }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../assets/image/icon/HomeInactive.png")}
              style={{ width: RFValue(28), height: RFValue(27) }}
              resizeMode="contain"
            />
          )
      }
    },
    Ticket: {
      screen: TicketScreen,
      navigationOptions: {
        tabBarLabel: "Tickets",
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Image
              source={require("../../assets/image/icon/ticketActive.png")}
              style={{ width: RFValue(26), height: RFValue(26) }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../assets/image/icon/ticketicon.png")}
              style={{ width: RFValue(26), height: RFValue(26) }}
              resizeMode="contain"
            />
          )
      }
    },
    Watch: {
      screen: WatchScreen,
      navigationOptions: {
        tabBarLabel: "Watch",
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Image
              source={require("../../assets/image/icon/watchActive.png")}
              style={{ width: RFValue(26), height: RFValue(25) }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../assets/image/icon/WatchInactive.png")}
              style={{ width: RFValue(26), height: RFValue(25) }}
              resizeMode="contain"
            />
          )
      }
    },
    SHOP: {
      screen: ShopScreen,
      navigationOptions: {
        tabBarLabel: "Shop",
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Image
              source={require("../../assets/image/icon/shopActive.png")}
              style={{ width: RFValue(24), height: RFValue(25) }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../assets/image/icon/ShopInactive.png")}
              style={{ width: RFValue(24), height: RFValue(25) }}
              resizeMode="contain"
            />
          )
      }
    },
    CLUB: {
      screen: GetStarted,
      navigationOptions: {
        tabBarLabel: "Club",
        tabBarIcon: ({ focused, tintColor }) =>
          focused ? (
            <Image
              source={require("../../assets/image/icon/ClubHouseAct.png")}
              style={{ width: RFValue(30), height: RFValue(28) }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../assets/image/icon/ClubHouseInact.png")}
              style={{ width: RFValue(30), height: RFValue(28) }}
              resizeMode="contain"
            />
          )
      }
    }
  },

  {
    tabBarOptions: {
      activeTintColor: "#EAEAEA",
      inactiveTintColor: "#393943",
      labelStyle: {
        fontSize: 9,
        //fontFamily: 'AvenirLTStd-Book',
        // paddingVertical: 10,
        fontWeight: "bold"
      },
      style: {
        // height: RFValue(75),
        height: RFValue(65),
        paddingBottom: 7,
        // paddingBottom: RFValue(10),
        // paddingTop: RFValue(7),
        backgroundColor: "#0f0f13",
        borderTopWidth: 0.3,
        borderTopColor: "#1c1c1c"
        // borderTopColor: "#5f5f6d"
      },
      showIcon: true,
      showLabel: true
    },
    shifting: true,
    backBehavior: "none",
    initialRouteName: "Home"
  }
);

export default TabStack;
