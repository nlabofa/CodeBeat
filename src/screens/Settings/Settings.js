/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  StatusBar,
  Text,
  Dimensions,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";
import { Colors, Images, FontNames } from "../../shared/Themes/index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";

import { Switch } from "react-native-switch";
import WebViewContainer from "../../components/WebViewContainer";

import {
  BaseTheme,
  settingStyle as styles,
  landingStyle
} from "../../shared/Themes/styles/index";

class Settings extends Component {
  state = {
    showebview: false,
    webviewurl: "",
    weburl: "",
    webviewtitle: ""
  };
  componentDidMount() {
    // StatusBar.setHidden(true);
  }
  navigateTo = (route, obj) => {
    this.props.navigation.push(route, { params: obj });
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
    const { width } = Dimensions.get("window");
    const { showebview, webviewtitle, webviewurl, weburl } = this.state;
    return (
      <ScrollView style={BaseTheme.baseBackground}>
        <Modal
          style={landingStyle.webviewmodal}
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
        <View style={styles.headerdiv}>
          <TouchableOpacity
            hitSlop={BaseTheme.hitSlop}
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
            onPress={() => this.props.navigation.pop()}
          >
            <Image
              style={styles.backicon}
              source={Images.backlink}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bodycontent}>
          <Text style={styles.headertext}> NOTIFICATIONS </Text>
          <View style={{ marginHorizontal: RFValue(-20) }}>
            <View style={styles.switchdiv}>
              <Text style={[styles.headertext2]}>Allow Notifications </Text>
              <Switch
                circleSize={25}
                barHeight={28}
                switchWidthMultiplier={2.5}
                switchLeftPx={1.5} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={1.5}
                circleBorderWidth={0}
                backgroundActive={"#60CED1"}
                backgroundInactive={"#28282E"}
                circleActiveColor={"#fff"}
                circleInActiveColor={"#fff"}
                onValueChange={() =>
                  this.setState({
                    updateviawifi: !this.state.updateviawifi
                  })
                }
                value={this.state.updateviawifi}
              />
            </View>
          </View>
          <View style={styles.secondsec}>
            <Text style={styles.headertext}>ACCOUNT</Text>
          </View>
          <View style={{ marginHorizontal: RFValue(-20) }}>
            <View style={styles.profilediv}>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={Images.avataricon}
                    style={styles.avataricon}
                    resizeMode="contain"
                  />
                  <View style={{ marginLeft: RFValue(10) }}>
                    <Text style={[styles.headerlabel]}>NAME </Text>

                    <Text style={[styles.headertext3]}>Sandy Ogbonna </Text>
                  </View>
                </View>

                <View style={styles.emailsection}>
                  <Text style={[styles.headerlabel]}>EMAIL </Text>

                  <Text style={[styles.headertext3]}>
                    Sandyogbonna@gmail.com
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.secondsec}>
            <Text style={styles.headertext}>PAYMENT INFO</Text>
          </View>
          <View style={{ marginHorizontal: -20 }}>
            <View style={styles.switchdiv}>
              <View style={styles.paymentrow}>
                <Image
                  source={require("../../assets/image/visa.png")}
                  style={styles.visaicon}
                  resizeMode="contain"
                />
                <Text style={[styles.headerlabel2]}>.... .... .... 5671 </Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={[styles.headerlabel3]}>CHANGE</Text>
                <Text style={[styles.headerlabel4]}>ADD NEW CARD</Text>
              </View>
            </View>
          </View>
          <View style={styles.secondsec}>
            <Text style={styles.headertext}>RECURRING BILLING</Text>
          </View>
          <View style={{ marginHorizontal: -20 }}>
            <View style={styles.switchdiv}>
              <Text style={[styles.headertext2, { fontSize: RFValue(18) }]}>
                Setup recurring billing
              </Text>
            </View>
          </View>
          <View style={styles.secondsec}>
            <Text style={styles.headertext}>LEGAL</Text>
          </View>
          <View style={{ marginHorizontal: -20 }}>
            <View style={styles.privacydiv}>
              <TouchableOpacity
                onPress={() =>
                  this.showebview("https://fh-client.dev.intelia.io/cinemas")
                }
                style={styles.legalrow}
                activeOpacity={0.7}
              >
                <Text style={[styles.headertext2, { fontSize: RFValue(18) }]}>
                  Cinemas
                </Text>
                <Ionicons name="ios-arrow-forward" color="#BCBABA" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.showebview("https://fh-client.dev.intelia.io/contact-us")
                }
                style={styles.legalrow}
                activeOpacity={0.7}
              >
                <Text style={[styles.headertext2, { fontSize: RFValue(18) }]}>
                  Contact Us
                </Text>
                <Ionicons name="ios-arrow-forward" color="#BCBABA" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.showebview(
                    "https://fh-client.dev.intelia.io/general-terms"
                  )
                }
                style={styles.legalrow}
                activeOpacity={0.7}
              >
                <Text style={[styles.headertext2, { fontSize: RFValue(18) }]}>
                  Terms Of Use
                </Text>
                <Ionicons name="ios-arrow-forward" color="#BCBABA" size={20} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.showebview(
                    "https://fh-client.dev.intelia.io/privacy-policy"
                  )
                }
                style={styles.legalrow}
                activeOpacity={0.7}
              >
                <Text style={[styles.headertext2, { fontSize: RFValue(18) }]}>
                  Privacy
                </Text>
                <Ionicons name="ios-arrow-forward" color="#BCBABA" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.showebview("https://fh-client.dev.intelia.io/faq")
                }
                style={styles.legalrow}
                activeOpacity={0.7}
              >
                <Text style={[styles.headertext2, { fontSize: RFValue(18) }]}>
                  FAQs
                </Text>
                <Ionicons name="ios-arrow-forward" color="#BCBABA" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Settings;
