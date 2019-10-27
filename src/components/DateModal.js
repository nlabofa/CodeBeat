/* eslint-disable react-native/no-inline-styles */
import React from "react";

import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  BaseTheme,
  landingStyle as styles
} from "../shared/Themes/styles/index";
import { Images, Colors, FontNames } from "../shared/Themes/index";
import { RFValue } from "react-native-responsive-fontsize";

const DateModal = props => {
  return (
    <View style={BaseTheme.modalcontainer}>
      <TouchableOpacity
        hitSlop={BaseTheme.hitSlop}
        onPress={() => props.modalDismissed()}
        style={styles.modalcloseicon}
      >
        <Image
          source={Images.closeicon}
          style={BaseTheme.modalcloseicon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {props.activemonth ? (
        <View>
          <Text style={BaseTheme.modalhead}>SELECT MONTH</Text>
          <ScrollView style={{ maxHeight: "75%" }}>
            <View>
              {props.date.map((value, index) => (
                <View key={index} style={BaseTheme.modalheadbar}>
                  <Text
                    onPress={() => props.setMonthVal(value.text, value.index)}
                    style={[
                      BaseTheme.modalheadtext2,
                      {
                        color:
                          props.activemonth === value.text
                            ? Colors.basewhite
                            : "#333338"
                      }
                    ]}
                  >
                    {value.text.toUpperCase()}
                  </Text>
                  {props.activemonth === value.text ? (
                    <View style={BaseTheme.dot2} />
                  ) : null}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      ) : props.activeyear ? (
        <View>
          <Text style={BaseTheme.modalhead}>SELECT YEAR</Text>
          <ScrollView style={{ maxHeight: "70%" }}>
            <View>
              {props.date.map((value, index) => (
                <View key={index} style={BaseTheme.modalheadbar}>
                  <Text
                    onPress={() => props.setYearVal(value.year)}
                    style={[
                      BaseTheme.modalheadtext2,
                      {
                        color:
                          props.activeyear === value.year
                            ? Colors.basewhite
                            : "#333338"
                      }
                    ]}
                  >
                    {value.year}
                  </Text>
                  {props.activeyear === value.year ? (
                    <View style={BaseTheme.dot2} />
                  ) : null}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text style={BaseTheme.modalhead}>SELECT DATE</Text>
          <ScrollView style={{ maxHeight: "70%" }}>
            <View>
              {props.date.map((value, index) => (
                <View key={index} style={BaseTheme.modalheadbar}>
                  <Text
                    onPress={() => props.setDateVal(value)}
                    style={[
                      BaseTheme.modalheadtext2,
                      {
                        color:
                          props.activedate === value
                            ? Colors.basewhite
                            : "#333338"
                      }
                    ]}
                  >
                    {value}
                  </Text>
                  {props.activedate === value ? (
                    <View style={BaseTheme.dot2} />
                  ) : null}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default DateModal;
