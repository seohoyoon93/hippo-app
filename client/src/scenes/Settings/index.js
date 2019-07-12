import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Entypo";

import { getUserSetting } from "../../store/settings/actions";

class Settings extends Component {
  async componentDidMount() {
    const id = await AsyncStorage.getItem("user_id");

    fetch(`http://localhost:5000/api/v1/users/${id}`).then(res =>
      res.json().then(user => {
        this.props.getUserSetting(user[0]);
      })
    );
  }
  render() {
    return (
      <LinearGradient
        colors={["#ffffff", "#d2f3fc"]}
        style={styles.linearGradient}
      >
        <View style={styles.container}>
          <View style={styles.headerViewStyle}>
            <Text style={styles.headerTextStyle}>설정</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Main")}
            >
              <Image
                style={styles.closeImageStyle}
                source={require("../../assets/images/icClose24.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.settingBlockStyle}>
            <Text style={styles.settingLabelStyle}>기본 정보</Text>
            <View style={styles.settingBtnViewStyle}>
              <TouchableOpacity
                style={styles.settingBtnStyle}
                onPress={() => this.props.navigation.navigate("MyInfo")}
              >
                <Text style={styles.settingTextStyle}>내 정보</Text>
                <Icon name="chevron-right" color="#348dcd" size={16} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.settingBlockStyle}>
            <Text style={styles.settingLabelStyle}>알림</Text>
            <View style={styles.settingBtnViewStyle}>
              <TouchableOpacity
                style={styles.settingBtnStyle}
                onPress={() => this.props.navigation.navigate("Notification")}
              >
                <Text style={styles.settingTextStyle}>알림</Text>
                <Icon name="chevron-right" color="#348dcd" size={16} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: "center"
  },
  container: {
    flex: 1,
    alignItems: "center"
  },
  headerViewStyle: {
    width: screenWidth,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 84,
    paddingRight: 30,
    paddingTop: 57
  },
  headerTextStyle: {
    fontFamily: "BMJUAOTF",
    color: "#348dcd",
    fontSize: 20
  },
  closeImageStyle: {
    width: 24,
    height: 24
  },
  settingBlockStyle: {
    marginTop: 10,
    paddingTop: 6,
    paddingLeft: 84,
    width: screenWidth
  },
  settingLabelStyle: {
    fontFamily: "BMJUAOTF",
    fontSize: 12,
    color: "#999999",
    lineHeight: 20
  },
  settingBtnViewStyle: {
    width: screenWidth - 114,
    height: 55,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e7e7e7"
  },
  settingBtnStyle: {
    width: screenWidth - 114,
    height: 55,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  settingTextStyle: {
    fontFamily: "BMJUAOTF",
    fontSize: 16,
    color: "#348dcd"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    getUserSetting: data => dispatch(getUserSetting(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Settings);
