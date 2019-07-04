import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Button,
  Platform,
  NativeModules
} from "react-native";
import DeviceInfo from "react-native-device-info";

import { setGoal } from "../../store/register/actions";
import { register } from "../../api";

class Goal extends Component {
  constructor(props) {
    super(props);

    this.onPressStart = this.onPressStart.bind(this);
  }

  async onPressStart() {
    const deviceId = DeviceInfo.getUniqueID();
    const deviceLanguage =
      Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier;
    const userData = {
      unit: this.props.unit,
      gender: this.props.gender,
      height: this.props.height,
      weight: this.props.weight,
      training: this.props.training,
      goal: this.props.goal,
      lang: deviceLanguage,
      device_id: deviceId
    };
    register(userData);
    await this.props.navigation.navigate("Main");
  }

  render() {
    return (
      <View>
        <Text>이제 마지막이에요!</Text>
        <Text>일일목표량을 입력해주세요 :)</Text>
        <View>
          <Text>일일목표량</Text>
          <TextInput
            value={this.props.goal}
            onChangeText={goal => {
              this.props.setGoal(goal);
            }}
          />
          <Text>키와 몸무게를 입력하면 일일목표량이 자동</Text>
          <Text>으로 계산돼요!</Text>
          <Text>물론 직접 입력도 가능합니다 :)</Text>
        </View>
        <Button title="시작하기" onPress={this.onPressStart} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    goal: state.register.goal,
    unit: state.register.unit,
    height: state.register.height,
    gender: state.register.gender,
    weight: state.register.weight,
    training: state.register.training
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGoal: goal => dispatch(setGoal(goal))
    // register: (lang, deviceId) => dispatch(register(lang, deviceId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Goal);
