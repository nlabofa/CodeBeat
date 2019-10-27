/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  Platform,
  Text,
  Animated,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Colors, Images, FontNames } from "../../shared/Themes/index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import * as actions from "../../shared/store/actions/index";
import { connect } from "react-redux";
import ImageComponent from "../../components/ImageComponent";

import {
  BaseTheme,
  moviedetailStyle as styles
} from "../../shared/Themes/styles/index";

const scrollAnim = new Animated.Value(0);
const offsetAnim = new Animated.Value(0);
const NAVBAR_HEIGHT = 64;
const HEADER_MAX_HEIGHT = 130;
const HEADER_MIN_HEIGHT = 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

class MovieListing extends Component {
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
    modalVisible: false,
    movielisting: null,
    mylistedit: false,
    cinemalga: "Lekki",
    selectedstate: "Currently Showing"
  };
  componentDidMount() {
    // StatusBar.setHidden(true);
    const { upcoming_films, vod_films, film_one } = this.props;
    const params = this.props.navigation.getParam("params") || "";
    console.log(params);
    // this.setState({ selectedstate: params });
    if (params === "Upcoming") {
      this.setState({ movielisting: upcoming_films, selectedstate: params });
    } else if (params === "New On VOD") {
      this.setState({ movielisting: vod_films, selectedstate: params });
    } else if (params === "My list") {
      this.setState({ movielisting: upcoming_films, selectedstate: params });
    } else {
      this.setState({ movielisting: vod_films, selectedstate: params });
    }
  }
  onRef = r => {
    this.menu = r;
  };
  selectState = val => {
    this.setState({ selectedstate: val });
  };
  goback = () => {
    this.props.navigation.goBack();
  };
  navigateTo = (route, obj) => {
    this.props.navigation.navigate(route, { params: obj });
  };
  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => this.setState({ modalVisible: true })}
        key={index}
        style={styles.carousel2}
      >
        <ImageComponent source={item.illustration} />
      </TouchableOpacity>
    );
  };
  _renderItemModal = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{ width: RFValue(145) }}
        onPress={() =>
          item.type == "svod" || item.type == "tvod"
            ? this.navigateTo("WatchScreen", { detail: item, type: item.type })
            : this.navigateTo("MovieDetail", item)
        }
        key={index}
      >
        <View style={styles.carouselModal}>
          <ImageComponent source={item.posterImage} />
        </View>
        <View style={styles.modalcastdiv}>
          <Text numberOfLines={1} style={styles.modalcastext2}>
            {item.shortTitle || item.title}
          </Text>
          <Text numberOfLines={1} style={styles.modalcastext}>
            {item.film_categories.length > 0
              ? item.film_categories[0].field.toUpperCase()
              : "ACTION"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const { selectedstate, mylistedit, movielisting } = this.state;
    const navbarOpacity = this.state.clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    const backgroundColor = this.state.scrollAnim.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: ["transparent", "#0f0f13"],
      extrapolate: "clamp"
    });
    return (
      <View style={BaseTheme.baseBackground}>
        <Animated.View
          style={[
            styles.rowhead,
            {
              opacity: navbarOpacity,
              backgroundColor: backgroundColor
            }
          ]}
        >
          <TouchableOpacity onPress={this.goback} style={styles.header}>
            <View style={BaseTheme.modalcloseicon2}>
              <Image
                source={Images.backlink}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          {/* <Animated.View style={styles.header3}> */}
          <Text style={styles.headerbottomtext}>{selectedstate}</Text>

          <Text
            onPress={() =>
              this.setState({ mylistedit: !this.state.mylistedit })
            }
            style={[
              styles.headerbottomtext3,
              { opacity: selectedstate === "My list" ? 1 : 0 }
            ]}
          >
            {mylistedit === false ? "MANAGE" : "CANCEL"}
          </Text>
        </Animated.View>
        <ScrollView
          removeClippedSubviews={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]
            //{ useNativeDriver: true }
          )}
        >
          <View style={styles.bottomcontent}>
            <FlatList
              // horizontal={true}
              numColumns={2}
              data={movielisting}
              renderItem={this._renderItemModal}
              keyExtractor={item => item.title}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              extraData={movielisting}
            />
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
    landing_films: state.filmReducer.landing_films,
    upcoming_films: state.filmReducer.upcoming_films,
    vod_films: state.filmReducer.vod_films,
    film_one: state.filmReducer.film_one
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchLandingFilms: () => dispatch(actions.fetchLandingFilms())
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(MovieListing);
