/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  Platform,
  Text,
  Animated,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from "react-native";
import { Colors, Images, FontNames } from "../../shared/Themes/index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import validate from "../../shared/utils/validation";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import Octicons from "react-native-vector-icons/Octicons";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CheckBox } from "react-native-elements";
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

class SignUp extends Component {
  state = {
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
    hidePassword: true,
    hideConfirmPassword: true,
    scrollY: new Animated.Value(0),
    formIsValid: false,
    terms: false,
    selectedplan: "",
    controls: {
      fullname: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 5
        },
        touched: false,
        focused: false
      },
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false,
        focused: false
      },
      phonenumber: {
        value: "",
        valid: false,
        validationRules: {
          phoneNumber: true
        },
        touched: false,
        focused: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          password: true
        },
        // placeholderText: "FirstName",
        touched: false,
        focused: false
      },
      confirmpassword: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 7
        },
        // placeholderText: "FirstName",
        touched: false,
        focused: false
      }
    }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.scrollView.scrollToEnd({ animated: true });
    }
    // if (nextProps.message&&nextProps.message.split(",")[0] == "200") {
    //   this.navigateTo("Tabscreens");
    // }
  }
  componentDidMount() {
    const params = this.props.navigation.getParam("params") || "bronze";
    this.setState({ selectedplan: params });
  }
  componentWillUnmount() {
    this.props.clearMessage();
  }
  goback = () => {
    this.props.navigation.pop();
  };
  navigateTo = (route, obj) => {
    this.props.navigation.push(route, { params: obj });
  };

  doSignUp = () => {
    const formdata = {
      name: this.state.controls.fullname.value,
      mobile: this.state.controls.phonenumber.value,
      email: this.state.controls.email.value.toLowerCase(),
      password: this.state.controls.password.value
    };
    this.props.doSignUp(formdata);
  };
  onFocus = name => {
    const updatedControls = {
      ...this.state.controls
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };
    updatedFormElement.focused = true;
    updatedControls[name] = updatedFormElement;
    this.setState({
      controls: updatedControls
    });
  };
  updateInputChange = (key, value, placeholderText) => {
    const updatedControls = {
      ...this.state.controls
    };
    const updatedFormElement = {
      ...updatedControls[key]
    };
    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.placeholderText = placeholderText;
    updatedFormElement.valid = validate(
      value,
      updatedFormElement.validationRules
    );

    updatedControls[key] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formIsValid: formIsValid,
      controls: updatedControls
    });
  };
  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };
  manageConfirmPasswordVisibility = () => {
    this.setState({ hideConfirmPassword: !this.state.hideConfirmPassword });
  };
  onBlur = name => {
    const updatedControls = {
      ...this.state.controls
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };
    updatedFormElement.focused = false;
    updatedControls[name] = updatedFormElement;
    this.setState({
      controls: updatedControls
    });
  };

  render() {
    const { formIsValid, selectedplan, terms } = this.state;
    const { loading, message } = this.props;
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
        {/* <Image
          // resizeMode="contain"
          source={require("../../assets/image/bottomstrip.png")}
          style={styles.signupstrip}
        /> */}
        <Animated.View
          style={[
            styles.rowhead,
            {
              opacity: navbarOpacity,
              backgroundColor: backgroundColor
            }
          ]}
        >
          <TouchableOpacity
            hitSlop={styles.hitSlop}
            onPress={this.goback}
            style={styles.goback}
          >
            <Ionicons name="md-arrow-back" color="#fff" size={25} />
          </TouchableOpacity>
          {/* <Animated.View style={styles.header3}> */}
          <Image
            style={[styles.headerlogo]}
            source={require("../../assets/image/Group9.png")}
            resizeMode="contain"
          />
          <TouchableOpacity
            hitSlop={styles.hitSlop}
            onPress={this.goback}
            style={styles.topright}
          >
            <Text
              onPress={() => this.navigateTo("Login")}
              style={styles.toptext}
            >
              SIGN IN
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={Platform.OS === "android" ? 20 : null}
          extraScrollHeight={Platform.OS === "ios" ? 20 : null}
          scrollEventThrottle={1}
          ref={ref => (this.scrollView = ref)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]
            //{ useNativeDriver: true }
          )}
        >
          <View style={styles.inputContainer2}>
            <View style={[styles.headrow2]}>
              <TouchableOpacity style={styles.modalheadbar3}>
                <Text
                  style={[styles.modalheadtext, { color: Colors.basewhite }]}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalheadbar3}>
                <Image
                  resizeMode="contain"
                  style={{ width: RFValue(174), height: RFValue(56) }}
                  source={
                    selectedplan == "bronze"
                      ? require("../../assets/image/bronzecard.png")
                      : selectedplan == "silver"
                      ? require("../../assets/image/silvercard.png")
                      : require("../../assets/image/goldcard.png")
                  }
                />
              </TouchableOpacity>
            </View>

            <View>
              <CustomInput
                auth
                placeholder="Full Name"
                onFocus={() => this.onFocus("fullname")}
                onBlur={() => this.onBlur("fullname")}
                focused={this.state.controls.fullname.focused}
                value={this.state.controls.fullname.value}
                maxLength={70}
                customstyle={styles.custominput}
                onChangeText={value =>
                  this.updateInputChange("fullname", value, "")
                }
                valid={this.state.controls.fullname.valid}
                touched={this.state.controls.fullname.touched}
              />
              <CustomInput
                auth
                placeholder="Email Address"
                onFocus={() => this.onFocus("email")}
                onBlur={() => this.onBlur("email")}
                focused={this.state.controls.email.focused}
                value={this.state.controls.email.value}
                autoCapitalize="none"
                customstyle={styles.custominput}
                onChangeText={value =>
                  this.updateInputChange("email", value, "")
                }
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
                keyboardType="email-address"
              />
              <CustomInput
                auth
                placeholder="Phone Number"
                onFocus={() => this.onFocus("phonenumber")}
                onBlur={() => this.onBlur("phonenumber")}
                focused={this.state.controls.phonenumber.focused}
                value={this.state.controls.phonenumber.value}
                autoCapitalize="none"
                customstyle={styles.custominput}
                maxLength={11}
                onChangeText={value =>
                  this.updateInputChange("phonenumber", value, "")
                }
                valid={this.state.controls.phonenumber.valid}
                touched={this.state.controls.phonenumber.touched}
                keyboardType="numeric"
              />
              <View style={{ position: "relative" }}>
                <TouchableOpacity
                  hitSlop={BaseTheme.hitSlop}
                  style={styles.passwordmask}
                  onPress={this.managePasswordVisibility}
                >
                  {this.state.hidePassword ? (
                    <Octicons name="eye" size={25} color="#fff" />
                  ) : (
                    <Ionicons name="ios-eye-off" size={25} color="#fff" />
                  )}
                </TouchableOpacity>
                <CustomInput
                  auth
                  placeholder="Password"
                  onFocus={() => this.onFocus("password")}
                  onBlur={() => this.onBlur("password")}
                  focused={this.state.controls.password.focused}
                  valid={this.state.controls.password.valid}
                  touched={this.state.controls.password.touched}
                  value={this.state.controls.password.value}
                  autoCapitalize="none"
                  // maxLength={70}
                  customstyle={styles.custominput}
                  onChangeText={value =>
                    this.updateInputChange("password", value, "")
                  }
                  secureTextEntry={this.state.hidePassword}
                />
                {/* {this.state.controls.password.touched &&
                !this.state.controls.password.valid 
                   ? (
                  <View>
                    <Text style={[styles.bottomtextabs2]}>
                      Password must contain at least :{"\n"}
                      {"\u2022"} one uppercase character{"\n"}
                      {"\u2022"} one lowercase character{"\n"}
                      {"\u2022"} one digit{"\n"}
                      {"\u2022"} one special character{"\n"}
                      {"\u2022"} minimum 7 in length{"\n"}
                    </Text>
                    <Icon
                      name="exclamation-triangle"
                      size={15}
                      color="#E72A53"
                      style={{ position: "absolute", right: 5, bottom: 5 }}
                    />
                  </View>
                ) : null} */}
              </View>
              <View style={{ position: "relative" }}>
                <TouchableOpacity
                  hitSlop={BaseTheme.hitSlop}
                  style={styles.passwordmask}
                  onPress={this.manageConfirmPasswordVisibility}
                >
                  {this.state.hideConfirmPassword ? (
                    <Octicons name="eye" size={25} color="#fff" />
                  ) : (
                    <Ionicons name="ios-eye-off" size={25} color="#fff" />
                  )}
                </TouchableOpacity>
                <CustomInput
                  auth
                  placeholder="Confirm Password"
                  onFocus={() => this.onFocus("confirmpassword")}
                  onBlur={() => this.onBlur("confirmpassword")}
                  focused={this.state.controls.confirmpassword.focused}
                  valid={
                    this.state.controls.confirmpassword.valid &&
                    this.state.controls.password.value ==
                      this.state.controls.confirmpassword.value
                  }
                  touched={this.state.controls.confirmpassword.touched}
                  value={this.state.controls.confirmpassword.value}
                  autoCapitalize="none"
                  // maxLength={70}
                  customstyle={styles.custominput}
                  onChangeText={value =>
                    this.updateInputChange("confirmpassword", value, "")
                  }
                  secureTextEntry={this.state.hideConfirmPassword}
                />
                {this.state.controls.confirmpassword.touched &&
                this.state.controls.password.value !==
                  this.state.controls.confirmpassword.value ? (
                  <View>
                    <Text style={[styles.bottomtextabs2]}>
                      Password does not match
                    </Text>
                    <Icon
                      name="exclamation-triangle"
                      size={15}
                      color="#E72A53"
                      style={{ position: "absolute", right: 5, bottom: 5 }}
                    />
                  </View>
                ) : null}
              </View>
              <View style={{ flexDirection: "row" }}>
                <CheckBox
                  checkedColor="#60CED1"
                  uncheckedColor="#fff"
                  checkedIcon="check-box"
                  size={20}
                  iconType="material-Icons"
                  uncheckedIcon="check-box-outline-blank"
                  containerStyle={{
                    marginRight: 0,
                    marginTop: 10,
                    marginLeft: RFValue(0)
                  }}
                  checked={this.state.terms === true}
                  onPress={() =>
                    this.setState({
                      terms: !this.state.terms
                    })
                  }
                />
                <Text style={styles.bottomtext2}>
                  By Clicking ‘Sign Me Up’ you agree to the{" "}
                  <Text
                    onPress={() => this.navigateTo("GetStarted")}
                    style={styles.signuptext}
                  >
                    Terms of Use
                  </Text>{" "}
                  and{" "}
                  <Text
                    onPress={() => this.navigateTo("GetStarted")}
                    style={styles.signuptext}
                  >
                    Privacy Policy
                  </Text>{" "}
                  of FilmHouse INC.
                </Text>
              </View>

              <Button
                formIsValid={formIsValid && terms}
                customstyle={{ zIndex: 100, marginTop: RFValue(50) }}
                onPress={this.doSignUp}
                loading={loading}
                btnText="SIGN UP"
              />
              {message && message.split(","[0]) ? (
                message.split(",")[0] == 200 ? (
                  <View style={[styles.errorbox2, { marginTop: 0 }]}>
                    <Text style={[styles.bottomtextabs, { color: "#60CED1" }]}>
                      {message.split(",")[1]}
                    </Text>
                  </View>
                ) : (
                  <View style={[styles.errorbox, { marginTop: 0 }]}>
                    <Text style={[styles.bottomtextabs]}>
                      {message.split(",")[1]}
                    </Text>
                  </View>
                )
              ) : null}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    itemloading: state.uiReducer.itemloading,
    message: state.uiReducer.message
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearMessage: () => dispatch(actions.clearMessage()),
    doSignUp: formdata => dispatch(actions.signUp(formdata)),
    initiatePasswordReset: email =>
      dispatch(actions.initiatePasswordReset(email))
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(SignUp);
