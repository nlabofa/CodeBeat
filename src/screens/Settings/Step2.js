/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Text,
  Dimensions,
  FlatList,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors, Images, FontNames} from '../../shared/Themes/index';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';

import Modal from 'react-native-modal';

import TicketModal from '../../components/TicketModal';

import CustomInput from '../../components/CustomInput';
import FoodModal from '../../components/FoodModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FOOD_ENTRIES, NAME_ENTRIES} from '../Home/Entries';

import {
  BaseTheme,
  ticketStyle as styles,
} from '../../shared/Themes/styles/index';

class Step2 extends Component {
  state = {
    slider2ActiveSlide: 0,
    selectedItem1: 0,
    modalVisible: false,
    modalmode: 'food',
    guestchecked: false,
    modalval: 'lagos',
    disable: true,
    name: '',
    email: '',
    selectedItem2: 1,
    calendar: 'MOYO',
    food: 'Popcorn',
    size: 'huge',
    flavor: 'salty',
  };
  componentDidMount() {
    // StatusBar.setHidden(true);

    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => {
        setTimeout(() => {
          this.setState({disable: false});
        }, 500);
      },
    );
    this.didBlurListener = this.props.navigation.addListener(
      'didBlur',
      this.blur,
    );
  }
  blur = () => {
    this.setState({disable: true});
  };
  componentWillUnmount() {
    this.didFocusListener.remove();
    this.didBlurListener.remove();
  }
  setCalendar = val => {
    this.setState({calendar: val});
  };
  setFood = val => {
    this.setState({food: val});
    this.showModal('food');
  };
  renderFoodImage = fooditem => {
    if (fooditem === 'Popcorn') {
      return (
        <View style={[styles.popcorndiv]}>
          <Image
            source={require('../../assets/image/popcorn.png')}
            style={[
              {
                width: '100%',
                height: '100%',
                // marginLeft: RFValue(10),
              },
            ]}
            resizeMode="contain"
          />
        </View>
      );
    } else if (fooditem === 'Hotdog') {
      return (
        <View style={[styles.hotdog]}>
          <Image
            source={require('../../assets/image/hotdog.png')}
            style={[
              {
                width: '100%',
                height: '100%',
              },
            ]}
            resizeMode="contain"
          />
        </View>
      );
    } else if (fooditem === 'Burger') {
      return (
        <View style={[styles.popcorndiv]}>
          <Image
            source={require('../../assets/image/burger.png')}
            style={[
              {
                width: '100%',
                height: '100%',
              },
            ]}
            resizeMode="contain"
          />
        </View>
      );
    } else if (fooditem === 'Drinks') {
      return (
        <View style={[styles.popcorndiv]}>
          <Image
            source={require('../../assets/image/coke.png')}
            style={[
              {
                width: '100%',
                height: '100%',
              },
            ]}
            resizeMode="contain"
          />
        </View>
      );
    }
  };
  firstLetters = word => {
    var abbr = word
      .split(' ')
      .map(function(item) {
        return item[0];
      })
      .join('');
    return abbr.toUpperCase();
  };
  renderCalendar = ({item, index}) => (
    <TouchableOpacity
      key={index}
      onPress={() => this.setCalendar(item.day)}
      style={styles.calendarbody}>
      <View style={[styles.calendardiv]}>
        <Image
          source={require('../../assets/image/foodActive.png')}
          style={[
            {
              width: '100%',
              height: '100%',
              opacity: this.state.calendar === item.day ? 1 : 0,
            },
          ]}
          //resizeMode="contain"
        />
        <View style={styles.calendartextbody}>
          <Text
            style={[
              styles.overviewtext2,
              {
                textAlign: 'center',
                color: this.state.calendar === item.day ? '#fff' : '#a7a7a7',
              },
            ]}>
            {this.firstLetters(item.day) + 'A'}
          </Text>
        </View>
      </View>
      <Text
        numberOfLines={1}
        style={[
          styles.adtext4,
          this.state.calendar === item.day ? styles.activetext : null,
        ]}>
        {item.day.toLowerCase()}
      </Text>
    </TouchableOpacity>
  );
  renderFood = ({item, index}) => (
    <TouchableOpacity
      key={index}
      onPress={() => this.setFood(item.food)}
      style={styles.foodbody}>
      {this.renderFoodImage(item.food)}
      <Text
        numberOfLines={1}
        style={[
          styles.adtext5,
          {opacity: this.state.food === item.food ? 1 : 0.38},
        ]}>
        {item.food}
      </Text>
    </TouchableOpacity>
  );
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
  navigateTo = (route, obj) => {
    this.props.navigation.push(route, {params: obj});
  };
  setSizeVal = val => {
    this.setState({size: val});
    //this.modalDismissed();
  };
  setFlavorVal = val => {
    this.setState({flavor: val});
    //this.modalDismissed();
  };
  setTabHead = val => {
    this.setState({tabhead: val});
    this.modalDismissed();
  };
  showModal = mode => {
    this.setState({modalVisible: !this.state.modalVisible, modalmode: mode});
  };
  modalDismissed = () => {
    this.setState({modalVisible: false});
  };
  render() {
    const {width} = Dimensions.get('window');
    const {modalVisible, calendar, food} = this.state;
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
          {this.state.modalmode == 'food' ? (
            <FoodModal
              modalDismissed={this.modalDismissed}
              setSizeVal={this.setSizeVal}
              setFlavorVal={this.setFlavorVal}
              size={this.state.size}
              flavor={this.state.flavor}
            />
          ) : (
            <TicketModal modalDismissed={this.modalDismissed} />
          )}
        </Modal>
        <View style={styles.header}>
          <View style={styles.headerdiv}>
            <TouchableOpacity
              disabled={this.state.disable}
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
              onPress={() => this.showModal('ticket')}
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
          <View style={styles.topbanner}>
            <View style={styles.rowhead}>
              <Text style={styles.pricetext}>TOTAL:</Text>
              <Text style={styles.pricetext}>
                <Text style={{fontFamily: FontNames.bold}}>{'\u20A6'}</Text>
                3,000
              </Text>
            </View>
            <View style={styles.bannertop}>
              <Image
                source={Images.club}
                style={{width: RFValue(57), height: RFValue(30)}}
                resizeMode="contain"
              />
              <Text style={styles.adtext}>
                Pay Just 1,500 with FilmHouse Club
              </Text>
            </View>
          </View>
          <View style={{marginHorizontal: RFValue(20)}}>
            <View style={{marginTop: RFValue(30)}}>
              <View>
                <Text style={[styles.adtext, {color: '#60ced1'}]}>STEP 2</Text>
                <Text style={styles.stephead}>ADD FOOD & BEVERAGES</Text>
                <View>
                  <Image
                    source={require('../../assets/image/step2.png')}
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
                  <Text
                    onPress={() => this.props.navigation.pop()}
                    style={[styles.adtext3]}>
                    BACK
                  </Text>
                  <Text
                    onPress={() => this.navigateTo('TicketStep3')}
                    style={styles.adtext3}>
                    SKIP
                  </Text>
                </View>
                <View style={{marginVertical: RFValue(30)}}>
                  <FlatList
                    ref={ref => (this.flatList = ref)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={NAME_ENTRIES}
                    renderItem={this.renderCalendar}
                    keyExtractor={item => item.day}
                    extraData={calendar}
                  />
                </View>
                <View style={{marginHorizontal: RFValue(-20)}}>
                  <Image
                    source={require('../../assets/image/icon/line.png')}
                    style={{width: '100%', height: 1}}
                  />
                </View>
                <View style={{marginVertical: RFValue(30)}}>
                  <FlatList
                    ref={ref => (this.flatList2 = ref)}
                    //horizontal={true}
                    numColumns={3}
                    showsHorizontalScrollIndicator={false}
                    data={FOOD_ENTRIES}
                    renderItem={this.renderFood}
                    keyExtractor={item => item.index}
                    contentContainerStyle={{
                      justifyContent: 'space-between',
                    }}
                    extraData={food}
                  />
                </View>

                <View>
                  <CustomInput
                    label="NAME"
                    placeholder="Opeyemi Adeyemi"
                    maxLength={70}
                    value={this.state.name}
                    onChangeText={value => this.setState({name: value})}
                  />
                  <CustomInput
                    keyboardType="email-address"
                    label="EMAIL"
                    placeholder="email@yahoo.com"
                    value={this.state.email}
                    onChangeText={value => this.setState({email: value})}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => this.navigateTo('TicketStep3')}
                  style={[BaseTheme.proceedbtn]}>
                  <Image
                    source={Images.buttongradient}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="contain"
                  />
                  <Text style={[styles.adtext7M]}>PROCEED</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default Step2;
