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
import Button from "../../components/Button";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import Picker from "react-native-wheel-picker";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";

import Modal from "react-native-modal";
import RNPaystack from "react-native-paystack";

import CustomInput from "../../components/CustomInput";
import TicketExpired from "../../components/TicketExpired";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  BaseTheme,
  ticketStyle as styles
} from "../../shared/Themes/styles/index";
import PaymentModal from "../../components/PaymentModal";

const PickerItem = Picker.Item;
class Step3 extends Component {
  constructor(props) {
    super(props);
    RNPaystack.init({
      publicKey: "pk_test_dc0bc7c3c3925e6112d885e717a1cf393ce468fa"
    });
  }
  state = {
    ticketmodalVisible: false,
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.message == "show modal") {
      this.openModal();
    }
  }
  componentDidMount() {
    // StatusBar.setHidden(true);
  }
  createTicketConcession = () => {
    this.props.timerexpired == true
      ? this.setState({ ticketmodalVisible: true })
      : this.props.createTicketConcession();
  };
  openModal = () => {
    this.setState({ modalVisible: true });
  };
  formatAmount = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
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
  render() {
    const { width } = Dimensions.get("window");
    const { modalVisible, ticketmodalVisible } = this.state;
    const {
      ticket_checkout,
      totalticketprice,
      ticket_concession_checkout,
      totalticketconcessionprice
    } = this.props;
    const spreadItem = [...ticket_checkout, ...ticket_concession_checkout];
    // console.log(spreadItem);
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
          // swipeDirection="up"
        >
          <PaymentModal
            modalDismissed={this.modalDismissed}
            ticketpayment
            navigation={this.props.navigation}
          />
        </Modal>
        <Modal
          isVisible={ticketmodalVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={1}
          backdropColor={"#0b0b0d"}
          animationInTiming={400}
          animationOutTiming={600}
          backdropTransitionOutTiming={0}
          onBackdropPress={() => this.modalDismissed()}
          onBackButtonPress={() => this.modalDismissed()}
          // swipeDirection="up"
        >
          <TicketExpired
            modalDismissed={this.modalDismissed}
            navigation={this.props.navigation}
          />
        </Modal>
        <View style={[styles.header, { marginTop: RFValue(15) }]}>
          <View style={[styles.headerdiv]}>
            <TouchableOpacity
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

              <View style={styles.headertimer}>
                <Text style={styles.expiresin}>EXPIRES IN</Text>
                <Text style={[styles.headertext, { marginLeft: -17 }]}>
                  {this.props.timer}
                </Text>
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() =>
                this.setState({ modalVisible: !this.state.modalVisible })
              }
              style={styles.popup}
            >
              <Image
                source={require("../../assets/image/icon/sidepopup.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() =>
                this.setState({ modalVisible: !this.state.modalVisible })
              }
            >
              <View style={styles.headertimer}>
                <Text style={styles.expiresin}>YOUR CART</Text>
                <Text style={styles.headertext}>
                  {"\u20A6"}{" "}
                  {this.formatAmount(
                    totalticketconcessionprice + totalticketprice
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={Platform.OS === "android" ? 20 : null}
          extraScrollHeight={Platform.OS === "ios" ? 20 : null}
        >
          <View style={{ marginHorizontal: RFValue(20) }}>
            <View style={{ marginTop: RFValue(30) }}>
              <View>
                <Text style={[styles.adtext, { color: "#7d7d89" }]}>
                  STEP 3
                </Text>
                <View style={styles.titlerow}>
                  <Text style={styles.stephead}>REVIEW AND PAY</Text>
                </View>

                <View style={{ marginBottom: RFValue(20) }}>
                  <Image
                    source={require("../../assets/image/step3.png")}
                    resizeMode="contain"
                    style={{ width: "100%" }}
                  />
                </View>
                <View style={{ marginVertical: RFValue(20) }}>
                  {spreadItem &&
                    spreadItem.map((value, index) => (
                      <View key={index}>
                        <View style={{ marginHorizontal: RFValue(-20) }}>
                          <Image
                            source={require("../../assets/image/icon/line.png")}
                            style={{ width: "100%", height: 1 }}
                          />
                        </View>
                        <View style={styles.summarydiv}>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center"
                            }}
                          >
                            <Text style={[styles.adtext7L]}>{value.name}</Text>
                            <View style={styles.carticon}>
                              <Text style={[styles.adtext7Li]}>
                                {"x" + value.quantity}
                              </Text>
                            </View>
                          </View>

                          <Text style={[styles.adtext7R]}>
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
                    <Text
                      style={[styles.adtext7L, { color: Colors.basewhite }]}
                    >
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
                      {this.formatAmount(
                        totalticketconcessionprice + totalticketprice
                      )}
                    </Text>
                  </View>
                </View>
                <View style={styles.linetop2}>
                  <Image
                    source={require("../../assets/image/icon/line.png")}
                    style={{ width: "100%", height: 1 }}
                  />
                </View>
                <View>
                  <Image
                    source={require("../../assets/image/barestrip.png")}
                    resizeMode="contain"
                    style={BaseTheme.promobanner2}
                  />
                  <TouchableOpacity style={styles.clubhead}>
                    <Image
                      source={require("../../assets/image/icon/club.png")}
                      resizeMode="contain"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </TouchableOpacity>
                  <View style={styles.watchmoretop}>
                    <View style={styles.watchmoretopdiv}>
                      <Text style={styles.watchmoretopleft}>
                        Pay Just {"\u20A6"}{" "}
                        {this.formatAmount(
                          (totalticketconcessionprice + totalticketprice) / 2
                        )}{" "}
                        with {"\n"}
                        <Text style={{ color: "#60ced1" }}>FilmHouse Club</Text>
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.watchmorebottomdivleft}>
                    <Image
                      source={require("../../assets/image/subscribex.png")}
                      resizeMode="contain"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.linetop}>
                  <Image
                    source={require("../../assets/image/icon/line.png")}
                    style={{ width: "100%", height: 1 }}
                  />
                </View>
                <View style={styles.voucherinput}>
                  <View style={{ width: "65%" }}>
                    <CustomInput
                      label="VOUCHER"
                      customstyle={styles.voucherinputX}
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
                  formIsValid={spreadItem && spreadItem.length > 0}
                  onPress={() => this.createTicketConcession()}
                  loading={this.props.loading}
                  btnText={
                    ` PAY ${"\u20A6"}` +
                    this.formatAmount(
                      totalticketconcessionprice + totalticketprice
                    )
                  }
                />
                <View>
                  <Text style={styles.adtext8}>
                    For PG, 15 and 18 certificate films, and some concessions,
                    we may ask you for photographic ID.
                  </Text>
                </View>
              </View>
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
    concession_items: state.ticketReducer.concession_items,
    totalticketconcessionprice: state.ticketReducer.totalticketconcessionprice,
    ticket_concession_checkout: state.ticketReducer.ticket_concession_checkout,
    ticket_checkout: state.ticketReducer.ticket_checkout,
    totalticketprice: state.ticketReducer.totalticketprice,
    timerexpired: state.ticketReducer.timerexpired,
    timer: state.ticketReducer.timer,
    message: state.uiReducer.message
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createTicketConcession: () => dispatch(actions.createTicketConcession())
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Step3);
