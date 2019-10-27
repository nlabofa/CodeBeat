import { StyleSheet, Platform, Dimensions } from "react-native";
import { Colors, FontNames } from "../index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { BaseTheme } from ".";

const { width } = Dimensions.get("window");

const Styles = StyleSheet.create({
  header: {
    position: "relative",
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
    height: RFValue(110),
    width: "100%"
  },
  headertext: {
    fontSize: RFValue(23),
    //paddingTop: RFValue(2),
    color: Colors.basewhite,
    fontFamily: FontNames.bold
    // lineHeight: 23,
  },
  expiresin: {
    fontSize: RFValue(13),
    color: "#7d7d89",
    fontFamily: FontNames.bold,
    lineHeight: 18,
    letterSpacing: 1.3
  },
  headertimer: {
    marginLeft: RFValue(20)
  },
  backicon: {
    width: RFValue(26),
    height: RFValue(20),
    padding: RFValue(10)
  },
  headerdiv: {
    flexDirection: "row",
    height: "100%",
    marginTop: RFValue(25),
    alignItems: "center",
    justifyContent: "center"
    //backgroundColor: 'red',
  },
  popup: {
    width: RFValue(63),
    height: RFValue(63),
    position: "absolute",
    zIndex: 1000000,
    right: 0
  },
  rowhead: {
    flexDirection: "row",
    marginTop: RFValue(25),
    justifyContent: "space-between"
  },
  pricetext: {
    fontFamily: FontNames.neue,
    color: "#e1e1e3",
    fontSize: RFValue(26),
    letterSpacing: 1,
    lineHeight: 33
  },
  adtext: {
    fontFamily: FontNames.bold,
    color: "#fff",
    fontSize: RFValue(13)
  },
  adtext2: {
    fontFamily: FontNames.bold,
    color: "#fff",
    fontSize: RFValue(15)
  },
  adtext3: {
    fontFamily: FontNames.bold,
    color: "rgba(140,140,159,0.5)",
    fontSize: RFValue(13)
  },
  adtext4: {
    fontFamily: FontNames.bold,
    color: "rgba(140,140,159,0.5)",
    fontSize: RFValue(13),
    paddingLeft: RFValue(10),
    paddingTop: RFValue(5)
    //textAlign: 'center',
  },
  adtext5: {
    fontFamily: FontNames.bold,
    color: "#fff",
    opacity: 0.38,
    fontSize: RFValue(15),
    paddingLeft: RFValue(10),
    paddingTop: RFValue(5)
    //textAlign: 'center',
  },
  adtext6: {
    fontFamily: FontNames.bold,
    color: "#787879",
    // opacity: 0.38,
    fontSize: RFValue(15),
    paddingLeft: RFValue(3),
    paddingTop: RFValue(5),
    letterSpacing: 1
    //textAlign: 'center',
  },
  adtext7L: {
    fontFamily: FontNames.bold,
    color: "#fff",
    fontSize: RFValue(15),
    paddingTop: RFValue(6)
  },
  adtext7M: {
    position: "absolute",
    fontFamily: FontNames.bold,
    color: "#fff",
    fontSize: RFValue(15),
    paddingTop: RFValue(6)
  },
  adtext7R: {
    fontFamily: FontNames.neue,
    color: "#fff",
    fontSize: RFValue(22),
    letterSpacing: 1
  },
  adtext8: {
    fontFamily: FontNames.medium,
    color: "rgba(140,140,159,0.5)",
    fontSize: RFValue(17),
    textAlign: "center",
    paddingBottom: RFValue(30),
    lineHeight: 25
  },
  bannertop: {
    backgroundColor: "#19191f",
    //opacity: 0.4,
    borderRadius: 12,
    width: "100%",
    flexDirection: "row",
    height: RFValue(54),
    justifyContent: "space-around",
    marginTop: RFValue(20),
    //paddingHorizontal: RFValue(10),
    alignItems: "center"
  },
  stephead: {
    flexDirection: "row",
    alignItems: "center"
    // lineHeight: 23,
  },
  carousel2: {
    height: RFValue(172),
    marginRight: RFValue(10),
    borderRadius: 10
  },
  paginationContainer: {
    //backgroundColor: 'green',
    paddingVertical: RFValue(20)
    // marginLeft: RFPercentage(8),
  },
  paginationDot: {
    width: 26,
    height: 5,
    borderRadius: 4
  },
  inactivedot: {
    width: 10,
    height: 7,
    borderRadius: 4
  },
  ticketbox: {
    height: RFValue(190),
    alignItems: "center",
    // backgroundColor: 'red',
    width: width - 40
  },
  boxhead: {
    fontSize: RFValue(16),
    paddingHorizontal: 15,
    //paddingVertical: 5,
    color: "#fff",
    opacity: 0.83,
    fontFamily: FontNames.bold
    // lineHeight: 23,
  },
  boxhead2: {
    fontSize: RFValue(16),
    //paddingHorizontal: 15,
    paddingBottom: RFValue(5),
    //paddingVertical: 5,
    color: "#fff",
    opacity: 0.43,
    fontFamily: FontNames.bold
    // lineHeight: 23,
  },
  carticon: {
    width: RFValue(42),
    marginRight: RFValue(5),
    height: RFValue(49),
    bottom: -7
  },
  bottomview: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end"
  },
  boxtext: {
    fontFamily: FontNames.bold,
    color: "#60ced1",
    fontSize: RFValue(16)
  },
  topbanner: {
    backgroundColor: "#121215",
    paddingHorizontal: RFValue(20),
    paddingBottom: RFValue(20)
  },
  topbanner2: {
    backgroundColor: "#121215",
    paddingHorizontal: RFValue(20),
    height: RFValue(120),
    justifyContent: "center"
    // paddingBottom: RFValue(40),
  },
  summarydiv: {
    flexDirection: "row",
    //marginBottom: RFValue(10),
    justifyContent: "space-between",
    paddingVertical: RFValue(10),
    alignItems: "center"
    // backgroundColor: 'red',
  },
  pickerdiv: {
    width: 50,
    height: Platform.OS == "android" ? RFValue(130) : null,
    //backgroundColor: 'red',
    overflow: "hidden"
  },
  pickerdiv2: {
    width: 50,
    marginTop: -30,
    height: RFValue(150),
    // backgroundColor: 'red',
    overflow: "hidden"
  },
  pickertext: {
    color: "white",
    fontSize: RFValue(24),
    fontFamily: FontNames.bold
  },
  modalheadposition: {
    position: "absolute",
    top: RFPercentage(35)
  },
  modalhead: {
    color: "#d3d3d3",
    fontSize: RFValue(25),
    fontFamily: FontNames.bold,
    letterSpacing: 0.88,
    paddingTop: RFValue(7)
  },
  modalhead2: {
    color: "#31313c",
    fontSize: RFValue(23),
    fontFamily: FontNames.bold,
    letterSpacing: 0.88,
    paddingTop: RFValue(7)
  },
  foodmodal: { marginRight: RFValue(25), alignItems: "center" },
  modalcontent: {
    position: "absolute",
    top: RFPercentage(45)
  },
  modalcontentdiv: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(25)
  },
  modaltext: {
    color: "#7d7d89",
    fontSize: RFValue(12),
    paddingTop: 4,
    letterSpacing: 1.16,
    fontFamily: "AvenirLTStd-Black",
    paddingLeft: RFValue(10)
  },
  modaltext2: {
    color: "#7d7d89",
    fontSize: RFValue(14),
    paddingBottom: 15,
    letterSpacing: 1.16,
    fontFamily: "AvenirLTStd-Black"
  },
  guestview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: RFValue(15)
    // backgroundColor: 'green',
  },
  guestline: {
    marginHorizontal: RFValue(-20),
    marginBottom: RFValue(20)
  },
  calendartextbody: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 5,
    bottom: 0,
    //backgroundColor: '#242426',
    alignItems: "center",
    justifyContent: "center"
  },
  calendardiv: {
    //position: 'absolute',
    width: RFValue(60),
    height: RFValue(59),
    overflow: "hidden",
    backgroundColor: "#24242C",
    borderRadius: 30,
    marginRight: RFValue(10)
  },
  popcorndiv: {
    //position: 'absolute',
    width: RFValue(58),
    height: RFValue(58)
  },
  hotdog: {
    //position: 'absolute',
    width: RFValue(50),
    marginLeft: RFValue(15),
    height: RFValue(58)
  },
  activetext: {
    color: "#fff",
    opacity: 0.6
  },
  calendarscroller: {
    position: "absolute",
    right: RFValue(-20),
    bottom: RFValue(30),
    width: 20,
    zIndex: 1000000,
    height: 20
  },
  calendarbody: {
    // backgroundColor: 'green',
    width: RFValue(60),
    marginRight: RFValue(10),
    //marginRight: RFValue(10),
    justifyContent: "center"
    //alignItems: 'center',
  },
  foodbody: {
    //backgroundColor: 'green',
    width: RFValue(110),
    marginBottom: RFValue(20)
    //marginRight: RFValue(40),
    //marginRight: RFValue(10),
    //justifyContent: 'center',
    // alignItems: 'center',
  },
  overviewtext2: {
    color: "rgba(255,255,255,0.2)",
    fontSize: RFValue(20),
    fontFamily: FontNames.bold,
    letterSpacing: 1
  },
  watchmoretop: {
    flexDirection: "row",
    //backgroundColor: 'red',
    marginTop: RFValue(100),
    alignItems: "center"
  },
  watchmoretopdiv: {
    width: "88%",
    // backgroundColor: 'red',

    marginRight: RFValue(10)
  },
  watchmoretopleft: {
    fontSize: RFValue(23),
    fontFamily: "AvenirLTStd-Black",
    color: "#d8d8d8",
    lineHeight: RFValue(30)
  },
  watchmoretopright: {
    width: RFValue(202),
    height: RFValue(97),
    borderRadius: 10
  },
  watchmoremiddle: {
    flexDirection: "row",
    marginTop: RFValue(20)
  },
  watchmoremiddleleft: {
    width: "68%",
    // backgroundColor: 'red',

    marginRight: RFValue(10)
  },
  watchmoremiddleleftup: {
    fontSize: 16,
    fontFamily: "AvenirLTStd-Black",
    color: Colors.graywhite,
    marginLeft: RFValue(20)
  },
  watchmoremiddleleftdown: {
    fontSize: RFValue(12),
    fontFamily: "AvenirLTStd-Book",
    paddingVertical: RFValue(30),
    color: Colors.purewhite,
    marginLeft: RFValue(20)
  },
  watchmoremiddleright: {
    width: RFValue(202),
    height: RFValue(97),
    borderRadius: 10
  },
  watchmorebottom: {
    flexDirection: "row",
    //paddingTop: RFValue(40),
    alignItems: "flex-end"
  },
  watchmorebottomdiv: {
    width: "55%",
    // backgroundColor: 'red',

    marginRight: RFValue(10)
  },
  watchmorebottomdivleft: {
    width: RFValue(123),
    marginTop: RFValue(20),
    height: RFValue(30)
  },
  clubhead: {
    position: "absolute",
    left: RFValue(0),
    top: RFValue(40),
    width: RFValue(77),
    height: RFValue(43)
  },
  watchmorebottomdivright: {
    width: RFValue(202),
    height: RFValue(97),
    borderRadius: 10
  },
  voucherinput: {
    flexDirection: "row",
    marginTop: RFValue(30),
    alignItems: "center",
    justifyContent: "space-between"
    // backgroundColor: 'red',
  },
  voucherinputX: {
    borderRadius: 15,
    paddingVertical: RFValue(10)
  },
  linetop: {
    marginHorizontal: RFValue(-20),
    marginTop: RFValue(30)
  },
  itembox: {
    backgroundColor: "#16161a",
    marginBottom: RFValue(25),
    borderRadius: RFValue(9),
    // marginRight: RFValue(15),
    height: RFValue(225),
    flexDirection: "row",
    width: "48%",
    overflow: "hidden"
  },
  itemboximage: {
    // alignItems: "center",
    // backgroundColor: "red",
    height: "50%",
    marginTop: RFValue(20)
  },
  itemboximage2: {
    // alignItems: "center",
    // backgroundColor: "red",
    height: "50%",
    marginLeft: RFPercentage(1),
    marginTop: RFValue(8)
  },
  itembottom: {
    // backgroundColor: "green",
    justifyContent: "flex-end",
    flex: 1
  }
});
export default Styles;
