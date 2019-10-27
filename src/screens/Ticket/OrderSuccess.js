/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";
import { Colors, Images, FontNames } from "../../shared/Themes/index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import Picker from "react-native-wheel-picker";
import BackgroundTimer from "react-native-background-timer";
import { NavigationActions, StackActions } from "react-navigation";
import Button from "../../components/Button";

import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  BaseTheme,
  ticketStyle as styles
} from "../../shared/Themes/styles/index";

class OrderSuccess extends Component {
  state = {
    slider2ActiveSlide: 0,
    ticketpayment: false
  };
  componentDidMount() {
    const params = this.props.navigation.getParam("params");
    if (params == "ticketpayment") {
      this.setState({ ticketpayment: true });
    }
    // StatusBar.setHidden(true);
  }
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

  proceedCheckout = () => {
    BackgroundTimer.stopBackgroundTimer();
    this.state.ticketpayment ? null : this.props.clearCartItems();

    this.resetTo("Tabscreens");
  };
  navigateTo = (route, obj) => {
    this.props.navigation.push(route, { params: obj });
  };

  formatAmount = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    const { ticketpayment } = this.state;
    const {
      checkout,
      ticket_checkout,
      ticket_concession_checkout,
      totalpriceval,
      loading,
      totalticketconcessionprice,
      totalticketprice,
      transaction_id
    } = this.props;
    const renderstate =
      ticketpayment == true
        ? [...ticket_checkout, ...ticket_concession_checkout]
        : checkout;
    const tickettotal = totalticketconcessionprice + totalticketprice;
    return (
      <View
        stickyHeaderIndices={[0]}
        bounces={false}
        style={BaseTheme.baseBackground}
      >
        <View style={{ marginHorizontal: RFValue(20) }}>
          <View style={[styles.rowhead3]}>
            {/* <SimpleLineIcons name="check" color="#fff" size={35} /> */}
            <Image
              source={require("../../assets/image/icon/bookingsuccess.png")}
              resizeMode="contain"
              style={{ width: RFValue(50), height: RFValue(50) }}
            />
            <Text style={styles.headerbottomtext2}>Booking Successful</Text>
          </View>
          <Text style={styles.headerbottomtext3}>
            E-Receipt will be sent to your email address.
          </Text>
          <View style={{ marginTop: RFValue(40) }}>
            <Text style={styles.adtext7L}>Payment ID</Text>
            <Text style={styles.payIdbottom}>{"#" + transaction_id}</Text>
          </View>
        </View>

        <KeyboardAwareScrollView
          enableOnAndroid
          style={{ marginTop: RFValue(50) }}
          extraHeight={Platform.OS === "android" ? 20 : null}
          extraScrollHeight={Platform.OS === "ios" ? 20 : null}
        >
          <View style={{ marginHorizontal: RFValue(20) }}>
            {renderstate &&
              renderstate.map((value, index) => (
                <View key={index}>
                  <View style={{ marginHorizontal: RFValue(-20) }}>
                    <Image
                      source={require("../../assets/image/icon/line.png")}
                      style={{ width: "100%", height: 1 }}
                    />
                  </View>
                  <View style={styles.summarydiv}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={[styles.adtext7L]}>{value.name}</Text>
                      <View style={styles.carticon}>
                        <Text style={[styles.adtext7Li]}>
                          {"x" + value.quantity}
                        </Text>
                      </View>
                    </View>
                    <Text style={[styles.adtext7R]}>
                      {" "}
                      {"\u20A6"}
                      {this.formatAmount(value.price * value.quantity)}
                    </Text>
                  </View>
                </View>
              ))}

            <View style={{ marginHorizontal: RFValue(-20) }}>
              <Image
                source={require("../../assets/image/dashedline.png")}
                style={{ width: "100%", height: 1 }}
              />
            </View>
            <View style={styles.summarydiv}>
              <Text style={[styles.adtext7L, { color: Colors.basewhite }]}>
                TOTAL
              </Text>
              <Text
                style={[
                  styles.adtext7R,
                  { color: Colors.basewhite, fontSize: RFValue(16) }
                ]}
              >
                {" "}
                {"\u20A6"}
                {this.formatAmount(ticketpayment ? tickettotal : totalpriceval)}
              </Text>
            </View>
          </View>

          <Button
            formIsValid={true}
            onPress={this.proceedCheckout}
            // onPress={this.openModal}
            loading={loading}
            btnText="DONE"
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    message: state.uiReducer.message,
    userdata: state.authReducer.userdata,
    transaction_id: state.ticketReducer.transaction_id,
    concession_items: state.shopReducer.concession_items,
    checkout: state.shopReducer.checkout,
    ticket_checkout: state.ticketReducer.ticket_checkout,
    ticket_concession_checkout: state.ticketReducer.ticket_concession_checkout,
    totalticketconcessionprice: state.ticketReducer.totalticketconcessionprice,
    totalticketprice: state.ticketReducer.totalticketprice,
    totalpriceval: state.shopReducer.totalpriceval
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchConcessions: () => dispatch(actions.fetchConcessions()),
    clearCartItems: () => dispatch(actions.clearCartItems())
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(OrderSuccess);
