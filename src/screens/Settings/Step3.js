/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Text,
  Dimensions,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors, Images, FontNames} from '../../shared/Themes/index';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import Picker from 'react-native-wheel-picker';
import {TICKET} from '../Home/Entries';
import {CheckBox} from 'react-native-elements';

import Modal from 'react-native-modal';

import CustomInput from '../../components/CustomInput';
import TicketModal from '../../components/TicketModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  BaseTheme,
  ticketStyle as styles,
} from '../../shared/Themes/styles/index';

const PickerItem = Picker.Item;
class Step3 extends Component {
  state = {
    slider2ActiveSlide: 0,
    selectedItem1: 0,
    modalVisible: false,
    guestchecked: false,
    modalval: 'lagos',
    name: '',
    email: '',
    guestname: '',
    guestemail: '',
    selectedItem2: 1,
    itemList: ['1', '2', '3', '4'],
  };
  componentDidMount() {
    // StatusBar.setHidden(true);
  }
  onPickerSelect(index, title) {
    console.log(index);
    console.log(title);

    if (title === 'ADULT') {
      this.setState({
        selectedItem1: index,
      });
    } else {
      this.setState({
        selectedItem2: index,
      });
    }
  }
  setModalVal = val => {
    this.setState({dropdownval: val});
    this.modalDismissed();
  };
  navigateTo = (route, obj) => {
    this.props.navigation.push(route, {params: obj});
  };
  setTabHead = val => {
    this.setState({tabhead: val});
    this.modalDismissed();
  };
  _renderItem2 = ({item, index}) => {
    return (
      <View key={index} style={styles.ticketbox}>
        <View>
          <Text style={styles.boxhead}>{item.title}</Text>
          <Text style={styles.boxtext}>{'\u20A6'} 3,000/TICKET</Text>
        </View>
        <Picker
          style={styles.pickerdiv}
          selectedValue={
            index === 0 ? this.state.selectedItem1 : this.state.selectedItem2
          }
          itemStyle={styles.pickertext}
          onValueChange={index => this.onPickerSelect(index, item.title)}>
          {this.state.itemList.map((value, i) => (
            <PickerItem label={value} value={i} key={'money' + value} />
          ))}
        </Picker>
      </View>
    );
  };
  modalDismissed = () => {
    this.setState({modalVisible: false});
  };
  render() {
    const {width} = Dimensions.get('window');
    const {modalVisible} = this.state;
    return (
      <View
        stickyHeaderIndices={[1]}
        bounces={false}
        style={BaseTheme.baseBackground}>
        <Modal
          isVisible={modalVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={1}
          backdropColor={'#0b0b0d'}
          animationInTiming={400}
          animationOutTiming={600}
          backdropTransitionOutTiming={0}
          onBackdropPress={() => this.modalDismissed()}
          onBackButtonPress={() => this.modalDismissed()}
          // swipeDirection="up"
        >
          <TicketModal
            modalDismissed={this.modalDismissed}
            setModalVal={this.setModalVal}
            dropdownval={this.state.modalval}
          />
        </Modal>
        <View style={styles.header}>
          <View style={styles.headerdiv}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => this.props.navigation.pop()}>
              <Image
                style={styles.backicon}
                source={Images.backlink}
                resizeMode="contain"
              />
              <View style={styles.headertimer}>
                <Text style={styles.expiresin}>EXPIRES IN</Text>
                <Text style={styles.headertext}>19:34</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.setState({modalVisible: !this.state.modalVisible})
              }
              style={styles.popup}>
              <Image
                source={require('../../assets/image/icon/sidepopup.png')}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={Platform.OS === 'android' ? 20 : null}
          extraScrollHeight={Platform.OS === 'ios' ? 20 : null}>
          <View style={styles.topbanner2}>
            <View style={styles.rowhead}>
              <Text style={styles.pricetext}>TOTAL:</Text>
              <Text style={styles.pricetext}>
                <Text style={{fontFamily: FontNames.bold}}>{'\u20A6'}</Text>
                3,000
              </Text>
            </View>
          </View>
          <View style={{marginHorizontal: RFValue(20)}}>
            <View style={{marginTop: RFValue(30)}}>
              <View>
                <Text style={[styles.adtext, {color: '#60ced1'}]}>STEP 3</Text>
                <Text style={styles.stephead}>REVIEW AND PAY</Text>
                <View>
                  <Image
                    source={require('../../assets/image/step3.png')}
                    resizeMode="contain"
                    style={{width: '100%'}}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: RFValue(12),
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.adtext3]}>BACK</Text>
                </View>
                <View style={{marginVertical: RFValue(20)}}>
                  <View style={styles.summarydiv}>
                    <Text style={[styles.adtext7L]}>IMAX Tickets x 5</Text>
                    <Text style={[styles.adtext7R]}>
                      <Text style={{fontSize: RFValue(19)}}>{'\u20A6'}</Text>
                      15,000
                    </Text>
                  </View>
                  <View style={{marginHorizontal: RFValue(-20)}}>
                    <Image
                      source={require('../../assets/image/icon/line.png')}
                      style={{width: '100%', height: 1}}
                    />
                  </View>
                  <View style={styles.summarydiv}>
                    <Text style={[styles.adtext7L]}>Popcorn x 1</Text>
                    <Text style={[styles.adtext7R]}>
                      {' '}
                      <Text style={{fontSize: RFValue(19)}}>{'\u20A6'}</Text>
                      3,000
                    </Text>
                  </View>
                  <View style={{marginHorizontal: RFValue(-20)}}>
                    <Image
                      source={require('../../assets/image/icon/line.png')}
                      style={{width: '100%', height: 1}}
                    />
                  </View>
                  <View style={styles.summarydiv}>
                    <Text style={[styles.adtext7L]}>TOTAL</Text>
                    <Text style={[styles.adtext7R]}>
                      {' '}
                      <Text style={{fontSize: RFValue(19)}}>{'\u20A6'}</Text>
                      18,000
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    source={require('../../assets/image/barestrip.png')}
                    resizeMode="contain"
                    style={BaseTheme.promobanner2}
                  />
                  <TouchableOpacity style={styles.clubhead}>
                    <Image
                      source={require('../../assets/image/icon/club.png')}
                      resizeMode="contain"
                      style={{width: '100%', height: '100%'}}
                    />
                  </TouchableOpacity>
                  <View style={styles.watchmoretop}>
                    <View style={styles.watchmoretopdiv}>
                      <Text style={styles.watchmoretopleft}>
                        Pay Just ₦15,000 with {'\n'}
                        <Text style={{color: '#60ced1'}}>FilmHouse Club</Text>
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.watchmorebottomdivleft}>
                    <Image
                      source={require('../../assets/image/subscribex.png')}
                      resizeMode="contain"
                      style={{width: '100%', height: '100%'}}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.linetop}>
                  <Image
                    source={require('../../assets/image/icon/line.png')}
                    style={{width: '100%', height: 1}}
                  />
                </View>
                <View style={styles.voucherinput}>
                  <View style={{width: '65%'}}>
                    <CustomInput
                      label="VOUCHER"
                      customstyle={styles.voucherinputX}
                      //placeholder="Opeyemi Adeyemi"
                      value={this.state.name}
                      onChangeText={value => this.setState({name: value})}
                    />
                  </View>
                  <View
                    style={{
                      width: '30%',
                      alignItems: 'flex-end',
                    }}>
                    <TouchableOpacity
                      style={BaseTheme.buttonticket3}
                      //onPress={() => this.setState({modalVisible: true})}
                    >
                      <Text style={[BaseTheme.buttontext, {color: '#fff'}]}>
                        APPLY
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.linetop}>
                  <Image
                    source={require('../../assets/image/icon/line.png')}
                    style={{width: '100%', height: 1}}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => this.navigateTo('Tabscreens')}
                  style={BaseTheme.proceedbtn}>
                  <Image
                    source={Images.buttongradient}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="contain"
                  />
                  <Text style={[styles.adtext7M]}>PAY {'\u20A6'}18,000</Text>
                </TouchableOpacity>
                <View>
                  <Text style={styles.adtext8}>
                    For PG, 15 and 18 certificate films, and some concessions,
                    we may ask you for photographic ID.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default Step3;
