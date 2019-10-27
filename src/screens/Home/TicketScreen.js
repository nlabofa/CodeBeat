/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  StatusBar,
  Text,
  Dimensions,
  Animated,
  RefreshControl,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Platform
} from "react-native";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import { Colors, Images, FontNames } from "../../shared/Themes/index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import Header from "../../components/Header";
import WebViewContainer from "../../components/WebViewContainer";
import Modal from "react-native-modal";
import { Bubbles } from "react-native-loader";
import DropDown from "../../components/DropDown";
import LottieView from "lottie-react-native";
import { BannerLoader } from "../../components/ContentLoader/index";
import TransparentStatusBar from "../../components/StatusBar";
import ImageComponent from "../../components/ImageComponent";
import { StackActions, NavigationActions } from "react-navigation";

import moment from "moment";
import { ENTRIES3 } from "./Entries";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  BaseTheme,
  landingStyle as styles
} from "../../shared/Themes/styles/index";
const HEADER_MAX_HEIGHT = 560;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
// We will use this placeholder object to override the default placeholder.

const scrollAnim = new Animated.Value(0);
const offsetAnim = new Animated.Value(0);
const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });
class TicketScreen extends Component {
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
    showebview: false,
    webviewtitle: "",
    webviewurl: "",
    stickHeaderHeight: 0,
    bannerAddedToList: false,
    modalVisible: false,
    modalval: "Lagos",
    sliderBActiveSlide: 1,
    sliderModalActiveSlide: 1,
    refreshing: false,
    slider1ActiveSlide: 1,
    slider2ActiveSlide: 1,
    slider3ActiveSlide: 1,
    slider4ActiveSlide: 1,
    slider5ActiveSlide: 1,
    slider6ActiveSlide: 1
  };
  componentDidMount() {
    StatusBar.setHidden(false);
    TransparentStatusBar();
    // this.props.fetchLandingFilms();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.vod_films) {
      this.setState({ refreshing: false }); //to check if pull to refresh has loaded content finish
    }
  }
  toggleList = () => {
    this.setState({ bannerAddedToList: !this.state.bannerAddedToList });
  };
  onRef = r => {
    this.menu = r;
  };
  selectState = val => {
    this.setState({ selectedstate: val });
  };
  setModalVal = (val, id) => {
    this.modalDismissed();
    this.props.setCinemaStateName(val);
    this.props.setCinemaStateId(id);
  };
  navigateTo = (route, obj) => {
    this.props.navigation.navigate(route, { params: obj });
  };
  switchStack = (route, params) => {
    this.props.navigation.navigate(
      route,
      { params },
      NavigationActions.navigate({ routeName: "" })
    );
  };
  modalDismissed = () => {
    this.setState({ modalVisible: false });
  };
  _renderBanner = ({ item, index }) => {
    return (
      <View key={index}>
        <View style={styles.heroeimage}>
          <ImageComponent
            source={item.posterImage}
            style={BaseTheme.heroebanner}
            noloader
          />
        </View>
        <ImageBackground
          style={BaseTheme.heroebanner}
          source={Images.heroemask}
          resizeMode="cover"
        >
          <Image
            source={require("../../assets/image/heroeMaskTop.png")}
            style={BaseTheme.heroetop}
          />
          <View
            style={[
              styles.basemovietext,
              { bottom: item.type == "tvod" ? 0 : RFValue(20) }
            ]}
          >
            <Text numberOfLines={2} style={BaseTheme.basetitle}>
              {item.title}
            </Text>
            <View style={styles.heroesgenre}>
              <View style={BaseTheme.heroegenrediv}>
                <Text style={styles.heroetext}>
                  {item.film_categories.length > 0
                    ? item.film_categories[0].field.toUpperCase()
                    : "TBC"}
                </Text>
                <View style={BaseTheme.dot} />
              </View>

              <View style={BaseTheme.heroegenrediv}>
                <Text style={styles.heroetext}>
                  {item.censorRating == "18" ? "18+" : "PG 13"}
                </Text>
                <View style={BaseTheme.dot} />
              </View>
              <View style={BaseTheme.heroegenrediv}>
                <Text style={styles.heroetext}>
                  {item.releaseYear || "TBC"}
                </Text>
                <View style={BaseTheme.dot} />
              </View>
              <Text style={styles.heroetext}>
                {(item.featureLength && item.featureLength + " MIN") || "TBC"}
              </Text>
            </View>
            <View style={styles.heroebottomview}>
              <TouchableOpacity
                onPress={() => this.switchStack("VideoPlayer", item)}
                style={styles.heroewatch}
              >
                <Image
                  source={Images.watchicon}
                  resizeMode="contain"
                  style={BaseTheme.watchicon}
                />
                <Text style={[styles.watchtext]}>TRAILER</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.navigateTo("MovieDetail", ["buyticket", item])
                }
                style={BaseTheme.buttonticket}
              >
                <Image
                  source={Images.buyticket}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.toggleList()}
                style={styles.heroewatch2}
              >
                <Image
                  source={
                    this.state.bannerAddedToList === true
                      ? Images.checkmark
                      : Images.addicon
                  }
                  resizeMode="contain"
                  style={
                    this.state.bannerAddedToList === true
                      ? BaseTheme.checkicon
                      : BaseTheme.addicon
                  }
                />
                <Text style={styles.watchtext}>MY LIST</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  _renderItem2 = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          item.type == "svod" || item.type == "tvod"
            ? this.navigateTo("WatchScreen", { detail: item, type: item.type })
            : this.navigateTo("MovieDetail", item)
        }
        key={index}
        style={styles.carousel2}
      >
        <ImageComponent source={item.posterImage} />
      </TouchableOpacity>
    );
  };
  _renderItem5 = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => this.navigateTo("MovieDetail")}
        key={index}
        style={styles.carousel5}
      >
        <Image
          source={item.illustration}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableOpacity>
    );
  };
  _renderItem6 = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.navigateTo("MovieDetail", item)}
        key={index}
        style={styles.carousel6}
      >
        <ImageComponent source={item.posterImage} />
      </TouchableOpacity>
    );
  };
  refreshFeed = () => {
    this.setState({ refreshing: true }, () => this.props.fetchLandingFilms());
  };
  handleScroll = event => {
    // console.log(event.nativeEvent.contentOffset.y);
    var currentOffset = event.nativeEvent.contentOffset.y;
    this.direction = currentOffset > this.offset ? "down" : "up";
    if (this.direction === "down") {
      console.log("down");
    } else {
      console.log("up");
    }
    this.offset = currentOffset;
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
      webviewtitle: ""
    });
  };
  render() {
    console.log("re-render");
    const {
      modalVisible,
      showebview,
      webviewtitle,
      webviewurl,
      clampedScroll
    } = this.state;
    const {
      upcoming_films,
      featured_cinema_film,
      currentlyshowing_films
    } = this.props;
    const backgroundOpacity = this.state.scrollAnim.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.5, 1],
      extrapolate: "clamp"
    });
    const backgroundColor = this.state.scrollAnim.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: ["transparent", "transparent", "#0f0f13"],
      extrapolate: "clamp"
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
      extrapolate: "clamp"
    });
    const { width } = Dimensions.get("window");
    return !featured_cinema_film ? (
      <View style={styles.webviewloader}>
        {/* <ActivityIndicator color="#fff" size="large" /> */}
        <Bubbles size={6} color={Colors.basewhite} />
      </View>
    ) : // <BannerLoader />
    showebview ? (
      <Modal
        style={styles.webviewmodal}
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
        />
      </Modal>
    ) : (
      <View style={BaseTheme.baseBackground}>
        {this.state.refreshing ? null : (
          <Header
            navigation={this.props.navigation}
            backgroundColor={backgroundColor}
            backgroundOpacity={backgroundOpacity}
            navbarTranslate={navbarTranslate}
            navbarOpacity={navbarOpacity}
            //direction={this.direction}
          />
        )}

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshFeed}
              removeClippedSubviews={true}
              // colors={[Colors.description]}
              title="Fetching new content..."
              // tintColor="#1c1c1c"
              titleColor="#fff"
              // progressBackgroundColor="#fff"
            />
          }
          // scrollEventThrottle={16}
          // onScroll={Animated.event([
          //   { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          // ])}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]
            //{ useNativeDriver: true }
          )}
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
            <DropDown
              modalDismissed={this.modalDismissed}
              setModalVal={this.setModalVal}
              dropdownval={this.props.cinemastatename}
              cinemastate={this.props.cinemastate}
            />
          </Modal>
          <View style={BaseTheme.heroebanner3}>
            <LottieView
              style={{
                width: 150,
                height: 150
              }}
              resizeMode="contain"
              source={require("../../assets/image/bannerloader.json")}
              autoPlay
              loop={true}
            />
          </View>
          <View>
            <Carousel
              ref={c => (this._sliderBRef = c)}
              data={featured_cinema_film && featured_cinema_film}
              renderItem={this._renderBanner}
              sliderWidth={width}
              itemWidth={width}
              activeSlideAlignment="start"
              inactiveSlideOpacity={0.5}
              //loop
              // autoplay
              //activeSlideAlignment="start"
              inactiveSlideScale={3}
              firstItem={1}
              onSnapToItem={index =>
                this.setState({ sliderBActiveSlide: index })
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
              ref={c => (this._sliderBRef = c)}
              dotsLength={featured_cinema_film && featured_cinema_film.length}
              activeDotIndex={this.state.sliderBActiveSlide}
              containerStyle={styles.paginationContainer2}
              dotColor={"rgba(255, 255, 255, 0.92)"}
              dotStyle={styles.paginationDot}
              inactiveDotColor={"#282a3b"}
              inactiveDotStyle={styles.inactivedot}
              //inactiveDotOpacity={0.4}
              inactiveDotScale={1.2}
              carouselRef={this._sliderBRef}
              //tappableDots={true}
            />
          </View>
          <View style={BaseTheme.addvertview}>
            <Image
              source={Images.strip}
              style={{ width: "100%", height: RFValue(111) }}
            />
          </View>
          <View>
            <View style={BaseTheme.carouselhead}>
              {/* <Image
                source={Images.flashicon}
                style={BaseTheme.flashicon}
                resizeMode="contain"
              /> */}
              <TouchableOpacity
                style={styles.carouselhead}
                onPress={() => this.navigateTo("CurrentlyShowing")}
              >
                <Text style={BaseTheme.carouselheadtext1}>
                  CURRENTLY SHOWING
                </Text>
                <Image
                  source={Images.viewallicon}
                  style={BaseTheme.viewall}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={BaseTheme.carouselheadright}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ modalVisible: !this.state.modalVisible })
                  }
                  style={{
                    flexDirection: "row",
                    //backgroundColor: 'red',
                    paddingVertical: RFValue(10)
                  }}
                >
                  <Text
                    style={[
                      BaseTheme.carouselheadrightext,
                      { color: "#8c8c94", paddingRight: RFValue(9) }
                    ]}
                  >
                    LOCATION
                  </Text>
                  <Text style={BaseTheme.carouselheadrightext}>
                    {this.props.cinemastatename.toUpperCase()}
                  </Text>
                  <Image
                    source={Images.dropdown}
                    style={BaseTheme.dropdown}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <FlatList
                horizontal={true}
                data={currentlyshowing_films && currentlyshowing_films}
                renderItem={this._renderItem2}
                keyExtractor={item => item.title}
                extraData={currentlyshowing_films}
              />
            </View>
          </View>

          {/* <View style={[BaseTheme.carouselhead, { marginTop: RFValue(20) }]}>
            <TouchableOpacity
              style={styles.carouselhead}
              // onPress={() => this.navigateTo("MovieListing", "Upcoming")}
            >
              <Text style={BaseTheme.carouselheadtext1}>FILMHOUSE CLUB</Text>
            </TouchableOpacity>
          </View> */}

          <View style={BaseTheme.promodiv}>
            <View style={styles.linetop}>
              <Image
                source={require("../../assets/image/icon/line.png")}
                style={{ width: "100%", height: 1 }}
              />
            </View>
            <View>
              <Image
                source={require("../../assets/image/promoBG.png")}
                resizeMode="cover"
                style={BaseTheme.promobanner}
              />
              <Image
                source={require("../../assets/image/icon/club.png")}
                resizeMode="contain"
                style={styles.clublogo}
              />
              <View style={styles.watchmoretop}>
                <View style={styles.watchmoretopdiv}>
                  <Text style={styles.watchmoretopleft}>
                    Watch More For Less,{"\n"}Join The{" "}
                    <Text style={{ color: "#E55FFE" }}>Club.</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.watchmoremiddle}>
                <View style={styles.watchmoremiddleleft}>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flex: 1
                    }}
                  >
                    <Text style={styles.watchmoremiddleleftup}>
                      Subheadline for the club
                    </Text>
                    <Text style={styles.watchmoremiddleleftdown}>
                      Etiam eget aliquet dui, quis luctus velit. Integer sit
                      amet lorem fringilla, egestas sapien vel, consectetur
                      nunc.
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.watchmorebottom}>
                <View style={styles.watchmorebottomdiv}>
                  <TouchableOpacity
                    onPress={() => this.switchStack("GetStarted")}
                    style={styles.watchmorebottomdivleft}
                  >
                    <Image
                      source={require("../../assets/image/getstarted.png")}
                      resizeMode="contain"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {Platform.OS == "ios" ? (
            <View style={styles.linebottom}>
              <Image
                source={require("../../assets/image/icon/line.png")}
                style={{ width: "100%", height: 1 }}
              />
            </View>
          ) : null}
          <View style={{ marginTop: RFValue(20) }}>
            <View style={BaseTheme.carouselhead}>
              {/* <Image
                source={Images.upcoming}
                style={BaseTheme.flashicon}
                resizeMode="contain"
              /> */}
              <TouchableOpacity
                style={styles.carouselhead}
                onPress={() => this.navigateTo("MovieListing", "Upcoming")}
              >
                <Text style={BaseTheme.carouselheadtext1}>UPCOMING</Text>
                <Image
                  source={Images.viewallicon}
                  style={BaseTheme.viewall}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
              <FlatList
                horizontal={true}
                data={upcoming_films && upcoming_films}
                renderItem={this._renderItem2}
                keyExtractor={item => item.title}
                extraData={upcoming_films}
              />
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
    featured_cinema_film: state.filmReducer.featured_cinema_film,
    currentlyshowing_films: state.filmReducer.currentlyshowing_films,
    upcoming_films: state.filmReducer.upcoming_films,
    vod_films: state.filmReducer.vod_films,
    film_one: state.filmReducer.film_one,
    cinemastate: state.filmReducer.cinemastate,
    cinemastatename: state.filmReducer.cinemastatename,
    cinemastateid: state.filmReducer.cinemastateid
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchLandingFilms: () => dispatch(actions.fetchLandingFilms()),
    setCinemaStateId: id => dispatch(actions.setCinemaStateId(id)),
    setCinemaStateName: id => dispatch(actions.setCinemaStateName(id))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(TicketScreen);
