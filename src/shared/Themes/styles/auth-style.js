import { StyleSheet, Platform } from "react-native";
import { Colors, FontNames } from "../index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

const Styles = StyleSheet.create({
  goback: {
    position: "absolute",
    left: RFValue(20),
    top: RFPercentage(8)
  },
  headerlogo: {
    width: RFValue(132),
    height: RFValue(40)
  },
  hitSlop: { top: 20, bottom: 20, left: 20, right: 20 },

  rowhead: {
    paddingTop: RFValue(40),
    paddingBottom: RFValue(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000000000,
    // borderColor: "red",
    //borderWidth: 2,
    width: "100%",
    overflow: "hidden",
    position: "absolute",
    top: 0
  },
  logo: {
    position: "absolute",
    left: 0,
    right: 0
  },
  bottomtext: {
    fontFamily: FontNames.regular,
    textAlign: "center",
    color: "#7d7d89",
    fontSize: RFValue(17)
    //lineHeight: 22,
  },
  bottomtext2: {
    paddingTop: RFValue(20),
    fontFamily: FontNames.medium,
    textAlign: "center",
    color: "#7d7d89",
    width: "85%",
    fontSize: RFValue(13),
    lineHeight: 18
    //lineHeight: 22,
  },
  signuptext: {
    color: "#60CED1",
    // backgroundColor: "red",
    paddingVertical: RFValue(15),
    fontFamily: FontNames.medium
  },
  bottomtextabs: {
    fontFamily: FontNames.regular,
    textAlign: "center",
    color: Colors.invalid,
    fontSize: RFValue(17)
    //lineHeight: 22,
  },
  bottomtextabs2: {
    fontFamily: FontNames.regular,
    paddingTop: RFValue(9),
    paddingLeft: RFValue(3),
    textAlign: "left",
    color: Colors.invalid,
    fontSize: RFValue(17)
    //lineHeight: 22,
  },
  errorbox: {
    width: "70%",
    marginTop: RFPercentage(10),
    alignSelf: "center"
  },
  errorbox2: {
    width: "90%",
    marginTop: RFPercentage(10),
    alignSelf: "center"
  },
  inputContainer: {
    flex: 1,
    marginTop: RFPercentage(30),
    marginHorizontal: RFValue(20)
    // backgroundColor: "red"
  },
  inputContainer2: {
    flex: 1,
    marginTop: RFPercentage(23),
    marginHorizontal: RFValue(20)
    // backgroundColor: "red"
  },
  headrow: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  headrow2: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalheadbar3: {
    alignItems: "center",
    marginVertical: RFValue(5)
  },
  modalheadtext: {
    // color: "#333338",
    textAlign: "center",
    // paddingHorizontal: 35,
    fontSize: RFValue(19),
    fontFamily: FontNames.bold
  },
  custominput: {
    fontFamily: FontNames.medium,
    marginBottom: RFValue(0),
    fontSize: RFValue(18)
  },
  adtext7M: {
    //position: "absolute",
    textAlign: "center",
    // left: 0,
    // right: 0,
    //top: RFValue(24),
    fontFamily: FontNames.bold,
    color: Colors.basewhite,
    fontSize: RFValue(15),
    paddingTop: RFValue(3)
  },
  adtext7N: {
    position: "absolute",
    textAlign: "center",
    left: 0,
    right: 0,
    top: RFValue(22),
    fontFamily: FontNames.bold,
    color: Colors.basewhite,
    fontSize: RFValue(15),
    paddingTop: RFValue(3)
  },
  Buttongradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  btndiv: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  passwordmask: {
    position: "absolute",
    zIndex: 100000,
    right: RFValue(20),
    top: RFValue(35)
  },
  /**Get started */

  getstartedbg: {
    position: "absolute",
    top: RFPercentage(55),
    opacity: 0.3,
    width: "100%",
    height: RFValue(200),
    zIndex: -100
  },
  toptext: {
    fontFamily: FontNames.bold,
    color: Colors.basewhite,
    fontSize: RFValue(14)
    //lineHeight: 22,
  },
  topright: {
    position: "absolute",
    right: RFValue(20),
    top: RFPercentage(8)
  },
  getstartedhead: {
    color: Colors.basewhite,
    fontSize: RFValue(35),
    marginLeft: RFValue(25),
    fontFamily: FontNames.bold
  },
  sublineheadbtm: {
    color: "#5E5E67",
    fontSize: RFValue(15),
    marginLeft: RFValue(25),
    top: RFPercentage(25),
    position: "absolute",
    // left: RFValue(25),
    fontFamily: FontNames.bold
  },
  getstartedstrip: {
    resizeMode: "contain",
    position: "absolute",
    right: -35,
    top: -30,
    width: RFValue(196),
    height: RFValue(290)
  },
  signupstrip: {
    resizeMode: "contain",
    position: "absolute",
    left: RFPercentage(-10),
    zIndex: -100000000,
    bottom: 0,
    width: RFValue(230),
    height: RFValue(120)
  },
  getstartedbtn: {
    position: "absolute",
    height: RFValue(60),
    width: "100%",
    bottom: 30
  },

  /**Select Plan */
  graytext: {
    fontFamily: FontNames.bold,
    color: Colors.gray,
    fontSize: RFValue(12)
  },
  headunder: {
    fontFamily: FontNames.bold,
    color: Colors.basewhite,
    fontSize: RFValue(18)
  },
  headunder2: {
    fontFamily: FontNames.bold,
    color: Colors.gray,
    fontSize: RFValue(18)
  },
  headlight: {
    textAlign: "center",
    fontFamily: FontNames.regular,
    color: Colors.basewhite,
    fontSize: RFValue(14)
  },
  selectplandiv: {
    flexDirection: "row",
    marginTop: RFValue(50),
    justifyContent: "space-around"
  },
  selectplanimg: { width: RFValue(95), height: RFValue(95) },
  checkbox: { alignSelf: "center", marginTop: RFValue(15) },
  groupbook: {
    flexDirection: "row",
    marginTop: RFValue(20),
    justifyContent: "space-around"
  },
  groupbook2: {
    flexDirection: "row",
    //backgroundColor: "red",
    marginTop: RFValue(30),
    justifyContent: "space-between",
    marginHorizontal: RFValue(40),
    alignItems: "center"
  },
  selecticon: {
    marginTop: RFValue(15)
  },
  selecticon2: {
    marginTop: RFValue(20)
  },
  selecticon3: {
    marginTop: RFValue(35)
  }
});
export default Styles;
