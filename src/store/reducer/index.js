import { combineReducers } from "redux";
import { popupReducer as popup } from "./popup";
import { progressReducer as progress } from "./progress";

const rootReducer = combineReducers({
  popup,
  progress
});

export default rootReducer;
