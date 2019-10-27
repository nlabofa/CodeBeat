/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  Animated,
  Text,
  Platform,
  Dimensions,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Colors, Images, FontNames } from "../../shared/Themes/index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import Modal from "react-native-modal";
import DropDown from "../../components/DropDown";
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
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });
const HEADER_MAX_HEIGHT = 130;
const HEADER_MIN_HEIGHT = 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class CurrentlyShowing extends Component {
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
    cinemalga: "Lekki",
    dropdownval: "Lagos",
    selectedstate: "Lagos"
  };
  componentDidMount() {
    //StatusBar.setHidden(true);
  }
  navigateTo = (route, obj) => {
    this.props.navigation.navigate(route, { params: obj });
  };
  onRef = r => {
    this.menu = r;
  };
  selectState = val => {
    this.setState({ selectedstate: val });
  };
  goback = () => {
    this.props.navigation.goBack();
  };
  modalDismissed = () => {
    this.setState({ modalVisible: false });
  };
  setModalVal = (val, id) => {
    this.modalDismissed();
    this.props.setCinemaStateName(val);
    this.props.setCinemaStateId(id);
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
    const { width } = Dimensions.get("window");
    const { dropdownval, modalVisible, cinemalga } = this.state;
    const { currentlyshowing_films } = this.props;
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
          <Text style={styles.headerbottomtext}>Currently Showing</Text>
          <Text style={[styles.headerbottomtext, { opacity: 0 }]}>MAN</Text>
        </Animated.View>

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
        <ScrollView
          removeClippedSubviews={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]
            //{ useNativeDriver: true }
          )}
        >
          <View style={[styles.header2]}>
            <TouchableOpacity
              onPress={() =>
                this.setState({ modalVisible: !this.state.modalVisible })
              }
              style={[
                styles.cinemabutton,
                { marginTop: RFValue(10), marginBottom: RFValue(12) }
              ]}
            >
              <Text style={[styles.overviewtext3]}>
                {this.props.cinemastatename.toUpperCase()}
              </Text>
              <Image
                style={[BaseTheme.dropdown, { marginTop: RFValue(1) }]}
                source={Images.dropdown}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={BaseTheme.modalheadbar}>
              <Text
                onPress={() => this.setState({ cinemalga: "Lekki" })}
                style={[
                  BaseTheme.modalheadtext,
                  {
                    fontSize: RFValue(18),
                    color:
                      this.state.cinemalga === "Lekki"
                        ? Colors.basewhite
                        : "#333338"
                  }
                ]}
              >
                Lekki
              </Text>
              {this.state.cinemalga === "Lekki" ? (
                <View style={BaseTheme.dot2} />
              ) : null}
            </View>
            <View style={BaseTheme.modalheadbar}>
              <Text
                onPress={() => this.setState({ cinemalga: "Oniru" })}
                style={[
                  BaseTheme.modalheadtext,
                  {
                    fontSize: RFValue(18),
                    color:
                      this.state.cinemalga === "Oniru"
                        ? Colors.basewhite
                        : "#333338"
                  }
                ]}
              >
                Oniru
              </Text>
              {this.state.cinemalga === "Oniru" ? (
                <View style={BaseTheme.dot2} />
              ) : null}
            </View>
            <View style={BaseTheme.modalheadbar}>
              <Text
                onPress={() => this.setState({ cinemalga: "Surulere" })}
                style={[
                  BaseTheme.modalheadtext,
                  {
                    fontSize: RFValue(18),
                    color:
                      this.state.cinemalga === "Surulere"
                        ? Colors.basewhite
                        : "#333338"
                  }
                ]}
              >
                Surulere
              </Text>
              {this.state.cinemalga === "Surulere" ? (
                <View style={BaseTheme.dot2} />
              ) : null}
            </View>
          </View>

          <View style={styles.bottomcontent2}>
            <FlatList
              // horizontal={true}
              numColumns={2}
              data={currentlyshowing_films && currentlyshowing_films}
              renderItem={this._renderItemModal}
              keyExtractor={item => item.title}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              extraData={currentlyshowing_films}
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
    cinemastatename: state.filmReducer.cinemastatename,
    cinemastate: state.filmReducer.cinemastate,
    currentlyshowing_films: state.filmReducer.currentlyshowing_films
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCinemaStateId: id => dispatch(actions.setCinemaStateId(id)),
    setCinemaStateName: id => dispatch(actions.setCinemaStateName(id)),
    fetchLandingFilms: () => dispatch(actions.fetchLandingFilms())
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(CurrentlyShowing);
