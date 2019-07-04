import React, { Component } from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-community/async-storage";

import RegisterNavigator from "./src/navigators/RegisterNavigator";
import MainNavigator from "./src/navigators/MainNavigator";
import rootReducer from "./src/store/rootReducer";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFirst: null,
      checkedIfFirst: false
    };
  }
  checkIfFirst = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem("isFirst")
        .then(res => {
          if (res !== null) {
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  componentDidMount() {
    this.checkIfFirst()
      .then(res => this.setState({ isFirst: res, checkedIfFirst: true }))
      .catch(err => console.error(err));
  }

  render() {
    const { checkedIfFirst, isFirst } = this.state;
    if (!checkedIfFirst) {
      return null;
    }

    const AppContainer = createAppContainer(AppNavigator(isFirst));

    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const AppNavigator = (isFirst = true) => {
  return createSwitchNavigator(
    {
      Register: RegisterNavigator,
      Main: MainNavigator
    },
    {
      headerMode: "none",
      initialRouteName: isFirst ? "Register" : "Main"
    }
  );
};
