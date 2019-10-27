import { StyleSheet, Dimensions, Platform } from "react-native";
import { Colors, FontNames } from "../index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");
const Styles = StyleSheet.create({
  baseBackground: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  },
  heroebanner: {
    width: "100%",
    //  borderBottomColor: 'red',
    //  borderBottomWidth: 5,
    zIndex: 1000000000000,
    height: RFValue(560)
  },
  heroebanner3: {
    position: "absolute",
    top: RFPercentage(20),
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  headertitle: {
    color: "#fff",
    textAlign: "center",
    fontFamily: FontNames.bold,
    position: "absolute",
    left: 0,
    right: 0,
    fontSize: RFValue(18)
    // backgroundColor: props.backgroundColor,
  },
  heroebanner2: {
    width: "100%",
    height: RFValue(300),
    alignItems: "center",
    justifyContent: "center"
    //borderBottomColor: Colors.backgroundColor,
    //borderBottomWidth: 1,
  },
  activityIndicatorStyle: {
    height: RFValue(174),
    width: RFValue(130),
    borderRadius: 10,
    backgroundColor: "#2B292B"
  },
  basetitle: {
    textAlign: "center",
    fontFamily: FontNames.neue,
    fontSize: RFValue(31),
    letterSpacing: 3,
    color: "#fff"
  },
  barecenter: {
    justifyContent: "center",
    alignItems: "center"
  },
  heroetop: { width: "100%", height: RFValue(100), position: "absolute" },
  heroebottom: {
    width: "100%",
    height: RFValue(100),
    position: "absolute",
    bottom: 0
  },

  hamburger: {
    width: RFValue(26),
    height: RFValue(20),
    // backgroundColor:'green',
    position: "absolute",
    zIndex: 100000000000,
    top: 10,
    left: 0
  },
  hamburger2: {
    width: RFValue(26),
    height: RFValue(20),
    // backgroundColor:'green',
    position: "absolute",
    zIndex: 100000000000,
    top: 10,
    left: 20
  },
  hitSlop: { top: 20, bottom: 20, left: 20, right: 20 },
  headerlogo: {
    width: RFValue(90),
    height: RFValue(30)
  },
  headercontent: {
    paddingBottom: 15,
    width: "90%",
    position: "relative",
    //flex: 1,
    alignItems: "center",
    // backgroundColor: 'red',
    justifyContent: "center",
    marginHorizontal: RFValue(20)
  },
  headercontent2: {
    width: "100%",
    flexDirection: "row",
    height: RFValue(40),
    position: "relative",
    //flex: 1,
    alignItems: "center",
    // backgroundColor: "red",
    justifyContent: "center",
    paddingHorizontal: RFValue(20)
  },
  searchicon: {
    width: RFValue(20),
    height: RFValue(20),
    position: "absolute",
    right: RFValue(50),
    top: 10
  },
  carticon: {
    width: RFValue(23),
    height: RFValue(24),
    position: "absolute",
    right: 0,
    top: 10
  },
  buttonticket: {
    height: RFValue(38),
    width: RFValue(140),
    justifyContent: "center",
    alignItems: "center",
    //borderWidth: 1,
    // marginHorizontal: RFValue(22),
    //borderColor: '#fff',
    borderRadius: 22
    // backgroundColor: "#FFFFFF"
  },
  buttontext: {
    color: Colors.backgroundColor,
    fontSize: RFValue(12),
    fontFamily: FontNames.bold,
    letterSpacing: 0.88,
    paddingTop: Platform.OS === "ios" ? RFValue(7) : 0
  },
  buttonticket2: {
    width: "50%",
    marginTop: RFValue(3),
    height: 67
  },
  buttonticket3: {
    height: 46,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#24242c",
    borderRadius: 22,
    backgroundColor: "#1e1e26"
  },
  button: {
    width: "50%",
    height: 67
  },
  watchicon: { width: RFValue(40), height: RFValue(40) },
  hoticon: { width: RFValue(9), height: RFValue(13), marginRight: RFValue(5) },
  modalheadbar2: {
    position: "absolute",
    bottom: RFValue(-5),
    width: RFValue(47),
    height: RFValue(18)
  },
  addicon: { width: RFValue(40), height: RFValue(40) },
  checkicon: { width: RFValue(40), height: RFValue(40) },
  closeicon: { width: RFValue(20), height: RFValue(20) },
  modalcloseicon: { width: RFValue(22), height: RFValue(22) },
  modalcloseicon2: {
    width: RFValue(17),
    height: RFValue(16),
    alignItems: "center",
    position: "absolute",
    width: 50,
    // backgroundColor: 'red',
    marginTop: RFValue(10)
    //padding: 15,
  },
  fullflex: {
    width: "100%",
    height: "100%"
  },
  avataricon: { width: RFValue(39), height: RFValue(39) },
  carouselhead: {
    flexDirection: "row",
    marginLeft: RFValue(20),
    alignItems: "center"
  },
  flashicon: {
    width: RFValue(18),
    height: RFValue(21),
    //marginLeft: RFValue(10),
    marginRight: RFValue(5)
  },
  flashicon2: {
    width: RFValue(19),
    height: RFValue(23),
    //marginLeft: RFValue(10),
    marginRight: RFValue(5)
  },
  vodicon: {
    width: RFValue(17),
    height: RFValue(17),
    //marginLeft: RFValue(10),
    marginRight: RFValue(5)
  },
  carouselheadtext1: {
    fontSize: RFValue(12),
    letterSpacing: 0.81,
    //opacity: 0.9,
    paddingTop: RFValue(4),
    color: Colors.basewhite,
    fontFamily: FontNames.bold,
    lineHeight: 17
  },
  carouselheadtext4: {
    fontSize: RFValue(17),
    paddingTop: RFValue(4),
    paddingLeft: RFValue(10),
    color: "#fff",
    fontFamily: FontNames.bold
  },
  viewall: {
    width: RFValue(8),
    height: RFValue(12),
    marginLeft: RFValue(7)
  },
  addvertview: { marginTop: RFValue(5), marginBottom: RFValue(10) },
  promodiv: { marginTop: RFValue(20), marginBottom: RFValue(50) },
  promotionshadow: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    width: "100%",
    height: RFValue(113)
  },
  promobanner: {
    width: "100%",
    height: RFValue(370),
    position: "absolute",
    top: RFValue(30)
    //right: RFValue(-10)
  },
  promobanner2: {
    width: "100%",
    height: RFValue(210),
    position: "absolute",
    top: RFValue(30),
    right: RFValue(-145)
  },
  carouselheadtext2: {
    fontSize: RFValue(7),
    opacity: 0.63,
    color: "#60CED1",
    position: "absolute",
    right: RFValue(-50),
    letterSpacing: 1.25,
    bottom: 0,
    fontFamily: "AvenirLTStd-Black"
  },
  carouselheadtext3: {
    fontSize: RFValue(15),
    opacity: 0.63,
    paddingTop: RFValue(5),
    color: "#FFF",
    fontFamily: "AvenirLTStd-Black"
  },
  carouselheadright: {
    position: "absolute",
    right: RFValue(20),
    bottom: -2,
    // alignItems: 'center',
    flexDirection: "row"
  },
  carouselheadrightext: {
    fontSize: RFValue(10),
    letterSpacing: 0.5,
    color: Colors.basewhite,
    fontFamily: "AvenirLTStd-Black",
    lineHeight: 16
  },
  dropdown: {
    width: RFValue(8),
    height: RFValue(5),
    //marginLeft: RFValue(10),
    marginLeft: RFValue(5),
    marginTop: RFValue(5)
  },
  dropdown2: {
    width: RFValue(10),
    height: RFValue(7),
    //marginLeft: RFValue(10),
    marginLeft: RFValue(7),
    marginTop: RFValue(6)
  },
  arrowLeft: {
    position: "absolute",
    width: RFValue(16),
    top: RFValue(50),

    left: RFValue(10),
    zIndex: 100000,
    height: RFValue(30)
  },
  arrowRight: {
    position: "absolute",
    width: RFValue(16),
    top: RFValue(50),

    right: RFValue(10),
    zIndex: 100000,
    height: RFValue(30)
  },
  brarrowLeft: {
    position: "absolute",
    width: RFValue(10),
    top: RFValue(50),

    left: RFValue(10),
    zIndex: 100000,
    height: RFValue(18)
  },
  brarrowRight: {
    position: "absolute",
    width: RFValue(10),
    top: RFValue(50),

    right: RFValue(10),
    zIndex: 100000,
    height: RFValue(18)
  },

  /**Modal Container */
  modalcontainer: {
    position: "relative",
    width: width,
    marginHorizontal: -18,
    height: height,
    //backgroundColor: 'rgba(11,11,13,0.98)',
    backgroundColor: "#0b0b0d",
    opacity: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalhead: {
    paddingVertical: RFValue(30),
    fontFamily: FontNames.bold,
    color: "#454552",
    fontSize: RFValue(16),
    letterSpacing: 1
  },
  modalheadtext: {
    color: "#E8E8E8",
    textAlign: "center",
    // paddingHorizontal: 35,
    fontSize: RFValue(21),
    fontFamily: FontNames.bold
  },
  modalheadtext2: {
    // color: 'red',
    textAlign: "center",
    // paddingHorizontal: 35,
    fontSize: RFValue(22),
    fontFamily: FontNames.bold
  },
  modalheadiv: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalheadbar: {
    alignItems: "center",
    // backgroundColor: 'red',
    marginRight: RFValue(17),
    marginVertical: RFValue(15)
  },
  modalheadbar3: {
    alignItems: "center",
    // backgroundColor: 'red',
    marginRight: RFValue(20),
    marginVertical: RFValue(15)
  },
  modalheadrab: {
    backgroundColor: "#19191e",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  modalmiddle: {
    marginTop: RFValue(30),
    marginHorizontal: RFValue(20)
  },
  castbaseimage: { width: "100%", height: RFValue(167), borderRadius: 12 },
  heroesgenre2: {
    top: RFValue(10),
    marginBottom: RFValue(30),
    width: "70%",
    flexDirection: "row"
  },
  heroecontent: {
    // position: 'relative',
    justifyContent: "flex-end",
    zIndex: 1000000000,
    height: RFValue(80),
    width: "100%",
    overflow: "hidden",
    position: "absolute",
    top: 0
  },
  proceedbtn: {
    width: "100%",
    height: RFValue(60),
    marginTop: RFValue(20),
    marginBottom: RFValue(30),
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
  },
  disabledbtn: {
    width: "100%",
    height: RFValue(60),
    marginTop: RFValue(20),
    marginBottom: RFValue(30),
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.3
  },
  heroesgenre1: {
    marginBottom: RFValue(10),
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  heroegenrediv: {
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: 'red',
    marginRight: RFValue(15)
  },
  dot: {
    borderRadius: 20,
    backgroundColor: "#60ced1",

    width: 5,
    height: 5
  },
  dot2: {
    borderRadius: 20,
    backgroundColor: "#fff",
    marginBottom: 8,
    marginTop: 3,
    width: 5,
    height: 5
  },
  modaldescription: {
    color: "#fff",
    opacity: 0.4,
    fontSize: RFValue(15),
    paddingBottom: RFValue(20),
    lineHeight: 20,
    letterSpacing: 0.2,
    fontFamily: "AvenirLTStd-Medium"
  },
  modaldescription2: {
    color: "#eeeef0",
    textAlign: "center",
    fontSize: 11,
    paddingBottom: RFValue(20),
    lineHeight: 20,
    letterSpacing: 0.42,
    fontFamily: FontNames.regular
  },
  menutext: {
    color: "#52526C",
    fontSize: RFValue(14),
    fontFamily: "AvenirLTStd-Medium",
    paddingHorizontal: 6
    //paddingVertical: 4,
  },
  menuoptions: {
    width: RFValue(100),
    backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: '#red',
    overflow: "hidden",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  viewloader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Styles;
