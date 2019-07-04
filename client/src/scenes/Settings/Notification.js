import React, { Component } from "react";
import { View, Text, Button, Switch, Picker } from "react-native";
import { connect } from "react-redux";

import {
  setNotiAllowance,
  setNotiEndTime,
  setNotiPeriod,
  setNotiStartTime
} from "../../store/settings/actions";

class Notification extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1, marginTop: 120 }}>
        <View style={{ flexDirection: "row" }}>
          <Button
            title="뒤로"
            onPress={() => this.props.navigation.navigate("Settings")}
          />
          <Text>알림</Text>
        </View>
        <View>
          <Text>알림</Text>
          <Switch
            value={this.props.allowed_notification}
            onValueChange={() => this.props.setNotiAllowance()}
          />
        </View>
        <View>
          <Text>알림빈도</Text>
          <Picker
            selectedValue={this.props.notification_period}
            onValueChange={value => this.props.setNotiPeriod(value)}
          >
            <Picker.Item label="1시간 마다" value={1} />
            <Picker.Item label="2시간 마다" value={2} />
            <Picker.Item label="3시간 마다" value={3} />
            <Picker.Item label="4시간 마다" value={4} />
            <Picker.Item label="5시간 마다" value={5} />
            <Picker.Item label="6시간 마다" value={6} />
          </Picker>
        </View>
        <View>
          <Text>알림시간</Text>
        </View>
        <View>
          <Text>시작시간</Text>
          <Picker
            selectedValue={this.props.notification_start_time}
            onValueChange={value => this.props.setNotiStartTime(value)}
          >
            <Picker.Item label="00시" value={0} />
            <Picker.Item label="01시" value={1} />
            <Picker.Item label="02시" value={2} />
            <Picker.Item label="03시" value={3} />
            <Picker.Item label="04시" value={4} />
            <Picker.Item label="05시" value={5} />
            <Picker.Item label="06시" value={6} />
            <Picker.Item label="07시" value={7} />
            <Picker.Item label="08시" value={8} />
            <Picker.Item label="09시" value={9} />
            <Picker.Item label="10시" value={10} />
            <Picker.Item label="11시" value={11} />
            <Picker.Item label="12시" value={12} />
            <Picker.Item label="13시" value={13} />
            <Picker.Item label="14시" value={14} />
            <Picker.Item label="15시" value={15} />
            <Picker.Item label="16시" value={16} />
            <Picker.Item label="17시" value={17} />
            <Picker.Item label="18시" value={18} />
            <Picker.Item label="19시" value={19} />
            <Picker.Item label="20시" value={20} />
            <Picker.Item label="21시" value={21} />
            <Picker.Item label="22시" value={22} />
            <Picker.Item label="23시" value={23} />
          </Picker>
        </View>
        <View>
          <Text>종료시간</Text>
          <Picker
            selectedValue={this.props.notification_end_time}
            onValueChange={value => this.props.setNotiEndTime(value)}
          >
            <Picker.Item label="00시" value={0} />
            <Picker.Item label="01시" value={1} />
            <Picker.Item label="02시" value={2} />
            <Picker.Item label="03시" value={3} />
            <Picker.Item label="04시" value={4} />
            <Picker.Item label="05시" value={5} />
            <Picker.Item label="06시" value={6} />
            <Picker.Item label="07시" value={7} />
            <Picker.Item label="08시" value={8} />
            <Picker.Item label="09시" value={9} />
            <Picker.Item label="10시" value={10} />
            <Picker.Item label="11시" value={11} />
            <Picker.Item label="12시" value={12} />
            <Picker.Item label="13시" value={13} />
            <Picker.Item label="14시" value={14} />
            <Picker.Item label="15시" value={15} />
            <Picker.Item label="16시" value={16} />
            <Picker.Item label="17시" value={17} />
            <Picker.Item label="18시" value={18} />
            <Picker.Item label="19시" value={19} />
            <Picker.Item label="20시" value={20} />
            <Picker.Item label="21시" value={21} />
            <Picker.Item label="22시" value={22} />
            <Picker.Item label="23시" value={23} />
          </Picker>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    allowed_notification: state.settings.allowed_notification,
    notification_start_time: state.settings.notification_start_time,
    notification_end_time: state.settings.notification_end_time,
    notification_period: state.settings.notification_period
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNotiAllowance: () => dispatch(setNotiAllowance()),
    setNotiStartTime: time => dispatch(setNotiStartTime(time)),
    setNotiEndTime: time => dispatch(setNotiEndTime(time)),
    setNotiPeriod: period => dispatch(setNotiPeriod(period))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
