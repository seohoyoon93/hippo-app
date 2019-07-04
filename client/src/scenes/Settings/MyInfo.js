import React, { Component } from "react";
import { View, Text, Button, Picker, TextInput, Alert } from "react-native";
import { connect } from "react-redux";

import { saveGoal } from "../../store/settings/actions";

class MyInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goal: this.props.goal.toString(),
      height: this.props.height.toString(),
      weight: this.props.weight.toString(),
      gender: this.props.gender,
      unit: this.props.unit,
      training: this.props.training,
      hasChanged: false
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.calculateGoal = this.calculateGoal.bind(this);
    this.setUnit = this.setUnit.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleBlur(e, target) {
    const hasChanged =
      target === "height"
        ? this.state.height !== this.props.height.toString()
        : this.state.weight !== this.props.weight.toString();
    if (hasChanged) {
      Alert.alert(
        "일일목표량을 변경하시겠어요?",
        "입력한 정보로 일일목표량을 새로 계산했어요! 변경하시겠어요?",
        [
          { text: "확인", onPress: () => this.calculateGoal() },
          { text: "취소" }
        ],
        { cancelable: false }
      );
      this.setState({ hasChanged });
    }
  }

  calculateGoal() {
    const heightInt =
      this.state.unit === "metric"
        ? parseInt(this.state.height)
        : parseInt(this.state.height) * 2.54;
    const weightInt =
      this.state.unit === "metric"
        ? parseInt(this.state.weight)
        : parseInt(this.state.weight) * 2.2;

    let goal = Math.floor((heightInt + weightInt) / 10) * 100;

    if (this.props.training === "normal") {
      goal += Math.floor((800 * (weightInt / 75)) / 100) * 100;
    }

    if (this.props.training === "intense") {
      goal += Math.floor((1200 * (weightInt / 75)) / 100) * 100;
    }
    goal = goal.toString();

    this.setState({ goal });
  }

  setUnit(unit) {
    if (unit === "metric") {
      height = Math.floor(parseInt(this.state.height) * 2.54).toString();
      weight = Math.floor(parseInt(this.state.weight) * 2.54).toString();
      goal = Math.floor(parseInt(this.state.goal) * 29.5735).toString();

      this.setState({
        ...state,
        height,
        weight,
        goal
      });
    } else {
      height = Math.floor(parseInt(this.state.height) / 2.54).toString();
      weight = Math.floor(parseInt(this.state.weight) / 2.54).toString();
      goal = Math.floor(parseInt(this.state.goal) / 29.5735).toString();

      this.setState({
        ...state,
        height,
        weight,
        goal
      });
    }
  }

  handleBack() {
    console.log(this.state.hasChanged);
    if (this.state.hasChanged) {
      Alert.alert(
        "앗! 아직 저장되지 않았어요",
        "변경한 정보를 저장하시겠어요?",
        [
          {
            text: "확인",
            onPress: () => {
              this.props.saveGoal(this.state);
              this.props.navigation.navigate("Settings");
            }
          },
          {
            text: "취소",
            onPress: () => this.props.navigation.navigate("Settings")
          }
        ],
        { cancelable: false }
      );
    } else {
      this.props.navigation.navigate("Settings");
    }
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 120 }}>
        <View style={{ flexDirection: "row" }}>
          <Button title="뒤로" onPress={this.handleBack} />
          <Text>내 정보</Text>
          <Button
            title="저장"
            onPress={() => this.props.saveGoal(this.state)}
          />
        </View>
        <View>
          <Text>목표</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>일일목표량</Text>
            <TextInput
              value={this.state.goal}
              onChangeText={goal => this.setState({ goal })}
            />
          </View>
          <Text>
            키와 몸무게를 입력하면 일일기준량이 자동으로 계산되며, 직접 입력도
            가능합니다 :)
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text>성별</Text>
            <Picker
              selectedValue={this.state.gender}
              onValueChange={gender => {
                this.setState({ gender });
              }}
            >
              <Picker.Item label="남자" value="male" />
              <Picker.Item label="여자" value="female" />
            </Picker>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>키</Text>
            <TextInput
              value={this.state.height}
              onChangeText={height => {
                this.setState({ height });
              }}
              onBlur={e => this.handleBlur(e, "height")}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>몸무게</Text>
            <TextInput
              value={this.state.weight}
              onChangeText={weight => {
                this.setState({ weight });
              }}
              onBlur={e => this.handleBlur(e, "weight")}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>운동량</Text>
            <Picker
              selectedValue={this.state.training}
              onValueChange={training => {
                this.setState({ training });
              }}
            >
              <Picker.Item label="숨쉬기" value="breath" />
              <Picker.Item label="보통" value="normal" />
              <Picker.Item label="활동적" value="intense" />
            </Picker>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>측정단위</Text>
            <Picker
              selectedValue={this.state.unit}
              onValueChange={unit => {
                this.setUnit(unit);
              }}
            >
              <Picker.Item label="미터법" value="metric" />
              <Picker.Item label="미국 단위계" value="american" />
            </Picker>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    goal: state.settings.goal,
    gender: state.settings.gender,
    height: state.settings.height,
    weight: state.settings.weight,
    training: state.settings.training,
    unit: state.settings.unit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveGoal: obj => dispatch(saveGoal(obj))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyInfo);
