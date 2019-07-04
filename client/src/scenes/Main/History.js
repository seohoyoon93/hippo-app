import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import GestureRecognizer from "react-native-swipe-gestures";

import { mapDayNumToString } from "../../helpers";

class History extends Component {
  constructor(props) {
    super(props);

    const date = new Date();
    const from =
      new Date(date.getTime() - 10 * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0) /
      1000;

    this.state = {
      waters: [],
      selected: 0,
      from
    };
  }
  async componentDidMount() {
    const id = await AsyncStorage.getItem("user_id");
    const from = this.state.from;
    fetch(`http://localhost:5000/api/v1/drinks?id=${id}&from=${from}`).then(
      res =>
        res.json().then(data => {
          let waters = this.state.waters;
          let i = 0;
          while (data[i] !== undefined) {
            const ref = new Date(data[i].created_at);
            const date = ref.getDate();
            const day = ref.getDay();
            let waterOfTheDay = waters.filter(item => item.date === date)[0];
            let indexOfTheDay = waters.findIndex(item => item.date === date);
            if (waterOfTheDay === undefined) {
              waters.push({
                date: date,
                day: day,
                amount: data[i].amount,
                key: ref.getTime()
              });
            } else {
              waterOfTheDay = {
                ...waterOfTheDay,
                amount: waterOfTheDay.amount + data[i].amount
              };
              waters.splice(indexOfTheDay, 1, waterOfTheDay);
            }
            i++;
          }
          this.setState({ waters });
        })
    );
  }
  fetchMoreData() {
    const to = this.state.from;
    const from = new Date(to * 1000 - 10 * 24 * 60 * 60 * 1000).setHours(
      0,
      0,
      0,
      0
    );
    fetch(
      `http://localhost:5000/api/v1/drinks?id=${id}&from=${from}&to=${to}`
    ).then(res =>
      res.json().then(data => {
        let waters = this.state.waters;
        let i = 0;
        while (data[i] !== undefined) {
          const ref = new Date(data[i].created_at);
          const date = ref.getDate();
          const day = ref.getDay();
          let waterOfTheDay = waters.filter(item => item.date === date)[0];
          let indexOfTheDay = waters.findIndex(item => item.date === date);
          if (waterOfTheDay === undefined) {
            waters.push({
              date: date,
              day: day,
              amount: data[i].amount,
              key: ref.getTime()
            });
          } else {
            waterOfTheDay = {
              ...waterOfTheDay,
              amount: waterOfTheDay.amount + data[i].amount
            };
            waters.splice(indexOfTheDay, 1, waterOfTheDay);
          }
          i++;
        }
        this.setState({ waters });
      })
    );
    this.setState({ from });
  }
  render() {
    const charts = this.state.waters.map(item => {
      const heightRatio = item.amount / this.props.goal;
      return (
        <View
          key={item.key}
          style={{ height: 374, width: 21, alignItems: "center" }}
        >
          <View
            style={{
              height: 327 * heightRatio,
              width: 2,
              backgroundColor: "#ffffff",
              alignSelf: "center"
            }}
          />
          <Text>{item.date}</Text>
          <Text>{mapDayNumToString(item.day)}</Text>
        </View>
      );
    });
    const selectedItem = this.state.waters[this.state.selected];
    const amount = selectedItem !== undefined ? selectedItem.amount : "";
    return (
      <GestureRecognizer
        onSwipeDown={() => {
          this.props.navigation.navigate("Main");
        }}
        style={{ flex: 1, backgroundColor: "#bde3fc" }}
      >
        <View style={{ marginTop: 100 }}>
          <Button
            title="홈"
            onPress={() => this.props.navigation.navigate("Main")}
          />
          <Text>{amount}</Text>
          <View style={{ flexDirection: "row" }}>{charts}</View>
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

export default connect(mapStateToProps)(History);
