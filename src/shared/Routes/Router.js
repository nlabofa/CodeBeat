import React from "react";
import { View, Platform, Easing, Animated } from "react-native";
import { Colors } from "../Themes/index";
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
import {
  fadeIn,
  zoomIn,
  flipX,
  flipY,
  fromLeft,
  fromRight
} from "react-navigation-transitions";

import CurrentlyShowing from "../../screens/Home/CurrentlyShowing";
import MovieListing from "../../screens/Home/MovieListing";
import MovieDetail from "../../screens/Home/MovieDetail";
import TicketStep1 from "../../screens/Ticket/Step1";
import TicketStep2 from "../../screens/Ticket/Step2";
import TicketStep3 from "../../screens/Ticket/Step3";
import OrderSummary from "../../screens/Ticket/OrderSummary";
import OrderSuccess from "../../screens/Ticket/OrderSuccess";
import ClubScreen from "../../screens/Club/Clubscreen";
import LoginScreen from "../../screens/Auth/Login";
import SplashScreen from "../../components/ContentLoader/SplashLoader";
import WatchScreen from "../../screens/Home/WatchOnlinePage";

import VideoPlayer from "../../screens/VideoPlayer/VideoPlayer";
import TestVideo from "../../screens/VideoPlayer/TestVideo";
import GetStarted from "../../screens/Auth/GetStarted";
import SelectPlan from "../../screens/Auth/SelectPlan";
import SignUp from "../../screens/Auth/SignUp";
import SettingScreen from "../../screens/Settings/Settings";

import DrawerMenu from "../../screens/Home/DrawerMenu";
import Tabstack from "./tabs";

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (
    prevScene &&
    prevScene.route.routeName === "HomeScreens" &&
    nextScene.route.routeName === "VideoPlayer"
  ) {
    return flipX(10);
  }
  //  else if (
  //   prevScene &&
  //   prevScene.route.routeName === "Splash" &&
  //   nextScene.route.routeName === "HomeScreens"
  // ) {
  //   return fromRight(500);
  // }
  // return fadeIn();
};
const AuthStack = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    GetStarted: { screen: GetStarted },
    SelectPlan: { screen: SelectPlan },
    SignUpForm: { screen: SignUp }
  },
  {
    headerMode: "none",
    cardStyle: {
      backgroundColor: Colors.backgroundColor,
      opacity: 1
    }
    // initialRouteName: "SignUpForm"
  }
);
const DrawerStack = createStackNavigator(
  {
    Tabscreens: Tabstack,
    CurrentlyShowing: { screen: CurrentlyShowing },
    MovieListing: { screen: MovieListing },
    MovieDetail: { screen: MovieDetail },
    TicketStep1: { screen: TicketStep1 },
    TicketStep2: { screen: TicketStep2 },
    TicketStep3: { screen: TicketStep3 },
    OrderSummary: { screen: OrderSummary },
    OrderSuccess: { screen: OrderSuccess },
    ClubScreen: { screen: ClubScreen },
    WatchScreen: { screen: WatchScreen },
    SettingScreen: { screen: SettingScreen },
    Auth: { screen: AuthStack }
    //TestVideo: { screen: TestVideo },
    // VideoPlayer: { screen: VideoPlayer }
  },
  {
    headerMode: "none",
    cardStyle: {
      backgroundColor: Colors.backgroundColor,
      opacity: 1
    }
    //  initialRouteName: "Auth"
  }
);
const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeScreens: DrawerStack
  },
  {
    contentComponent: props => <DrawerMenu {...props} />,
    drawerBackgroundColor: "#16161a"
    //initialRouteName: 'MovieDetails',
  }
);
const MainNavigator = createStackNavigator(
  {
    // Splash: SplashScreen,
    HomeScreens: { screen: AppDrawerNavigator },
    VideoPlayer: { screen: VideoPlayer }
    //TestVideo: { screen: TestVideo }
  },
  {
    headerMode: "none",
    cardStyle: {
      backgroundColor: Colors.backgroundColor,
      opacity: 1
    },
    mode: Platform.OS === "ios" ? "modal" : "card",
    transitionConfig:
      Platform.OS == "android" ? null : nav => handleCustomTransition(nav)
    //initialRouteName: "VideoPlayer"
  }
);

export default createSwitchNavigator(
  {
    // Splash: SplashScreen,
    Home: MainNavigator
  },
  {
    // initialRouteName: "DetailStack"
  }
);
