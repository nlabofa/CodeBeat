import { StyleSheet, Platform } from "react-native";
import { Colors, FontNames } from "../index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

const Styles = StyleSheet.create({
  heroeimage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  itembox: {
    width: "48%",
    marginBottom: RFValue(20),
    borderRadius: 10,
    height: RFValue(154)
  },
  itembox2: {
    width: "45%",
    marginBottom: RFValue(20),
    borderRadius: 10,
    height: RFValue(194)
  },
  heroecontent: {
    position: "relative",
    marginTop: RFValue(40)
    // marginHorizontal: RFValue(20),
  },
  expirehead: {
    marginTop: RFValue(40),
    fontSize: RFValue(28),
    width: "70%",
    textAlign: "center",
    color: Colors.basewhite,
    fontFamily: FontNames.bold
  },
  expirebody: {
    marginTop: RFValue(20),
    marginBottom: RFValue(40),
    fontSize: RFValue(22),
    width: "70%",
    lineHeight: RFValue(27),
    textAlign: "center",
    color: "#7D7D89",
    fontFamily: FontNames.medium
  },
  headertext: {
    fontSize: RFValue(23),
    paddingTop: RFValue(8),
    color: Colors.basewhite,
    fontFamily: FontNames.bold
    // lineHeight: 23,
  },
  basemovietext: {
    width: "85%",
    zIndex: 1000000000,
    // borderColor: "green",
    // borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute"
  },
  heroesgenre: {
    // position: "absolute",
    // top: RFPercentage(62),
    flexDirection: "row"
  },
  heroetext: {
    color: "#C3C3C9",
    fontSize: 11,
    paddingTop: 4,
    fontFamily: "AvenirLTStd-Black",
    paddingRight: RFValue(10)
  },
  heroetext2: {
    color: "#fff",
    opacity: 0.7,
    fontSize: 9,
    fontFamily: "AvenirLTStd-Black",
    paddingRight: RFValue(25)
  },
  heroedescription: {
    position: "absolute",
    top: RFPercentage(35),
    width: "90%",
    flexDirection: "row"
  },
  heroedescriptiontext: {
    color: "#fff",
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.2,
    fontFamily: "AvenirLTStd-Medium",
    paddingRight: RFValue(25)
  },
  heroebuttonview: {
    position: "absolute",
    top: RFPercentage(45),
    width: "100%",
    //backgroundColor: 'red',
    justifyContent: "space-between",
    flexDirection: "row"
  },
  modalbuttonview: {
    top: RFValue(30),
    marginHorizontal: RFValue(20),
    width: "90%",
    //backgroundColor: 'red',
    //backgroundColor: 'red',
    justifyContent: "space-around",
    flexDirection: "row"
  },
  modalbottomview: {
    marginTop: RFValue(40),
    width: "90%",
    marginLeft: RFValue(20),
    paddingBottom: RFValue(20),
    flexDirection: "row"
  },
  heroebottomview: {
    // position: "absolute",
    //top: RFPercentage(67),
    // marginLeft: RFValue(15),
    //backgroundColor: "red",
    marginTop: RFValue(17),
    zIndex: 100000000,
    flex: 1,
    width: "100%",
    //marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  linebottom: {
    width: "100%",
    marginTop: RFValue(-28),
    flexDirection: "row"
  },
  linetop: {
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    top: RFValue(18)
  },
  merchandise: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  merchandiseimg: {
    width: "90%",
    borderRadius: 20,
    height: RFValue(111)
  },
  heroewatch: {
    position: "absolute",
    left: RFValue(30),
    top: RFValue(2.5),
    zIndex: 1000000000,
    alignItems: "center"
  },
  heroewatch2: {
    position: "absolute",
    right: RFValue(32),
    zIndex: 1000000000,
    top: RFValue(1),
    alignItems: "center"
  },
  watchtext: {
    color: "#fff",
    fontSize: RFValue(8),
    paddingTop: RFValue(8),
    fontFamily: "AvenirLTStd-Black",
    letterSpacing: 0.3
  },
  paginationContainer: {
    //backgroundColor: 'green',
    paddingVertical: RFValue(20)
    // marginLeft: RFPercentage(8),
  },
  paginationContainer2: {
    //backgroundColor: 'green',
    marginVertical: -15
    //paddingVertical: RFValue(-5),
    // marginLeft: RFPercentage(8),
  },
  paginationDot: {
    width: 24,
    height: 4,
    borderRadius: 4
  },
  inactivedot: {
    width: 13,
    height: 5,
    borderRadius: 4
  },
  carousel1: {
    height: RFValue(136),
    borderRadius: 10
  },
  infodiv: {
    //marginBottom: RFValue(15),

    // backgroundColor: "red",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  imgbtn: {
    width: "100%",
    height: "100%",
    zIndex: -1000000
  },
  platText: {
    paddingTop: RFValue(15),
    paddingBottom: RFValue(5),
    color: "#7D7D89",
    textAlign: "center",
    fontFamily: FontNames.medium,
    fontSize: RFValue(13),
    letterSpacing: 0.28
  },
  igrtext: {
    top: RFValue(13),
    zIndex: 1000000,

    color: "#0b0b0d",
    textAlign: "center",
    fontSize: RFValue(13),
    fontFamily: FontNames.bold
  },
  igrtext2: {
    //  top: RFValue(13),
    zIndex: 1000000,

    color: "#585866",
    textAlign: "center",
    letterSpacing: 0.38,
    fontSize: RFValue(12),
    fontFamily: FontNames.bold
  },
  carousel2: {
    height: RFValue(194),
    width: RFValue(130),
    marginRight: RFValue(10),
    borderRadius: 10
  },
  carousel3: {
    height: RFValue(194),
    width: "44%",
    marginBottom: RFValue(20),
    marginRight: RFValue(10),
    borderRadius: 10
  },
  carouselhead: {
    flexDirection: "row",
    // backgroundColor: 'red',
    paddingVertical: 10,
    alignItems: "center",
    zIndex: 100000000000
  },
  carouselModal: {
    height: RFValue(114),
    backgroundColor: "green",
    marginRight: RFValue(10),
    borderRadius: 10
  },
  clublogo: {
    width: RFValue(95),
    height: RFValue(50),
    marginLeft: RFValue(28),
    marginTop: RFValue(25)
    //position:'absolute',
    //left:0,top:0
  },
  modalcastdiv: { paddingTop: RFValue(10), paddingBottom: RFValue(15) },
  modalcastext: {
    color: "#fff",
    fontSize: RFValue(10),
    lineHeight: 13,
    paddingRight: RFValue(10),

    fontFamily: "AvenirLTStd-Book"
  },
  modalcastext2: {
    color: "#fff",
    fontSize: RFValue(10),
    paddingRight: RFValue(10),

    lineHeight: 13,
    fontFamily: "AvenirLTStd-Black"
  },
  carousel6: {
    height: RFValue(290),
    width: RFValue(130),
    marginRight: RFValue(10),
    borderRadius: 10
  },
  carousel5: {
    height: RFValue(113)
  },
  watchmoretop: {
    flexDirection: "row",
    marginTop: RFValue(40),
    alignItems: "center"
  },
  watchmoretopdiv: {
    width: "88%",
    // backgroundColor: 'red',

    marginRight: RFValue(10)
  },
  watchmoretopleft: {
    fontSize: 28,
    fontFamily: "AvenirLTStd-Black",
    color: "#fff",
    lineHeight: RFValue(30),
    marginLeft: RFValue(20)
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
    marginLeft: RFValue(20),
    width: RFValue(163),
    height: RFValue(51)
  },
  watchmorebottomdivright: {
    width: RFValue(202),
    height: RFValue(97),
    borderRadius: 10
  },

  /**Side Drawer styling */

  sideDrawercloseicon: {
    marginTop: RFValue(50),
    alignItems: "flex-end"
  },
  drawertop: {
    flexDirection: "row",
    // backgroundColor: 'red',
    alignItems: "center",
    marginTop: RFValue(25),
    marginBottom: RFValue(40)
  },
  drawerusertext: {
    fontSize: RFValue(18),
    fontFamily: "AvenirLTStd-Medium",
    paddingLeft: RFValue(10),
    color: Colors.transparentwhite
  },
  drawerfilmhouse: {
    flexDirection: "row",
    //backgroundColor: "red",
    marginLeft: RFValue(20),
    alignItems: "flex-start"
  },
  drawertext: {
    fontSize: RFValue(18),
    fontFamily: "AvenirLTStd-Medium",
    paddingLeft: RFValue(15),
    color: Colors.graywhite
  },
  drawertext2: {
    fontSize: RFValue(13),
    fontFamily: "AvenirLTStd-Medium",
    letterSpacing: 0.17,
    paddingVertical: 10,
    paddingLeft: RFValue(15),
    color: Colors.graywhite
  },
  drawertext3: {
    fontSize: RFValue(13),
    fontFamily: "AvenirLTStd-Black",
    letterSpacing: 0.17,
    paddingVertical: 10,
    paddingLeft: RFValue(15),
    color: Colors.graywhite
  },
  draweritem: {
    flexDirection: "row",
    // backgroundColor: 'red',
    marginLeft: RFValue(35),
    marginTop: RFValue(40),
    alignItems: "center"
  },
  sidebarbottom: {
    marginTop: RFValue(40),
    marginBottom: RFValue(50)
  },
  sidebarbottomdiv: { marginHorizontal: RFValue(20), marginTop: RFValue(20) },

  /**Modal Container styling */
  modalcloseicon: {
    //backgroundColor: "green"
    marginRight: RFValue(5)
  },
  adtext7Li: {
    fontFamily: FontNames.bold,
    color: "#fff",
    textAlign: "center",
    fontSize: RFValue(11),
    paddingTop: Platform.OS == "ios" ? RFValue(5) : 0
  },
  carticon: {
    backgroundColor: "#BE1C43",
    position: "absolute",
    right: -10,
    top: RFValue(3),
    borderRadius: 25,

    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: RFValue(20),
    height: RFValue(18)
  },

  /**Menu Dropdown style */
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
  webviewmodal: {
    margin: 0,
    width: "100%",
    height: "100%"
  },
  webviewheader: {
    height: RFValue(70),
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginHorizontal: RFValue(10),
    flexDirection: "row",
    marginBottom: RFValue(10),
    backgroundColor: Colors.backgroundColor
  },
  webviewclose: {
    width: RFValue(15),
    height: RFValue(15),
    marginBottom: RFValue(10)
  },
  webviewbody: {
    marginLeft: RFValue(15),
    width: "90%"
  },
  webviewup: {
    color: "#fff",
    fontSize: RFValue(16),
    fontFamily: FontNames.bold
  },
  webviewbottom: {
    color: "#fff",
    fontSize: RFValue(12),
    fontFamily: FontNames.bold
  },
  webviewloader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  /**DOB style */
  dobhead: {
    // marginTop: RFValue(40),
    fontSize: RFValue(36),
    width: "80%",
    textAlign: "left",
    color: Colors.basewhite,
    fontFamily: FontNames.bold
  },
  dobhead2: {
    // marginTop: RFValue(40),
    fontSize: RFValue(17),
    textAlign: "center",
    color: Colors.basewhite,
    fontFamily: FontNames.bold
  },
  genrebottom: {
    flex: 1,
    position: "absolute",
    bottom: 10,
    width: "100%",
    zIndex: 1000000000,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 100
  },
  checkbox: { width: 17, height: 17, position: "absolute", bottom: -20 },
  checkbox2: {
    width: 20,
    height: 20,
    position: "absolute",
    top: RFPercentage(15),
    bottom: 0,
    left: RFPercentage(9),
    right: 0
  },
  dobody: {
    marginTop: RFValue(20),
    marginBottom: RFValue(40),
    fontSize: RFValue(16),
    width: "75%",
    lineHeight: RFValue(20),
    color: "#FFF",
    opacity: 0.52,
    fontFamily: FontNames.bold
  },
  datebox: {
    borderRadius: 8,
    backgroundColor: "#16161a",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "center",
    width: "20%",
    marginRight: RFValue(15),
    height: RFValue(48)
  },
  dateboxtext: {
    color: "#fff",
    fontSize: 16,
    paddingTop: Platform.OS == "ios" ? RFValue(7) : null,
    fontFamily: FontNames.bold
  },
  getstartedstrip: {
    resizeMode: "contain",
    position: "absolute",
    right: -85,
    top: -10,
    width: RFValue(196),
    height: RFValue(290)
  },
  datebtn: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    width: "100%"
  },
  datebtn2: {
    position: "absolute",
    top: 0,
    flex: 1,
    width: "100%"
  }
});

export default Styles;
