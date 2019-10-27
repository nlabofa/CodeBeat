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
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { Colors, Images } from "../../shared/Themes/index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import Header from "../../components/Header";
import Modal from "react-native-modal";
import { ENTRIES1, ENTRIES2, ENTRIES3, ENTRIES4, ENTRIES5 } from "./Entries";
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from "react-native-popup-menu";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  BaseTheme,
  landingStyle as styles
} from "../../shared/Themes/styles/index";

const { Popover } = renderers;

class LandingPage extends Component {
  state = {
    bannerAddedToList: false,
    modalVisible: false,
    modalval: "cast",
    selectedstate: "lagos",
    sliderModalActiveSlide: 1,
    slider1ActiveSlide: 1,
    slider2ActiveSlide: 1,
    slider3ActiveSlide: 1,
    slider4ActiveSlide: 1,
    slider5ActiveSlide: 1,
    slider6ActiveSlide: 1
  };
  componentDidMount() {
    StatusBar.setHidden(true);
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
  setModalVal = val => {
    this.setState({ modalval: val });
  };
  navigateTo = (route, obj) => {
    this.props.navigation.push(route, { params: obj });
  };

  _renderBanner = ({ item, index }) => {
    return (
      <View key={index}>
        <View style={styles.heroeimage}>
          <ImageComponent
            source={item.posterImage}
            style={[BaseTheme.heroebanner, { zIndex: -10000 }]}
            noloader
          />
        </View>
        {/* //rgba(10,10,13,0.4) */}
        <LinearGradient
          style={[BaseTheme.heroebanner, { zIndex: 10000000000 }]}
          colors={["#222225", "transparent", Colors.backgroundColor]}
          // colors={["red", "transparent", "transparent", "green", "green"]}
          locations={[0, 0.4, 1]}
        ></LinearGradient>
      </View>
    );
  };
  renderModal = () => {
    return (
      <View style={BaseTheme.modalcontainer}>
        <View style={BaseTheme.modalheadrab}>
          <View style={BaseTheme.modalhead}>
            <TouchableOpacity
              onPress={() => this.modalDismissed()}
              style={styles.modalcloseicon}
            >
              <Image
                source={Images.closeicon}
                style={BaseTheme.modalcloseicon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setModalVal("cast")}
              style={BaseTheme.modalheadiv}
            >
              <Image
                style={[
                  BaseTheme.modalheadbar,
                  { opacity: this.state.modalval === "cast" ? 1 : 0.0 }
                ]}
                source={Images.modalheadbar}
                resizeMode="contain"
              />

              <Text
                style={[
                  BaseTheme.modalheadtext,
                  {
                    color: this.state.modalval === "cast" ? "white" : "#58575a"
                  }
                ]}
              >
                CAST
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setModalVal("overview")}
              style={[BaseTheme.modalheadiv, { marginLeft: RFValue(15) }]}
            >
              <Image
                style={[
                  BaseTheme.modalheadbar,
                  { opacity: this.state.modalval === "overview" ? 1 : 0.0 }
                ]}
                source={Images.modalheadbar}
                resizeMode="contain"
              />

              <Text
                style={[
                  BaseTheme.modalheadtext,
                  {
                    color:
                      this.state.modalval === "overview" ? "white" : "#58575a"
                  }
                ]}
              >
                OVERVIEW
              </Text>
            </TouchableOpacity>
          </View>
          <View style={BaseTheme.modalmiddle}>
            {this.state.modalval === "overview" ? (
              <View style={{ marginTop: RFValue(20), marginLeft: RFValue(15) }}>
                <View style={BaseTheme.heroesgenre2}>
                  <Text style={styles.heroetext2}>ACTION</Text>
                  <Text style={styles.heroetext2}>PG 13</Text>
                  <Text style={styles.heroetext2}>2019</Text>
                  <Text style={styles.heroetext2}>2H 13 M</Text>
                </View>

                <Text numberOfLines={5} style={BaseTheme.modaldescription}>
                  Set several centuries in the future, the abandoned Alita is
                  found in the scrapyard of Iron City by Ido, a compassionate
                  cyber-doctor who takes the unconscious cyborg Alita to his
                  clinic`
                </Text>
              </View>
            ) : (
              <View style={{ marginTop: RFValue(20) }}>
                <Carousel
                  ref={c => (this._slidermodalRef = c)}
                  data={ENTRIES4}
                  renderItem={this._renderItemModal}
                  sliderWidth={Dimensions.get("window").width - 80}
                  itemWidth={RFValue(90)}
                  inactiveSlideOpacity={1}
                  //activeSlideAlignment="start"
                  inactiveSlideScale={1}
                  containerCustomStyle={{ flexGrow: 0 }}
                  contentContainerCustomStyle={{ flexGrow: 0 }}
                  firstItem={1}
                  onSnapToItem={index =>
                    this.setState({ sliderModalActiveSlide: index })
                  }
                />
              </View>
            )}
          </View>
        </View>

        <View style={styles.modalbuttonview}>
          <TouchableOpacity style={BaseTheme.buttonticket2}>
            <Image
              style={{ width: "100%", height: "100%" }}
              source={Images.buyticket}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.modalbottomview}>
          <View style={styles.heroewatch}>
            <Image
              source={Images.watchicon}
              resizeMode="contain"
              style={BaseTheme.watchicon}
            />
            <Text style={styles.watchtext}>Watch trailer</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={Images.addicon}
              resizeMode="contain"
              style={BaseTheme.watchicon}
            />
            <Text style={styles.watchtext}>Add To List</Text>
          </View>
        </View>
      </View>
    );
  };
  modalDismissed = () => {
    this.setState({ modalVisible: false });
  };

  _renderItem2 = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => this.setState({ modalVisible: true })}
        key={index}
        style={styles.carousel2}
      >
        <Image
          source={item.illustration}
          resizeMode="cover"
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      </TouchableOpacity>
    );
  };
  _renderItemModal({ item, index }) {
    return (
      <View>
        <View key={index} style={styles.carouselModal}>
          <Image
            source={item.illustration}
            resizeMode="cover"
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
          />
        </View>
        <View style={styles.modalcastdiv}>
          <Text numberOfLines={1} style={styles.modalcastext}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.modalcastext2}>
            {item.title}
          </Text>
        </View>
      </View>
    );
  }

  _renderItem5 = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => this.setState({ modalVisible: true })}
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
        onPress={() => this.setState({ modalVisible: true })}
        key={index}
        style={styles.carousel6}
      >
        <Image
          source={item.illustration}
          resizeMode="cover"
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      </TouchableOpacity>
    );
  };
  render() {
    const { modalVisible, selectedstate } = this.state;

    const { width } = Dimensions.get("window");
    return (
      <ParallaxScrollView
        backgroundColor={Colors.backgroundColor}
        contentBackgroundColor={Colors.backgroundColor}
        parallaxHeaderHeight={540}
        renderStickyHeader={() => (
          <Header navbar navigation={this.props.navigation} />
        )}
        stickyHeaderHeight={90}
        renderForeground={() => <Header />}
      >
        <View>
          <View style={BaseTheme.addvertview}>
            <Image
              source={Images.strip}
              style={{ width: "100%", height: RFValue(111) }}
            />
          </View>
          <View>
            <View style={BaseTheme.carouselhead}>
              <Image
                source={Images.flashicon}
                style={BaseTheme.flashicon}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.carouselhead}
                onPress={() => this.navigateTo("CurrentlyShowing")}
              >
                <Text style={BaseTheme.carouselheadtext1}>
                  Currently Showing
                </Text>
                <Image
                  source={Images.viewallicon}
                  style={BaseTheme.viewall}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Menu
                style={BaseTheme.carouselheadright}
                ref={this.onRef}
                renderer={Popover}
                rendererProps={{
                  placement: "bottom"
                }}
              >
                <MenuTrigger style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      BaseTheme.carouselheadrightext,
                      { color: "#8c8c94", paddingRight: RFValue(9) }
                    ]}
                  >
                    LOCATION
                  </Text>
                  <Text style={BaseTheme.carouselheadrightext}>
                    {selectedstate.toUpperCase()}
                  </Text>
                  <Image
                    source={Images.dropdown}
                    style={BaseTheme.dropdown}
                    resizeMode="contain"
                  />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.menuoptions}>
                  <MenuOption
                    customStyles={optionStyles}
                    onSelect={() => this.selectState("lagos")}
                    // text="Lagos"
                  >
                    <Text
                      style={[
                        styles.menutext,
                        {
                          color:
                            selectedstate == "lagos" ? "#1b1b1f" : "#52526C"
                        }
                      ]}
                    >
                      Lagos
                    </Text>
                  </MenuOption>
                  <MenuOption
                    customStyles={optionStyles}
                    onSelect={() => this.selectState("Kano")}
                    //text="Kano"
                  >
                    <Text
                      style={[
                        styles.menutext,
                        {
                          color: selectedstate == "Kano" ? "#1b1b1f" : "#52526C"
                        }
                      ]}
                    >
                      Kano
                    </Text>
                  </MenuOption>
                  <MenuOption
                    customStyles={optionStyles}
                    onSelect={() => this.selectState("Oyo")}
                    //text="Oyo"
                  >
                    <Text
                      style={[
                        styles.menutext,
                        {
                          color: selectedstate == "Oyo" ? "#1b1b1f" : "#52526C"
                        }
                      ]}
                    >
                      Oyo
                    </Text>
                  </MenuOption>
                  <MenuOption
                    customStyles={optionStyles}
                    onSelect={() => this.selectState("Rivers")}
                    //text="Rivers"
                  >
                    <Text
                      style={[
                        styles.menutext,
                        {
                          color:
                            selectedstate == "Rivers" ? "#1b1b1f" : "#52526C"
                        }
                      ]}
                    >
                      Rivers
                    </Text>
                  </MenuOption>
                  <MenuOption
                    customStyles={optionStyles}
                    onSelect={() => this.selectState("Ondo")}
                    //text="Ondo"
                  >
                    <Text
                      style={[
                        styles.menutext,
                        {
                          color: selectedstate == "Ondo" ? "#1b1b1f" : "#52526C"
                        }
                      ]}
                    >
                      Ondo
                    </Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
            <View style={{ marginTop: 25 }}>
              <FlatList
                horizontal={true}
                data={ENTRIES1}
                renderItem={this._renderItem2}
                keyExtractor={item => item.title}
                //extraData={selected}
              />
            </View>
          </View>
          <View style={{ marginTop: RFValue(30) }}>
            <View style={BaseTheme.carouselhead}>
              <Image
                source={Images.upcoming}
                style={BaseTheme.flashicon}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.carouselhead}
                onPress={() => this.navigateTo("MovieListing", "Upcoming")}
              >
                <Text style={BaseTheme.carouselheadtext1}>Upcoming</Text>
                <Image
                  source={Images.viewallicon}
                  style={BaseTheme.viewall}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 25 }}>
              <FlatList
                horizontal={true}
                data={ENTRIES2}
                renderItem={this._renderItem2}
                keyExtractor={item => item.title}
                //extraData={selected}
              />
            </View>
          </View>
          <View style={BaseTheme.promodiv}>
            <View style={[BaseTheme.carouselhead]}>
              <Image
                source={Images.multiplay}
                style={BaseTheme.flashicon}
                resizeMode="contain"
              />
              <View>
                <Text style={BaseTheme.carouselheadtext1}>
                  Watch More For Less
                </Text>
              </View>
            </View>
            <View>
              <Image
                source={require("../../assets/image/promoBG.png")}
                resizeMode="cover"
                style={BaseTheme.promobanner}
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
                  <TouchableOpacity style={styles.watchmorebottomdivleft}>
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

          <View style={{ marginTop: RFValue(30) }}>
            <View style={BaseTheme.carouselhead}>
              <Image
                source={Images.newvod}
                style={BaseTheme.vodicon}
                resizeMode="contain"
              />

              <TouchableOpacity
                style={styles.carouselhead}
                onPress={() => this.navigateTo("MovieListing", "VOD")}
              >
                <Text style={BaseTheme.carouselheadtext1}>New On VOD</Text>
                <Image
                  source={Images.viewallicon}
                  style={BaseTheme.viewall}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={{ marginVertical: 30 }}>
              <FlatList
                horizontal={true}
                data={ENTRIES1}
                renderItem={this._renderItem2}
                keyExtractor={item => item.title}
                //extraData={selected}
              />
            </View>
          </View>
          <View style={{ marginTop: RFValue(30) }}>
            <View style={BaseTheme.carouselhead}>
              <Image
                source={Images.promotionicon}
                style={BaseTheme.vodicon}
                resizeMode="contain"
              />
              <View>
                <Text style={BaseTheme.carouselheadtext3}>Promotions</Text>
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Carousel
                ref={c => (this._slider5Ref = c)}
                data={ENTRIES3}
                renderItem={this._renderItem5}
                sliderWidth={width}
                itemWidth={width}
                inactiveSlideOpacity={0.5}
                //activeSlideAlignment="start"
                inactiveSlideScale={3}
                firstItem={1}
                onSnapToItem={index =>
                  this.setState({ slider5ActiveSlide: index })
                }
              />
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={BaseTheme.carouselhead}>
              <TouchableOpacity
                style={styles.carouselhead}
                onPress={() => this.navigateTo("MovieListing", "FilmOne")}
              >
                <Text style={BaseTheme.carouselheadtext1}>From FilmOne</Text>
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
                data={ENTRIES5}
                renderItem={this._renderItem6}
                keyExtractor={item => item.title}
                //extraData={selected}
              />
            </View>
          </View>
        </View>
      </ParallaxScrollView>
    );
  }
}
const optionStyles = {
  optionTouchable: {
    activeOpacity: 40
  },
  optionWrapper: {
    // width: RFValue(115),
    // backgroundColor: '#fff',
    // borderBottomLeftRadius: 16,
    // borderBottomRightRadius: 16,
  },
  optionText: {
    color: "#52526C",
    fontSize: RFValue(14),
    fontFamily: "AvenirLTStd-Medium",
    paddingHorizontal: 6,
    paddingVertical: 4
  }
};
export default LandingPage;
