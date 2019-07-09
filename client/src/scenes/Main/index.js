import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import GestureRecognizer from "react-native-swipe-gestures";

import { fetchedGoal } from "../../store/main/actions";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waters: [],
      total: 0
    };
  }
  async componentDidMount() {
    const id = await AsyncStorage.getItem("user_id");
    const from = new Date().setHours(0, 0, 0, 0) / 1000;
    fetch(`http://localhost:5000/api/v1/drinks?id=${id}&from=${from}`).then(
      res =>
        res.json().then(waters => {
          let total = 0;
          waters.forEach(item => {
            total += item.amount;
          });
          this.setState({ total, waters });
        })
    );
    fetch(`http://localhost:5000/api/v1/users/${id}`).then(res =>
      res.json().then(user => {
        this.props.fetchedGoal(user[0].goal);
      })
    );
  }

  render() {
    const percentage = Math.floor((this.state.total / this.props.goal) * 100);
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
      <GestureRecognizer
        onSwipeUp={() => {
          this.props.navigation.navigate("History");
        }}
        config={config}
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor
        }}
      >
        <View style={{ marginTop: 30 }}>
          <Button
            title="설정"
            onPress={() => this.props.navigation.navigate("Settings")}
          />
          <View>
            <Text style={{ fontFamily: "BMJUAOTF" }}>알림설정도</Text>
            <Text>있포!!</Text>
          </View>
          <Text>{percentage}%</Text>
          <Button
            title="마셔"
            onPress={() => this.props.navigation.navigate("AddWater")}
          />
          <Button
            title="차트"
            onPress={() => this.props.navigation.navigate("History")}
          />
        </View>
      </GestureRecognizer>
    );
  }
}

const mapStateToProps = state => {
  return {
    goal: state.main.goal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchedGoal: goal => dispatch(fetchedGoal(goal))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
