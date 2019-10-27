import React, { Component } from "react";

import { View, ActivityIndicator } from "react-native";
import Router from "./src/shared/Routes/Router";
import NavigationService from "./src/shared/Routes/NavigationService";
import { MenuProvider } from "react-native-popup-menu";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import { store, persistor } from "./src/shared/store/root.store";
import Orientation from "react-native-orientation";
import { PersistGate } from "redux-persist/integration/react";
import BaseLoader from "./BaseLoader";
console.disableYellowBox = true;
export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
    Orientation.lockToPortrait();
  }

  render() {
    return (
      <MenuProvider>
        <Provider store={store}>
          <PersistGate loading={<BaseLoader />} persistor={persistor}>
            <Router
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </PersistGate>
        </Provider>
      </MenuProvider>
    );
  }
}
