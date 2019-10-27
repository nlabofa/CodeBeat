import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./root.reducer";

import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["shopReducer", "filmReducer"] //only persist this store
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
let composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const basestore = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const store = basestore;
export const persistor = persistStore(store);
