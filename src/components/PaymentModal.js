/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from "react";

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView
} from "react-native";
import {
  BaseTheme,
  paymentStyle as styles,
  ticketStyle
} from "../shared/Themes/styles/index";
import { Images, Colors, FontNames } from "../shared/Themes/index";
import CustomInput from "../components/CustomInput";
import validate from "../shared/utils/validation";
import * as actions from "../shared/store/actions/index";
import { connect } from "react-redux";

import Button from "../components/Button";
import RNPaystack from "react-native-paystack";
import { NavigationActions, StackActions } from "react-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

class PaymentModal extends PureComponent {
  state = {
    selectedItem: 0,
    paymentloading: false,
    showpayment: false,
    cardExpiry: "",
    bookingerror: false,
    cvv: "",
    cardNumber: "",
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
          phonenumber:true
        },
        touched: false,
        focused: false
      }
    }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.message == "trigger paystack") {
      this.setState({ showpayment: true });
    }
  }
  formatAmount = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  login = () => {
    this.props.modalDismissed();
    this.navigateTo("Auth");
  };
  saveGuestUser = () => {
    const formdata = {
      ownerName: this.state.controls.fullname.value,
      ownerEmail: this.state.controls.email.value
    };
    this.props.saveGuestUser(formdata);
    this.props.createCart();
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
  navigateTo = (route, obj) => {
    this.props.navigation.push(route, { params: obj });
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
  handleCardNumber = number => {
    this.setState({
      cardNumber: number
        .replace(/\s?/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
    });
  };
  handleExpiryDate = text => {
    if (text.length === 2 && this.state.cardExpiry.length === 1) {
      text += "/";
    }
    this.setState({
      cardExpiry: text
    });
  };
  handleCVV = text => {
    this.setState({
      cvv: text
    });
  };
  initiatePayment = () => {
    const {
      ticketpayment,
      totalticketconcessionprice,
      totalticketprice,
      ticket_ref
    } = this.props;
    const tickettotal = totalticketconcessionprice + totalticketprice;
    this.setState({ paymentloading: true });

    RNPaystack.chargeCard({
      cardNumber: this.state.cardNumber.replace(/\s/g, ""),
      expiryMonth: this.state.cardExpiry.split("/")[0],
      expiryYear: this.state.cardExpiry.split("/")[1],
      cvc: this.state.cvv,
      email: ticketpayment
        ? this.props.activeuser.ownerEmail
        : this.props.userdata
        ? this.props.userdata.email
        : this.props.guestuser.ownerEmail,
      amountInKobo: ticketpayment
        ? tickettotal * 100
        : this.props.totalpriceval * 100,
      reference: ticketpayment ? ticket_ref : this.props.paymentref
    })
      .then(response => {
        this.props.saveTransactionID(response.reference);
        this.setState({ paymentloading: false });
        //ticketpayment ? alert("Payment has been made successfully!") : null;
        this.props.modalDismissed();
        // setTimeout(() => {
        this.navigateTo("OrderSuccess", ticketpayment ? "ticketpayment" : null);
        // }, 500);

        console.log(response); // card charged successfully, get reference here
      })
      .catch(error => {
        this.setState({
          paymentloading: false,
          bookingerror: true,
          errormessage: error.message
        });
        console.log(error); // error is a javascript Error object
      });
  };
  render() {
    const {
      modalDismissed,
      totalpriceval,
      loading,
      userdata,
      totalticketprice,
      totalticketconcessionprice,
      ticketpayment
    } = this.props;
    const { formIsValid, paymentloading, showpayment } = this.state;
    const tickettotal = totalticketconcessionprice + totalticketprice;
    return (
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        extraHeight={Platform.OS === "android" ? 20 : null}
        extraScrollHeight={Platform.OS === "ios" ? 20 : null}
        contentContainerStyle={[
          BaseTheme.modalcontainer,
          { justifyContent: "flex-start", alignItems: "flex-start" }
        ]}
      >
        {this.state.bookingerror ? (
          <View
            style={{ position: "absolute", width: "100%", zIndex: 10000000 }}
          >
            <View style={[ticketStyle.rowhead4]}>
              {/* <SimpleLineIcons name="check" color="#fff" size={35} /> */}
              <TouchableOpacity
                hitSlop={BaseTheme.hitSlop}
                onPress={() =>
                  this.setState({ bookingerror: false, errormessage: "" })
                }
                style={{ width: RFValue(50), height: RFValue(50) }}
              >
                <Image
                  source={require("../assets/image/icon/bookingfailed.png")}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                />
              </TouchableOpacity>

              <Text style={ticketStyle.headerbottomtext2}>Booking Failed</Text>
            </View>
            <Text numberOfLines={2} style={ticketStyle.headerbottomtext4}>
              {this.state.errormessage}
            </Text>
          </View>
        ) : null}
        <TouchableOpacity
          hitSlop={BaseTheme.hitSlop}
          onPress={() => modalDismissed()}
          style={styles.modalcloseicon}
        >
          <Image
            source={Images.closeicon}
            style={BaseTheme.modalcloseicon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {ticketpayment || showpayment || userdata ? (
          <View
            style={{
              width: "100%",
              paddingHorizontal: RFValue(20),
              marginTop: RFPercentage(15)
            }}
          >
            {/* <Text style={[styles.modalheadtext]}>
              Enter your Card Details to checkout your items.
            </Text> */}
            <CustomInput
              auth
              value={this.state.cardNumber}
              onChangeText={this.handleCardNumber}
              maxLength={19}
              placeholder="Card Number"
              keyboardType="number-pad"
              textContentType="creditCardNumber"
              customstyle={styles.custominput}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "50%" }}>
                <CustomInput
                  auth
                  customstyle={styles.custominput}
                  value={this.state.cardExpiry}
                  placeholder="Expiry (MM/YY)"
                  keyboardType="number-pad"
                  onChangeText={this.handleExpiryDate}
                  maxLength={5}
                />
              </View>
              <View style={{ width: "50%" }}>
                <CustomInput
                  auth
                  customstyle={styles.custominput}
                  value={this.state.cvv}
                  placeholder="CVV"
                  keyboardType="number-pad"
                  maxLength={3}
                  onChangeText={this.handleCVV}
                />
              </View>
            </View>
            <Button
              formIsValid={
                this.state.cardNumber && this.state.cardExpiry && this.state.cvv
              }
              onPress={this.initiatePayment}
              customstyle={{ marginTop: RFValue(20) }}
              loading={paymentloading}
              btnText={
                ` PAY ${"\u20A6"}` +
                this.formatAmount(tickettotal ? tickettotal : totalpriceval)
              }
            />
            <Text style={ticketStyle.paystack}>
              Secured by{" "}
              <Text style={{ fontFamily: FontNames.bold }}>Paystack</Text>
            </Text>
          </View>
        ) : (
          <View
            style={{
              width: "100%",
              paddingHorizontal: RFValue(20),
              marginTop: RFPercentage(15)
            }}
          >
            {/* <Text style={[styles.modalheadtext]}>
              You're a Guest. Enter the details below to proceed. or Login as a
              customer
            </Text> */}
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
              onChangeText={value => this.updateInputChange("email", value, "")}
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
            <Button
              formIsValid={formIsValid}
              customstyle={{ marginTop: RFValue(20) }}
              onPress={this.saveGuestUser}
              loading={loading}
              // btnText={` PAY ${"\u20A6"}` + this.formatAmount(totalpriceval)}
              btnText="PROCEED"
            />
            <Text onPress={() => this.login()} style={ticketStyle.paystack}>
              Choose to
              <Text style={{ fontFamily: FontNames.bold }}> Login?</Text>
            </Text>
          </View>
        )}
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    userdata: state.authReducer.userdata,
    guestuser: state.authReducer.guestuser,
    message: state.uiReducer.message,
    checkout: state.shopReducer.checkout,
    paymentref: state.shopReducer.paymentref,
    totalpriceval: state.shopReducer.totalpriceval,
    activeuser: state.ticketReducer.activeuser,
    //ticket checkout
    totalticketconcessionprice: state.ticketReducer.totalticketconcessionprice,
    totalticketprice: state.ticketReducer.totalticketprice,
    ticket_ref: state.ticketReducer.ticket_ref
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createCart: () => dispatch(actions.createCart()),
    saveTransactionID: ref => dispatch(actions.saveTransactionID(ref)),
    saveGuestUser: data => dispatch(actions.saveGuestUser(data))
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(PaymentModal);
