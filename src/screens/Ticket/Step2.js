/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  FlatList,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";
import { Colors, Images, FontNames } from "../../shared/Themes/index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import Modal from "react-native-modal";

import TicketModal from "../../components/TicketModal";

import FoodModal from "../../components/FoodModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import BackgroundTimer from "../../components/BackgroundTimer";

import {
  BaseTheme,
  ticketStyle as styles
} from "../../shared/Themes/styles/index";
const maxCountDownSecs = 600;

class Step2 extends Component {
  state = {
    slider2ActiveSlide: 0,
    selectedItem1: 0,
    modalVisible: false,
    modalmode: "food",
    guestchecked: false,
    modalval: "lagos",
    quantity: 1,
    disable: true,
    name: "",
    email: "",
    selectedItem2: 1,
    calendar: "all guests",
    food: "Popcorn",
    size: "huge",
    flavor: "salty"
  };
  componentDidMount() {
    // StatusBar.setHidden(true);
    this.startCountDown();
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        setTimeout(() => {
          this.setState({ disable: false });
        }, 500);
      }
    );
    this.didBlurListener = this.props.navigation.addListener(
      "didBlur",
      this.blur
    );
  }
  blur = () => {
    this.setState({ disable: true });
  };
  componentWillUnmount() {
    this.didFocusListener.remove();
    this.didBlurListener.remove();
  }
  setCalendar = val => {
    this.setState({ calendar: val });
  };
  setFood = (name, item) => {
    this.setState({ food: name });
    this.showModal("food", item);
  };
  renderFoodImage = fooditem => {
    if (fooditem === "Popcorn") {
      return (
        <View style={[styles.popcorndiv]}>
          <Image
            source={require("../../assets/image/popcorn.png")}
            style={[
              {
                width: "100%",
                height: "100%"
                // marginLeft: RFValue(10),
              }
            ]}
            resizeMode="contain"
          />
        </View>
      );
    } else if (fooditem === "Hotdog") {
      return (
        <View style={[styles.hotdog]}>
          <Image
            source={require("../../assets/image/hotdog.png")}
            style={[
              {
                width: "100%",
                height: "100%"
              }
            ]}
            resizeMode="contain"
          />
        </View>
      );
    } else if (fooditem === "Burger") {
      return (
        <View style={[styles.popcorndiv]}>
          <Image
            source={require("../../assets/image/burger.png")}
            style={[
              {
                width: "100%",
                height: "100%"
              }
            ]}
            resizeMode="contain"
          />
        </View>
      );
    } else if (fooditem === "Drinks") {
      return (
        <View style={[styles.popcorndiv]}>
          <Image
            source={require("../../assets/image/coke.png")}
            style={[
              {
                width: "100%",
                height: "100%"
              }
            ]}
            resizeMode="contain"
          />
        </View>
      );
    }
  };
  firstLetters = word => {
    var abbr = word
      .split(" ")
      .map(function(item) {
        return item[0];
      })
      .join("");
    return abbr.toUpperCase();
  };
  renderCalendar = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() => this.setCalendar(item.day)}
      style={styles.calendarbody}
    >
      <View style={[styles.calendardiv]}>
        <Image
          source={require("../../assets/image/foodActive.png")}
          style={[
            {
              width: "100%",
              height: "100%",
              opacity: this.state.calendar === item.day ? 1 : 0
            }
          ]}
          //resizeMode="contain"
        />
        <View style={styles.calendartextbody}>
          {item.day === "all guests" ? (
            <Image
              source={require("../../assets/image/icon/allguest.png")}
              style={{ width: RFValue(30), height: RFValue(23) }}
              resizeMode="contain"
            />
          ) : (
            <Text
              style={[
                styles.overviewtext2,
                {
                  textAlign: "center",
                  color: this.state.calendar === item.day ? "#fff" : "#a7a7a7"
                }
              ]}
            >
              {this.firstLetters(item.day) + "A"}
            </Text>
          )}
        </View>
      </View>
      <Text
        numberOfLines={1}
        style={[
          styles.adtext4,
          this.state.calendar === item.day
            ? styles.activetext
            : styles.activetext
        ]}
      >
        {item.day.toLowerCase()}
      </Text>
      <Image
        source={require("../../assets/image/icon/triangle.png")}
        resizeMode="contain"
        style={[
          {
            width: 30,
            marginTop: RFValue(10),
            marginLeft: RFValue(15),

            zIndex: 1000000000,

            height: 30,
            opacity: this.state.calendar === item.day ? 1 : 0
          }
        ]}
        //resizeMode="contain"
      />
    </TouchableOpacity>
  );
  renderFood = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() => this.setFood(item.name, item)}
      style={styles.foodbody}
    >
      {this.renderFoodImage(item.name)}
      <Text
        numberOfLines={1}
        style={[
          styles.adtext5,
          {
            opacity: this.props.ticket_concession_checkout.some(
              el => el.name == item.name
            )
              ? 1
              : 0.38
          }
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
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
  navigateTo = (route, obj) => {
    this.props.navigation.push(route, { params: obj });
  };
  setSizeVal = val => {
    this.setState({ size: val });
    //this.modalDismissed();
  };
  setFlavorVal = val => {
    this.setState({ flavor: val });
    //this.modalDismissed();
  };
  setTabHead = val => {
    this.setState({ tabhead: val });
    this.modalDismissed();
  };
  showModal = (mode, item) => {
    this.setState({ modalmode: mode }, () => this.openFoodModal(item));
  };
  openFoodModal = item => {
    const { ticket_concession_checkout } = this.props;
    if (ticket_concession_checkout.some(el => el.concessionId === item.id)) {
      //const updatedInfo = ticket_concession_checkout.filter(el => el.concessionId !== item.id);
      const matchedInfo = ticket_concession_checkout.filter(
        el => el.concessionId == item.id
      );

      this.setState({
        activeItem: item,
        editItemCount: matchedInfo[0].quantity,
        modalVisible: !this.state.modalVisible
      });
    } else {
      this.setState({
        activeItem: item,
        modalVisible: !this.state.modalVisible
      });
    }
  };
  modalDismissed = () => {
    this.setState({
      activeItem: null,
      editItemCount: null,
      modalVisible: false
    });
  };
  setQtyVal = val => {
    this.setState({ quantity: val });
    //this.modalDismissed();
  };
  formatCountDownTime(number) {
    return parseInt(number / 60) + ":" + ("0" + (number % 60)).slice(-2);
  }
  cancelInterval = () => {
    BackgroundTimer.clearInterval(this.timer);
  };
  startCountDown = () => {
    this.cancelInterval();
    this.state.timer = maxCountDownSecs;
    this.timer = BackgroundTimer.setInterval(() => {
      this.setState({
        timer: this.state.timer - 1
        // timerMessage: this.formatCountDownTime(this.state.timer)
      });
      this.props.saveCountDownTimer(this.formatCountDownTime(this.state.timer));
      this.checkIfTimerHasEnded();
    }, 1000);
  };

  checkIfTimerHasEnded = () => {
    if (this.state.timer <= 0) {
      this.codeExpired();
    }
  };
  codeExpired = () => {
    this.cancelInterval();
    this.props.timerExpired();
    console.log("finished running timer");
  };
  addToCheckOut = item => {
    const { ticket_concession_checkout } = this.props;
    const purchaseItem = [];
    //updates previous cart details by removing found item
    if (ticket_concession_checkout.some(el => el.concessionId === item.id)) {
      const updatedInfo = ticket_concession_checkout.filter(
        el => el.concessionId !== item.id
      );
      this.props.replaceTicketConcessionItemInCart(updatedInfo);
    }
    purchaseItem.push({
      concessionId: item.id,
      name: item.name,
      price: item.price,
      quantity: this.state.quantity,
      ownerName: this.props.activeuser.ownerName,
      ownerEmail: this.props.activeuser.ownerEmail,
      forSelf: true
      //cartId: 1
    });

    const spreadItem = [...purchaseItem];

    this.props.addTicketConcessionItem(spreadItem);
    this.props.updateTicketConcessionPrice();
    this.modalDismissed();
  };
  formatAmount = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    const { width } = Dimensions.get("window");
    const { modalVisible, calendar, food } = this.state;
    const {
      guest_list,
      concession_items,
      totalticketprice,
      totalticketconcessionprice
    } = this.props;
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
          {this.state.modalmode == "food" ? (
            <FoodModal
              modalDismissed={this.modalDismissed}
              setSizeVal={this.setSizeVal}
              setFlavorVal={this.setFlavorVal}
              size={this.state.size}
              flavor={this.state.flavor}
              setQtyVal={this.setQtyVal}
              quantity={this.state.quantity}
              addToCheckOut={this.addToCheckOut}
              activeItem={this.state.activeItem}
              editItemCount={this.state.editItemCount}
            />
          ) : (
            <TicketModal modalDismissed={this.modalDismissed} />
          )}
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

            <TouchableOpacity
            //onPress={() => this.openModal()}
            >
              <View style={styles.headertimer}>
                <Text style={styles.expiresin}>YOUR CART</Text>
                <Text style={styles.headertext}>
                  {"\u20A6"}
                  {this.formatAmount(
                    totalticketconcessionprice + totalticketprice
                  )}{" "}
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
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require("../../assets/image/ticketbanner.png")}
              style={{ width: "100%", height: RFValue(96) }}
              //resizeMode="contain"
            />
            <Text style={styles.stephead2}>
              Pay Just {"\u20A6"}{" "}
              {this.formatAmount(
                (totalticketconcessionprice + totalticketprice) / 2
              )}{" "}
              with FilmHouse Club
            </Text>
          </View>
          <View style={{ marginHorizontal: RFValue(20) }}>
            <View style={{ marginTop: RFValue(30) }}>
              <View>
                <Text style={[styles.adtext, { color: "#7d7d89" }]}>
                  STEP 2
                </Text>
                <View style={styles.titlerow}>
                  <Text style={styles.stephead}>ADD FOOD & BEVERAGES</Text>
                  <Text
                    onPress={() => this.navigateTo("TicketStep3")}
                    style={styles.adtext3}
                  >
                    SKIP
                  </Text>
                </View>

                <View>
                  <Image
                    source={require("../../assets/image/step2.png")}
                    resizeMode="contain"
                    style={{ width: "100%" }}
                  />
                </View>
                <ScrollView
                  horizontal
                  style={{ marginTop: RFValue(30), marginBottom: RFValue(-9) }}
                >
                  <TouchableOpacity
                    onPress={() => this.setCalendar("all guests")}
                    style={[
                      styles.calendarbody,
                      { justifyContent: "flex-start" }
                    ]}
                  >
                    <View style={[styles.calendardiv]}>
                      <Image
                        source={require("../../assets/image/foodActive.png")}
                        style={[
                          {
                            width: "100%",
                            height: "100%",
                            opacity:
                              this.state.calendar === "all guests" ? 1 : 0
                          }
                        ]}
                        //resizeMode="contain"
                      />
                      <View style={styles.calendartextbody}>
                        <Image
                          source={require("../../assets/image/icon/allguest.png")}
                          style={{
                            width: RFValue(30),
                            height: RFValue(23)
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.adtext4,
                        this.state.calendar === "all guests"
                          ? styles.activetext
                          : styles.activetext
                      ]}
                    >
                      all guests
                    </Text>
                    <Image
                      source={require("../../assets/image/icon/triangle.png")}
                      resizeMode="contain"
                      style={[
                        styles.triangle,
                        {
                          opacity: this.state.calendar === "all guests" ? 1 : 0
                        }
                      ]}
                      //resizeMode="contain"
                    />
                  </TouchableOpacity>

                  {guest_list &&
                    guest_list.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => this.setCalendar(item.name)}
                        style={[styles.calendarbody]}
                      >
                        <View style={[styles.calendardiv]}>
                          <Image
                            source={require("../../assets/image/foodActive.png")}
                            style={[
                              {
                                width: "100%",
                                height: "100%",
                                opacity:
                                  this.state.calendar === item.name ? 1 : 0
                              }
                            ]}
                            //resizeMode="contain"
                          />
                          <View style={styles.calendartextbody}>
                            {item.name === "all guests" ? (
                              <Image
                                source={require("../../assets/image/icon/allguest.png")}
                                style={{
                                  width: RFValue(30),
                                  height: RFValue(23)
                                }}
                                resizeMode="contain"
                              />
                            ) : (
                              <Text
                                style={[
                                  styles.overviewtext2,
                                  {
                                    textAlign: "center",
                                    color:
                                      this.state.calendar === item.name
                                        ? "#fff"
                                        : "#a7a7a7"
                                  }
                                ]}
                              >
                                {this.firstLetters(item.name)}
                              </Text>
                            )}
                          </View>
                        </View>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.adtext4,
                            this.state.calendar === item.name
                              ? styles.activetext
                              : styles.activetext
                          ]}
                        >
                          {item.name.toLowerCase()}
                        </Text>
                        <Image
                          source={require("../../assets/image/icon/triangle.png")}
                          resizeMode="contain"
                          style={[
                            styles.triangle,
                            {
                              opacity: this.state.calendar === item.name ? 1 : 0
                            }
                          ]}
                          //resizeMode="contain"
                        />
                      </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={{ marginHorizontal: RFValue(-20) }}>
                  <Image
                    source={require("../../assets/image/icon/line.png")}
                    style={{ width: "100%", height: 1 }}
                  />
                </View>
                <View style={{ marginVertical: RFValue(30) }}>
                  <FlatList
                    ref={ref => (this.flatList2 = ref)}
                    horizontal={true}
                    // numColumns={3}
                    showsHorizontalScrollIndicator={false}
                    data={concession_items}
                    renderItem={this.renderFood}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                      justifyContent: "space-between"
                    }}
                    extraData={food}
                  />
                </View>
                <View
                  style={{
                    marginHorizontal: RFValue(-20),
                    marginTop: RFValue(-18)
                  }}
                >
                  <Image
                    source={require("../../assets/image/icon/line.png")}
                    style={{ width: "100%", height: 1 }}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => this.navigateTo("TicketStep3")}
                  style={[BaseTheme.proceedbtn]}
                >
                  <Image
                    source={Images.buttongradient}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                  />
                  <Text style={[styles.adtext7M]}>PROCEED</Text>
                </TouchableOpacity>
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
    totalticketprice: state.ticketReducer.totalticketprice,
    ticket_concession_checkout: state.ticketReducer.ticket_concession_checkout,
    timer: state.ticketReducer.timer,
    activeuser: state.ticketReducer.activeuser,
    //message: state.uiReducer.message,
    guest_list: state.ticketReducer.guest_list
  };
};
const mapDispatchToProps = dispatch => {
  return {
    timerExpired: () => dispatch(actions.timerExpired()),
    addTicketConcessionItem: data =>
      dispatch(actions.addTicketConcessionItem(data)),
    saveCountDownTimer: time => dispatch(actions.saveCountDownTimer(time)),
    updateTicketConcessionPrice: () =>
      dispatch(actions.updateTicketConcessionPrice()),
    replaceTicketConcessionItemInCart: data =>
      dispatch(actions.replaceTicketConcessionItemInCart(data))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Step2);
