import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, Picker, Button } from "react-native";

import { selectUnit } from "../../store/register/actions";

class UnitSetting extends Component {
  render() {
    return (
      <View>
        <Text>히포가 도와주기 앞서 기본 설정을</Text>
        <Text>선택해주세요 :D</Text>
        <Picker
          selectedValue={this.props.unit}
          onValueChange={unit => {
            this.props.selectUnit(unit);
          }}
        >
          <Picker.Item label="미터법" value="metric" />
          <Picker.Item label="미국 단위계" value="american" />
        </Picker>
        <Button
          title="다음"
          onPress={() => this.props.navigation.navigate("UserInfo")}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    unit: state.register.unit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectUnit: unit => dispatch(selectUnit(unit))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitSetting);
