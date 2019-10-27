import React, { Component } from "react";
import {
  FlatList,
  StatusBar,
  Slider,
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  ActivityIndicator
} from "react-native";
import {
  BrightcovePlayer,
  BrightcovePlayerPoster,
  BrightcovePlayerUtil
} from "react-native-brightcove-player";
import Orientation from "react-native-orientation";
import { FontNames, Colors, Images } from "../../shared/Themes/index";
import Icon from "react-native-vector-icons/Ionicons";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import {
  BaseTheme,
  landingStyle as styles
} from "../../shared/Themes/styles/index";
import { StackActions, NavigationActions } from "react-navigation";

const ACCOUNT_ID = "6084369219001";
const VIDEO_ID = "6084639694001";
const POLICY_KEY =
  "BCpkADawqM29g5A430T46dDHpRbGwKapxC8XsYB7J5WW2A_B-U-6XymakOL2Y4awBAoMO_j2n1SsR8xG9n9rkfIPQaIDuKI8-m5fFPp3F-zhicWkPHKxs7eGdtvDn6RHdFYbYdNE2m3i5Y-y";

this.screenWidth = Dimensions.get("window").width;
this.screenHeight = Dimensions.get("window").height;
function formatTime(second) {
  let h = 0,
    i = 0,
    s = parseInt(second);
  if (s > 60) {
    i = parseInt(s / 60);
    s = parseInt(s % 60);
  }
  // Zero-filling
  let zero = function(v) {
    return v >> 0 < 10 ? "0" + v : v;
  };
  return [zero(h), zero(i), zero(s)].join(":");
}
export default class VideoPlayer extends Component {
  state = {
    isPlaying: false,
    firstLoaded: false,
    buffering: true,
    videodetail: null,
    videoWidth: "",
    videoHeight: "", // The default 16:9 aspect ratio
    isFullScreen: true,
    showVideoCover: false,
    showVideoControl: false,
    volume: 1.0,
    currentTime: 0,
    duration: 0
  };
  constructor(props) {
    super(props);
    Orientation.lockToLandscape();
    //Orientation.addOrientationListener(this._orientationDidChange);
    StatusBar.setHidden(true);
  }
  componentDidMount = () => {
    const params = this.props.navigation.getParam("params");
    this.setState({ videodetail: params });
  };

  _orientationDidChange = orientation => {
    // console.log("orientation changed to" + orientation);
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    this.setState({ videoWidth: screenWidth, videoHeight: screenHeight });
  };

  componentWillUnmount() {
    Orientation.lockToPortrait();
    // Orientation.removeOrientationListener(this._orientationDidChange);
    StatusBar.setHidden(false);
  }
  goBack = () => {
    this.setState({ isPlaying: false }, () => {
      Orientation.lockToPortrait();
      this.props.navigation.pop();
    });
  };
  hideControl() {
    //console.log("hello");
    if (this.state.showVideoControl) {
      this.setState({
        showVideoControl: false
      });
    } else {
      this.setState(
        {
          showVideoControl: true
        },
        //Automatically hide the toolbar after 5 seconds
        () => {
          setTimeout(() => {
            this.setState({
              showVideoControl: false
            });
          }, 5000);
        }
      );
    }
  }
  onSliderValueChanged(currentTime) {
    // console.log(currentTime);
    this.videoRef.seekTo(currentTime);
    clearTimeout(this.sliderTimeoutId);
    this.sliderTimeoutId = setTimeout(() => {
      this.setState({
        currentTime: currentTime
      });
    }, 20);
  }

