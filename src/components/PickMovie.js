/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  FlatList
} from "react-native";
import {
  BaseTheme,
  landingStyle as styles
} from "../shared/Themes/styles/index";
import { Images, Colors, FontNames } from "../shared/Themes/index";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import Button from "./Button";
class PickMovie extends Component {
  state = {
    modalvisible: false,
    genrelist: []
  };
  addToList = item => {
    const genreItem = [];
    const { genrelist } = this.state;
    if (genrelist.some(el => el.filmId === item)) {
      const updatedInfo = genrelist.filter(el => el.filmId !== item);
      this.setState({ genrelist: updatedInfo });
    } else {
      genreItem.push({ filmId: item, type: "prefer" });
      this.setState({ genrelist: [...this.state.genrelist, ...genreItem] });
    }
    console.log(genreItem);
  };
  doAction = () => {
    this.props.updateUserPlaylist(this.state.genrelist);
  };
  _renderItem2 = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => this.addToList(item.id)}
      key={index}
      style={styles.carousel3}
    >
      <View
        style={{
          opacity: this.state.genrelist.some(el => el.filmId == item.id)
            ? 0.2
            : 1
        }}
      >
        <Image
          resizeMode="cover"
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
          source={{ uri: item.posterImage, cache: "force-cache" }}
          defaultSource={Images.posterloader}
        />
      </View>
      {this.state.genrelist.some(el => el.filmId == item.id) ? (
        <Image
          source={Images.checkedicon}
          style={styles.checkbox2}
          resizeMode="contain"
        />
      ) : null}
    </TouchableOpacity>
  );

  render() {
    return (
      <View
        style={[
          {
            marginTop: RFPercentage(25),
            marginHorizontal: RFValue(20)
          }
        ]}
      >
        <Image
          source={require("../assets/image/barestrip2.png")}
          style={styles.getstartedstrip}
        />
        <Text style={[styles.dobhead, { width: "95%" }]}>
          Let’s customize your experience
        </Text>
        <Text style={styles.dobody}>
          Click more than 3 selection you like here
        </Text>

        <FlatList
          //horizontal={true}
          data={this.props.movielist}
          renderItem={this._renderItem2}
          numColumns={2}
          keyExtractor={item => item.id}
          columnWrapperStyle={{
            justifyContent: "space-between"
          }}
          //extraData={currentlyshowing_films}
        />

        <Button
          formIsValid={this.state.genrelist.length >= 3}
          onPress={() => this.doAction()}
          loading={this.props.loading}
        />
      </View>
    );
  }
}

export default PickMovie;
