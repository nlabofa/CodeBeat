/* eslint-disable react-native/no-inline-styles */
import React from "react";

import { View, Image, Text, TouchableOpacity } from "react-native";
import {
  BaseTheme,
  landingStyle as styles
} from "../shared/Themes/styles/index";
import { Images, Colors, FontNames } from "../shared/Themes/index";
import { RFValue } from "react-native-responsive-fontsize";

const TicketExpired = props => {
  return (
    <View style={BaseTheme.modalcontainer}>
      <TouchableOpacity style={styles.modalcloseicon}>
        <Image
          source={require("../assets/image/icon/ticketexpired.png")}
          style={{ width: RFValue(89), height: RFValue(78) }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.expirehead}>The tickets has been expired</Text>
      <Text style={styles.expirebody}>
        The tickets are expired. Click below to start the booking again
      </Text>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={[BaseTheme.buttonticket, { backgroundColor: "#fff" }]}
          onPress={() => {
            props.modalDismissed();
            props.navigation.navigate("TicketStep1");
          }}
        >
          <Text style={BaseTheme.buttontext}>BOOK AGAIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TicketExpired;
