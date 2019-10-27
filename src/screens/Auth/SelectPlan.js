/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  Platform,
  Text,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity
} from "react-native";
import { Colors, Images, FontNames } from "../../shared/Themes/index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import Octicons from "react-native-vector-icons/Octicons";
import Button from "../../components/Button";

import {
  BaseTheme,
  authStyle as styles
} from "../../shared/Themes/styles/index";
import Ionicons from "react-native-vector-icons/Ionicons";

const scrollAnim = new Animated.Value(0);
const offsetAnim = new Animated.Value(0);
const NAVBAR_HEIGHT = 64;
const HEADER_MAX_HEIGHT = 130;
const HEADER_MIN_HEIGHT = 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

class SelectPlan extends Component {
  state = {
    headtype: "signin",
    selectedplan: "bronze",
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
    scrollY: new Animated.Value(0)
  };

  goback = () => {
    this.props.navigation.pop();
  };
  navigateTo = (route, obj) => {
    this.props.navigation.push(route, { params: obj });
  };

  render() {
    const { selectedplan } = this.state;
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
          <TouchableOpacity
            hitSlop={styles.hitSlop}
            onPress={this.goback}
            style={styles.goback}
          >
            <Ionicons name="md-arrow-back" color="#fff" size={25} />
          </TouchableOpacity>
          {/* <Animated.View style={styles.header3}> */}
          <Image
            style={[styles.headerlogo]}
            source={require("../../assets/image/Group9.png")}
            resizeMode="contain"
          />
          <TouchableOpacity
            hitSlop={styles.hitSlop}
            onPress={this.goback}
            style={styles.topright}
          >
            <Text
              onPress={() => this.navigateTo("Login")}
              style={styles.toptext}
            >
              SIGN IN
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <ScrollView
          style={{ marginTop: RFPercentage(20), marginHorizontal: RFValue(20) }}
        >
          <View>
            <Text style={styles.graytext}>STEP 1 OF 2</Text>
            <View style={{ marginTop: RFValue(8), width: "90%" }}>
              <Text style={styles.headunder}>
                Choose the plan that’s right for you.
              </Text>
            </View>
            <View style={styles.selectplandiv}>
              <TouchableOpacity
                onPress={() => this.setState({ selectedplan: "bronze" })}
              >
                <Image
                  source={require("../../assets/image/bronze.png")}
                  resizeMode="contain"
                  style={styles.selectplanimg}
                />
                <View style={styles.checkbox}>
                  <Image
                    style={{ height: 23, width: 23 }}
                    source={
                      selectedplan == "bronze"
                        ? Images.checkedicon
                        : Images.uncheckedicon
                    }
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ selectedplan: "silver" })}
              >
                <Image
                  source={require("../../assets/image/silver.png")}
                  resizeMode="contain"
                  style={styles.selectplanimg}
                />
                <View style={styles.checkbox}>
                  <Image
                    style={{ height: 23, width: 23 }}
                    source={
                      selectedplan == "silver"
                        ? Images.checkedicon
                        : Images.uncheckedicon
                    }
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ selectedplan: "gold" })}
              >
                <Image
                  source={require("../../assets/image/gold.png")}
                  resizeMode="contain"
                  style={styles.selectplanimg}
                />
                <View style={styles.checkbox}>
                  <Image
                    style={{ height: 23, width: 23 }}
                    source={
                      selectedplan == "gold"
                        ? Images.checkedicon
                        : Images.uncheckedicon
                    }
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: RFValue(30) }}>
              <Text style={styles.headlight}>
                Free plan ends after one month
              </Text>
              <View style={styles.groupbook}>
                <Text
                  style={[
                    styles.headunder2,
                    {
                      color:
                        selectedplan == "bronze"
                          ? Colors.basewhite
                          : Colors.gray
                    }
                  ]}
                >
                  Free
                </Text>
                <Text
                  style={[
                    styles.headunder2,
                    {
                      color:
                        selectedplan == "silver"
                          ? Colors.basewhite
                          : Colors.gray
                    }
                  ]}
                >
                  {"\u20A6"}3,000
                </Text>
                <Text
                  style={[
                    styles.headunder2,
                    {
                      color:
                        selectedplan == "gold" ? Colors.basewhite : Colors.gray
                    }
                  ]}
                >
                  {"\u20A6"}5,000
                </Text>
              </View>
              <View style={styles.groupbook2}>
                <Ionicons
                  name="md-close"
                  size={35}
                  color={
                    selectedplan == "bronze" ? "#60CED1" : Colors.basewhite
                  }
                  style={styles.selecticon}
                />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.headlight}>HD available</Text>
                  <Ionicons
                    name="md-checkmark"
                    size={35}
                    color={
                      selectedplan == "silver" ? "#60CED1" : Colors.basewhite
                    }
                  />
                </View>

                <Ionicons
                  name="md-checkmark"
                  size={35}
                  color={selectedplan == "gold" ? "#60CED1" : Colors.basewhite}
                  style={styles.selecticon}
                />
              </View>
              <View style={styles.groupbook2}>
                <Ionicons
                  name="md-close"
                  size={35}
                  color={
                    selectedplan == "bronze" ? "#60CED1" : Colors.basewhite
                  }
                  style={styles.selecticon}
                />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.headlight}>Watch online free</Text>
                  <Ionicons
                    name="md-checkmark"
                    size={35}
                    color={
                      selectedplan == "silver" ? "#60CED1" : Colors.basewhite
                    }
                  />
                </View>

                <Ionicons
                  name="md-checkmark"
                  size={35}
                  color={selectedplan == "gold" ? "#60CED1" : Colors.basewhite}
                  style={styles.selecticon}
                />
              </View>
              <View style={styles.groupbook2}>
                <Ionicons
                  name="md-checkmark"
                  size={35}
                  color={
                    selectedplan == "bronze" ? "#60CED1" : Colors.basewhite
                  }
                  style={styles.selecticon2}
                />
                <View style={{ alignItems: "center" }}>
                  <View style={{ width: "80%" }}>
                    <Text style={styles.headlight}>
                      Free movie tickets on month end
                    </Text>
                  </View>

                  <Ionicons
                    name="md-checkmark"
                    size={35}
                    color={
                      selectedplan == "silver" ? "#60CED1" : Colors.basewhite
                    }
                  />
                </View>

                <Ionicons
                  name="md-checkmark"
                  size={35}
                  color={selectedplan == "gold" ? "#60CED1" : Colors.basewhite}
                  style={styles.selecticon2}
                />
              </View>
              <View style={styles.groupbook2}>
                <Ionicons
                  name="md-checkmark"
                  size={35}
                  color={
                    selectedplan == "bronze" ? "#60CED1" : Colors.basewhite
                  }
                  style={styles.selecticon3}
                />
                <View style={{ alignItems: "center" }}>
                  <View style={{ width: "80%" }}>
                    <Text style={styles.headlight}>
                      Recieve multiple freebies for every ticket booked
                    </Text>
                  </View>

                  <Ionicons
                    name="md-checkmark"
                    size={35}
                    color={
                      selectedplan == "silver" ? "#60CED1" : Colors.basewhite
                    }
                  />
                </View>

                <Ionicons
                  name="md-checkmark"
                  size={35}
                  color={selectedplan == "gold" ? "#60CED1" : Colors.basewhite}
                  style={styles.selecticon3}
                />
              </View>
              <View style={styles.groupbook2}>
                <Ionicons
                  name="md-checkmark"
                  size={35}
                  color={
                    selectedplan == "bronze" ? "#60CED1" : Colors.basewhite
                  }
                  style={styles.selecticon2}
                />
                <View style={{ alignItems: "center" }}>
                  <View style={{ width: "80%" }}>
                    <Text style={styles.headlight}>
                      Easy booking and tracking
                    </Text>
                  </View>

                  <Ionicons
                    name="md-close"
                    size={35}
                    color={
                      selectedplan == "silver" ? "#60CED1" : Colors.basewhite
                    }
                  />
                </View>

                <Ionicons
                  name="md-checkmark"
                  size={35}
                  color={selectedplan == "gold" ? "#60CED1" : Colors.basewhite}
                  style={styles.selecticon2}
                />
              </View>
            </View>
            <Button
              formIsValid={true}
              onPress={() => this.navigateTo("SignUpForm", selectedplan)}
            />
            <View style={{ width: "60%", alignSelf: "center" }}>
              <Text style={[styles.bottomtext, { paddingBottom: RFValue(30) }]}>
                Don’t want to be a part of Filmhouse Club?
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SelectPlan;
