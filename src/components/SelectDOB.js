/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";

import { View, Image, Text, TouchableOpacity, Platform } from "react-native";
import {
  BaseTheme,
  landingStyle as styles
} from "../shared/Themes/styles/index";
import DateModal from "./DateModal";
import { Images, Colors, FontNames } from "../shared/Themes/index";
import { DATE, MONTH } from "../screens/Home/Entries";
import Modal from "react-native-modal";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import Entypo from "react-native-vector-icons/Entypo";
import Moment from "moment";
import { extendMoment } from "moment-range";
import Button from "./Button";

const moment = extendMoment(Moment);
class SelectDOB extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.props.switchState("genre");
    }
  }
  state = {
    modalvisible: false,
    activedate: moment().format("DD"),
    activemonth: moment()
      .format("MMMM")
      .toUpperCase(),
    activemonthindex: moment().format("MM"),
    activeyear: moment().format("YYYY"),
    active: "date"
  };
  modalDismissed = () => {
    this.setState({ modalvisible: false });
  };
  setDateVal = val => {
    this.setState({ activedate: val }, () => this.modalDismissed());
  };
  setYearval = val => {
    this.setState({ activeyear: val }, () => this.modalDismissed());
  };
  setMonthVal = (val, index) => {
    this.setState({ activemonth: val, activemonthindex: index }, () =>
      this.modalDismissed()
    );
  };
  doAction = () => {
    const userdata = {
      dateOfBirth:
        this.state.activeyear +
        "-" +
        this.state.activemonthindex +
        "-" +
        this.state.activedate
    };
    this.props.updateUserProfile(userdata);
  };
  formatRange = () => {
    const range = moment.range(moment().subtract(99, "year"), moment());
    const range2 = Array.from(range.by("year")).reverse();
    var result = range2.map(date => ({
      year: date.format("YYYY")
      // month: moment(date).isSame(moment(), "day")
      //   ? "TODAY"
      //   : date.format("MMM").toUpperCase(),
      // date: date.format("DD").toUpperCase(),
      // fulldate: date
    }));
    return result;
  };
  render() {
    return (
      <View
        style={[
          {
            marginTop: RFPercentage(25),
            height: "100%",
            marginHorizontal: RFValue(20)
          }
        ]}
      >
        <Modal
          isVisible={this.state.modalvisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={1}
          backdropColor={"#0b0b0d"}
          animationInTiming={400}
          animationOutTiming={600}
          backdropTransitionOutTiming={0}
          onBackdropPress={() => this.modalDismissed()}
          onBackButtonPress={() => this.modalDismissed()}
          // swipeDirection="up"
        >
          {this.state.active == "date" ? (
            <DateModal
              date={DATE}
              setDateVal={this.setDateVal}
              activedate={this.state.activedate}
              modalDismissed={this.modalDismissed}
            />
          ) : this.state.active == "month" ? (
            <DateModal
              date={MONTH}
              setMonthVal={this.setMonthVal}
              activemonth={this.state.activemonth}
              activemonthindex={this.state.activemonthindex}
              modalDismissed={this.modalDismissed}
            />
          ) : this.state.active == "year" ? (
            <DateModal
              date={this.formatRange()}
              setYearVal={this.setYearval}
              activeyear={this.state.activeyear}
              modalDismissed={this.modalDismissed}
            />
          ) : null}
        </Modal>
        <Image
          source={require("../assets/image/barestrip2.png")}
          style={styles.getstartedstrip}
        />
        <Text style={styles.dobhead}>Enter your date of birth</Text>
        <Text style={styles.dobody}>
          This will help us recommend the movies you will love
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ active: "date", modalvisible: true });
            }}
            style={styles.datebox}
          >
            <Text style={styles.dateboxtext}>{this.state.activedate}</Text>
            <Entypo
              name="chevron-down"
              size={15}
              color="#7d7d89"
              style={{ marginLeft: 6, paddingTop: RFValue(4) }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ active: "month", modalvisible: true });
            }}
            style={[styles.datebox, { width: "40%" }]}
          >
            <Text style={styles.dateboxtext}>{this.state.activemonth}</Text>
            <Entypo
              name="chevron-down"
              size={15}
              color="#7d7d89"
              style={{ marginLeft: 6, paddingTop: RFValue(4) }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ active: "year", modalvisible: true });
            }}
            style={[styles.datebox, { width: "30%" }]}
          >
            <Text style={styles.dateboxtext}>{this.state.activeyear}</Text>
            <Entypo
              name="chevron-down"
              size={15}
              color="#7d7d89"
              style={{ marginLeft: 6, paddingTop: RFValue(4) }}
            />
          </TouchableOpacity>
        </View>

        <Button
          formIsValid={true}
          onPress={() => this.doAction()}
          customstyle={styles.datebtn}
          loading={this.props.loading}
        />
      </View>
    );
  }
}

export default SelectDOB;
