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
import { StackActions, NavigationActions } from "react-navigation";
import validate from "../../shared/utils/validation";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import Octicons from "react-native-vector-icons/Octicons";
import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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

class Login extends Component {
  state = {
    screentitle: "",
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
    hidePassword: true,
    scrollY: new Animated.Value(0),
    formIsValid: false,
    resetform: {
      resetemail: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false,
        focused: false
      }
    },
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false,
        focused: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 8
        },
        // placeholderText: "FirstName",
        touched: false,
        focused: false
      }
    }
  };
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    const params = this.props.navigation.getParam("params");
    if (nextProps.message === "login success" && params == undefined) {
      this.navigateTo("Tabscreens"); //fresh login
    } else if (
      nextProps.message === "login success" &&
      params == "watch-online" //redirected from watch-page
    ) {
      this.props.navigation.pop();
      // this.navigateTo("WatchScreen");
    }
    //  else {
    //   this.navigateTo("Tabscreens");
    // }
  }
  componentWillUnmount() {
    this.props.clearMessage();
  }
  goback = () => {
    this.props.navigation.pop();
  };
  navigateTo = (route, obj) => {
    this.props.navigation.navigate(route, { params: obj });
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
  initiatePasswordreset = () => {
    const email = this.state.resetform.resetemail.value;
    this.props.initiatePasswordReset(email);
  };
  doSignIn = () => {
    const formdata = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.doSignIn(formdata);
  };
  setheadtype = val => {
    this.setState({ headtype: val });
  };
  onFocusReset = name => {
    const updatedControls = {
      ...this.state.resetform
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };
    updatedFormElement.focused = true;
    updatedControls[name] = updatedFormElement;
    this.setState({
      resetform: updatedControls
    });
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
  updateResetForm = (key, value, placeholderText) => {
    const updatedControls = {
      ...this.state.resetform
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

    // let formIsValid = true;
    // for (let inputIdentifier in updatedControls) {
    //   formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    // }

    this.setState({
      //formIsValid: formIsValid,
      resetform: updatedControls
    });
  };
  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
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
  onBlurReset = name => {
    const updatedControls = {
      ...this.state.resetform
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };
    updatedFormElement.focused = false;
    updatedControls[name] = updatedFormElement;
    this.setState({
      resetform: updatedControls
    });
  };

  render() {
    const { formIsValid } = this.state;
    const { loading, itemloading, message } = this.props;
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
          source={require("../../assets/image/loginbanner.png")}
          resizeMode="cover"
          style={{
            width: "100%",
            position: "absolute",
            height: "100%",
            zIndex: -100
          }}
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
            source={Images.headerlogo}
            resizeMode="contain"
          />
        </Animated.View>
        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={Platform.OS === "android" ? 20 : null}
          extraScrollHeight={Platform.OS === "ios" ? 20 : null}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]
            //{ useNativeDriver: true }
          )}
        >
          <View style={styles.inputContainer}>
            <View style={styles.headrow}>
              <TouchableOpacity
                onPress={() => this.setheadtype("signin")}
                style={styles.modalheadbar3}
              >
                <Text
                  style={[
                    styles.modalheadtext,
                    {
                      color:
                        this.state.headtype === "signin"
                          ? Colors.purewhite
                          : "#333338"
                    }
                  ]}
                >
                  Sign In
                </Text>
                {this.state.headtype === "signin" ? (
                  <View style={BaseTheme.dot2} />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setheadtype("forgotpassword")}
                style={styles.modalheadbar3}
              >
                <Text
                  style={[
                    styles.modalheadtext,
                    {
                      color:
                        this.state.headtype === "forgotpassword"
                          ? Colors.purewhite
                          : "#333338"
                    }
                  ]}
                >
                  Forgot password
                </Text>
                {this.state.headtype === "forgotpassword" ? (
                  <View style={BaseTheme.dot2} />
                ) : null}
              </TouchableOpacity>
            </View>
            {this.state.headtype === "signin" ? (
              <View>
                <CustomInput
                  auth
                  placeholder="Email"
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
                </View>

                <Button
                  formIsValid={formIsValid}
                  onPress={this.doSignIn}
                  loading={loading}
                  //btnText
                />
                <Text style={styles.bottomtext}>
                  Don't have an account?{" "}
                  <Text
                    onPress={() => this.navigateTo("SelectPlan")}
                    style={styles.signuptext}
                  >
                    Sign up
                  </Text>
                </Text>
                <View style={styles.errorbox}>
                  <Text style={styles.bottomtextabs}>
                    {(message && message.split(",")[0] == "200") ||
                    (message && message.split(",")[0] == "400")
                      ? null
                      : message}
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                <CustomInput
                  auth
                  placeholder="Enter Email"
                  onFocus={() => this.onFocusReset("resetemail")}
                  onBlur={() => this.onBlurReset("resetemail")}
                  focused={this.state.resetform.resetemail.focused}
                  autoCapitalize="none"
                  value={this.state.resetform.resetemail.value}
                  customstyle={styles.custominput}
                  onChangeText={value =>
                    this.updateResetForm("resetemail", value, "")
                  }
                  valid={this.state.resetform.resetemail.valid}
                  touched={this.state.resetform.resetemail.touched}
                  keyboardType="email-address"
                />

                <Button
                  formIsValid={this.state.resetform.resetemail.valid}
                  onPress={this.initiatePasswordreset}
                  loading={itemloading}
                  btnText="REQUEST RESET"
                />
                <Text style={styles.bottomtext}>
                  Not a user?{" "}
                  <Text
                    onPress={() => this.navigateTo("SelectPlan")}
                    style={styles.signuptext}
                  >
                    Sign up now
                  </Text>
                </Text>
                {message && message.split(","[0]) ? (
                  message.split(",")[0] == 200 ? (
                    <View style={styles.errorbox2}>
                      <Text
                        style={[styles.bottomtextabs, { color: "#60CED1" }]}
                      >
                        {message.split(",")[1]}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.errorbox}>
                      <Text style={[styles.bottomtextabs]}>
                        {message.split(",")[1]}
                      </Text>
                    </View>
                  )
                ) : null}
              </View>
            )}
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
    doSignIn: formdata => dispatch(actions.signIn(formdata)),
    clearMessage: () => dispatch(actions.clearMessage()),
    initiatePasswordReset: email =>
      dispatch(actions.initiatePasswordReset(email))
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Login);
