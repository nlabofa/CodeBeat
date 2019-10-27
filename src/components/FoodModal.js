/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from "react";

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from "react-native";
import {
  BaseTheme,
  landingStyle as styles,
  ticketStyle
} from "../shared/Themes/styles/index";
import { Images, Colors, FontNames } from "../shared/Themes/index";
import { RFValue } from "react-native-responsive-fontsize";
import { CheckBox } from "react-native-elements";

import Picker from "react-native-wheel-picker";

/**
 * This is strictly a presentational component. The listed props below are the allowed props
 *
 **@prop   navigation. This props handles routing
 ** @prop   navbar. if this props is defined, we only want topmost navigation bar
 ** @prop   toggleList. This handles toggle for adding Heroe Movie to list
 ** @prop  addedToList. This is a boolean that checks if Movie is added to list or not
 */
const PickerItem = Picker.Item;

class FoodModal extends PureComponent {
  state = {
    selectedItem: 0,
    selected: false,
    itemList: ["1", "2", "3", "4"]
  };
  onPickerSelect = index => {
    this.setState(
      {
        selectedItem: index,
        selected: true
      },
      () => this.props.setQtyVal(index + 1)
    );
  };
  render() {
    const {
      setColorVal,
      addToCheckOut,
      activeItem,
      editItemCount,
      modalDismissed
    } = this.props;
    const { selectedItem, selected } = this.state;
    return (
      <View style={[BaseTheme.modalcontainer]}>
        <TouchableOpacity
          onPress={() => this.props.modalDismissed()}
          style={styles.modalcloseicon}
        >
          <Image
            source={Images.closeicon}
            style={BaseTheme.modalcloseicon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            marginTop: RFValue(15)
          }}
        >
          <View>
            <View
              style={[styles.heroecontent, { marginHorizontal: RFValue(20) }]}
            >
              <View>
                <Text style={ticketStyle.modaltext2}>SIZE</Text>

                <ScrollView
                  ref={ref => (this.scrollmodal = ref)}
                  horizontal={true}
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={ticketStyle.foodmodal}>
                    <Text
                      onPress={() => this.props.setSizeVal("huge")}
                      numberOfLines={1}
                      style={[
                        ticketStyle.modalhead2,
                        {
                          color:
                            this.props.size === "huge" ? "#d3d3d3" : "#31313c"
                        }
                      ]}
                    >
                      Huge
                    </Text>
                    {this.props.size === "huge" ? (
                      <View style={BaseTheme.dot2} />
                    ) : null}
                  </View>
                  <View style={ticketStyle.foodmodal}>
                    <Text
                      onPress={() => this.props.setSizeVal("large")}
                      numberOfLines={1}
                      style={[
                        ticketStyle.modalhead2,
                        {
                          color:
                            this.props.size === "large" ? "#d3d3d3" : "#31313c"
                        }
                      ]}
                    >
                      Large
                    </Text>
                    {this.props.size === "large" ? (
                      <View style={BaseTheme.dot2} />
                    ) : null}
                  </View>
                  <View style={ticketStyle.foodmodal}>
                    <Text
                      onPress={() => this.props.setSizeVal("medium")}
                      numberOfLines={1}
                      style={[
                        ticketStyle.modalhead2,
                        {
                          color:
                            this.props.size === "medium" ? "#d3d3d3" : "#31313c"
                        }
                      ]}
                    >
                      Medium
                    </Text>
                    {this.props.size === "medium" ? (
                      <View style={BaseTheme.dot2} />
                    ) : null}
                  </View>
                  <View style={ticketStyle.foodmodal}>
                    <Text
                      onPress={() => this.props.setSizeVal("small")}
                      numberOfLines={1}
                      style={[
                        ticketStyle.modalhead2,
                        {
                          color:
                            this.props.size === "small" ? "#d3d3d3" : "#31313c"
                        }
                      ]}
                    >
                      Small
                    </Text>
                    {this.props.size === "small" ? (
                      <View style={BaseTheme.dot2} />
                    ) : null}
                  </View>
                </ScrollView>
              </View>
              {this.props.setColorVal ? (
                <View>
                  <View style={{ marginTop: RFValue(30) }}>
                    <Text style={ticketStyle.modaltext2}>COLOR</Text>

                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <View style={ticketStyle.foodmodal}>
                        <Text
                          onPress={() => this.props.setColorVal("red")}
                          numberOfLines={1}
                          style={[
                            ticketStyle.modalhead2,
                            {
                              color:
                                this.props.color === "red"
                                  ? "#d3d3d3"
                                  : "#31313c"
                            }
                          ]}
                        >
                          Red
                        </Text>
                        {this.props.color === "red" ? (
                          <View style={BaseTheme.dot2} />
                        ) : null}
                      </View>
                      <View style={ticketStyle.foodmodal}>
                        <Text
                          onPress={() => this.props.setColorVal("white")}
                          numberOfLines={1}
                          style={[
                            ticketStyle.modalhead2,
                            {
                              color:
                                this.props.color === "white"
                                  ? "#d3d3d3"
                                  : "#31313c"
                            }
                          ]}
                        >
                          White
                        </Text>
                        {this.props.color === "white" ? (
                          <View style={BaseTheme.dot2} />
                        ) : null}
                      </View>
                      <View style={ticketStyle.foodmodal}>
                        <Text
                          onPress={() => this.props.setColorVal("black")}
                          numberOfLines={1}
                          style={[
                            ticketStyle.modalhead2,
                            {
                              color:
                                this.props.color === "black"
                                  ? "#d3d3d3"
                                  : "#31313c"
                            }
                          ]}
                        >
                          Black
                        </Text>
                        {this.props.color === "black" ? (
                          <View style={BaseTheme.dot2} />
                        ) : null}
                      </View>
                      <View style={ticketStyle.foodmodal}>
                        <Text
                          onPress={() => this.props.setColorVal("blue")}
                          numberOfLines={1}
                          style={[
                            ticketStyle.modalhead2,
                            {
                              color:
                                this.props.color === "blue"
                                  ? "#d3d3d3"
                                  : "#31313c"
                            }
                          ]}
                        >
                          Blue
                        </Text>
                        {this.props.color === "blue" ? (
                          <View style={BaseTheme.dot2} />
                        ) : null}
                      </View>
                    </ScrollView>
                  </View>
                  <View style={{ marginTop: RFValue(30) }}>
                    <Text style={ticketStyle.modaltext2}>CINEMA</Text>

                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <View style={ticketStyle.foodmodal}>
                        <Text
                          onPress={() => this.props.setCinemaVal("lekki")}
                          numberOfLines={1}
                          style={[
                            ticketStyle.modalhead2,
                            {
                              color:
                                this.props.cinema === "lekki"
                                  ? "#d3d3d3"
                                  : "#31313c"
                            }
                          ]}
                        >
                          Lekki
                        </Text>
                        {this.props.cinema === "lekki" ? (
                          <View style={BaseTheme.dot2} />
                        ) : null}
                      </View>
                      <View style={ticketStyle.foodmodal}>
                        <Text
                          onPress={() => this.props.setCinemaVal("surulere")}
                          numberOfLines={1}
                          style={[
                            ticketStyle.modalhead2,
                            {
                              color:
                                this.props.cinema === "surulere"
                                  ? "#d3d3d3"
                                  : "#31313c"
                            }
                          ]}
                        >
                          Surulere
                        </Text>
                        {this.props.cinema === "surulere" ? (
                          <View style={BaseTheme.dot2} />
                        ) : null}
                      </View>
                      <View style={ticketStyle.foodmodal}>
                        <Text
                          onPress={() => this.props.setCinemaVal("oniru")}
                          numberOfLines={1}
                          style={[
                            ticketStyle.modalhead2,
                            {
                              color:
                                this.props.cinema === "oniru"
                                  ? "#d3d3d3"
                                  : "#31313c"
                            }
                          ]}
                        >
                          Oniru
                        </Text>
                        {this.props.cinema === "oniru" ? (
                          <View style={BaseTheme.dot2} />
                        ) : null}
                      </View>
                    </ScrollView>
                  </View>
                </View>
              ) : (
                <View style={{ marginTop: RFValue(30) }}>
                  <Text style={ticketStyle.modaltext2}>FLAVOR</Text>

                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <View style={ticketStyle.foodmodal}>
                      <Text
                        onPress={() => this.props.setFlavorVal("salty")}
                        numberOfLines={1}
                        style={[
                          ticketStyle.modalhead2,
                          {
                            color:
                              this.props.flavor === "salty"
                                ? "#d3d3d3"
                                : "#31313c"
                          }
                        ]}
                      >
                        Salty
                      </Text>
                      {this.props.flavor === "salty" ? (
                        <View style={BaseTheme.dot2} />
                      ) : null}
                    </View>
                    <View style={ticketStyle.foodmodal}>
                      <Text
                        onPress={() => this.props.setFlavorVal("spicy")}
                        numberOfLines={1}
                        style={[
                          ticketStyle.modalhead2,
                          {
                            color:
                              this.props.flavor === "spicy"
                                ? "#d3d3d3"
                                : "#31313c"
                          }
                        ]}
                      >
                        Spicy
                      </Text>
                      {this.props.flavor === "spicy" ? (
                        <View style={BaseTheme.dot2} />
                      ) : null}
                    </View>
                    <View style={ticketStyle.foodmodal}>
                      <Text
                        onPress={() => this.props.setFlavorVal("sweet")}
                        numberOfLines={1}
                        style={[
                          ticketStyle.modalhead2,
                          {
                            color:
                              this.props.flavor === "sweet"
                                ? "#d3d3d3"
                                : "#31313c"
                          }
                        ]}
                      >
                        Sweet
                      </Text>
                      {this.props.flavor === "sweet" ? (
                        <View style={BaseTheme.dot2} />
                      ) : null}
                    </View>
                  </ScrollView>
                </View>
              )}

              <View style={{ marginTop: RFValue(30) }}>
                <Text style={ticketStyle.modaltext2}>
                  {this.props.setColorVal ? "QTY" : "PIECES"}
                </Text>
                <ScrollView horizontal>
                  <Picker
                    horizontal
                    style={ticketStyle.pickerdiv2}
                    selectedValue={
                      selected == false && editItemCount
                        ? editItemCount - 1
                        : selectedItem
                    }
                    itemStyle={ticketStyle.pickertext}
                    onValueChange={index => this.onPickerSelect(index)}
                  >
                    {this.state.itemList.map((value, i) => (
                      <PickerItem
                        label={value}
                        value={i}
                        key={"money" + value}
                      />
                    ))}
                  </Picker>
                </ScrollView>
              </View>
              {/* {this.props.setColorVal ? null : (
                <View style={[ticketStyle.guestview]}>
                  <CheckBox
                    checkedColor="#60CED1"
                    uncheckedColor="#787879"
                    checkedIcon="check-box"
                    iconType="material-Icons"
                    uncheckedIcon="check-box-outline-blank"
                    containerStyle={{
                      marginRight: 0
                    }}
                    checked={this.state.guestchecked === true}
                    onPress={() =>
                      this.setState({ guestchecked: !this.state.guestchecked })
                    }
                  />
                  <Text style={[ticketStyle.adtext6]}>APPLY TO ALL GUEST</Text>
                </View>
              )} */}

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={[BaseTheme.buttonticket, { backgroundColor: "#fff" }]}
                  onPress={() => addToCheckOut(activeItem)}
                >
                  <Text style={BaseTheme.buttontext}>
                    {this.props.setColorVal ? "ADD TO CART" : "CONFIRM"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default FoodModal;
