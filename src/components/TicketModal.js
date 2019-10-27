/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
import React from "react";

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import {
  BaseTheme,
  landingStyle as styles,
  ticketStyle
} from "../shared/Themes/styles/index";
import { Images, Colors, FontNames } from "../shared/Themes/index";
import { RFValue } from "react-native-responsive-fontsize";
import moment from "moment";

/**
 * This is strictly a presentational component. The listed props below are the allowed props
 *
 **@prop   navigation. This props handles routing
 ** @prop   navbar. if this props is defined, we only want topmost navigation bar
 ** @prop   toggleList. This handles toggle for adding Heroe Movie to list
 ** @prop  addedToList. This is a boolean that checks if Movie is added to list or not
 */
const TicketModal = ({
  activemovie,
  ticketPrice,
  moviedetail,
  modalDismissed
}) => {
  return (
    <View style={[BaseTheme.modalcontainer]}>
      <TouchableOpacity
        onPress={() => modalDismissed()}
        style={styles.modalcloseicon}
      >
        <Image
          source={Images.closeicon}
          style={BaseTheme.modalcloseicon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={{ width: "100%", marginTop: RFValue(20) }}>
        <View>
          <View style={styles.heroeimage}>
            <Image
              style={BaseTheme.heroebanner}
              source={{ uri: activemovie.posterImage }}
              resizeMode="cover"
            />
          </View>
          <ImageBackground
            style={BaseTheme.heroebanner}
            source={Images.ticketmask}
            resizeMode="cover"
          >
            <View style={styles.heroecontent}>
              <View style={BaseTheme.barecenter}>
                <View style={ticketStyle.modalheadposition}>
                  <Text numberOfLines={1} style={ticketStyle.modalhead}>
                    {activemovie.title}
                  </Text>
                </View>
                <View style={ticketStyle.modalcontent}>
                  <View style={ticketStyle.modalcontentdiv}>
                    <Image
                      style={BaseTheme.heroebanner}
                      source={require("../assets/image/icon/mapicon.png")}
                      resizeMode="contain"
                      style={{ width: RFValue(19), height: RFValue(24) }}
                    />
                    <Text style={ticketStyle.modaltext}>
                      {moviedetail.cinemaName.toUpperCase()}
                    </Text>
                  </View>

                  <View style={ticketStyle.modalcontentdiv}>
                    <Image
                      style={BaseTheme.heroebanner}
                      source={require("../assets/image/icon/calendaricon.png")}
                      resizeMode="contain"
                      style={{ width: RFValue(24), height: RFValue(21) }}
                    />
                    <Text style={ticketStyle.modaltext}>
                      {moment(moviedetail.showtime)
                        .format("ddd. DD MMM")
                        .toUpperCase()}
                    </Text>
                  </View>
                  <View style={ticketStyle.modalcontentdiv}>
                    <Image
                      style={BaseTheme.heroebanner}
                      source={require("../assets/image/icon/ticketicon.png")}
                      resizeMode="contain"
                      style={{ width: RFValue(24), height: RFValue(21) }}
                    />
                    <Text style={ticketStyle.modaltext}>
                      {"\u20A6"}
                      {ticketPrice} / TICKET
                    </Text>
                  </View>
                  <View style={ticketStyle.modalcontentdiv}>
                    <Image
                      style={BaseTheme.heroebanner}
                      source={require("../assets/image/icon/screenicon.png")}
                      resizeMode="contain"
                      style={{ width: RFValue(24), height: RFValue(21) }}
                    />
                    <Text style={ticketStyle.modaltext}>
                      {moviedetail.description.toUpperCase()}
                    </Text>
                  </View>
                  <View style={ticketStyle.modalcontentdiv}>
                    <Image
                      style={BaseTheme.heroebanner}
                      source={require("../assets/image/icon/timeicon.png")}
                      resizeMode="contain"
                      style={{ width: RFValue(24), height: RFValue(21) }}
                    />
                    <Text style={ticketStyle.modaltext}>
                      {moment(moviedetail.showtime)
                        .format("HH:mm")
                        .toUpperCase()}
                      ;{" "}
                      {activemovie.featureLength &&
                        activemovie.featureLength + " MINS"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
};

export default TicketModal;