  _onProgressChanged = data => {
    //  console.log(data);
    if (this.state.isPlaying) {
      this.setState({
        currentTime: data.currentTime,
        currentPercent: data.currentTime / this.state.duration
      });
    }
    if (
      this.state.currentPercent + 0.02 > this.state.bufferProgress &&
      this.state.currentPercent < 0.96
    ) {
      console.log("buffering");
      this.setState({ buffering: true });
    } else {
      this.setState({ buffering: false });
    }
  };
  _updateBuffer = data => {
    //  console.log(data);
    this.setState({ bufferProgress: data.bufferProgress });
  };
  onPressPlayButton() {
    let isPlay = !this.state.isPlaying;
    this.setState({
      isPlaying: isPlay,
      rate: 1,
      isMuted: false,
      showVideoCover: false
    });
    if (this.state.playFromBeginning) {
      this.videoRef.seek(0);
      this.setState({
        playFromBeginning: false
      });
    }
  }
  onPressVolumeButton() {
    let volume = this.state.volume;

    this.setState({ volume: volume === 1.0 ? 0.0 : 1.0 });
  }
  _handleSeek(event) {
    // console.log(event);
    const screenWidth = Dimensions.get("window").width;
    const percent = event.nativeEvent.pageX / screenWidth;
    // console.log(screenWidth);
    // console.log(percent);
    this.videoRef.seekTo(this.state.duration * percent);
  }
  switchStack = (route, params) => {
    // Orientation.lockToPortrait()
    this.props.navigation.navigate(
      route,
      { params },
      NavigationActions.navigate({ routeName: "" })
    );
  };
  onPlayRateChange(rate) {
    this.setState({
      rate: rate
    });
  }
  PlayReady = value => {
    //  console.log(value);
    this.setState({ isPlaying: true, firstLoaded: true });
    // console.log("ready to be played");
  };
  startAfresh = () => {
    this.videoRef.seekTo(0);
    //this.setState({ currentTime: 0, volume: 1 }, () => this.videoRef.seekTo(0));
  };
  render() {
    const { videodetail } = this.state;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0b0b0d"
      },
      buttonticket: {
        height: 46,
        width: 160,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 22,
        left: RFValue(30),
        backgroundColor: "#FFFFFF"
      },
      buttontext: {
        color: Colors.backgroundColor,
        fontSize: 12,
        fontFamily: FontNames.bold,
        letterSpacing: 0.88,
        paddingTop: Platform.OS === "ios" ? 7 : 0
      },
      descriptor: {
        fontSize: 12,
        fontFamily: FontNames.bold,
        letterSpacing: 0.88,

        color: "#fff",
        textAlign: "center",
        right: 40,
        width: 200
        //backgroundColor: "red"
      },
      activitytext: {
        fontFamily: FontNames.bold,
        fontSize: 13,
        paddingLeft: 5,
        color: "#fff"
        //backgroundColor: "red"
      },

