import { createSwitchNavigator } from "react-navigation";

import Settings from "../scenes/Settings";
// import Language from "../scenes/Settings/Language";
import MyInfo from "../scenes/Settings/MyInfo";
import Notification from "../scenes/Settings/Notification";

const SettingsNavigator = createSwitchNavigator({
  Settings,
  Notification,
  MyInfo
});

export default SettingsNavigator;
