import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

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
      <View style={{ flex: 1, backgroundColor: "#d2f3fc", paddingTop: 100 }}>
        <View style={{ flexDirection: "row" }}>
          <Text>설정</Text>
          <Button
            title="홈"
            onPress={() => this.props.navigation.navigate("Main")}
          />
        </View>
        <View>
          <Text>기본 정보</Text>
          <Button
            title="내 정보"
            onPress={() => this.props.navigation.navigate("MyInfo")}
          />
        </View>
        <View>
          <Text>알림</Text>
          <Button
            title="알림"
            onPress={() => this.props.navigation.navigate("Notification")}
          />
        </View>
        {/* <View>
          <Text>앱 정보</Text>
          <Button
            title="언어"
            onPress={() => this.props.navigation.navigate("Language")}
          />
        </View> */}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserSetting: data => dispatch(getUserSetting(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Settings);
