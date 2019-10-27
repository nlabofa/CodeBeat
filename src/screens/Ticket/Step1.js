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
import Carousel, { Pagination } from "react-native-snap-carousel";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import Picker from "react-native-wheel-picker";
import { CheckBox } from "react-native-elements";
import validate from "../../shared/utils/validation";

import Modal from "react-native-modal";

import CustomInput from "../../components/CustomInput";
import TicketModal from "../../components/TicketModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import {
  BaseTheme,
  ticketStyle as styles
} from "../../shared/Themes/styles/index";
import Button from "../../components/Button";

const PickerItem = Picker.Item;
class Step1 extends Component {
  state = {
    slider2ActiveSlide: 0,
    selectedItem1: 1,
    modalVisible: false,
    guestchecked: false,
    modalval: "lagos",
    ticketList: [],
    shadowContent: null,
    selectedItem2: 0,
    itemList: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20"
    ]
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.message == "add to cart success") {
      this.proceedbtn();
    }
    if (this.props.ticket_checkout !== nextProps.ticket_checkout) {
      this.setState({
        ticketList: nextProps.ticket_checkout,
        shadowContent: nextProps.ticket_checkout[0]
      });
    }
  }
  componentDidMount() {
    // StatusBar.setHidden(true);
    // this.fetchTicketType();
    const params = this.props.navigation.getParam("params");
    this.setState({ moviedetail: params });
  }
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  proceedbtn = () => {
    let ticketList = [];
    Object.keys(this.state).map((el, index) => {
      if (el.endsWith("guestname")) {
        ticketList.push({
          name: this.state[el]
        });
      }
    });
    // Object.keys(this.state).map((el, index) => {
    //   if (el.endsWith("guestname") && this.state.guestchecked) {
    //     ticketList.push({
    //       name: this.state[el]
    //     });
    //   } else {
    //     //this.navigateTo("TicketStep2")
    //     return;
    //   }
    //   this.spreadItem = ticketList;
    //   console.log(this.spreadItem);
    // });
    console.log(ticketList);
    this.spreadItem = ticketList;
    this.props.saveGuestList(this.spreadItem);
    this.navigateTo("TicketStep2");
  };
  createTicketCart = () => {
    this.props.saveActiveUser({
      ownerEmail: this.state["0guestemail"],
      ownerName: this.state["0guestname"]
    });
    this.props.createTicketCart();
  };
  checkstate = (index, item) => {
    const { ticket_checkout } = this.props;
    const ticketList = [];
    //updates previous cart details by removing found item
    if (index == 0 && ticket_checkout.some(el => el.name === item.ticketType)) {
      this.setState({ guestchecked: false });
      const updatedInfo = ticket_checkout.filter(
        el => el.name !== item.ticketType
      );
      this.props.replaceTicketItemToCart(updatedInfo);
      this.props.updateTicketPrice();
      return;
    }
    if (ticket_checkout.some(el => el.name === item.ticketType)) {
      const updatedInfo = ticket_checkout.filter(
        el => el.name !== item.ticketType
      );
      this.props.replaceTicketItemToCart(updatedInfo);
      this.props.updateTicketPrice();
    }
    ticketList.push({
      name: item.ticketType,
      quantity: index,
      price: item.priceInCents,
      cinemaId: item.cinemaId,
      ownerEmail: "",
      ownerName: "",
      // ownerEmail: this.state["0guestemail"],
      // ownerName: this.state["0guestname"],
      showTimeId: this.state.moviedetail.showTimeId,
      // showTimeId: "17398",
      ticketTypeCode: item.ticketTypeCode
    });

    const spreadItem = [...ticketList];

    this.props.addTicketItemToCart(spreadItem);
    this.props.updateTicketPrice();

    // Object.keys(this.state).map(el => {
    //   if (el.endsWith("ticket") && this.state[el] !== 0) {
    //     ticketList.push({
    //       name: item.ticketType,
    //       quantity: this.state[el],
    //       price: item.priceInCents,
    //       cinemaId: item.cinemaId,
    //       ownerEmail: this.state.name,
    //       ownerName: this.state.email,
    //       showTimeId: this.state.moviedetail.showTimeId,
    //       // showTimeId: "17398",
    //       ticketTypeCode: item.ticketTypeCode
    //     });
    //     const spreadItem = [...ticketList];

    //     this.props.addTicketItemToCart(spreadItem);
    //     this.props.updateTicketPrice();
    //   } else {
    //     this.setState({ guestchecked: false });
    //   }
    // });
    // console.log(ticketList);
    // this.setState(
    //   { ticketList: ticketList, shadowContent: ticketList[0] }
    //   //() => this.checkZeroCount()
    // );
    // if (ticketList.length == 0) {
    //   this.props.clearTicketCheckout();
    //   this.props.clearTicketPrice();
    // }
  };
  checkZeroCount = () => {
    // tempList = [];
    // this.state.ticketList.map(el => {
    //   if(this.state.ticketList[el] == 0)
    // }

    //   )
    // const updatedInfo = this.state.ticketList.filter(el => el.count == 0);
    // console.log(updatedInfo);
    if (updatedInfo.length == this.state.ticketList.length) {
      this.setState({ ticketList: null });
    } else {
      const shadowContent = this.state.ticketList.filter(el => el.count !== 0);
      this.setState({ shadowContent: shadowContent[0] });
    }
  };
  onPickerSelect(index, title, item) {
    this.setState({ [title + "ticket"]: index }, () =>
      this.checkstate(index, item)
    );
  }
  setModalVal = val => {
    this.setState({ dropdownval: val });
    this.modalDismissed();
  };
  setTabHead = val => {
    this.setState({ tabhead: val });
    this.modalDismissed();
  };
  navigateTo = (route, obj) => {
    this.props.navigation.push(route, { params: obj });
  };
  openModal = () => {
    !this.state.shadowContent
      ? null
      : this.setState({ modalVisible: !this.state.modalVisible });
  };
  _renderItem2 = ({ item, index }) => {
    return (
      <View key={index} style={styles.ticketbox}>
        <View
          style={{
            //  backgroundColor: "red",
            width: "75%",
            alignItems: "flex-start",
            justifyContent: "center",
            height: "100%"
          }}
        >
          <Text numberOfLines={3} style={styles.boxhead}>
            {item.ticketType}
          </Text>
          <Text style={styles.boxtext}>
            {"\u20A6"} {this.formatAmount(item.priceInCents)}/TICKET
          </Text>
        </View>
        <Picker
          style={styles.pickerdiv}
          selectedValue={this.state[item.ticketType + "ticket"] || 0}
          itemStyle={styles.pickertext}
          onValueChange={index =>
            this.onPickerSelect(index, item.ticketType, item)
          }
        >
          {this.state.itemList.map((value, i) => (
            <PickerItem label={value} value={i} key={"money" + value} />
          ))}
        </Picker>
      </View>
    );
  };
  renderBody = () => {
    const { width } = Dimensions.get("window");
    const { ticketList, shadowContent } = this.state;
    const { ticket_type, totalticketprice } = this.props;
    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={Platform.OS === "android" ? 20 : null}
        extraScrollHeight={Platform.OS === "ios" ? 20 : null}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../../assets/image/ticketbanner.png")}
            style={{ width: "100%", height: RFValue(96) }}
            //resizeMode="contain"
          />
          <Text style={styles.stephead2}>
            Pay Just {"\u20A6"} {this.formatAmount(totalticketprice / 2)} with
            FilmHouse Club
          </Text>
        </View>
        <View style={{ marginHorizontal: RFValue(20) }}>
          <View style={{ marginTop: RFValue(30) }}>
            <View>
              <Text style={[styles.adtext, { color: "#7d7d89" }]}>STEP 1</Text>
              <Text style={styles.stephead}>WHO'S GOING?</Text>
              <View>
                <Image
                  source={require("../../assets/image/step1.png")}
                  resizeMode="contain"
                  style={{ width: "100%" }}
                />
              </View>
              <View style={{ marginTop: RFValue(15) }}>
                <Carousel
                  ref={c => (this._slider2Ref = c)}
                  data={ticket_type && ticket_type}
                  renderItem={this._renderItem2}
                  sliderWidth={width}
                  itemWidth={RFValue(243)}
                  activeSlideAlignment="start"
                  inactiveSlideOpacity={0.5}
                  removeClippedSubviews={false}
                  //activeSlideAlignment="start"
                  inactiveSlideScale={3}
                  //firstItem={1}
                  onSnapToItem={index =>
                    this.setState({ slider2ActiveSlide: index })
                  }
                  contentContainerCustomStyle={
                    {
                      //overflow: 'hidden',
                      // width: 140 * 2.2,
                    }
                  }
                />
                <Pagination
                  ref={c => (this._slider2Ref = c)}
                  dotsLength={ticket_type && ticket_type.length}
                  activeDotIndex={this.state.slider2ActiveSlide}
                  containerStyle={styles.paginationContainer}
                  dotColor={"rgba(255, 255, 255, 0.92)"}
                  dotStyle={styles.paginationDot}
                  inactiveDotColor={"#282a3b"}
                  inactiveDotStyle={styles.inactivedot}
                  //inactiveDotOpacity={0.4}
                  inactiveDotScale={1.2}
                  carouselRef={this._slider2Ref}
                  //tappableDots={true}
                />
              </View>
              {shadowContent ? (
                <View style={{ marginTop: RFValue(10) }}>
                  <View>
                    <CustomInput
                      label="NAME"
                      placeholder=""
                      value={this.state["0guestname"]}
                      maxLength={70}
                      onChangeText={value =>
                        this.setState({ "0guestname": value })
                      }
                    />
                    <CustomInput
                      keyboardType="email-address"
                      label="EMAIL"
                      placeholder=""
                      value={this.state["0guestemail"]}
                      valid={validate(
                        this.state["0guestemail"],
                        "emailValidator"
                      )}
                      onChangeText={value =>
                        this.setState({ "0guestemail": value })
                      }
                    />
                  </View>
                  {shadowContent &&
                  shadowContent.quantity > 1 &&
                  ticketList.length == 1 ? (
                    <View style={styles.guestview}>
                      <CheckBox
                        checkedColor="#60CED1"
                        uncheckedColor="#fff"
                        checkedIcon="check-box"
                        iconType="material-Icons"
                        uncheckedIcon="check-box-outline-blank"
                        containerStyle={{
                          marginRight: 0
                        }}
                        checked={this.state.guestchecked === true}
                        onPress={() =>
                          this.setState({
                            guestchecked: !this.state.guestchecked
                          })
                        }
                      />
                      <Text style={[styles.adtext2]}>
                        Send Ticket to Guest(s)
                      </Text>
                    </View>
                  ) : null}
                </View>
              ) : null}
              {this.state.guestchecked === true &&
              shadowContent.quantity > 1 &&
              ticketList.length == 1
                ? [...Array(shadowContent.quantity - 1)].map((e, i) => (
                    <View key={i}>
                      <View style={styles.guestline}>
                        <Image
                          source={require("../../assets/image/guestinfoline.png")}
                          style={{ width: "100%", height: RFValue(30) }}
                          resizeMode="contain"
                        />
                      </View>
                      <View>
                        <CustomInput
                          label="NAME"
                          placeholder="Opeyemi Adeyemi"
                          value={this.state[i + 1 + "guestname"]}
                          onChangeText={value =>
                            this.setState({ [i + 1 + "guestname"]: value })
                          }
                        />
                        <CustomInput
                          keyboardType="email-address"
                          label="EMAIL"
                          placeholder="email@yahoo.com"
                          value={this.state[i + 1 + "guestemail"]}
                          onChangeText={value =>
                            this.setState({ [i + 1 + "guestemail"]: value })
                          }
                        />
                      </View>
                    </View>
                  ))
                : null}
              <Button
                formIsValid={
                  this.state["0guestname"] &&
                  this.validateEmail(this.state["0guestemail"])
                }
                onPress={() => this.createTicketCart()}
                loading={this.props.loading}
                btnText="PROCEED"
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  };
  modalDismissed = () => {
    this.setState({ modalVisible: false });
  };
  fetchTicketType = () => {
    //showtimeId: "17397"
    this.props.fetchTicketType({
      showtimeId: "17570",
      vistaCinemaId: "1001"
    });
  };
  formatAmount = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    const { modalVisible, shadowContent } = this.state;
    const { totalticketprice } = this.props;
    return (
      <ScrollView
        stickyHeaderIndices={[1]}
        bounces={false}
        removeClippedSubviews={false}
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
          <TicketModal
            modalDismissed={this.modalDismissed}
            activemovie={this.props.activemovie}
            moviedetail={this.state.moviedetail}
            ticketPrice={shadowContent && shadowContent.price}
            totalticketprice={totalticketprice}
          />
        </Modal>
        <View style={styles.header}>
          <View style={[styles.headerdiv]}>
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
            {/* <View>
              <TouchableOpacity
                onPress={() => this.openModal()}
                style={styles.popup}
              >
                <Image
                  source={require("../../assets/image/icon/sidepopup.png")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View> */}

            <TouchableOpacity onPress={() => this.openModal()}>
              <View style={styles.headertimer}>
                <Text style={styles.expiresin}>TICKET SUMMARY</Text>
                <Text style={styles.headertext}>
                  {"\u20A6"}
                  {this.formatAmount(totalticketprice)}{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {this.renderBody()}
      </ScrollView>
    );
  }
}
const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    itemloading: state.uiReducer.itemloading,
    message: state.uiReducer.message,
    showtime: state.filmReducer.showtime,
    activemovie: state.filmReducer.activemovie,
    ticket_type: state.ticketReducer.ticket_type,
    ticket_checkout: state.ticketReducer.ticket_checkout,
    totalticketprice: state.ticketReducer.totalticketprice
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearTicketCheckout: () => dispatch(actions.clearTicketCheckout()),
    clearTicketPrice: () => dispatch(actions.clearTicketPrice()),
    saveGuestList: data => dispatch(actions.saveGuestList(data)),
    createTicketCart: data => dispatch(actions.createTicketCart()),
    fetchTicketType: data => dispatch(actions.fetchTicketType(data)),
    addTicketItemToCart: data => dispatch(actions.addTicketItemToCart(data)),
    replaceTicketItemToCart: data =>
      dispatch(actions.replaceTicketItemToCart(data)),
    saveActiveUser: data => dispatch(actions.saveActiveUser(data)),
    updateTicketPrice: () => dispatch(actions.updateTicketPrice()),
    removeItemPrice: item => dispatch(actions.removeItemPrice(item)),
    fetchShowTime: data => dispatch(actions.fetchShowTime(data))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Step1);
