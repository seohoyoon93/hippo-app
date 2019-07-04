import registerReducer from "./register/reducer";
import mainReducer from "./main/reducer";
import settingsReducer from "./settings/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  register: registerReducer,
  main: mainReducer,
  settings: settingsReducer
});

export default rootReducer;
