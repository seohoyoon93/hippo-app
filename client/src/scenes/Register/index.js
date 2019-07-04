import React, { Component } from "react";
import { View, Text, Button, StyleSheet, NativeModules } from "react-native";

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
          <View style={{ marginTop: 129 }}>
            <Text style={styles.header}>물 마시고</Text>
            <Text style={styles.header}>건강하게 :)</Text>
          </View>
          <View style={{ marginTop: 28 }}>
            <Text style={styles.description}>목표 설정을 위해</Text>
            <Text style={styles.description}>간단한 정보 입력할게요</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="시작하기"
            onPress={this.onPress}
            style={styles.button}
          />
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
    fontSize: 30,
    color: "#ffffff"
  },
  description: {
    fontSize: 15,
    color: "#ffffff"
  },
  button: {
    width: 207,
    height: 64,
    backgroundColor: "#ffffff",
    fontSize: 22,
    borderRadius: 36.5
  }
});
