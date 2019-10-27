import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  AsyncStorage,
  ImageBackground
} from "react-native";
import { BaseTheme } from "../../shared/Themes/styles/index";

import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import LottieView from "lottie-react-native";

class SplashLoader extends Component {
  // constructor(props) {
  //   super(props);
  //   this._bootstrapAsync();
  // }

  _bootstrapAsync = async () => {
    const usertoken = await AsyncStorage.getItem("usertoken");
    usertoken ? this.goHome() : this.goHome();
  };
  // componentWillMount() {
  //   this.goHome();
  // }
  goHome = () => {
    this.props.navigation.navigate("HomeScreens");
  };
  render() {
    return (
      <LottieView
        style={{
          flex: 1
          //backgroundColor: "#1c1c1a"
        }}
        resizeMode="cover"
        source={require("../../assets/image/splash.json")}
        autoPlay
        loop={false}
        onAnimationFinish={() => this.goHome()}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: BaseTheme.baseBackground
  }
});
export default SplashLoader;
