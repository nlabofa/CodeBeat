import { StyleSheet, Platform } from "react-native";
import { Colors, FontNames } from "../index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

const Styles = StyleSheet.create({
  header: {
    position: "relative",
    justifyContent: "center",
    //height: RFValue(100),
    width: "100%"
  },
  headerdiv: {
    marginHorizontal: RFValue(20),
    flexDirection: "row",
    //height: "100%",
    marginTop: Platform.OS == "ios" ? RFValue(50) : RFValue(30),
    alignItems: "center"
    //backgroundColor: "red"
  },
  backicon: {
    width: RFValue(26),
    height: RFValue(20),
    padding: RFValue(10)
  },
  headertext: {
    fontSize: RFValue(14),
    //paddingTop: RFValue(2),
    color: "#fff",
    fontFamily: FontNames.bold,
    opacity: 0.83,
    letterSpacing: 1
  },
  headertext2: {
    fontSize: RFValue(19),
    paddingLeft: RFValue(5),
    color: "#fff",
    fontFamily: FontNames.medium,
    opacity: 0.83
    //letterSpacing: 0.7
  },
  headertext3: {
    fontSize: RFValue(19),
    //paddingLeft: RFValue(5),
    color: "#fff",
    fontFamily: FontNames.medium
    //letterSpacing: 0.7
  },
  headerlabel: {
    fontSize: RFValue(14),
    // paddingLeft: RFValue(5),
    opacity: 0.53,
    color: "#fff",
    paddingBottom: RFValue(5),
    fontFamily: FontNames.bold
    //letterSpacing: 0.7
  },
  headerlabel2: {
    paddingLeft: RFValue(10),
    fontSize: RFValue(14),
    // paddingLeft: RFValue(5),
    opacity: 0.53,
    color: "#fff",
    //paddingBottom: RFValue(5),
    fontFamily: FontNames.bold,
    letterSpacing: 0.7
  },
  headerlabel3: {
    // paddingLeft: RFValue(10),
    fontSize: RFValue(12),
    color: "#60CED1",
    //paddingBottom: RFValue(5),
    fontFamily: FontNames.bold
  },
  headerlabel4: {
    paddingTop: RFValue(10),
    fontSize: RFValue(12),
    color: "#FFF",
    fontFamily: FontNames.bold
  },
  bodycontent: {
    marginHorizontal: RFValue(20),
    marginTop: RFValue(50),
    // backgroundColor: "green",
    flex: 1
  },
  switchdiv: {
    backgroundColor: "#0d0d0f",
    //opacity: 0.48,
    height: RFValue(80),
    flexDirection: "row",
    alignItems: "center",
    marginTop: RFValue(20),
    paddingHorizontal: RFValue(20),
    justifyContent: "space-between"
  },
  profilediv: {
    backgroundColor: "#0d0d0f",
    //opacity: 0.48,
    minHeight: RFValue(130),
    paddingVertical: RFValue(30),
    flexDirection: "row",
    alignItems: "center",
    marginTop: RFValue(20),
    paddingHorizontal: RFValue(20)
    //justifyContent: "space-between"
  },
  privacydiv: {
    backgroundColor: "#0d0d0f",
    //opacity: 0.48,
    minHeight: RFValue(130),
    paddingVertical: RFValue(30),
    // flexDirection: "row",
    // alignItems: "center",
    marginTop: RFValue(20),
    paddingHorizontal: RFValue(20)
    //justifyContent: "space-between"
  },
  legalrow: {
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: "red",
    marginBottom: RFValue(10),
    paddingVertical: RFValue(15),
    justifyContent: "space-between"
  },
  secondsec: { marginTop: RFValue(35), marginLeft: RFValue(5) },
  avataricon: { width: RFValue(43), height: RFValue(43), marginLeft: -5 },
  emailsection: { marginLeft: RFValue(50), marginTop: RFValue(25) },
  visaicon: { width: RFValue(50), height: RFValue(16) },
  paymentrow: {
    flexDirection: "row",
    alignItems: "center"
  }
});
export default Styles;
