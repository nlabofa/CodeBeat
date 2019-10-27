import { StyleSheet, Platform } from "react-native";
import { Colors, FontNames } from "../index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

const Styles = StyleSheet.create({
  header: {
    marginTop: RFPercentage(4),
    // backgroundColor: "red",
    paddingVertical: 15,
    // flexDirection: 'row',
    //alignItems: 'center',
    marginHorizontal: RFValue(20)
  },
  header2: {
    marginTop: RFValue(70),
    // flexDirection: 'row',
    alignItems: "center"
    //marginHorizontal: RFValue(20),
  },
  header3: {
    marginTop: RFPercentage(6),
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: RFValue(20),
    // backgroundColor: "red",
    justifyContent: "space-between"
  },
  headertoptext: {
    fontSize: RFValue(24),
    fontFamily: FontNames.neue,
    letterSpacing: 1.1,
    paddingLeft: RFValue(30),
    //lineHeight: 33,
    color: Colors.d3
  },
  headertoprightext: {
    fontSize: RFValue(11),
    fontFamily: FontNames.bold,
    letterSpacing: 2.44,
    paddingRight: RFValue(20),
    paddingLeft: RFValue(30),
    lineHeight: 33,
    color: "#60CED1"
  },
  overview: {
    marginTop: RFValue(10),
    flexDirection: "row",
    borderTopWidth: 0.9,
    borderBottomWidth: 0.9,
    borderColor: "#202025",
    justifyContent: "space-evenly",
    height: RFValue(50),
    // backgroundColor: 'red',
    width: "100%"
  },
  overviewdiv: {
    //backgroundColor: 'green',
    alignItems: "center",
    width: RFValue(100),
    justifyContent: "center"
  },
  overviewdiv2: {
    //backgroundColor: 'green',
    alignItems: "center",
    width: RFValue(80),
    justifyContent: "center"
  },
  adtext7M: {
    position: "absolute",
    fontFamily: FontNames.bold,
    color: Colors.basewhite,
    fontSize: RFValue(15),
    paddingTop: RFValue(6)
  },
  heroeimage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  heroecontent: {
    position: "relative",
    marginTop: RFValue(40)
    // marginHorizontal: RFValue(20),
  },
  // basemovietext: {
  //   width: "85%",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   position: "absolute",
  //   top: RFPercentage(51)
  // },
  basemovietext: {
    width: "85%",
    zIndex: 1000000000,
    // borderColor: "green",
    // borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: RFValue(20)
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
  // heroebottomview: {
  //   position: 'absolute',
  //   top: RFPercentage(66),
  //   flexDirection: 'row',
  // },
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
  overviewtext: {
    color: "#E8E8E8",
    fontSize: RFValue(12),
    paddingTop: RFValue(13),
    paddingVertical: 15,
    fontFamily: FontNames.bold,
    letterSpacing: 1
  },
  overviewtext2: {
    color: "#E8E8E8",
    fontSize: RFValue(12),
    // paddingVertical: 2,
    fontFamily: FontNames.medium,
    letterSpacing: 1
  },
  overviewtext3: {
    fontSize: RFValue(13),
    color: "#E8E8E8",
    paddingTop: Platform.OS === "ios" ? RFValue(6) : RFValue(5),
    fontFamily: FontNames.bold,
    letterSpacing: 1
  },
  cinemabutton: {
    height: 42,
    width: RFValue(105),
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#1b1b20",
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 22
  },
  cinemamode: {
    textAlign: "center",
    fontFamily: FontNames.bold,
    fontSize: RFValue(12),
    paddingTop: RFValue(5),
    paddingRight: RFValue(10),
    color: Colors.basewhite
  },
  cinemamodebg: {
    //textAlign: 'center',
    fontFamily: FontNames.bold,
    fontSize: RFValue(17),
    paddingTop: Platform.OS == "ios" ? RFValue(7) : RFValue(5),
    color: Colors.basewhite
  },
  activebox: {
    width: RFValue(75),
    height: RFValue(35),
    backgroundColor: "#202026",
    borderRadius: 22,
    justifyContent: "center",
    //alignSelf: 'center',
    alignItems: "center"
  },
  cinemamodebg1: {
    textAlign: "center",
    fontFamily: FontNames.bold,
    fontSize: RFValue(17),
    paddingRight: RFValue(12),
    paddingLeft: RFValue(10),
    // paddingTop: RFValue(1),
    color: "#333338"
  },
  cinemamodeimax: {
    fontSize: RFValue(17),
    // paddingLeft: RFValue(20),
    paddingLeft: RFValue(5),
    textAlign: "center",
    fontFamily: FontNames.bold,
    paddingTop: RFValue(5),
    paddingRight: RFValue(15),
    color: "#333338"
  },
  activemodeimax: {
    // backgroundColor: '#fff',
    color: Colors.backgroundColor,
    paddingLeft: RFValue(10)

    //borderRadius: 20,
    //paddingTop: 10,
    //paddingBottom: 5,
    //textAlign: 'center',
    //paddingRight: 10,
    //paddingLeft: 10,
    //marginLeft: RFValue(5),
  },
  activemode: {
    // backgroundColor: '#fff',
    color: "#000"
    //borderRadius: 20,
    //paddingTop: 10,
    //paddingBottom: 5,
    //paddingHorizontal: 15,
  },
  timepill: {
    position: "absolute",
    top: 2,
    left: 55,
    width: 72,
    height: 38
  },
  timepill2: {
    position: "absolute",
    top: 2,
    left: 60,
    width: 72,
    height: 38
  },
  timepill3: {
    position: "absolute",
    top: 7,
    left: 65,
    width: 72,
    height: 38
  },
  showtimes: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: "red",
    flexWrap: "wrap"
  },
  showbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //borderWidth: 1,
    //borderColor: 'red',
    // width: "50%",
    //backgroundColor: 'green',
    // overflow: 'hidden',
    paddingVertical: RFValue(15),
    marginHorizontal: RFValue(5)
  },
  threedicon: {
    width: RFValue(25),
    height: RFValue(16),
    marginRight: RFValue(6)
  },
  imaxicon: {
    width: RFValue(38),
    height: RFValue(10),
    marginRight: RFValue(4)
    //marginRight: RFValue(3),
  },
  calendartextbody: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  calendardiv: {
    //position: 'absolute',
    width: RFValue(67),
    height: RFValue(80)
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
    //backgroundColor: 'green',
    //marginRight: RFValue(10),
    justifyContent: "center",
    alignItems: "center"
  },
  headerbottom: {
    flexDirection: "row",
    marginLeft: RFValue(30),
    marginTop: RFValue(5)
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
    fontFamily: FontNames.bold,
    color: Colors.basewhite,
    fontSize: RFValue(15)
    //lineHeight: 22,
  },
  headerbottomtext3: {
    fontFamily: FontNames.bold,
    top: RFPercentage(5),
    color: "#60ced1",
    position: "absolute",
    right: RFValue(20),
    // marginRight: RFValue(20),
    fontSize: RFValue(13)
    //lineHeight: 22,
  },
  rowhead: {
    // flexDirection: "row",
    // // backgroundColor: "red",
    // justifyContent: "flex-start",
    // width: "100%",
    // alignItems: "center",

    zIndex: 1000000000,
    height: RFValue(80),
    width: "100%",
    overflow: "hidden",
    position: "absolute",
    top: 0
  },
  carousel2: {
    height: RFValue(192),
    marginRight: RFValue(10),
    borderRadius: 10
  },
  //   heroetext: {
  //     color: '#fff',
  //     fontSize: 9,
  //     fontFamily: 'AvenirLTStd-Black',
  //     paddingRight: RFValue(25),
  //   },
  descriptiondiv: {
    width: "80%",
    // backgroundColor: 'red',
    justifyContent: "center"
  },
  bottomcontent: {
    // backgroundColor: 'red',
    marginHorizontal: RFValue(20),
    marginTop: RFValue(80)
  },
  bottomcontent2: {
    // backgroundColor: 'red',
    marginHorizontal: RFValue(20),
    marginTop: RFValue(20)
  },
  carouselModal: {
    height: RFValue(200),
    width: RFValue(145),
    // backgroundColor: 'green',
    // marginRight: RFValue(10),
    borderRadius: 10
  },
  carouselModal2: {
    height: RFValue(124),
    width: RFValue(90),
    // backgroundColor: 'green',
    marginRight: RFValue(10),
    borderRadius: 10
  },
  movielisting: {
    flexDirection: "row",
    marginTop: RFValue(30),
    // backgroundColor: 'red',
    justifyContent: "space-between",
    flex: 1,
    marginHorizontal: RFValue(20),
    flexWrap: "wrap"
  },
  modalcastdiv: { paddingTop: RFValue(10), paddingBottom: RFValue(15) },
  modalcastext: {
    color: "#fff",
    fontSize: RFValue(10),
    lineHeight: 15,
    paddingRight: RFValue(10),

    fontFamily: FontNames.regular
  },
  allmovies: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalcastext2: {
    color: "#fafafa",
    fontSize: RFValue(13),
    paddingRight: RFValue(10),

    lineHeight: 18,
    fontFamily: "AvenirLTStd-Black"
  },
  loadingtext: {
    fontSize: RFValue(15),
    color: Colors.basewhite,
    textAlign: "center",
    paddingVertical: 30,
    fontFamily: FontNames.bold,
    letterSpacing: 1
  },
  loadingtext2: {
    fontSize: RFValue(15),
    color: Colors.basewhite,
    opacity: 0.6,
    textAlign: "center",
    paddingVertical: 0,
    fontFamily: FontNames.regular,
    letterSpacing: 1
  },
  activityindicator: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: RFValue(15)
  },
  locationhead: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: RFValue(30),
    marginBottom: RFValue(20)
  }
});
export default Styles;
