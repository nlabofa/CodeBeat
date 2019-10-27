import React from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import { FontNames, Colors } from "../shared/Themes/index";
import { RFValue } from "react-native-responsive-fontsize";
const CustomInput = props => {
  const styles = StyleSheet.create({
    formControl: {
      width: "100%",
      //backgroundColor: "red",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      textAlign: "left",
      borderRadius: props.auth ? 12 : 6,
      borderWidth: props.auth ? 4 : 3,
      borderColor: "#18181d",
      paddingHorizontal: 15,
      paddingVertical: props.auth ? RFValue(16) : RFValue(14),
      marginBottom: 15,
      fontFamily: props.value ? FontNames.medium : FontNames.regular,
      fontSize: RFValue(16),
      color: props.auth ? "#7d7d89" : Colors.basewhite
    },
    labeltext: {
      fontFamily: FontNames.bold,
      fontSize: RFValue(10),
      color: "rgba(125,125,137,0.7)",
      paddingBottom: RFValue(6),
      paddingLeft: RFValue(16),
      letterSpacing: 1.3
    },
    inValid: {
      borderColor: "#E72A53"
      // borderWidth: 3
    },
    focused: {
      backgroundColor: "#2F2F38",
      borderColor: "#2F2F38",
      color: "#fff"
    },
    notfocused: {
      backgroundColor: "#F8F9FF"
    }
  });
  return (
    <View>
      <Text
        style={[
          styles.labeltext,
          {
            paddingLeft: props.label === "VOUCHER" ? RFValue(5) : RFValue(16)
          },
          { fontSize: props.label === "VOUCHER" ? RFValue(15) : RFValue(10) }
        ]}
      >
        {props.label}
      </Text>
      <TextInput
        //keyboardType='email-address'
        returnKeyType="done"
        style={[
          styles.formControl,
          props.customstyle ? props.customstyle : null,
          props.focused ? styles.focused : null,
          !props.valid && props.touched ? styles.inValid : null
        ]}
        underlineColorAndroid="transparent"
        placeholderTextColor={props.auth ? "#7d7d89" : "#808080"}
        {...props}
      />
    </View>
  );
};

export default CustomInput;
