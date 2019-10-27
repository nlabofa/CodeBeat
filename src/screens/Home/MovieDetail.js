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
  ImageBackground,
  Animated,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { Colors, Images, FontNames } from "../../shared/Themes/index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import { Bubbles } from "react-native-loader";
import Header from "../../components/Header";
import DropDown from "../../components/DropDown";
import LottieView from "lottie-react-native";
import { StackActions, NavigationActions } from "react-navigation";
import Modal from "react-native-modal";
import ImageComponent from "../../components/ImageComponent";

import {
  BaseTheme,
  moviedetailStyle as styles
} from "../../shared/Themes/styles/index";
import moment from "moment";
import Button from "../../components/Button";
const HEADER_MAX_HEIGHT = 560;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const HEADER_SCROLL_DISTANCE2 = HEADER_MAX_HEIGHT - 10;

// const testValue = {
//   id: 81,
//   title: "The Set-Up",
//   shortTitle: "",
//   description:
//     " A young woman gets more than she bargains for and is drawn into a web of deceit when she is hired by a socialite to assist with his scheme to marry a wealthy heiress.",
//   releaseCountry: "",
//   releaseYear: "",
//   censorRating: "15",
//   formatCode: "",
//   formatName: "",
//   distributorName: "",
//   featureLength: "104",
//   vistaFilmID: "HO00000203",
//   //vistaFilmID: "HO00000367",
//   hoFilmCode: "A000000508",
//   openingDate: "2019-08-09T00:00:00",
//   available: 0,
//   type: "cinema",
//   vodPrice: 0,
//   featured: false,
//   popularity: 0,
//   voteCount: 0,
//   video: false,
//   movieDbId: null,
//   adult: false,
//   backdropImage:
//     "https://s3.eu-west-2.amazonaws.com/fh-api.dev.intelia.io/movie_images/dc1bd0ab-b7e3-4d83-aed0-70dc9548fc9f.jpg",
//   posterImage:
//     "https://s3.eu-west-2.amazonaws.com/fh-api.dev.intelia.io/movie_images/7a88f19f-31dd-42e3-9653-ed0e055c1350.jpg",
//   originalLanguage: "en",
//   originalTitle: "",
//   voteAverage: 0,
//   overview:
//     " A young woman gets more than she bargains for and is drawn into a web of deceit when she is hired by a socialite to assist with his scheme to marry a wealthy heiress.",
//   createdAt: "2019-09-20T09:47:17.924Z",
//   updatedAt: "2019-10-08T12:38:38.067Z"
// };
class MovieDetail extends Component {
  state = {
    scrollY: new Animated.Value(0),
    calendar: moment().format("DD"),
    cinemamode: "",
    cinemalganame: "Lekki",
    cinemashowtime: null,
    stickHeaderHeight: 0,
    tabhead: "showtimes",
    bannerAddedToList: false,
    modalVisible: false,
    modalval: "showtimes",
    moviedetail: null,
    dropdownval: "lagos",
    layoutheight: "",
    sliderModalActiveSlide: 1,
    slider1ActiveSlide: 1,
    slider2ActiveSlide: 1,
    slider3ActiveSlide: 1,
    slider4ActiveSlide: 1,
    slider5ActiveSlide: 1,
    slider6ActiveSlide: 1
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.showtime) {
      const showingtickets = nextProps.showtime[0].showtime.filter(
        value => value.day == moment().format("YYYY-MM-DD")
      );
      // console.log(showingtickets);
      this.setState({
        cinemalgashowtime: nextProps.showtime[0].showtime, //save cinema showing time for the week
        cinemalganame: nextProps.showtime[0]["cinemas.name"], // save selected cinema name
        cinemashowtime: showingtickets //save cinema object //ssave cinema showing time for the day
        //   cinemamode:
        //     showingtickets.length > 0 ? showingtickets[0].showtimeId : "" //save first cinema showtime id
      });
    }
    //if users change cinema state, fetch the new cinema state details
    if (nextProps.cinemastateid !== this.props.cinemastateid) {
      this.props.fetchShowTime({
        stateId: nextProps.cinemastateid,
        vistaFilmId: this.state.moviedetail.vistaFilmID
      });
    }
    if (nextProps.ticket_type !== this.props.ticket_type) {
      this.navigateTo("TicketStep1");
    }
  }
  componentDidMount() {
    // this.setState({ moviedetail: testValue });
    // this.props.saveActiveMovie(testValue);
    // this.props.fetchShowTime({
    //   stateId: this.props.cinemastateid,
    //   vistaFilmId: testValue.vistaFilmID
    // });
    this.props.clearPrevShowTime();
    const params = this.props.navigation.getParam("params");
    if (params && params.length === 2) {
      this.setState({ moviedetail: params[1] });
      if (params && params[0] === "buyticket") {
        setTimeout(() => {
          this.scrollView.scrollToEnd({ animated: true });
        }, 800);
      }
      this.props.saveActiveMovie(params[1]);
      this.props.fetchShowTime({
        stateId: this.props.cinemastateid,
        vistaFilmId: params[1].vistaFilmID
      });
    } else {
      this.setState({ moviedetail: params });
      this.props.saveActiveMovie(params);
      this.props.fetchShowTime({
        stateId: this.props.cinemastateid,
        vistaFilmId: params.vistaFilmID
      });
    }
  }
  filterTicketByDate = item => {
    //filter cinema show time when users change date
    const { cinemalgashowtime } = this.state;
    const showingtickets =
      cinemalgashowtime &&
      cinemalgashowtime.filter(
        value => value.day == moment(item).format("YYYY-MM-DD")
      );
    // console.log(showingtickets);
    this.setState({
      cinemashowtime: showingtickets
      // cinemamode: showingtickets.length > 0 ? showingtickets[0].showtimeId : ""
    });
  };
  filterCinemaLga = name => {
    //filter cinema location when user changes cinema name
    const showingtickets = this.props.showtime.filter(
      value => value["cinemas.name"] == name
    );
    //console.log(showingtickets);

    this.setState(
      {
        cinemamode: "",
        cinemalgashowtime: showingtickets[0].showtime,
        cinemalganame: showingtickets[0]["cinemas.name"]
        // cinemamode:
        //   showingtickets[0].length > 0 ? showingtickets[0].showtimeId : ""
      },
      () =>
        this.setCalendar(
          this.props.daterange[0].date,
          0,
          this.props.daterange[0].fulldate
        )
    );
  };
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
  setTabHead = val => {
    this.setState({ tabhead: val });
    //this.modalDismissed();
  };
  updateshowtime = (val, ticket) => {
    this.setState({ cinemamode: val, selectedticket: ticket });
  };
  navigateTo = route => {
    this.props.navigation.push(route, {
      params: {
        showtime: this.state.selectedticket.showtime,
        showTimeId: this.state.selectedticket.showtimeId,
        screenName: this.state.selectedticket.screenName,
        description: this.state.selectedticket.description,
        cinemaName: this.state.cinemalganame
      }
    });
  };

  modalDismissed = () => {
    this.setState({ modalVisible: false });
  };
  setHeight = height => {
    this.setState({ layoutheight: height });
  };
  setCalendar = (val, index, fulldate) => {
    this.setState({ calendar: val });
    this.flatList.scrollToIndex({ animated: true, index });
    this.filterTicketByDate(fulldate);
  };
  _renderItemModal({ item, index }) {
    return (
      <View style={{ width: RFValue(90), marginRight: RFValue(10) }}>
        <View key={index} style={styles.carouselModal2}>
          <Image
            source={{ uri: item.profileImage }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            defaultSource={Images.posterloader}
          />
        </View>
        <View style={styles.modalcastdiv}>
          <Text numberOfLines={1} style={styles.modalcastext}>
            {item.name}
          </Text>
          <Text numberOfLines={1} style={styles.modalcastext2}>
            {item.character}
          </Text>
        </View>
      </View>
    );
  }
  switchStack = (route, params) => {
    this.props.navigation.navigate(
      route,
      {params},
      NavigationActions.navigate({ routeName: "" })
    );
  };
  renderCalendar = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() => this.setCalendar(item.date, index, item.fulldate)}
      style={styles.calendarbody}
    >
      <View style={styles.calendardiv}>
        <Image
          source={require("../../assets/image/icon/daterect.png")}
          style={[
            {
              width: "100%",
              height: "100%",
              opacity: this.state.calendar === item.date ? 1 : 0
            }
          ]}
          //resizeMode="contain"
        />
        <View style={styles.calendartextbody}>
          <Text
            style={[
              styles.overviewtext2,
              {
                paddingTop: 5,
                color:
                  this.state.calendar === item.date
                    ? Colors.basewhite
                    : "#616162"
              }
            ]}
          >
            {item.month}
          </Text>
          <Text
            style={[
              styles.overviewtext2,
              {
                fontSize: RFValue(23),
                color:
                  this.state.calendar === item.date
                    ? Colors.basewhite
                    : "#616162"
              }
            ]}
          >
            {item.date}
          </Text>
          <Text
            style={[
              styles.overviewtext2,
              {
                color:
                  this.state.calendar === item.date
                    ? Colors.basewhite
                    : "#616162"
              }
            ]}
          >
            {item.day}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  scrollDown = () => {
    this.setState({ tabhead: "showtimes" });
    this.scrollView.scrollToEnd({ animated: true });
  };
  setheadtype = (val, index) => {
    this.setState({ cinemalganame: val });
    //this.scrollViewX.scrollTo({ x: 80 * index, y: 0, animated: true });
    this.scrollViewX.scrollTo({ x: 80 * index, y: 0, animated: true });
    this.filterCinemaLga(val);
  };
  proceedBtn = () => {
    this.props.clearTicketPrice();
    this.props.clearTicketCheckout();
    this.props.clearTicketConcessionCheckout();
    this.props.fetchTicketType({
      showtimeId: this.state.selectedticket.showtimeId,
      vistaCinemaId: this.state.selectedticket.cinemaId
    });
  };
  render() {
    // console.log("re-render");
    const {
      calendar,
      modalVisible,
      tabhead,
      cinemamode,
      cinemashowtime,
      moviedetail
    } = this.state;
    const { loading, showtime, daterange, itemloading } = this.props;

    const backgroundOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.5, 1],
      extrapolate: "clamp"
    });
    const textOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE2 / 2, HEADER_SCROLL_DISTANCE2],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });
    const backgroundColor = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: ["transparent", "transparent", "#0f0f13"],
      extrapolate: "clamp"
    });
    const { width } = Dimensions.get("window");
    return !moviedetail ? (
      <View style={BaseTheme.viewloader}>
        {/* <ActivityIndicator color="#fff" size="large" /> */}
        <Bubbles size={6} color={Colors.basewhite} />
      </View>
    ) : (
      <View>
        <Header
          navigation={this.props.navigation}
          backgroundColor={backgroundColor}
          title={moviedetail.title}
          goback
          backgroundOpacity={backgroundOpacity}
          textOpacity={textOpacity}
        />
        <ScrollView
          bounces={false}
          scrollEventThrottle={16}
          //removeClippedSubviews={true}
          ref={ref => (this.scrollView = ref)}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
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
            <View style={styles.heroeimage}>
              <ImageComponent
                source={moviedetail.posterImage}
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
              <View style={styles.basemovietext}>
                    <Text numberOfLines={2} style={BaseTheme.basetitle}>
                      {moviedetail.title}
                    </Text>
                    <View style={styles.heroesgenre}>
                      <View style={BaseTheme.heroegenrediv}>
                        <Text style={styles.heroetext}>
                          {moviedetail.film_categories.length > 0
                            ? moviedetail.film_categories[0].field.toUpperCase()
                            : "TBC"}
                        </Text>
                        <View style={BaseTheme.dot} />
                      </View>

                      <View style={BaseTheme.heroegenrediv}>
                        <Text style={styles.heroetext}>
                          {moviedetail && moviedetail.censorRating == "18"
                            ? "18+"
                            : "PG 13"}
                        </Text>
                        <View style={BaseTheme.dot} />
                      </View>
                      <View style={BaseTheme.heroegenrediv}>
                        <Text style={styles.heroetext}>
                          {(moviedetail && moviedetail.releaseYear) || "TBC"}
                        </Text>
                        <View style={BaseTheme.dot} />
                      </View>
                      <Text style={styles.heroetext}>
                        {(moviedetail && moviedetail.featureLength + " MIN") ||
                          "TBC"}
                      </Text>
                      <View style={BaseTheme.heroegenrediv}>
                        <Image
                          source={Images.hoticon}
                          resizeMode="contain"
                          style={BaseTheme.hoticon}
                        />
                        <Text style={styles.heroetext}>HOT MOVIE</Text>
                      </View>
                    </View>
                    <View style={styles.heroebottomview}>
                      <TouchableOpacity
                        onPress={() => this.switchStack("VideoPlayer",moviedetail)}
                        style={styles.heroewatch}
                      >
                        <Image
                          source={Images.watchicon}
                          resizeMode="contain"
                          style={BaseTheme.watchicon}
                        />
                        <Text style={[styles.watchtext]}>TRAILER</Text>
                      </TouchableOpacity>

                      {moviedetail.type == "tvod" ? (
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.userdata
                                ? this.switchStack("VideoPlayer",moviedetail)
                                : this.navigateTo("Auth")
                            }
                            style={[
                              BaseTheme.buttonticket,
                              { marginBottom: RFValue(9), position: "relative" }
                            ]}
                          >
                            <ImageBackground
                              source={require("../../assets/image/buyflat.png")}
                              resizeMode="contain"
                              style={styles.imgbtn}
                            >
                              <Text style={[styles.igrtext]}>
                                BUY | {"\u20A6"} {moviedetail.vodPrice || "0"}
                              </Text>
                            </ImageBackground>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.userdata
                                ? this.switchStack("VideoPlayer",moviedetail)
                                : this.navigateTo("Auth")
                            }
                            style={BaseTheme.buttonticket}
                          >
                            <ImageBackground
                              source={require("../../assets/image/rentflat.png")}
                              resizeMode="contain"
                              style={styles.imgbtn}
                            >
                              <Text style={[styles.igrtext, { color: "#fff" }]}>
                                RENT | {"\u20A6"} {moviedetail.vodPrice || "0"}
                              </Text>
                            </ImageBackground>
                          </TouchableOpacity>
                        </View>
                      ) : moviedetail.type == "svod" ? (
                        <TouchableOpacity
                          onPress={() =>
                            this.props.userdata
                              ? this.switchStack("VideoPlayer",moviedetail)
                              : this.navigateTo("Auth")
                          }
                          style={BaseTheme.buttonticket}
                        >
                          <Image
                            source={require("../../assets/image/watchonline.png")}
                            resizeMode="contain"
                            style={{ width: "100%", height: "100%" }}
                          />
                        </TouchableOpacity>
                      ) : (
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
                      )}
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

          <View style={styles.overview}>
            <TouchableOpacity
              onPress={() => this.setTabHead("showtimes")}
              style={styles.overviewdiv}
            >
              <Text
                style={[
                  styles.overviewtext,
                  {
                    color: tabhead === "showtimes" ? "#E8E8E8" : "#E8E8E8"
                  }
                ]}
              >
                SHOW TIMES
              </Text>
              <Image
                style={[
                  BaseTheme.modalheadbar2,
                  { opacity: tabhead === "showtimes" ? 1 : 0.0 }
                ]}
                source={Images.modalheadbar}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setTabHead("overview")}
              style={styles.overviewdiv}
            >
              <Text
                style={[
                  styles.overviewtext,
                  {
                    color: tabhead === "overview" ? "#E8E8E8" : "#E8E8E8"
                  }
                ]}
              >
                OVERVIEW
              </Text>
              <Image
                style={[
                  BaseTheme.modalheadbar2,
                  { opacity: tabhead === "overview" ? 1 : 0.0 }
                ]}
                source={Images.modalheadbar}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setTabHead("cast")}
              style={styles.overviewdiv2}
            >
              <Text
                style={[
                  styles.overviewtext,
                  {
                    color: tabhead === "cast" ? "#E8E8E8" : "#E8E8E8"
                  }
                ]}
              >
                CAST
              </Text>
              <Image
                style={[
                  BaseTheme.modalheadbar2,
                  { opacity: tabhead === "cast" ? 1 : 0.0 }
                ]}
                source={Images.modalheadbar}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 25, marginHorizontal: RFValue(15) }}>
            {tabhead === "cast" ? (
              <View style={{ height: this.state.layoutheight }}>
                <FlatList
                  horizontal={true}
                  data={moviedetail.film_casts.slice(0, 10)}
                  renderItem={this._renderItemModal}
                  keyExtractor={item => item.name}
                  extraData={moviedetail.film_casts}
                />
              </View>
            ) : tabhead === "overview" ? (
              <View style={{ height: this.state.layoutheight }}>
                <Text style={BaseTheme.modaldescription}>
                  {moviedetail.overview}
                </Text>
              </View>
            ) : (
              <View
                onLayout={event =>
                  this.setHeight(event.nativeEvent.layout.height)
                }
                style={{ marginHorizontal: RFValue(13) }}
              >
                <View>
                  <Text
                    style={[
                      styles.overviewtext,
                      { fontSize: RFValue(18), color: "#E8E8E8" }
                    ]}
                  >
                    Date
                  </Text>
                  <FlatList
                    ref={ref => (this.flatList = ref)}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={daterange && daterange}
                    renderItem={this.renderCalendar}
                    keyExtractor={item => item.date}
                    extraData={calendar}
                  />
                  {/* <TouchableOpacity
                    style={styles.calendarscroller}
                    onPress={() => this.flatList.scrollToEnd({animated: true})}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={require('../../assets/image/icon/scroller.png')}
                      resizeMode="contain"
                    />
                  </TouchableOpacity> */}
                </View>
                {loading ? (
                  <View style={[styles.activityindicator, {flexDirection:'row'}]}>
                    {/* <ActivityIndicator size="large" color="#fff" /> */}
                    <Bubbles size={6} color={Colors.basewhite} />
                    <Text style={[styles.loadingtext, {paddingLeft:5}]}>
                    Fetching show times
                  </Text>
                  </View>
                ) : !loading && !showtime ? (
                  <Text style={styles.loadingtext}>
                    No showtimes available at the moment!
                  </Text>
                ) : (
                  <View>
                    <View style={styles.locationhead}>
                      <Text
                        style={[
                          styles.overviewtext,
                          { fontSize: RFValue(18), color: "#E8E8E8" }
                        ]}
                      >
                        Cinema
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            modalVisible: !this.state.modalVisible
                          })
                        }
                        style={styles.cinemabutton}
                      >
                        <Text style={[styles.overviewtext3]}>
                          {this.props.cinemastatename.toUpperCase()}
                        </Text>
                        <Image
                          style={[
                            BaseTheme.dropdown,
                            { marginTop: RFValue(1) }
                          ]}
                          source={Images.dropdown}
                        />
                      </TouchableOpacity>
                    </View>
                    <ScrollView
                      horizontal
                      ref={ref => (this.scrollViewX = ref)}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{
                        flexDirection: "row",
                        justifyContent: "center"
                      }}
                    >
                      {showtime.map((value, index) => (
                        <View key={index} style={BaseTheme.modalheadbar}>
                          <Text
                            onPress={() =>
                              this.setheadtype(value["cinemas.name"], index)
                            }
                            style={[
                              BaseTheme.modalheadtext,
                              {
                                fontSize: RFValue(18),
                                color:
                                  this.state.cinemalganame ===
                                  value["cinemas.name"]
                                    ? "#E8E8E8"
                                    : "#E8E8E8"
                              }
                            ]}
                          >
                            {value["cinemas.name"]}
                          </Text>
                          {this.state.cinemalganame ===
                          value["cinemas.name"] ? (
                            <View style={BaseTheme.dot2} />
                          ) : null}
                        </View>
                      ))}
                    </ScrollView>

                    <View style={{ marginTop: RFValue(0) }}>
                      <View style={styles.showtimes}>
                        {cinemashowtime && cinemashowtime.length > 0 ? (
                          cinemashowtime.map((value, index) =>
                            value.description.includes("2D") ? (
                              <View key={index}>
                                <TouchableOpacity
                                  onPress={() =>
                                    this.updateshowtime(value.showtimeId, value)
                                  }
                                  style={styles.showbox}
                                >
                                  <Text style={styles.cinemamode}>2D</Text>
                                  <View
                                    style={[
                                      styles.activebox,
                                      {
                                        backgroundColor:
                                          cinemamode !== value.showtimeId
                                            ? "#202026"
                                            : Colors.basewhite
                                      }
                                    ]}
                                  >
                                    <Text
                                      style={[
                                        styles.cinemamodebg,
                                        cinemamode === value.showtimeId
                                          ? styles.activemode
                                          : Colors.basewhite
                                      ]}
                                    >
                                      {moment(value.showtime).format("HH:mm")}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            ) : (
                              <View key={index}>
                                <TouchableOpacity
                                  onPress={() =>
                                    this.updateshowtime(value.showtimeId)
                                  }
                                  style={styles.showbox}
                                >
                                  <View>
                                    <Image
                                      source={require("../../assets/image/icon/3D.png")}
                                      style={styles.threedicon}
                                      resizeMode="contain"
                                    />
                                  </View>
                                  <View
                                    style={[
                                      styles.activebox,
                                      {
                                        backgroundColor:
                                          cinemamode !== value.showtimeId
                                            ? "transparent"
                                            : "#202026"
                                      }
                                    ]}
                                  >
                                    <Text
                                      style={[
                                        styles.cinemamodebg,
                                        cinemamode === value.showtimeId
                                          ? styles.activemode
                                          : null
                                      ]}
                                    >
                                      {moment(value.showtime).format("HH:mm")}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            )
                          )
                        ) : (
                          <Text style={styles.loadingtext2}>
                            No showtimes available at the moment!
                          </Text>
                        )}
                        {/*
                       
                        <TouchableOpacity
                          onPress={() => this.updateshowtime("3Dii")}
                          style={styles.showbox}
                        >
                          <View>
                            <Image
                              source={require("../../assets/image/icon/3D.png")}
                              style={styles.threedicon}
                              resizeMode="contain"
                            />
                          </View>

                          <View
                            style={[
                              styles.activebox,
                              {
                                backgroundColor:
                                  cinemamode !== "3Dii"
                                    ? "transparent"
                                    : "#202026"
                              }
                            ]}
                          >
                            <Text
                              style={[
                                styles.cinemamodebg,
                                cinemamode === "3Dii" ? styles.activemode : null
                              ]}
                            >
                              14:00
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.updateshowtime("imax")}
                          style={styles.showbox}
                        >
                          <View>
                            <Image
                              source={require("../../assets/image/icon/IMAX.png")}
                              style={styles.imaxicon}
                              resizeMode="contain"
                            />
                          </View>

                          <View
                            style={[
                              styles.activebox,
                              {
                                backgroundColor:
                                  cinemamode !== "imax"
                                    ? "transparent"
                                    : "#202026"
                              }
                            ]}
                          >
                            <Text
                              style={[
                                styles.cinemamodebg,
                                cinemamode === "imax" ? styles.activemode : null
                              ]}
                            >
                              16:00
                            </Text>
                          </View>
                        </TouchableOpacity> */}
                      </View>
                    </View>
                    {/* {cinemashowtime && cinemashowtime.length > 0 ? ( */}
                    <Button
                      formIsValid={cinemamode !== ""}
                      onPress={this.proceedBtn}
                      loading={itemloading}
                      btnText="PROCEED"
                    />
                    {/* ) : null} */}
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    itemloading: state.uiReducer.itemloading,
    userdata: state.authReducer.userdata,
    //message: state.uiReducer.message,
    showtime: state.filmReducer.showtime,
    formatrange: state.filmReducer.formatrange,
    daterange: state.filmReducer.daterange,
    cinemastate: state.filmReducer.cinemastate,
    ticket_type: state.ticketReducer.ticket_type,
    cinemastateid: state.filmReducer.cinemastateid,
    cinemastatename: state.filmReducer.cinemastatename
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearPrevShowTime: () => dispatch(actions.clearPrevShowTime()),
    fetchShowTime: data => dispatch(actions.fetchShowTime(data)),
    fetchTicketType: data => dispatch(actions.fetchTicketType(data)),
    saveActiveMovie: data => dispatch(actions.saveActiveMovie(data)),
    setCinemaStateId: id => dispatch(actions.setCinemaStateId(id)),
    clearTicketCheckout: () => dispatch(actions.clearTicketCheckout()),
    clearTicketPrice: () => dispatch(actions.clearTicketPrice()),
    clearTicketConcessionCheckout: () =>
      dispatch(actions.clearTicketConcessionCheckout()),
    setCinemaStateName: id => dispatch(actions.setCinemaStateName(id))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(MovieDetail);
