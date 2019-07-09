import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  NativeModules
} from "react-native";
import DeviceInfo from "react-native-device-info";
import Icon from "react-native-vector-icons/Entypo";

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
      <View style={styles.container}>
        <View style={styles.arrowViewStyle}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("UserInfo")}
          >
            <Icon name="arrow-long-left" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerViewStyle}>
          <Text style={styles.textStyle}>이제 마지막이에요!</Text>
          <Text style={styles.textStyle}>일일목표량을 입력해주세요 :)</Text>
        </View>
        <View style={styles.textInputViewStyle}>
          <Text style={styles.labelStyle}>일일목표량</Text>
          <TextInput
            style={styles.textInputStyle}
            value={this.props.goal}
            onChangeText={goal => {
              this.props.setGoal(goal);
            }}
          />
        </View>
        <View>
          <Text style={styles.descTextStyle}>
            키와 몸무게를 입력하면 일일목표량이 자동
          </Text>
          <Text style={styles.descTextStyle}>으로 계산돼요!</Text>
          <Text style={styles.descTextStyle}>
            물론 직접 입력도 가능합니다 :)
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.onPressStart}>
          <Text style={styles.buttonText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  arrowViewStyle: {
    justifyContent: "flex-start",
    height: 80,
    width: 320,
    marginBottom: 78
  },
  headerViewStyle: {
    marginBottom: 20
  },
  container: {
    backgroundColor: "#7dc2f6",
    flex: 1,
    alignItems: "center",
    paddingTop: 60
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "BMJUAOTF",
    color: "#ffffff",
    textAlign: "center"
  },
  labelStyle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "BMJUAOTF",
    color: "#ffffff",
    opacity: 0.4
  },
  textInputViewStyle: {
    width: 207,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
    marginBottom: 20
  },
  textInputStyle: {
    width: 177,
    height: 44,
    textAlign: "left",
    color: "white",
    fontSize: 16,
    fontFamily: "BMJUAOTF",
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12
  },
  textInputTextStyle: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "BMJUAOTF",
    opacity: 0.4,
    marginRight: 10
  },
  descTextStyle: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "BMJUAOTF",
    color: "#ffffff",
    opacity: 0.7
  },
  button: {
    width: 207,
    height: 64,
    backgroundColor: "#ffffff",
    fontSize: 22,
    borderRadius: 36.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200
  },
  buttonText: {
    fontSize: 20,
    color: "#348dcd",
    fontFamily: "BMJUAOTF",
    textAlign: "center"
  }
});

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
