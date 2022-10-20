import { combineReducers } from "redux";
import appReducer from "./combine/appReducer.js";

const combineReducer = combineReducers({
  appReducer,
});

const reducer = (state, action) => {
  return combineReducer(state, action);
};

export default reducer;
