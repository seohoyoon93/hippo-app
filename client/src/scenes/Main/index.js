import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import GestureRecognizer from "react-native-swipe-gestures";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Entypo";

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
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={["#ffffff", "#b7dffd"]}
          style={styles.linearGradient}
        >
          <View style={styles.settingViewStyle}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Settings")}
            >
              <Image
                style={styles.settingImageStyle}
                source={require("../../assets/images/icSetting24.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.textViewStyle}>
            <Text style={styles.textStyle}>알림설정도</Text>
            <Text style={styles.textStyle}>있포!!</Text>
          </View>
          <View style={styles.percentageStyle}>
            <Text style={styles.percentTextStyle}>{percentage}%</Text>
            <Text style={styles.amountTextStyle}>
              {this.state.total}/{this.props.goal}
            </Text>
          </View>
          <View style={styles.buttonAddStyle}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("AddWater")}
            >
              <Image source={require("../../assets/images/btnAdd.png")} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonArrowStyle}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("History")}
            >
              <Icon size={16} name="chevron-down" color="#348dcd" />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              style={styles.hippoStyle}
              source={require("../../assets/images/imgChaV1.png")}
            />
          </View>
        </LinearGradient>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: "center"
  },
  settingViewStyle: {
    position: "absolute",
    top: 48,
    right: 30
  },
  settingImageStyle: {
    width: 24,
    height: 24
  },
  textViewStyle: {
    marginTop: 130
  },
  textStyle: {
    fontSize: 36,
    color: "#348dcd",
    fontFamily: "BMJUAOTF",
    textAlign: "center"
  },
  percentageStyle: {
    position: "absolute",
    top: 177,
    right: 48,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#7dc2f6",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.6
  },
  percentTextStyle: {
    fontSize: 32,
    color: "#ffffff",
    fontFamily: "BMJUAOTF",
    textAlign: "center"
  },
  amountTextStyle: {
    fontSize: 12,
    color: "#ffffff",
    fontFamily: "BMJUAOTF",
    textAlign: "center"
  },
  buttonAddStyle: {
    width: 88,
    height: 98,
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    bottom: 40
  },
  buttonArrowStyle: {
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    bottom: 30
  },
  hippoStyle: {
    // position: "absolute",
    // left: 0,
    // right: 0,
    // marginLeft: "auto",
    // marginRight: "auto",
    // bottom: 0,
    // height: 588,
    // width: 315
  }
});

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
