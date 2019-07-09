import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/Entypo";

import {
  selectGender,
  setHeight,
  setWeight,
  selectTraining,
  calculateGoal
} from "../../store/register/actions";

const genders = [
  {
    label: "남자",
    value: "male"
  },
  {
    label: "여자",
    value: "female"
  }
];

const trainings = [
  {
    label: "숨쉬기",
    value: "breath"
  },
  {
    label: "보통",
    value: "normal"
  },
  {
    label: "활동적",
    value: "intense"
  }
];

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.onPressNext = this.onPressNext.bind(this);
  }
  async onPressNext() {
    const height = parseInt(this.props.height);
    const weight = parseInt(this.props.weight);
    if (this.props.height === "") {
      Alert.alert(
        "앗! 키를 입력하지 않으셨어요!",
        "키를 입력해주세요",
        [{ text: "확인" }],
        { cancelable: false }
      );
    } else if (this.props.weight === "") {
      Alert.alert(
        "앗! 몸무게를 입력하지 않으셨어요!",
        "몸무게를 입력해주세요",
        [{ text: "확인" }],
        { cancelable: false }
      );
    } else if (isNaN(height) || isNaN(weight)) {
      Alert.alert(
        "숫자만 입력해주세요",
        "키와 몸무게에는 숫자만 입력해주세요",
        [{ text: "확인" }],
        { cancelable: false }
      );
    } else {
      this.props.calculateGoal();
      await this.props.navigation.navigate("Goal");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.arrowViewStyle}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("UnitSetting")}
          >
            <Icon name="arrow-long-left" size={32} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerViewStyle}>
          <Text style={styles.textStyle}>키와 몸무게를 입력하면</Text>
          <Text style={styles.textStyle}>히포가 신체에 맞는 일일목표량 설</Text>
          <Text style={styles.textStyle}>정을 도와줄게요</Text>
        </View>
        <View style={styles.pickerViewStyle}>
          <Text style={styles.labelStyle}>성별</Text>
          <RNPickerSelect
            placeholder={{}}
            items={genders}
            onValueChange={gender => {
              this.props.selectGender(gender);
            }}
            style={pickerSelectStyles}
            value={this.props.gender}
            Icon={() => {
              return (
                <Icon
                  style={{ marginTop: 18, marginRight: 10 }}
                  name="chevron-down"
                  size={16}
                  color="#ffffff"
                />
              );
            }}
          />
        </View>
        <View style={styles.pickerViewStyle}>
          <Text style={styles.labelStyle}>키</Text>
          <View style={styles.textInputViewStyle}>
            <TextInput
              style={styles.textInputStyle}
              value={this.props.height}
              onChangeText={height => {
                this.props.setHeight(height);
              }}
            />
            <Text style={styles.textInputTextStyle}>cm</Text>
          </View>
        </View>
        <View style={styles.pickerViewStyle}>
          <Text style={styles.labelStyle}>몸무게</Text>
          <View style={styles.textInputViewStyle}>
            <TextInput
              style={styles.textInputStyle}
              value={this.props.weight}
              onChangeText={weight => {
                this.props.setWeight(weight);
              }}
            />
            <Text style={styles.textInputTextStyle}>kg</Text>
          </View>
        </View>
        <View style={styles.pickerViewStyle}>
          <Text style={styles.labelStyle}>운동량</Text>
          <RNPickerSelect
            placeholder={{}}
            items={trainings}
            onValueChange={training => {
              this.props.selectTraining(training);
            }}
            style={pickerSelectStyles}
            value={this.props.training}
            Icon={() => {
              return (
                <Icon
                  style={{ marginTop: 18, marginRight: 10 }}
                  name="chevron-down"
                  size={16}
                  color="#ffffff"
                />
              );
            }}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.onPressNext}>
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const pickerSelectStyles = {
  inputIOS: {
    width: 207,
    height: 44,
    textAlign: "left",
    color: "white",
    fontSize: 16,
    fontFamily: "BMJUAOTF",
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1
  },
  inputAndroid: {
    width: 207,
    height: 44,
    textAlign: "left",
    color: "white",
    fontSize: 16,
    fontFamily: "BMJUAOTF",
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1
  },
  placeholderColor: "white"
};

const styles = StyleSheet.create({
  arrowViewStyle: {
    justifyContent: "flex-start",
    height: 80,
    width: 320
  },
  headerViewStyle: {
    marginBottom: 20
  },
  container: {
    backgroundColor: "#7dc2f6",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "BMJUAOTF",
    color: "#ffffff",
    textAlign: "center"
  },
  pickerViewStyle: {
    marginTop: 16,
    width: 207,
    justifyContent: "flex-start"
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
    borderBottomWidth: 1
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
  button: {
    width: 207,
    height: 64,
    backgroundColor: "#ffffff",
    fontSize: 22,
    borderRadius: 36.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 95
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
    gender: state.register.gender,
    height: state.register.height,
    weight: state.register.weight,
    training: state.register.training
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectGender: gender => dispatch(selectGender(gender)),
    setHeight: height => dispatch(setHeight(height)),
    setWeight: weight => dispatch(setWeight(weight)),
    selectTraining: training => dispatch(selectTraining(training)),
    calculateGoal: () => dispatch(calculateGoal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
