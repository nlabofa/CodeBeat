import React from "react";
import { Image, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Images } from "../shared/Themes/index";
import posterloader from "../assets/image/posterloader.png";
import imageCacheHoc from "react-native-image-cache-hoc";
import {
  BaseTheme,
  landingStyle as styles
} from "../shared/Themes/styles/index";

const defaultPlaceholderObject = {
  component: Image,
  props: {
    style: BaseTheme.activityIndicatorStyle,
    source: { posterloader }
  }
};
const CacheableImage = imageCacheHoc(Image, {
  validProtocols: ["http", "https"]
});
const ImageComponent = props => {
  return Platform.OS === "ios" ? (
    <CacheableImage
      style={props.style || { width: "100%", height: "100%", borderRadius: 10 }}
      source={{
        uri:
          props.source ||
          "https://s3.eu-west-2.amazonaws.com/fh-api.dev.intelia.io/movie_images/37f5591d-805d-4c64-af97-d78180f7a7a4.jpg"
      }}
      placeholder={props.noloader ? null : defaultPlaceholderObject}
      permanent={false}
    />
  ) : (
    <Image
      source={{ uri: props.source, cache: "force-cache" }}
      resizeMode={props.resizeMode || "cover"}
      defaultSource={
        props.noloader
          ? null
          : props.defaultSource
          ? props.defaultSource
          : Images.posterloader
      }
      style={props.style || { width: "100%", height: "100%", borderRadius: 10 }}
    />
  );
};

export default ImageComponent;
{
  /* <Image
source={{ uri: props.source, cache: "force-cache" }}
resizeMode={props.resizeMode || "cover"}
defaultSource={
  props.noloader
    ? null
    : props.defaultSource
    ? props.defaultSource
    : Images.posterloader
}
style={props.style || { width: "100%", height: "100%", borderRadius: 10 }}
/> */
}
