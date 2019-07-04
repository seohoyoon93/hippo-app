import AsyncStorage from "@react-native-community/async-storage";

export const register = async userData => {
  const {
    unit,
    gender,
    height,
    weight,
    training,
    goal,
    lang,
    device_id
  } = userData;

  fetch("http://localhost:5000/api/v1/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      unit,
      gender,
      height: parseInt(height),
      weight: parseInt(weight),
      training,
      goal: parseInt(goal),
      lang,
      allowed_notification: false,
      device_id
    })
  }).then(res => {
    res.text().then(id => {
      AsyncStorage.setItem("isFirst", "false");
      AsyncStorage.setItem("user_id", id);
    });
  });
};

export const addWater = async amountStr => {
  const amount = parseInt(amountStr);
  const user_id = await AsyncStorage.getItem("user_id");
  fetch("http://localhost:5000/api/v1/drinks", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id,
      amount
    })
  });
};
