/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {BaseTheme, clubStyle as styles} from '../../shared/Themes/styles/index';
import {Images, Colors, FontNames} from '../../shared/Themes/index';
import {RFValue} from 'react-native-responsive-fontsize';

class ClubScreen extends Component {
  state = {
    selectedItem: 1,
    itemList: ['1', '2', '3'],
  };
  render() {
    return (
      <View style={BaseTheme.baseBackground}>
        {/* <View style={styles.header}>
          <View
            style={{
              width: RFValue(80),
              //marginTop: RFValue(25),
              bottom: 0,
              position: 'absolute',
              height: RFValue(80),
            }}>
            <Image
              source={Images.filmhouseclub}
              style={BaseTheme.fullflex}
              resizeMode="contain"
            />
          </View>
          <Text style={{color: '#fff', fontSize: RFValue(16)}}>SIGN IN</Text>
        </View> */}

        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          <Text style={BaseTheme.carouselheadtext1}>IN PROGRESS</Text>
        </View>
      </View>
    );
  }
}

export default ClubScreen;
