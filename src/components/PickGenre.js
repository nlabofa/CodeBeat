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
class PickGenre extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.props.switchState("movietype");
    }
  }
  state = {
    modalvisible: false,
    genrelist: []
  };
  addToList = item => {
    const genreItem = [];
    const { genrelist } = this.state;
    if (genrelist.some(el => el === item)) {
      const updatedInfo = genrelist.filter(el => el !== item);
      this.setState({ genrelist: updatedInfo });
    } else {
      genreItem.push(item);
      this.setState({ genrelist: [...this.state.genrelist, ...genreItem] });
    }
    console.log(genreItem);
  };
  doAction = () => {
    this.props.updateUserProfile({
      preferredGenres: this.state.genrelist.join()
    });
  };
  _renderItem2 = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => this.addToList(item.name)}
      key={index}
      style={styles.itembox}
    >
      <Image
        resizeMode="cover"
        style={styles.gradient}
        source={require("../assets/image/GradientBottom.png")}
      />
      <View
        style={{
          opacity: this.state.genrelist.includes(item.name) ? 0.8 : 0.2
        }}
      >
        <Image
          resizeMode="cover"
          style={{ width: "100%", height: "100%", borderRadius: 13 }}
          source={{ uri: item.image, cache: "force-cache" }}
          // defaultSource={Images.posterloader}
        />
      </View>
      <View style={styles.genrebottom}>
        {this.state.genrelist.includes(item.name) ? (
          <Image
            source={Images.checkedicon}
            style={styles.checkbox}
            resizeMode="contain"
          />
        ) : null}

        <Text style={styles.dobhead2}>{item.name}</Text>
      </View>
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
          Welcome {this.props.firstname}. Pick one or more genres
        </Text>
        <Text style={styles.dobody}>
          This will help us recommend the movies you will love
        </Text>

        <FlatList
          //horizontal={true}
          data={this.props.filmgenre}
          renderItem={this._renderItem2}
          numColumns={2}
          keyExtractor={item => item.name}
          columnWrapperStyle={{
            justifyContent: "space-between"
          }}
          //extraData={currentlyshowing_films}
        />

        <Button
          formIsValid={this.state.genrelist.length > 0}
          // customstyle={styles.datebtn}
          onPress={() => this.doAction()}
          loading={this.props.loading}
        />
      </View>
    );
  }
}

export default PickGenre;
