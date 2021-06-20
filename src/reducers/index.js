import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import contactReducer from "./contact.reducer"

const rootReducer = combineReducers({
  user: userReducer,
  contact: contactReducer,
});

export default rootReducer;
