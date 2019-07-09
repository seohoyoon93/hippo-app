import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/Entypo";

import { selectUnit } from "../../store/register/actions";

const items = [
  {
    label: "미터법",
    value: "metric"
  },
  {
    label: "미국 단위계",
    value: "american"
  }
];
class UnitSetting extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>히포가 도와주기 앞서 기본 설정을</Text>
        <Text style={styles.textStyle}>선택해주세요 :D</Text>
        <View style={styles.pickerViewStyle}>
          <Text style={styles.labelStyle}>측정단위</Text>
          <RNPickerSelect
            placeholder={{}}
            items={items}
            onValueChange={unit => {
              this.props.selectUnit(unit);
            }}
            style={pickerSelectStyles}
            value={this.props.unit}
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("UserInfo")}
        >
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const pickerSelectStyles = {
  inputIOS: {
    width: 207,
    height: 48,
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
    height: 48,
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
    marginTop: 56,
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
  button: {
    width: 207,
    height: 64,
    backgroundColor: "#ffffff",
    fontSize: 22,
    borderRadius: 36.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 235
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
