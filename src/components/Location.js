/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Image, Text, TouchableOpacity} from 'react-native';
import {BaseTheme, landingStyle as styles} from '../shared/Themes/styles/index';
import {Images, Colors, FontNames} from '../shared/Themes/index';
import {RFValue} from 'react-native-responsive-fontsize';

/**
 * This is strictly a presentational component. The listed props below are the allowed props
 *
 **@prop   navigation. This props handles routing
 ** @prop   navbar. if this props is defined, we only want topmost navigation bar
 ** @prop   toggleList. This handles toggle for adding Heroe Movie to list
 ** @prop  addedToList. This is a boolean that checks if Movie is added to list or not
 */
const Location = props => {
  return (
    <View style={BaseTheme.modalcontainer}>
      <TouchableOpacity
        onPress={() => props.modalDismissed()}
        style={styles.modalcloseicon}>
        <Image
          source={Images.closeicon}
          style={BaseTheme.modalcloseicon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={BaseTheme.modalhead}>SELECT LOCATION</Text>
      <View>
        <View>
          <View style={BaseTheme.modalheadbar}>
            <Text
              onPress={() => props.setModalVal('lagos')}
              style={[
                BaseTheme.modalheadtext,
                {color: props.dropdownval === 'lagos' ? '#fff' : '#333338'},
              ]}>
              Lagos
            </Text>
            {props.dropdownval === 'lagos' ? (
              <View style={BaseTheme.dot2} />
            ) : null}
          </View>

          <View style={BaseTheme.modalheadbar}>
            <Text
              onPress={() => props.setModalVal('kano')}
              style={[
                BaseTheme.modalheadtext,
                {color: props.dropdownval === 'kano' ? '#fff' : '#333338'},
              ]}>
              Kano
            </Text>
            {props.dropdownval === 'kano' ? (
              <View style={BaseTheme.dot2} />
            ) : null}
          </View>
          <View style={BaseTheme.modalheadbar}>
            <Text
              onPress={() => props.setModalVal('oyo')}
              style={[
                BaseTheme.modalheadtext,
                {color: props.dropdownval === 'oyo' ? '#fff' : '#333338'},
              ]}>
              Oyo
            </Text>
            {props.dropdownval === 'oyo' ? (
              <View style={BaseTheme.dot2} />
            ) : null}
          </View>
          <View style={BaseTheme.modalheadbar}>
            <Text
              onPress={() => props.setModalVal('rivers')}
              style={[
                BaseTheme.modalheadtext,
                {color: props.dropdownval === 'rivers' ? '#fff' : '#333338'},
              ]}>
              Rivers
            </Text>
            {props.dropdownval === 'rivers' ? (
              <View style={BaseTheme.dot2} />
            ) : null}
          </View>
          <View style={BaseTheme.modalheadbar}>
            <Text
              onPress={() => props.setModalVal('ondo')}
              style={[
                BaseTheme.modalheadtext,
                {color: props.dropdownval === 'ondo' ? '#fff' : '#333338'},
              ]}>
              Ondo
            </Text>
            {props.dropdownval === 'ondo' ? (
              <View style={BaseTheme.dot2} />
            ) : null}
          </View>
          <View style={BaseTheme.modalheadbar}>
            <Text
              onPress={() => props.setModalVal('edo')}
              style={[
                BaseTheme.modalheadtext,
                {color: props.dropdownval === 'edo' ? '#fff' : '#333338'},
              ]}>
              Edo
            </Text>
            {props.dropdownval === 'edo' ? (
              <View style={BaseTheme.dot2} />
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Location;
