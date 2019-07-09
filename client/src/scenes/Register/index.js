import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }
  onPress() {
    this.props.navigation.navigate("UnitSetting");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 159 }}>
            <Text style={styles.header}>물 마시고</Text>
            <Text style={styles.header}>건강하게 :)</Text>
          </View>
          <View style={{ marginTop: 28 }}>
            <Text style={styles.description}>목표 설정을 위해</Text>
            <Text style={styles.description}>간단한 정보 입력할게요</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={this.onPress} style={styles.button}>
            <Text style={styles.buttonText}>시작하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7dc2f6",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 36,
    color: "#ffffff",
    fontFamily: "BMJUAOTF",
    textAlign: "center"
  },
  description: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "BMJUAOTF",
    textAlign: "center"
  },
  button: {
    width: 207,
    height: 64,
    backgroundColor: "#ffffff",
    fontSize: 22,
    borderRadius: 36.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 169
  },
  buttonText: {
    fontSize: 20,
    color: "#348dcd",
    fontFamily: "BMJUAOTF",
    textAlign: "center"
  }
});