      video: {
        zIndex: -100000000,
        flex: 1,
        position: "absolute",
        width: "100%",
        //backgroundColor: "red",
        height: "100%"
      },
      playButton: {
        width: 45,
        height: 45
      },
      playControl: {
        position: "absolute",
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        left: RFValue(30)
        //  backgroundColor: "red"
      },
      volumeControl: {
        position: "absolute",
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        right: RFValue(30)
        //  backgroundColor: "red"
      },
      pausedState: {
        backgroundColor: "rgba(0, 0, 0, 0.6)"
        //opacity: 0.9
      },
      shrinkControl: {
        width: 15,
        height: 15
        // marginRight: 15
      },
      progressBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        zIndex: Platform.OS === "ios" ? 1000000000000 : 0
      },
      time: {
        fontSize: 12,
        color: "white",
        marginLeft: 10,
        marginRight: 10
      },
      control: {
        flexDirection: "row",
        height: 50,
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#2A2929",
        position: "absolute",
        top: this.state.videoHeight - 130,
        //left: 0,
        opacity: 0.9,
        borderRadius: 5,
        borderColor: "transparent",
        borderWidth: 2
        //marginLeft: "5%"
      },
      topcontrol: {
        flexDirection: "row",
        height: 44,
        width: "100%",
        justifyContent: "space-between",
        //  backgroundColor: "red",
        alignItems: "center",
        position: "absolute",
        top: 30
      },
      bottomcontent: {
        flexDirection: "row",
        flex: 1,
        height: 50,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        //marginHorizontal: RFValue(20),
        // backgroundColor: "red",
        position: "absolute",
        top: this.state.videoHeight - 70
      }
    });
    return (
      <View
        style={[
          styles.container,
          this.state.isPlaying ? null : styles.pausedState
        ]}
      >
        {Platform.OS === "ios" ? (
          <BrightcovePlayer
            ref={ref => {
              this.videoRef = ref;
            }}
            style={styles.video}
            accountId={ACCOUNT_ID}
            policyKey={POLICY_KEY}
            videoId={VIDEO_ID}
            disableDefaultControl
            onProgress={number => this._onProgressChanged(number)}
            onChangeDuration={number =>
              this.setState({ duration: number.duration })
            }
            onUpdateBufferProgress={buffer => this._updateBuffer(buffer)}
            play={this.state.isPlaying}
            volume={this.state.volume}
            //play={false}
            fullscreen={true}
            onReady={value => {
              this.PlayReady(value);
            }}
            onEnd={() => this.setState({ isPlaying: false })}
          />
        ) : (
          <View style={styles.video}>
            <BrightcovePlayer
              ref={ref => {
                this.videoRef = ref;
              }}
              style={{ flex: 1, position: "absolute" }}
              accountId={ACCOUNT_ID}
              policyKey={POLICY_KEY}
              videoId={VIDEO_ID}
              disableDefaultControl
              onProgress={number => this._onProgressChanged(number)}
              onChangeDuration={number =>
                this.setState({ duration: number.duration })
              }
              onUpdateBufferProgress={buffer => this._updateBuffer(buffer)}
              play={this.state.isPlaying}
              volume={this.state.volume}
              //play={false}
              fullscreen={true}
              onReady={value => {
                this.PlayReady(value);
              }}
              onEnd={() => this.setState({ isPlaying: false })}
            />
          </View>
        )}
        {(this.state.isPlaying === false && this.state.firstLoaded === false) ||
        this.state.buffering === true ? (
          <View style={styles.progressBar}>
            <ActivityIndicator color="#60CED1" size="large" />
            <Text style={styles.activitytext}>Loading</Text>
          </View>
        ) : (
          <View />
        )}
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideControl();
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor:
                this.state.showVideoControl || this.state.isPlaying === false
                  ? "rgba(0, 0, 0, 0.4)"
                  : "transparent",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {this.state.isPlaying ? null : <View />}
          </View>
        </TouchableWithoutFeedback>
        {/*Video controls display*/}
        {this.state.showVideoControl ? (
          <View style={[styles.topcontrol]}>
            <TouchableOpacity
              hitSlop={BaseTheme.hitSlop}
              style={{ position: "absolute", right: 50 }}
              onPress={() => this.goBack()}
            >
              <Icon name="md-close" size={40} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : null}

        {this.state.showVideoControl ? (
          <View
            style={{
              flex: 1,
              width: "100%",
              position: "absolute",
              bottom: 0
            }}
          >
            <View style={[styles.control]}>
              <TouchableOpacity
                hitSlop={BaseTheme.hitSlop}
                style={styles.playControl}
                onPress={() => {
                  this.onPressPlayButton();
                }}
              >
                {this.state.isPlaying ? (
                  <Icon size={30} name="md-pause" color="white" />
                ) : (
                  <Icon size={30} name="md-play" color="white" />
                )}
              </TouchableOpacity>
              <TouchableWithoutFeedback onPress={evt => this._handleSeek(evt)}>
                <Slider
                  ref="slider"
                  style={{ width: "80%" }}
                  maximumTrackTintColor={"#bcbaba"}
                  minimumTrackTintColor={"#fff"}
                  // thumbImage={require("../../assets/image/icon_control_slider.png")}
                  //thumbTintColor={"#ff3833"}
                  value={this.state.currentTime}
                  step={1}
                  minimumValue={5}
                  maximumValue={this.state.duration}
                  onValueChange={currentTime => {
                    this.onSliderValueChanged(currentTime);
                  }}
                />
              </TouchableWithoutFeedback>

              <TouchableOpacity
                hitSlop={BaseTheme.hitSlop}
                style={styles.volumeControl}
                onPress={() => {
                  this.onPressVolumeButton();
                }}
              >
                {this.state.volume == 1.0 ? (
                  <Icon size={35} name="ios-volume-high" color="#fff" />
                ) : (
                  <Icon size={35} name="ios-volume-mute" color="#fff" />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.bottomcontent}>
              <TouchableOpacity
                style={styles.buttonticket}
                // onPress={() =>
                //   videodetail && videodetail.type == "cinema"
                //     ? this.switchStack("MovieDetail", videodetail)
                //     : null
                // }
              >
                <Text style={styles.buttontext}>
                  {videodetail && videodetail.type == "cinema"
                    ? "BUY TICKET"
                    : "WATCH ONLINE"}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: 130,
                  marginTop: -20
                  // backgroundColor: "red"
                }}
              >
                <TouchableOpacity
                  hitSlop={BaseTheme.hitSlop}
                  onPress={() =>
                    this.videoRef.seekTo(this.state.currentTime - 10)
                  }
                >
                  <Image
                    style={{ width: 22, height: 23 }}
                    resizeMode="contain"
                    source={require("../../assets/image/icon/prevplay.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.startAfresh()}
                  hitSlop={BaseTheme.hitSlop}
                >
                  <Image
                    style={{ width: 38, height: 38 }}
                    resizeMode="contain"
                    source={require("../../assets/image/icon/refresh.png")}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  hitSlop={BaseTheme.hitSlop}
                  onPress={() =>
                    this.videoRef.seekTo(this.state.currentTime + 10)
                  }
                >
                  <Image
                    style={{ width: 22, height: 23 }}
                    resizeMode="contain"
                    source={require("../../assets/image/icon/nextplay.png")}
                  />
                </TouchableOpacity>
              </View>
              <Text numberOfLines={2} style={styles.descriptor}>
                {videodetail && videodetail.title}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
