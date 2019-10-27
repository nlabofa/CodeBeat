import { combineReducers } from "redux";

import filmReducer from "./reducers/filmReducer";
import shopReducer from "./reducers/shopReducer";
import uiReducer from "./reducers/uiReducer";
import authReducer from "./reducers/authReducer";
import ticketReducer from "./reducers/ticketReducer";

export default combineReducers({
  uiReducer: uiReducer,
  filmReducer: filmReducer,
  shopReducer: shopReducer,
  ticketReducer: ticketReducer,
  authReducer: authReducer
});
