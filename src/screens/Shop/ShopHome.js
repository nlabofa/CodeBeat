/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  StatusBar,
  Text,
  Animated,
  Dimensions,
  ScrollView,
  FlatList,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";
import Header from "../../components/Header";
import { Colors, Images, FontNames } from "../../shared/Themes/index";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import {
  RECOMMENDED_SHOP,
  RECOMMENDED_FOOD,
  RECOMMENDED_MERCHANDISE,
  TICKET
} from "../Home/Entries";

import Modal from "react-native-modal";

import FoodModal from "../../components/FoodModal";

import {
  BaseTheme,
  shopStyle as styles
} from "../../shared/Themes/styles/index";

const HEADER_MAX_HEIGHT = 560;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

// We will use this placeholder object to override the default placeholder.

const scrollAnim = new Animated.Value(0);
const offsetAnim = new Animated.Value(0);
const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

class ShopHome extends Component {
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
    scrollY: new Animated.Value(0),
    slider2ActiveSlide: 0,
    selectedItem: 0,
    modalVisible: false,
    guestchecked: false,
    modalval: "lagos",
    checkout: [],
    activeItem: null,
    editItemCount: null,
    quantity: 1,
    name: "",
    email: "",
    guestname: "",
    guestemail: "",
    headtype: "recommended",
    size: "huge",
    color: "red",
    cinema: "lekki",
    itemList: ["1", "2", "3", "4"]
  };
  componentDidMount() {
    //StatusBar.setHidden(true);
    this.props.fetchShopItems("merchandise");
    this.props.fetchShopItems("concession");
  }
  setModalVal = val => {
    this.setState({ dropdownval: val });
    this.modalDismissed();
  };
  setheadtype = val => {
    if (val === "food") {
      this.setState({ headtype: val });
      this.scrollView.scrollTo({ x: 80, y: 0, animated: true });
    } else if (val === "recommended") {
      this.setState({ headtype: val });
      this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
    } else if (val === "merchandise") {
      this.setState({ headtype: val });
      this.scrollView.scrollTo({ x: 160, y: 0, animated: true });
    } else if (val === "giftcard") {
      this.setState({ headtype: val });
      this.scrollView.scrollTo({ x: 240, y: 0, animated: true });
    }
  };

  addToCheckOut = item => {
    const { userdata, checkout } = this.props;
    const purchaseItem = [];
    //updates previous cart details by removing found item
    if (checkout.some(el => el.concessionId === item.id)) {
      const updatedInfo = checkout.filter(el => el.concessionId !== item.id);
      this.props.replaceItemInCart(updatedInfo);
    }
    purchaseItem.push({
      concessionId: item.id,
      name: item.name,
      price: item.price,
      quantity: this.state.quantity,
      ownerName: userdata ? userdata.name : "",
      ownerEmail: userdata ? userdata.email : "",
      forSelf: true
      //cartId: 1
    });

    const spreadItem = [...purchaseItem];

    this.props.addItemToCart(spreadItem);
    this.props.updatePrice();
    this.modalDismissed();
  };
  setSizeVal = val => {
    this.setState({ size: val });
    //this.modalDismissed();
  };
  setColorVal = val => {
    this.setState({ color: val });
    //this.modalDismissed();
  };
  setCinemaVal = val => {
    this.setState({ cinema: val });
    //this.modalDismissed();
  };
  setQtyVal = val => {
    this.setState({ quantity: val });
    //this.modalDismissed();
  };
  setTabHead = val => {
    this.setState({ tabhead: val });
    this.modalDismissed();
  };
  _renderItem2 = ({ item, index }) => {
    return (
      <View key={index} style={styles.ticketbox}>
        <Image
          source={Images.foodbanner}
          style={[BaseTheme.fullflex, { borderRadius: 12 }]}
          resizeMode="cover"
        />
      </View>
    );
  };
  openModal = item => {
    const { checkout } = this.props;
    if (checkout.some(el => el.concessionId === item.id)) {
      //const updatedInfo = checkout.filter(el => el.concessionId !== item.id);
      const matchedInfo = checkout.filter(el => el.concessionId == item.id);

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
  renderGiftCards = ({ item, index }) => (
    <TouchableOpacity
      //  onPress={() => this.openModal(item)}
      key={index}
      style={styles.itembox}
    >
      <View style={{ paddingTop: 15 }}>
        <Text style={styles.boxhead}>
          {"\u20A6"}
          {item.price} Gift Card
        </Text>
        <View style={styles.itemboximage2}>
          <Image
            // source={item.image}
            source={require("../../assets/image/icon/giftcard.png")}
            style={{
              width: 153,
              height: 133
            }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.itembottom}>
          <View style={{ marginTop: RFValue(25) }}>
            <Image
              source={require("../../assets/image/icon/line.png")}
              style={{ width: RFValue(170), height: 1 }}
            />
          </View>
          <View style={styles.bottomview}>
            <Text style={styles.boxhead2}>
              {"\u20A6"}
              {item.price}
            </Text>
            <Image
              source={
                this.props.checkout.some(el => el.concessionId === item.id)
                  ? require("../../assets/image/icon/activeCart.png")
                  : require("../../assets/image/icon/merch-cart.png")
              }
              style={styles.carticon}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  renderConcession = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => this.openModal(item)}
      key={index}
      style={styles.itembox}
    >
      <View style={{ paddingTop: 15 }}>
        <Text style={styles.boxhead}>{item.name}</Text>
        <View style={styles.itemboximage}>
          <Image
            // source={item.image}
            source={require("../../assets/image/hotdogshop.png")}
            style={{
              width: 153,
              height: 133
            }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.itembottom}>
          <View style={{ marginTop: RFValue(25) }}>
            <Image
              source={require("../../assets/image/icon/line.png")}
              style={{ width: RFValue(170), height: 1 }}
            />
          </View>
          <View style={styles.bottomview}>
            <Text style={styles.boxhead2}>
              {"\u20A6"}
              {item.price}
            </Text>
            <Image
              source={
                this.props.checkout.some(el => el.concessionId === item.id)
                  ? require("../../assets/image/icon/activeCart.png")
                  : require("../../assets/image/icon/merch-cart.png")
              }
              style={styles.carticon}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  modalDismissed = () => {
    this.setState({
      activeItem: null,
      editItemCount: null,
      modalVisible: false
    });
  };
  render() {
    const { width } = Dimensions.get("window");
    const { modalVisible, headtype } = this.state;
    const { concession_items } = this.props;

    const backgroundOpacity = this.state.scrollAnim.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.5, 1],
      extrapolate: "clamp"
    });
    const backgroundColor = this.state.scrollAnim.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: ["transparent", Colors.backgroundColor, "#0f0f13"],
      extrapolate: "clamp"
    });
    const navbarOpacity = this.state.clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    const navbarTranslate = this.state.clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
      extrapolate: "clamp"
    });
    return (
      <View style={BaseTheme.baseBackground}>
        <Header
          navigation={this.props.navigation}
          backgroundColor={backgroundColor}
          backgroundOpacity={backgroundOpacity}
          navbarTranslate={navbarTranslate}
          navbarOpacity={navbarOpacity}
          shopsection
          //direction={this.direction}
        />
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
          <FoodModal
            modalDismissed={this.modalDismissed}
            setSizeVal={this.setSizeVal}
            setColorVal={this.setColorVal}
            setCinemaVal={this.setCinemaVal}
            setQtyVal={this.setQtyVal}
            size={this.state.size}
            color={this.state.color}
            cinema={this.state.cinema}
            quantity={this.state.quantity}
            addToCheckOut={this.addToCheckOut}
            activeItem={this.state.activeItem}
            editItemCount={this.state.editItemCount}
          />
        </Modal>
        <ScrollView
          removeClippedSubviews={true}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]
            //{ useNativeDriver: true }
          )}
        >
          {/* <View style={styles.header}>
          <View style={styles.headerdiv}>
            <Text style={styles.headertext}>Shop</Text>
          </View>
        </View> */}
          <View
            style={{ marginHorizontal: RFValue(20), marginTop: RFValue(90) }}
          >
            <View>
              <View>
                <Carousel
                  ref={c => (this._slider2Ref = c)}
                  data={TICKET}
                  renderItem={this._renderItem2}
                  sliderWidth={width}
                  itemWidth={width}
                  activeSlideAlignment="start"
                  inactiveSlideOpacity={0.5}
                  //activeSlideAlignment="start"
                  inactiveSlideScale={3}
                  //firstItem={1}
                  onSnapToItem={index =>
                    this.setState({ slider2ActiveSlide: index })
                  }
                  contentContainerCustomStyle={
                    {
                      //  backgroundColor: 'green',
                      //overflow: 'hidden',
                      // width: 140 * 2.2,
                    }
                  }
                />
                <Pagination
                  ref={c => (this._slider2Ref = c)}
                  dotsLength={TICKET.length}
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
              <ScrollView
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                ref={ref => (this.scrollView = ref)}
                contentContainerStyle={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View style={BaseTheme.modalheadbar3}>
                  <Text
                    onPress={() => this.setheadtype("recommended")}
                    style={[
                      BaseTheme.modalheadtext,
                      {
                        fontSize: RFValue(19),
                        color:
                          this.state.headtype === "recommended"
                            ? Colors.basewhite
                            : "#333338"
                      }
                    ]}
                  >
                    Recommended
                  </Text>
                  {this.state.headtype === "recommended" ? (
                    <View style={BaseTheme.dot2} />
                  ) : null}
                </View>
                <View style={BaseTheme.modalheadbar3}>
                  <Text
                    onPress={() => this.setheadtype("food")}
                    style={[
                      BaseTheme.modalheadtext,
                      {
                        fontSize: RFValue(19),
                        color:
                          this.state.headtype === "food"
                            ? Colors.basewhite
                            : "#333338"
                      }
                    ]}
                  >
                    Concessions
                  </Text>
                  {this.state.headtype === "food" ? (
                    <View style={BaseTheme.dot2} />
                  ) : null}
                </View>
                <View style={BaseTheme.modalheadbar3}>
                  <Text
                    onPress={() => this.setheadtype("merchandise")}
                    style={[
                      BaseTheme.modalheadtext,
                      {
                        fontSize: RFValue(19),
                        color:
                          this.state.headtype === "merchandise"
                            ? Colors.basewhite
                            : "#333338"
                      }
                    ]}
                  >
                    Merchandise
                  </Text>
                  {this.state.headtype === "merchandise" ? (
                    <View style={BaseTheme.dot2} />
                  ) : null}
                </View>
                <View style={BaseTheme.modalheadbar3}>
                  <Text
                    onPress={() => this.setheadtype("giftcard")}
                    style={[
                      BaseTheme.modalheadtext,
                      {
                        fontSize: RFValue(19),
                        color:
                          this.state.headtype === "giftcard"
                            ? Colors.basewhite
                            : "#333338"
                      }
                    ]}
                  >
                    Gift Cards
                  </Text>
                  {this.state.headtype === "giftcard" ? (
                    <View style={BaseTheme.dot2} />
                  ) : null}
                </View>
              </ScrollView>
              <View style={{ marginVertical: RFValue(5) }}>
                <FlatList
                  ref={ref => (this.flatList3 = ref)}
                  numColumns={2}
                  data={concession_items}
                  renderItem={
                    this.state.headtype == "giftcard"
                      ? this.renderGiftCards
                      : this.renderConcession
                  }
                  keyExtractor={item => item.id}
                  columnWrapperStyle={{
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                  //}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToprops = state => {
  return {
    // loading: state.uiReducer.loading,
    //message: state.uiReducer.message,
    userdata: state.authReducer.userdata,
    concession_items: state.shopReducer.concession_items,
    merchandise_items: state.shopReducer.merchandise_items,
    checkout: state.shopReducer.checkout,
    totalpriceval: state.shopReducer.totalpriceval
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearCartItems: () => dispatch(actions.clearCartItems()),
    fetchShopItems: params => dispatch(actions.fetchShopItems(params)),
    addItemToCart: data => dispatch(actions.addItemToCart(data)),
    replaceItemInCart: data => dispatch(actions.replaceItemInCart(data)),
    updatePrice: () => dispatch(actions.updatePrice())
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(ShopHome);
