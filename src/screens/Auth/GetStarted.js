/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  Platform,
  Text,
  Animated,
  Image,
  TouchableOpacity
} from "react-native";
import { Colors, Images, FontNames } from "../../shared/Themes/index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import { NavigationActions, StackActions } from "react-navigation";
import {
  BaseTheme,
  authStyle as styles
} from "../../shared/Themes/styles/index";
import Ionicons from "react-native-vector-icons/Ionicons";

const scrollAnim = new Animated.Value(0);
const offsetAnim = new Animated.Value(0);
const NAVBAR_HEIGHT = 64;
const HEADER_MAX_HEIGHT = 130;
const HEADER_MIN_HEIGHT = 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

class GetStarted extends Component {
  state = {
    headtype: "signin",
    scrollAnim,
    offsetAnim,
    clampedScroll: Animated.diffClamp(
      Animated.add(
        scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: "clamp"
        }),
        offsetAnim
      ),
      0,
      NAVBAR_HEIGHT - STATUS_BAR_HEIGHT
    ),
    scrollY: new Animated.Value(0)
  };

  goback = () => {
    this.props.navigation.pop();
  };
  navigateTo = (route, obj) => {
    this.props.navigation.push(route, { params: obj });
  };
  switchStack = route => {
    this.props.navigation.navigate(
      route,
      {},
      NavigationActions.navigate({ routeName: "" })
    );
  };
  render() {
    const navbarOpacity = this.state.clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    const backgroundColor = this.state.scrollAnim.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: ["transparent", "#0f0f13"],
      extrapolate: "clamp"
    });
    return (
      <View style={BaseTheme.baseBackground}>
        <Image
          source={require("../../assets/image/tempholder.png")}
          resizeMode="cover"
          style={styles.getstartedbg}
        />

        <Animated.View
          style={[
            styles.rowhead,
            {
              opacity: navbarOpacity,
              backgroundColor: backgroundColor
            }
          ]}
        >
          {/* <TouchableOpacity
            hitSlop={styles.hitSlop}
            onPress={this.goback}
            style={styles.goback}
          >
            <Ionicons name="md-arrow-back" color="#fff" size={25} />
          </TouchableOpacity> */}
          {/* <Animated.View style={styles.header3}> */}
          <Image
            style={[styles.headerlogo]}
            source={require("../../assets/image/Group9.png")}
            resizeMode="contain"
          />
          {this.props.userdata ? null : (
            <TouchableOpacity
              hitSlop={styles.hitSlop}
              onPress={() => this.navigateTo("Login")}
              style={styles.topright}
            >
              <Text style={styles.toptext}>SIGN IN</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
        <View>
          <View
            style={{
              flexDirection: "row",
              marginTop: RFPercentage(20)
            }}
          >
            <View style={{ width: "80%" }}>
              <Text style={styles.getstartedhead}>
                Watch More For Less, Join the Club.
              </Text>
            </View>
            <Image
              source={require("../../assets/image/barestrip2.png")}
              style={styles.getstartedstrip}
            />
            <Text style={styles.sublineheadbtm}>Subline head for the club</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.navigateTo("SelectPlan")}
          style={styles.getstartedbtn}
        >
          <Image
            resizeMode="contain"
            source={require("../../assets/image/buttongradient.png")}
            style={{ height: "100%", width: "100%" }}
          />
          <Text style={styles.adtext7N}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToprops = state => {
  return {
    userdata: state.authReducer.userdata,
    itemloading: state.uiReducer.itemloading,
    message: state.uiReducer.message
  };
};
const mapDispatchToProps = dispatch => {
  return {
    doSignIn: formdata => dispatch(actions.signIn(formdata))
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(GetStarted);
