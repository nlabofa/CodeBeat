import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Colors, FontNames} from '../index';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';

const {width} = Dimensions.get('window');

const Styles = StyleSheet.create({
  header: {
    marginHorizontal: RFValue(20),
    backgroundColor: 'red',
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    // alignItems: 'flex-end',
  },
});
export default Styles;
