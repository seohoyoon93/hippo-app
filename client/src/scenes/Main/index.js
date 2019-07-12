import React, { Component } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import GestureRecognizer from "react-native-swipe-gestures";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Entypo";
import RNPickerSelect from "react-native-picker-select";

import { fetchedGoal, setAmount } from "../../store/main/actions";
import { addWater } from "../../api";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waters: [],
      total: 0,
      modalVisible: false
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
    let waterArray = [];

    for (i = 2; i <= 40; i++) {
      let value = i * 25;
      let label = value.toString() + "ml";
      let obj = { label, value: value.toString() };
      waterArray.push(obj);
    }
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
              onPress={() =>
                this.setState({ modalVisible: !this.state.modalVisible })
              }
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
          <View style={styles.hippoStyle}>
            <Image source={require("../../assets/images/imgChaV1.png")} />
          </View>
        </LinearGradient>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.modalViewStyle}>
            <View style={styles.transparentBg} />
            <View style={styles.modalCloseBtnViewStyle}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({ modalVisible: !this.state.modalVisible })
                }
              >
                <Image source={require("../../assets/images/icCloseWon.png")} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContentStyle}>
              <View style={styles.modalCupViewStyle}>
                <TouchableOpacity>
                  <Icon name="chevron-left" size={16} color="#348dcd" />
                </TouchableOpacity>
                <Image
                  style={styles.modalImageStyle}
                  source={require("../../assets/images/icCup1300.png")}
                />
                <TouchableOpacity>
                  <Icon name="chevron-right" size={16} color="#348dcd" />
                </TouchableOpacity>
              </View>
              <View style={styles.modalSliderViewStyle}>
                <RNPickerSelect
                  placeholder={{ label: "얼마나 마셨어포?", value: null }}
                  items={waterArray}
                  onValueChange={amount => this.props.setAmount(amount)}
                  style={pickerSelectStyles}
                  value={this.props.amount}
                />
              </View>
              <View style={styles.modalBtnViewStyle}>
                <TouchableOpacity
                  style={styles.modalBtnAdd}
                  onPress={() => {
                    addWater(this.props.amount);
                  }}
                >
                  <Text style={styles.modalBtnText}>꿀꺽</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
    );
  }
}

const pickerSelectStyles = {
  inputIOS: {
    width: 207,
    height: 44,
    textAlign: "center",
    color: "#348dcd",
    fontSize: 24,
    fontFamily: "BMJUAOTF",
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12
  },
  inputAndroid: {
    width: 207,
    height: 44,
    textAlign: "center",
    color: "#348dcd",
    fontSize: 24,
    fontFamily: "BMJUAOTF"
  },
  placeholderColor: "white"
};

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

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
    top: 187,
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
    position: "absolute",
    bottom: 0,
    height: 588,
    width: 315,
    zIndex: -1
  },
  modalViewStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  transparentBg: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    height: screenHeight,
    width: screenWidth,
    backgroundColor: "#000",
    zIndex: -1,
    opacity: 0.2
  },
  modalContentStyle: {
    width: screenWidth - 20,
    borderRadius: 4,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  modalCupViewStyle: {
    flexDirection: "row",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  modalImageStyle: {
    width: 72,
    height: 72,
    marginRight: 10,
    marginLeft: 10
  },
  modalSliderViewStyle: {
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  modalBtnViewStyle: {
    marginTop: 42,
    marginBottom: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  modalBtnAdd: {
    width: 207,
    height: 64,
    borderRadius: 36.5,
    backgroundColor: "#7dc2f6",
    justifyContent: "center",
    alignItems: "center"
  },
  modalBtnText: {
    fontFamily: "BMJUAOTF",
    fontSize: 20,
    lineHeight: 32,
    color: "#FFF"
  }
});

const mapStateToProps = state => {
  return {
    goal: state.main.goal,
    amount: state.main.amount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchedGoal: goal => dispatch(fetchedGoal(goal)),
    setAmount: amount => dispatch(setAmount(amount))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
