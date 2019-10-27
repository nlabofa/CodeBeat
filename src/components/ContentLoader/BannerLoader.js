import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { BaseTheme } from "../../shared/Themes/styles/index";
import ContentLoader, {
  Facebook,
  Instagram,
  Bullets
} from "react-native-easy-content-loader";

import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

const BannerLoader = () => {
  return (
    <View style={styles.container}>
      <View style={BaseTheme.heroebanner2}>
        <Image
          source={require("../../assets/image/bannerloader.gif")}
          resizeMode="contain"
          style={{ width: 100, height: 100 }}
        />
      </View>

      {/* <ContentLoader
        containerStyles={{ marginTop: RFValue(20) }}
        title={false}
        primaryColor="#2f2f2f"
        secondaryColor="#434343"
        animationDuration={1000}
        pWidth={["90%"]}
        pHeight={20}
        active
        pRows={2}
      /> */}

      <View style={styles.horizontalrow}>
        <ContentLoader
          active
          containerStyles={styles.horizontaldiv}
          title={false}
          primaryColor="#1f1d1f"
          secondaryColor="#2b292b"
          animationDuration={1000}
          pWidth={"100%"}
          pHeight={"100%"}
          pRows={1}
        />
        <ContentLoader
          active
          containerStyles={styles.horizontaldiv}
          title={false}
          primaryColor="#1f1d1f"
          secondaryColor="#2b292b"
          animationDuration={1000}
          pWidth={"100%"}
          pHeight={"100%"}
          pRows={1}
        />
        <ContentLoader
          active
          containerStyles={styles.horizontaldiv}
          title={false}
          primaryColor="#1f1d1f"
          secondaryColor="#2b292b"
          animationDuration={1000}
          pWidth={"100%"}
          pHeight={"100%"}
          pRows={1}
        />
        <ContentLoader
          active
          containerStyles={styles.horizontaldiv}
          title={false}
          primaryColor="#1f1d1f"
          secondaryColor="#2b292b"
          animationDuration={1000}
          pWidth={"100%"}
          pHeight={"100%"}
          pRows={1}
        />
      </View>
      <View style={styles.horizontalrow}>
        <ContentLoader
          active
          containerStyles={styles.horizontaldiv}
          title={false}
          primaryColor="#1f1d1f"
          secondaryColor="#2b292b"
          animationDuration={1000}
          pWidth={"100%"}
          pHeight={"100%"}
          pRows={1}
        />
        <ContentLoader
          active
          containerStyles={styles.horizontaldiv}
          title={false}
          primaryColor="#1f1d1f"
          secondaryColor="#2b292b"
          animationDuration={1000}
          pWidth={"100%"}
          pHeight={"100%"}
          pRows={1}
        />
        <ContentLoader
          active
          containerStyles={styles.horizontaldiv}
          title={false}
          primaryColor="#1f1d1f"
          secondaryColor="#2b292b"
          animationDuration={1000}
          pWidth={"100%"}
          pHeight={"100%"}
          pRows={1}
        />
        <ContentLoader
          active
          containerStyles={styles.horizontaldiv}
          title={false}
          primaryColor="#1f1d1f"
          secondaryColor="#2b292b"
          animationDuration={1000}
          pWidth={"100%"}
          pHeight={"100%"}
          pRows={1}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: RFPercentage(10),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: RFValue(10)
    //backgroundColor: "red"
  },
  horizontaldiv: {
    //backgroundColor: "green",
    height: RFValue(164),
    width: RFValue(130),
    marginHorizontal: -7
  },
  horizontalrow: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "green",
   // overflow: "hidden",
    width: "100%",
    marginTop: RFValue(30)
  }
});
export default BannerLoader;
