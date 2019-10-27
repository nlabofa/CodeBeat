import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  ActivityIndicator,
  Platform
} from "react-native";
import { FontNames, Colors, Images } from "../shared/Themes/index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { Bubbles } from "react-native-loader";
import { BaseTheme, authStyle as styles } from "../shared/Themes/styles/index";
const Button = props => {
  return (
    <TouchableOpacity
      disabled={!props.formIsValid || props.loading}
      // disabled={loading}
      onPress={() => props.onPress()}
      style={[
        !props.formIsValid ? BaseTheme.disabledbtn : BaseTheme.proceedbtn,
        props.customstyle ? props.customstyle : null
      ]}
    >
      <ImageBackground
        source={Images.buttongradient}
        style={styles.Buttongradient}
        resizeMode="contain"
      >
        <View style={styles.btndiv}>
          {props.loading ? (
            <View
            //style={{ marginRight: RFValue(5) }}
            >
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : null}
          <Text style={[styles.adtext7M]}>
            {props.loading
              ? "Processing"
              : props.btnText
              ? props.btnText
              : "PROCEED"}
          </Text>
          {/* {props.loading ? (
            <View style={{ marginLeft: RFValue(3) }}>
              <Bubbles color={Colors.basewhite} size={2} />
            </View>
          ) : null} */}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Button;
