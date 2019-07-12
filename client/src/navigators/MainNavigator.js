import { createSwitchNavigator } from "react-navigation";

import Main from "../scenes/Main";
import History from "../scenes/Main/History";
import SettingsNavigator from "./SettingsNavigator";

const MainNavigator = createSwitchNavigator({
  Main: Main,
  History: History,
  Settings: SettingsNavigator
});

export default MainNavigator;
