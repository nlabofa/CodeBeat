import React from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import { Colors } from "./src/shared/Themes";
import {Bubbles} from "react-native-loader";

class BaseLoader extends React.Component {
  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        {/* <ActivityIndicator color="#FFF" size="large" /> */}
        <Bubbles size={6} color={Colors.basewhite} />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default BaseLoader;
