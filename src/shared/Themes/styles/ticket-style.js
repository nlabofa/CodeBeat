import { StyleSheet, Platform } from "react-native";
import { Colors, FontNames } from "../index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

const Styles = StyleSheet.create({
  header: {
    position: "relative",
    justifyContent: "center",
    height: RFValue(110),
    borderBottomColor: "rgba(95,95,109,0.33)",
    borderBottomWidth: 1,
    width: "100%",
    backgroundColor: Colors.backgroundColor
  },
  triangle: {
    width: 30,
    marginTop: RFValue(10),
    marginLeft: RFValue(15),

    zIndex: 1000000000,

    height: 30
  },
  rowhead2: {
    flexDirection: "row",
    marginTop: RFValue(10),
    // borderBottomColor: "rgba(95,95,109,0.33)",
    // borderBottomWidth: 1,
    height: RFValue(70),
    //backgroundColor: "red",
    marginBottom: RFValue(10)
  },
  rowhead3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: RFValue(30),
    // backgroundColor: "red",
    height: RFValue(70),
    marginBottom: RFValue(10)
  },
  rowhead4: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: RFValue(20),
    backgroundColor: "#24242c",
    // marginTop: RFValue(30),
    // backgroundColor: "red",
    height: RFValue(140),
    marginBottom: RFValue(10)
  },
  closeicon: {
    position: "absolute",
    top: RFPercentage(4.5),
    left: RFValue(20)
    //marginHorizontal: RFValue(20)
  },
  headerbottomtext: {
    fontFamily: FontNames.bold,
    top: RFPercentage(5),
    zIndex: -100,
    textAlign: "center",
    position: "absolute",
    left: 0,
    right: 0,
    //backgroundColor: "red",
    color: Colors.basewhite,
    fontSize: RFValue(20)
    //lineHeight: 22,
  },
  headerbottomtext2: {
    fontFamily: FontNames.medium,
    paddingLeft: RFValue(20),
    color: Colors.purewhite,
    fontSize: RFValue(25)
    //lineHeight: 22,
  },
  headerbottomtext3: {
    marginTop: RFValue(-20),
    fontFamily: FontNames.medium,
    paddingLeft: RFPercentage(10.5),
    color: Colors.basewhite,
    fontSize: RFValue(15)
    //lineHeight: 22,
  },
  headerbottomtext4: {
    marginTop: RFPercentage(-9),
    fontFamily: FontNames.medium,
    paddingLeft: RFPercentage(13.5),
    color: Colors.basewhite,
    width: "95%",
    lineHeight: 17,
    fontSize: RFValue(15)
    //lineHeight: 22,
  },
  payIdhead: {
    color: Colors.basewhite,
    fontSize: RFValue(15),
    fontFamily: FontNames.bold
  },
  payIdbottom: {
    paddingTop: RFValue(10),
    color: Colors.basewhite,
    fontSize: RFValue(16),
    fontFamily: FontNames.bold
  },
  summarybig: {
    fontFamily: FontNames.bold,
    textAlign: "center",
    color: Colors.purewhite,
    opacity: 0.63,
    fontSize: RFValue(23),
    marginTop: RFPercentage(10)
  },
  paystack: {
    textAlign: "center",
    fontFamily: FontNames.regular,
    color: Colors.basewhite,
    fontSize: RFValue(17)
  },
  summarysmall: {
    width: "60%",
    fontFamily: FontNames.medium,
    textAlign: "center",
    color: Colors.purewhite,
    opacity: 0.46,
    fontSize: RFValue(17),
    marginTop: RFPercentage(2)
  },
  emptydiv: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headertext: {
    fontSize: RFValue(20),
    textAlign: "center",
    //paddingTop: RFValue(2),
    color: Colors.basewhite,
    fontFamily: FontNames.bold
    // lineHeight: 23,
  },
  linefade: {
    marginHorizontal: RFValue(-20),
    marginTop: RFValue(-18),
    borderTopWidth: 0.9,
    borderBottomWidth: 0.9,
    borderColor: "#202025"
  },
  expiresin: {
    fontSize: RFValue(11),
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
  backicon2: {
    width: RFValue(26),
    height: RFValue(20),
    padding: RFValue(10)
  },
  headerdiv: {
    marginHorizontal: RFValue(20),
    flexDirection: "row",
    paddingBottom: RFValue(15),
    height: "100%",
    marginTop: RFValue(25),
    alignItems: "center",
    justifyContent: "space-between"
    //backgroundColor: 'red',
  },
  popup: {
    width: RFValue(63),
    height: RFValue(63),
    position: "absolute",
    zIndex: 1000000,
    right: 0
  },
  titlerow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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
    color: Colors.basewhite,
    fontSize: RFValue(15)
  },
  adtext3: {
    fontFamily: FontNames.bold,
    color: "rgba(140,140,159,0.5)",
    fontSize: RFValue(13)
  },
  adtext4: {
    textAlign: "center",
    fontFamily: FontNames.bold,
    color: "rgba(140,140,159,0.5)",
    fontSize: RFValue(13),
    //paddingLeft: RFValue(10),
    paddingTop: RFValue(5)
    //textAlign: 'center',
  },
  adtext5: {
    fontFamily: FontNames.bold,
    color: Colors.basewhite,
    opacity: 0.38,
    fontSize: RFValue(15),
    //paddingLeft: RFValue(10),
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
    color: "#7d7d89",
    fontSize: RFValue(15),
    paddingTop: RFValue(6)
  },
  adtext7Li: {
    fontFamily: FontNames.bold,
    color: "#fff",
    textAlign: "center",
    fontSize: RFValue(11),
    paddingTop: Platform.OS=='ios'? RFValue(6):0
  },
  carticon: {
    backgroundColor: "#232329",
    borderRadius: 25,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: 'center',
    alignSelf: 'center',
    alignContent:'center',
    width: RFValue(30),
    height: RFValue(28)
  },
  adtext7M: {
    position: "absolute",
    fontFamily: FontNames.bold,
    color: Colors.basewhite,
    fontSize: RFValue(15),
    paddingTop: RFValue(6)
  },
  adtext7R: {
    fontFamily: FontNames.bold,
    color: "#7d7d89",
    fontSize: RFValue(13),
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
    fontSize: RFValue(16),
    paddingVertical: 10,
    color: Colors.basewhite,
    fontFamily: FontNames.bold
    // lineHeight: 23,
  },
  stephead2: {
    fontSize: RFValue(16),
    paddingVertical: 10,
    position: "absolute",
    width: "40%",
    left: RFPercentage(18),
    lineHeight: 23,
    right: 0,
    color: Colors.basewhite,
    fontFamily: FontNames.bold
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
    backgroundColor: "#121215",
    borderRadius: RFValue(12),
    height: RFValue(159),
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(10),
    // marginRight: RFValue(25),
    width: RFValue(233)
    //  marginRight: RFValue(20),
  },
  boxhead: {
    fontSize: RFValue(20),
    textAlign: "left",
    //paddingVertical: 5,
    color: "#fff",
    opacity: 0.83,
    fontFamily: FontNames.bold
    // lineHeight: 23,
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
    paddingVertical: RFValue(18),
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
    backgroundColor: "#151519",
    borderRadius: 35,
    marginLeft: RFValue(5)
  },
  popcorndiv: {
    //position: 'absolute',
    width: RFValue(58),
    height: RFValue(58)
  },
  hotdog: {
    //position: 'absolute',
    width: RFValue(50),
    //marginLeft: RFValue(15),
    height: RFValue(58)
  },
  activetext: {
    color: "#fff",
    opacity: 0.27
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
    width: RFValue(70),
    marginRight: RFValue(10),
    //marginRight: RFValue(10),
    justifyContent: "center"
    //alignItems: 'center',
  },
  foodbody: {
    backgroundColor: "#151519",
    borderRadius: 12,
    //borderRightColor: 'red',
    //borderRightWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    width: RFValue(108),
    marginRight: RFValue(10),
    height: RFValue(105),
    marginBottom: RFValue(20)
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
  voucherinput2: {
    flexDirection: "row",
    marginTop: RFValue(60),
    marginHorizontal: RFValue(20),
    alignItems: "center",
    justifyContent: "space-between"
    // backgroundColor: 'red',
  },
  voucherinputX: {
    borderRadius: 15,
    paddingVertical: RFValue(10)
  },
  voucherinputM: {
    borderRadius: 12,
    borderColor: "#24242c",
    borderWidth: 2,
    paddingVertical: RFValue(10)
  },
  linetop: {
    marginHorizontal: RFValue(-20),
    marginTop: RFValue(30)
  },
  linetop2: {
    marginHorizontal: RFValue(-20),
    marginTop: RFValue(-15)
  }
});
export default Styles;
