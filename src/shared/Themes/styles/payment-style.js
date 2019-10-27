import { StyleSheet } from "react-native";
import { Colors, FontNames } from "../index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

const Styles = StyleSheet.create({
  /**Modal Container styling */
  modalcloseicon: {
    //backgroundColor: "green",
    position: "absolute",
    //right: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    top: RFValue(30),
    padding: RFValue(10)
  },
  custominput: {
    fontFamily: FontNames.medium,
    marginBottom: RFValue(0),
    fontSize: RFValue(18)
  },
  modalheadtext: {
    color: Colors.basewhite,
    textAlign: "center",
    // paddingHorizontal: 35,
    fontSize: RFValue(15),
    fontFamily: FontNames.bold
  }
});

export default Styles;
