/* eslint-disable react-native/no-inline-styles */
import React from "react";

import { View, Image, Text, TouchableOpacity } from "react-native";
import {
  BaseTheme,
  landingStyle as styles
} from "../shared/Themes/styles/index";
import { Images, Colors, FontNames } from "../shared/Themes/index";
import { RFValue } from "react-native-responsive-fontsize";

/**
 * This is strictly a presentational component. The listed props below are the allowed props
 *
 **@prop   navigation. This props handles routing
 ** @prop   navbar. if this props is defined, we only want topmost navigation bar
 ** @prop   toggleList. This handles toggle for adding Heroe Movie to list
 ** @prop  addedToList. This is a boolean that checks if Movie is added to list or not
 */
const DropDown = props => {
  return (
    <View style={BaseTheme.modalcontainer}>
      <TouchableOpacity
        onPress={() => props.modalDismissed()}
        style={styles.modalcloseicon}
      >
        <Image
          source={Images.closeicon}
          style={BaseTheme.modalcloseicon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={BaseTheme.modalhead}>SELECT LOCATION</Text>
      <View>
        <View>
          {props.cinemastate.map((value, index) => (
            <View key={index} style={BaseTheme.modalheadbar}>
              <Text
                onPress={() => props.setModalVal(value.name, value.id)}
                style={[
                  BaseTheme.modalheadtext2,
                  {
                    color:
                      props.dropdownval === value.name
                        ? Colors.basewhite
                        : "#333338"
                  }
                ]}
              >
                {value.name}
              </Text>
              {props.dropdownval === value.name ? (
                <View style={BaseTheme.dot2} />
              ) : null}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default DropDown;
