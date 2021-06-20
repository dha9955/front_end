import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import { contactRed } from "./contact.reducer"

const rootReducer = combineReducers({
  user: userReducer,
  contact: contactRed,
});

export default rootReducer;
