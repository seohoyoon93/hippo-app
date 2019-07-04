import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";

import { setAmount } from "../../store/main/actions";
import { addWater } from "../../api";

class AddWater extends Component {
  render() {
    return (
      <View style={{ marginTop: 50 }}>
        <Text> AddWater </Text>
        <TextInput
          value={this.props.amount}
          onChangeText={amount => {
            this.props.setAmount(amount);
          }}
        />
        <Button
          title="꿀꺽"
          onPress={() => {
            addWater(this.props.amount);
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    amount: state.main.amount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAmount: amount => dispatch(setAmount(amount))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddWater);
