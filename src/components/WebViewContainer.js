import React from "react";

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import {
  BaseTheme,
  landingStyle as styles
} from "../shared/Themes/styles/index";
import { Images, Colors, FontNames } from "../shared/Themes/index";
import { RFValue } from "react-native-responsive-fontsize";
import { WebView } from "react-native-webview";

const WebViewContainer = props => {
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: RFValue(10)
      }}
    >
      <View style={styles.webviewheader}>
        <TouchableOpacity
          hitSlop={BaseTheme.hitSlop}
          onPress={() => props.hideWebview()}
          style={styles.webviewclose}
        >
          <Image source={Images.closeicon} style={BaseTheme.fullflex} />
        </TouchableOpacity>
        <View style={styles.webviewbody}>
          <Text numberOfLines={1} style={styles.webviewup}>
            {props.webviewtitle}
          </Text>
          <Text numberOfLines={1} style={styles.webviewbottom}>
            {props.webviewurl}
          </Text>
        </View>
      </View>
      <WebView
        bounces={false}
        startInLoadingState={true}
        onNavigationStateChange={props.onNavigationStateChange}
        renderLoading={() => (
          <View style={styles.webviewloader}>
            <ActivityIndicator color="#fff" size="large" />
          </View>
        )}
        source={{ uri: props.weburl }}
      />
    </View>
  );
};

export default WebViewContainer;
