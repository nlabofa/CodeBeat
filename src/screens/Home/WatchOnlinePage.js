/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  Platform,
  Text,
  Dimensions,
  Animated,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { Colors, Images, FontNames } from "../../shared/Themes/index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import Header from "../../components/Header";
import Modal from "react-native-modal";
import DropDown from "../../components/DropDown";
import LottieView from "lottie-react-native";
import { Bubbles } from "react-native-loader";
import ImageComponent from "../../components/ImageComponent";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import SelectDOB from "../../components/SelectDOB";
import PickGenre from "../../components/PickGenre";
import PickMovie from "../../components/PickMovie";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  BaseTheme,
  landingStyle as styles
} from "../../shared/Themes/styles/index";
import { StackActions, NavigationActions } from "react-navigation";

const HEADER_MAX_HEIGHT = 560;
const HEADER_MIN_HEIGHT = 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const scrollAnim = new Animated.Value(0);
const offsetAnim = new Animated.Value(0);
const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

class WatchOnlinePage extends Component {
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
    activestate: "",
    scrollY: new Animated.Value(0),
    stickHeaderHeight: 0,
    bannerAddedToList: false,
    modalVisible: false,
    moviedetail: [],
    type: "",
    refreshing: false,
    modalval: "lagos",
    sliderModalActiveSlide: 1,
    sliderBActiveSlide: 2,
    slider1ActiveSlide: 1,
    slider2ActiveSlide: 1,
    slider3ActiveSlide: 1,
    slider4ActiveSlide: 1,
    slider5ActiveSlide: 1,
    slider6ActiveSlide: 1
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.message == "date of birth updated") {
      setTimeout(() => {
        this.scrollView.scrollTo({ y: 20, animated: true });
      }, 500);
    }
    if (nextProps.message == "user playlist has been updated") {
      this.setState({ activestate: "watch" });
      setTimeout(() => {
        this.scrollView.scrollTo({ y: 20, animated: true });
      }, 500);
    }
    if (nextProps.vod_films) {
      this.setState({ refreshing: false }); //to check if pull to refresh has loaded content finish
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.scrollView.scrollTo({ y: 10, animated: true });
    }, 500); // trick to solve clipped view when page is mounted
    this.props.fetchGenres();
    this.checkUserState();

    const params = this.props.navigation.getParam("params");
    // console.log(params);
    if (params !== undefined) {
      this.setState({ moviedetail: [params.detail], type: params.type });
    }
  }
  checkUserState = () => {
    const { userdata } = this.props;
    userdata && userdata.preferredGenres == null && userdata.dateOfBirth == null
      ? this.setState({ activestate: "dob" })
      : userdata && userdata.preferredGenres == null && userdata.dateOfBirth
      ? this.setState({ activestate: "genre" })
      : this.setState({ activestate: "watch" });
  };
  toggleList = () => {
    this.setState({ bannerAddedToList: !this.state.bannerAddedToList });
  };
  onRef = r => {
    this.menu = r;
  };
  switchState = val => {
    this.setState({ activestate: val });
  };
  selectState = val => {
    this.setState({ selectedstate: val });
  };
  refreshFeed = () => {
    this.setState({ refreshing: true }, () => this.props.fetchLandingFilms());
  };
  setModalVal = val => {
    this.setState({ modalval: val });
    this.modalDismissed();
  };
  navigateTo = (route, obj) => {
    this.props.navigation.push(route, { params: obj });
  };

  modalDismissed = () => {
    this.setState({ modalVisible: false });
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
  switchStack = (route, params) => {
    this.props.navigation.navigate(
      route,
      { params },
      NavigationActions.navigate({ routeName: "" })
    );
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
              {this.state.type == "tvod" || item.type == "tvod" ? (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.userdata
                        ? this.switchStack("VideoPlayer", item)
                        : this.navigateTo("Auth", "watch-online")
                    }
                    style={[
                      BaseTheme.buttonticket,
                      { marginBottom: RFValue(5), position: "relative" }
                    ]}
                  >
                    <ImageBackground
                      source={require("../../assets/image/buyflat.png")}
                      resizeMode="contain"
                      style={styles.imgbtn}
                    >
                      <Text style={[styles.igrtext]}>
                        BUY FOR {"\u20A6"} {item.vodPrice || "0"}
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.userdata
                        ? this.switchStack("VideoPlayer", item)
                        : this.navigateTo("Auth", "watch-online")
                    }
                    style={BaseTheme.buttonticket}
                  >
                    <Text style={[styles.igrtext2]}>
                      OR RENT FOR{" "}
                      <Text style={{ color: "#fff" }}>
                        {"\u20A6"} {item.vodPrice || "0"}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    this.props.userdata
                      ? this.switchStack("VideoPlayer", item)
                      : this.navigateTo("Auth", "watch-online")
                  }
                  style={BaseTheme.buttonticket}
                >
                  <Image
                    source={require("../../assets/image/watchonline.png")}
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
    );
  };
  render() {
    const { modalVisible, clampedScroll, moviedetail } = this.state;
    const { vod_films } = this.props;
    const featuredBanner =
      vod_films && vod_films.filter(el => el.featured == true).slice(0, 4);

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
    return !vod_films || !this.state.activestate ? (
      <View style={styles.webviewloader}>
        {/* <ActivityIndicator color="#fff" size="large" /> */}
        <Bubbles size={6} color={Colors.basewhite} />
      </View>
    ) : (
      <View style={BaseTheme.baseBackground}>
        {this.state.refreshing ? null : (
          <Header
            navigation={this.props.navigation}
            backgroundColor={backgroundColor}
            backgroundOpacity={backgroundOpacity}
            navbarTranslate={navbarTranslate}
            navbarOpacity={navbarOpacity}
            goback={moviedetail.length !== 0 ? true : false}
          />
        )}

        <ScrollView
          //bounces={false}
          // removeClippedSubviews={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshFeed}
              // colors={[Colors.description]}
              title="Fetching new content..."
              // tintColor="#1c1c1c"
              titleColor="#fff"
              // progressBackgroundColor="#fff"
            />
          }
          ref={ref => (this.scrollView = ref)}
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
              dropdownval={this.state.modalval}
            />
          </Modal>
          {this.state.activestate == "dob" ? (
            <SelectDOB
              loading={this.props.loading}
              switchState={this.switchState}
              message={this.props.message}
              updateUserProfile={this.props.updateUserProfile}
            />
          ) : this.state.activestate == "genre" ? (
            <PickGenre
              firstname={this.props.userdata && this.props.userdata.firstName}
              filmgenre={this.props.filmgenre}
              switchState={this.switchState}
              message={this.props.message}
              updateUserProfile={this.props.updateUserProfile}
              loading={this.props.loading}
            />
          ) : this.state.activestate == "movietype" ? (
            <PickMovie
              movielist={this.props.currentlyshowing_films}
              switchState={this.switchState}
              loading={this.props.loading}
              updateUserPlaylist={this.props.updateUserPlaylist}
            />
          ) : (
            <View>
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
                  data={
                    moviedetail.length !== 0
                      ? moviedetail
                      : featuredBanner && featuredBanner
                  }
                  renderItem={this._renderBanner}
                  sliderWidth={width}
                  itemWidth={width}
                  activeSlideAlignment="start"
                  inactiveSlideOpacity={0.5}
                  //loop
                  // autoplay
                  //activeSlideAlignment="start"
                  inactiveSlideScale={3}
                  firstItem={2}
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
                {this.state.type == "svod" ? (
                  <View style={styles.infodiv}>
                    <Image
                      source={require("../../assets/image/icon/info.png")}
                      style={{ width: 14, height: 14, marginRight: 5 }}
                      resizeMode="contain"
                    />
                    <Text style={styles.platText}>
                      Available for Gold and Platinum members
                    </Text>
                  </View>
                ) : null}
                {moviedetail.length !== 0 ? null : (
                  <Pagination
                    ref={c => (this._sliderBRef = c)}
                    dotsLength={featuredBanner.length}
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
                )}
              </View>
              <View style={BaseTheme.addvertview}>
                <Image
                  source={Images.strip}
                  style={{ width: "100%", height: RFValue(111) }}
                />
              </View>
              {moviedetail.length !== 0 ? (
                <View>
                  <View style={BaseTheme.carouselhead}>
                    <TouchableOpacity
                      style={styles.carouselhead}
                      // onPress={() =>
                      //   this.navigateTo("MovieListing", "YOU MAY ALSO LIKE")
                      // }
                    >
                      <Text style={BaseTheme.carouselheadtext1}>
                        YOU MAY ALSO LIKE
                      </Text>
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
                      data={vod_films && vod_films}
                      renderItem={this._renderItem2}
                      keyExtractor={item => item.title}
                      //extraData={selected}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <View>
                    <View style={BaseTheme.carouselhead}>
                      <TouchableOpacity
                        style={styles.carouselhead}
                        onPress={() =>
                          this.navigateTo("MovieListing", "FRESH RELEASES")
                        }
                      >
                        <Text style={BaseTheme.carouselheadtext1}>
                          FRESH RELEASES
                        </Text>
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
                        data={vod_films && vod_films.slice(0, 5)}
                        renderItem={this._renderItem2}
                        keyExtractor={item => item.title}
                        //extraData={selected}
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: RFValue(20) }}>
                    <View style={BaseTheme.carouselhead}>
                      {/* <Image
                source={Images.newvod}
                style={BaseTheme.vodicon}
                resizeMode="contain"
              /> */}

                      <TouchableOpacity
                        style={styles.carouselhead}
                        onPress={() =>
                          this.navigateTo("MovieListing", "HOLLYWOOD")
                        }
                      >
                        <Text style={BaseTheme.carouselheadtext1}>
                          HOLLYWOOD
                        </Text>
                        <Image
                          source={Images.viewallicon}
                          style={BaseTheme.viewall}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginVertical: 20 }}>
                      <FlatList
                        horizontal={true}
                        data={vod_films && vod_films.slice(5, 10)}
                        renderItem={this._renderItem2}
                        keyExtractor={item => item.title}
                        //extraData={selected}
                      />
                    </View>
                  </View>

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
                              Etiam eget aliquet dui, quis luctus velit. Integer
                              sit amet lorem fringilla, egestas sapien vel,
                              consectetur nunc.
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View style={styles.watchmorebottom}>
                        <View style={styles.watchmorebottomdiv}>
                          <TouchableOpacity
                            onPress={() => this.navigateTo("GetStarted")}
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
                        onPress={() =>
                          this.navigateTo("MovieListing", "PURE COMEDY")
                        }
                      >
                        <Text style={BaseTheme.carouselheadtext1}>
                          PURE COMEDY
                        </Text>
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
                        data={vod_films && vod_films.slice(10, 15)}
                        renderItem={this._renderItem2}
                        keyExtractor={item => item.title}
                        //extraData={selected}
                      />
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToprops = state => {
  return {
    loading: state.uiReducer.loading,
    message: state.uiReducer.message,
    landing_films: state.filmReducer.landing_films,
    heroebanner_films: state.filmReducer.heroebanner_films,
    currentlyshowing_films: state.filmReducer.currentlyshowing_films,
    upcoming_films: state.filmReducer.upcoming_films,
    vod_films: state.filmReducer.vod_films,
    svod_films: state.filmReducer.svod_films,
    userdata: state.authReducer.userdata,
    film_one: state.filmReducer.film_one,
    filmgenre: state.filmReducer.filmgenre
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchLandingFilms: () => dispatch(actions.fetchLandingFilms()),
    fetchGenres: () => dispatch(actions.fetchGenres()),
    fetchUserPlaylist: () => dispatch(actions.fetchUserPlaylist()),
    updateUserPlaylist: data => dispatch(actions.updateUserPlaylist(data)),
    updateUserProfile: data => dispatch(actions.updateUserProfile(data))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(WatchOnlinePage);
