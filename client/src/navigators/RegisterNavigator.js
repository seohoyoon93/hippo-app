import { createStackNavigator } from "react-navigation";

import Register from "../scenes/Register";
import UnitSetting from "../scenes/Register/UnitSetting";
import UserInfo from "../scenes/Register/UserInfo";
import Goal from "../scenes/Register/Goal";

const RegisterNavigator = createStackNavigator(
  {
    Intro: Register,
    UnitSetting: UnitSetting,
    UserInfo: UserInfo,
    Goal: Goal
  },
  {
    headerMode: "none"
  }
);

export default RegisterNavigator;
