import React from "react";

import { View, Image, Animated, Text, TouchableOpacity } from "react-native";
import {
  BaseTheme,
  landingStyle as styles
} from "../shared/Themes/styles/index";
import { Images, Colors, FontNames } from "../shared/Themes/index";
import { RFValue } from "react-native-responsive-fontsize";
import * as actions from "../shared/store/actions/index";
import { connect } from "react-redux";

/**
 * This is strictly a presentational component. The listed props below are the allowed props
 *
 **@prop   navigation. This props handles routing
 ** @prop  goback. This is a boolean that checks if you want only a goBack nav header
  ** @prop  backgroundColor. This is a boolean that checks if you want only a goBack nav header
 ** @prop  backgroundOpacity This is a boolean that checks if you want only a goBack nav header

 */
const Header = props => {
  return props.goback ? (
    <Animated.View
      style={[
        BaseTheme.heroecontent,
        {
          backgroundColor: props.backgroundColor,
          opacity: props.backgroundOpacity
        }
      ]}
    >
      <View style={[BaseTheme.headercontent2]}>
        <TouchableOpacity
          style={BaseTheme.hamburger2}
          hitSlop={BaseTheme.hitSlop}
          onPress={() => props.navigation.pop()}
        >
          <Image
            style={BaseTheme.fullflex}
            source={Images.backlink}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Animated.Text
          style={[BaseTheme.headertitle, { opacity: props.textOpacity }]}
        >
          {props.title}
        </Animated.Text>
      </View>
    </Animated.View>
  ) : (
    <Animated.View
      style={[
        BaseTheme.heroecontent,
        {
          backgroundColor: props.backgroundColor,
          //opacity: props.backgroundOpacity,
          transform: [{ translateY: props.navbarTranslate }],
          opacity: props.navbarOpacity
        }
      ]}
    >
      <View style={BaseTheme.headercontent}>
        <TouchableOpacity
          style={BaseTheme.hamburger}
          hitSlop={BaseTheme.hitSlop}
          onPress={() => props.navigation.openDrawer()}
        >
          <Image
            style={BaseTheme.fullflex}
            source={Images.hamburgericon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View>
          {props.shopsection ? (
            <Text style={styles.headertext}>Shop</Text>
          ) : (
            <Image
              style={BaseTheme.headerlogo}
              source={Images.headerlogo}
              resizeMode="contain"
            />
          )}
        </View>
        {props.shopsection ? null : (
          <Image
            style={BaseTheme.searchicon}
            source={Images.searchicon}
            resizeMode="contain"
          />
        )}
        <TouchableOpacity
          onPress={() => props.navigation.navigate("OrderSummary")}
          hitSlop={BaseTheme.hitSlop}
          style={BaseTheme.carticon}
        >
          <Image
            style={{ width: "100%", height: "100%" }}
            source={Images.carticon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {props.itemcount > 0 ? (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("OrderSummary")}
            style={styles.carticon}
          >
            <Text style={[styles.adtext7Li]}>{props.itemcount}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </Animated.View>
  );
};

const mapStateToprops = state => {
  return {
    checkout: state.shopReducer.checkout,
    itemcount: state.shopReducer.itemcount
  };
};

export default connect(
  mapStateToprops,
  null
)(Header);
