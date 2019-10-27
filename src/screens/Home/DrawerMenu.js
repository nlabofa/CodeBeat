/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Colors, Images } from "../../shared/Themes/index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import WebViewContainer from "../../components/WebViewContainer";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import {
  BaseTheme,
  landingStyle as styles
} from "../../shared/Themes/styles/index";
import Modal from "react-native-modal";
import { NavigationActions, StackActions } from "react-navigation";

class DrawerMenu extends Component {
  state = {
    showebview: false,
    webviewurl: "",
    weburl: "",
    webviewtitle: ""
  };
  resetTo = route => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: route
          // params: { addcard: true }
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };
  switchStack = route => {
    this.props.navigation.navigate(
      route,
      {},
      NavigationActions.navigate({ routeName: "" })
    );
  };
  navigateTo = (route, obj) => {
    this.props.navigation.navigate(route, { params: obj });
  };
  showebview = url => {
    this.setState({ showebview: true, weburl: url });
  };
  _onNavigationStateChange(webViewState) {
    console.log(webViewState);
    this.setState({
      webviewtitle: webViewState.title,
      webviewurl: webViewState.url
    });
    // console.log(webViewState.url);
  }
  hideWebview = () => {
    this.setState({
      showebview: false,
      webviewurl: "",
      weburl: "",
      webviewtitle: ""
    });
  };
  render() {
    const { showebview, webviewtitle, webviewurl, weburl } = this.state;
    const { userdata } = this.props;

    return (
      <View style={[BaseTheme.baseBackground, { backgroundColor: "#0f0f13" }]}>
        <Modal
          style={styles.webviewmodal}
          isVisible={showebview}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={1}
          backdropColor={"#0b0b0d"}
          animationInTiming={400}
          animationOutTiming={600}
          backdropTransitionOutTiming={0}
        >
          <WebViewContainer
            hideWebview={this.hideWebview}
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            webviewtitle={webviewtitle}
            webviewurl={webviewurl}
            weburl={weburl}
          />
        </Modal>
        <View style={{ marginHorizontal: RFValue(20) }}>
          <TouchableOpacity
            hitSlop={BaseTheme.hitSlop}
            onPress={() => this.props.navigation.closeDrawer()}
            style={styles.sideDrawercloseicon}
          >
            <Image
              source={Images.closeicon}
              style={BaseTheme.closeicon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => (userdata ? null : this.navigateTo("Auth"))}
            style={[styles.drawertop]}
          >
            <Image
              source={Images.avataricon}
              style={BaseTheme.avataricon}
              resizeMode="contain"
            />
            <View style={{ margin: 0, width: "90%" }}>
              {userdata ? (
                <Text numberOfLines={1} style={styles.drawerusertext}>
                  {userdata.firstName + " " + userdata.lastName}
                </Text>
              ) : (
                <Text style={styles.drawertext}>Login</Text>
              )}
            </View>

            {/* <Text style={styles.drawerusertext}>Sandy Ogbonna</Text> */}
          </TouchableOpacity>
          <View style={styles.drawerfilmhouse}>
            <Image
              source={Images.sidebarstar}
              style={{ width: RFValue(14), height: RFValue(14) }}
              resizeMode="contain"
            />
            <Text style={styles.drawertext}>FilmHouse Club</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.navigateTo("MovieListing", "My list")}
            style={styles.draweritem}
          >
            <Text style={styles.drawertext}>My List</Text>
          </TouchableOpacity>
          <View style={styles.draweritem}>
            <Text style={styles.drawertext}>My Account</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.navigateTo("SettingScreen")}
            style={styles.draweritem}
          >
            <Text style={styles.drawertext}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.showebview("https://fh-client.dev.intelia.io/faq")
            }
            style={styles.draweritem}
          >
            <Text style={styles.drawertext}>Help</Text>
          </TouchableOpacity>
          {userdata ? (
            <TouchableOpacity
              onPress={() => this.props.signOut()}
              style={styles.draweritem}
            >
              <Text style={styles.drawertext}>Logout</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.sidebarbottom}>
          <Image
            source={require("../../assets/image/icon/line.png")}
            style={{ width: "100%", height: 1 }}
          />
          <View style={styles.sidebarbottomdiv}>
            <Text style={styles.drawertext2}>Filmhouse copyright © 2019</Text>
            <Text
              onPress={() =>
                this.showebview(
                  "https://fh-client.dev.intelia.io/privacy-policy"
                )
              }
              style={styles.drawertext3}
            >
              Privacy Docs.
            </Text>
            <Text style={styles.drawertext2}>All Rights Reserved</Text>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToprops = state => {
  return {
    userdata: state.authReducer.userdata
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(actions.signOut())
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(DrawerMenu);
