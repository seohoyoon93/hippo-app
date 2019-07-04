import { createDrawerNavigator } from "react-navigation";

import Main from "../scenes/Main";
import AddWater from "../scenes/Main/AddWater";

const ModalNavigator = createDrawerNavigator(
  {
    Main: Main,
    AddWater: AddWater
  },
  {
    initialRouteName: "Main"
  }
);

export default ModalNavigator;
