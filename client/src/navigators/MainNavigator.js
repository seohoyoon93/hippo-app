import { createSwitchNavigator } from "react-navigation";

import ModalNavigator from "./ModalNavigator";
import History from "../scenes/Main/History";
import SettingsNavigator from "./SettingsNavigator";

const MainNavigator = createSwitchNavigator({
  Main: ModalNavigator,
  History: History,
  Settings: SettingsNavigator
});

export default MainNavigator;
