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

import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../../components/Button";

import CustomInput from "../../components/CustomInput";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import RNPaystack from "react-native-paystack";
import Modal from "react-native-modal";
import PaymentModal from "../../components/PaymentModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  BaseTheme,
  ticketStyle as styles
} from "../../shared/Themes/styles/index";

const PickerItem = Picker.Item;
class OrderSummary extends Component {
  constructor(props) {
    super(props);
    RNPaystack.init({
      publicKey: "pk_test_dc0bc7c3c3925e6112d885e717a1cf393ce468fa"
    });
  }
  state = {
    slider2ActiveSlide: 0,
    selectedItem1: 0,
    modalVisible: false,
    guestchecked: false,
    modalval: "lagos",
    name: "",
    email: "",
    guestname: "",
    guestemail: "",
    selectedItem2: 1,
    itemList: ["1", "2", "3", "4"]
  };
  componentDidMount() {
    // StatusBar.setHidden(true);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.message == "trigger paystack") {
      this.openModal();
    }
  }
  onPickerSelect(index, title) {
    console.log(index);
    console.log(title);

    if (title === "ADULT") {
      this.setState({
        selectedItem1: index
      });
    } else {
      this.setState({
        selectedItem2: index
      });
    }
  }
  setModalVal = val => {
    this.setState({ dropdownval: val });
    this.modalDismissed();
  };
  proceedCheckout = () => {
    this.props.userdata ? this.props.createCart() : this.openModal();
  };
  navigateTo = (route, obj) => {
    this.props.navigation.push(route, { params: obj });
  };
  setTabHead = val => {
    this.setState({ tabhead: val });
    this.modalDismissed();
  };
  _renderItem2 = ({ item, index }) => {
    return (
      <View key={index} style={styles.ticketbox}>
        <View>
          <Text style={styles.boxhead}>{item.title}</Text>
          <Text style={styles.boxtext}>{"\u20A6"} 3,000/TICKET</Text>
        </View>
        <Picker
          style={styles.pickerdiv}
          selectedValue={
            index === 0 ? this.state.selectedItem1 : this.state.selectedItem2
          }
          itemStyle={styles.pickertext}
          onValueChange={index => this.onPickerSelect(index, item.title)}
        >
          {this.state.itemList.map((value, i) => (
            <PickerItem label={value} value={i} key={"money" + value} />
          ))}
        </Picker>
      </View>
    );
  };
  modalDismissed = () => {
    this.setState({ modalVisible: false });
  };
  openModal = () => {
    this.setState({ modalVisible: true });
  };
  goBack = () => {
    this.props.navigation.pop();
  };
  formatAmount = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  removeItem = item => {
    const { checkout } = this.props;
    if (checkout.some(el => el.concessionId === item.concessionId)) {
      const updatedInfo = checkout.filter(
        el => el.concessionId !== item.concessionId
      );

      // console.log(updatedInfo);
      this.props.replaceItemInCart(updatedInfo);
      this.props.updatePrice();
    }
  };
  render() {
    const { checkout, totalpriceval, loading } = this.props;
    const { modalVisible } = this.state;
    return (
      <View
        stickyHeaderIndices={[1]}
        bounces={false}
        style={BaseTheme.baseBackground}
      >
        <Modal
          isVisible={modalVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={1}
          backdropColor={"#0b0b0d"}
          animationInTiming={400}
          animationOutTiming={600}
          backdropTransitionOutTiming={0}
          onBackdropPress={() => this.modalDismissed()}
          onBackButtonPress={() => this.modalDismissed()}
          swipeDirection={["down"]}
          propagateSwipe={false}
        >
          <PaymentModal
            modalDismissed={this.modalDismissed}
            navigation={this.props.navigation}
          />
        </Modal>
        <View style={[styles.rowhead2]}>
          <TouchableOpacity
            hitSlop={BaseTheme.hitSlop}
            onPress={() => this.goBack()}
            style={styles.closeicon}
          >
            <Ionicons name="md-arrow-back" color="#fff" size={25} />
          </TouchableOpacity>
          <Text style={styles.headerbottomtext}>
            {checkout.length == 0 ? "Cart" : "Order Summary"}
          </Text>
          <Text style={[styles.headerbottomtext, { opacity: 0 }]}>MAN</Text>
        </View>
        {checkout.length == 0 ? (
          <View style={styles.emptydiv}>
            <Image
              resizeMode="contain"
              style={{ width: RFValue(256), height: RFValue(256) }}
              source={require("../../assets/image/emptycart.png")}
            />
            <Text style={styles.summarybig}>Your Cart Is Empty</Text>
            <Text style={styles.summarysmall}>
              Looks like you haven’t added any items yet{" "}
            </Text>
          </View>
        ) : (
          <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={Platform.OS === "android" ? 20 : null}
            extraScrollHeight={Platform.OS === "ios" ? 20 : null}
          >
            <View style={{ marginHorizontal: RFValue(20) }}>
              {checkout &&
                checkout.map((value, index) => (
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
                        <TouchableOpacity
                          style={{ marginRight: RFValue(10) }}
                          hitSlop={BaseTheme.hitSlop}
                          onPress={() => this.removeItem(value)}
                        >
                          <Ionicons name="ios-trash" color="#fff" size={25} />
                        </TouchableOpacity>

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
                  {this.formatAmount(totalpriceval)}
                </Text>
              </View>
            </View>

            <View style={styles.voucherinput2}>
              <View style={{ width: "65%" }}>
                <CustomInput
                  label="VOUCHER"
                  customstyle={styles.voucherinputM}
                  //placeholder="Opeyemi Adeyemi"
                  value={this.state.name}
                  onChangeText={value => this.setState({ name: value })}
                />
              </View>
              <View
                style={{
                  width: "30%",
                  alignItems: "flex-end"
                }}
              >
                <TouchableOpacity
                  style={BaseTheme.buttonticket3}
                  //onPress={() => this.setState({modalVisible: true})}
                >
                  <Text style={[BaseTheme.buttontext, { color: "#fff" }]}>
                    APPLY
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.linetop}>
              <Image
                source={require("../../assets/image/icon/line.png")}
                style={{ width: "100%", height: 1 }}
              />
            </View>

            <Button
              formIsValid={true}
              onPress={this.proceedCheckout}
              // onPress={this.openModal}
              loading={loading}
              btnText={` PAY ${"\u20A6"}` + this.formatAmount(totalpriceval)}
            />
            <Text style={styles.paystack}>
              Secured by{" "}
              <Text style={{ fontFamily: FontNames.bold }}>Paystack</Text>
            </Text>
          </KeyboardAwareScrollView>
        )}
      </View>
    );
  }
}

const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    message: state.uiReducer.message,
    userdata: state.authReducer.userdata,
    concession_items: state.shopReducer.concession_items,
    checkout: state.shopReducer.checkout,
    totalpriceval: state.shopReducer.totalpriceval
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchConcessions: () => dispatch(actions.fetchConcessions()),
    addItemToCart: data => dispatch(actions.addItemToCart(data)),
    totalPrice: amount => dispatch(actions.totalPrice(amount)),
    createCart: () => dispatch(actions.createCart()),
    updatePrice: () => dispatch(actions.updatePrice()),
    replaceItemInCart: data => dispatch(actions.replaceItemInCart(data))
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(OrderSummary);
