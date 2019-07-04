import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, Picker, TextInput, Button } from "react-native";

import {
  selectGender,
  setHeight,
  setWeight,
  selectTraining,
  calculateGoal
} from "../../store/register/actions";

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.onPressNext = this.onPressNext.bind(this);
  }
  async onPressNext() {
    this.props.calculateGoal();
    await this.props.navigation.navigate("Goal");
  }

  render() {
    return (
      <View>
        <Text>키와 몸무게를 입력하면</Text>
        <Text>히포가 신체에 맞는 일일목표량 설</Text>
        <Text>정을 도와줄게요</Text>
        <View>
          <Text>성별</Text>
          <Picker
            selectedValue={this.props.gender}
            onValueChange={gender => {
              this.props.selectGender(gender);
            }}
          >
            <Picker.Item label="남자" value="male" />
            <Picker.Item label="여자" value="female" />
          </Picker>
        </View>
        <View>
          <Text>키</Text>
          <TextInput
            value={this.props.height}
            onChangeText={height => {
              this.props.setHeight(height);
            }}
          />
        </View>
        <View>
          <Text>몸무게</Text>
          <TextInput
            value={this.props.weight}
            onChangeText={weight => {
              this.props.setWeight(weight);
            }}
          />
        </View>
        <View>
          <Text>운동량</Text>
          <Picker
            selectedValue={this.props.training}
            onValueChange={training => {
              this.props.selectTraining(training);
            }}
          >
            <Picker.Item label="숨쉬기" value="breath" />
            <Picker.Item label="보통" value="normal" />
            <Picker.Item label="활동적" value="intense" />
          </Picker>
        </View>
        <Button title="다음" onPress={this.onPressNext} />
      </View>
    );
  }
}

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
