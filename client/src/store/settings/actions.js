import {
  GET_USER_SETTING,
  SAVE_GOAL,
  SET_NOTI_ALLOWANCE,
  SET_NOTI_START_TIME,
  SET_NOTI_END_TIME,
  SET_NOTI_PERIOD
} from "./actionTypes";

export const getUserSetting = data => {
  return dispatch => {
    dispatch({ type: GET_USER_SETTING, data });
  };
};

export const saveGoal = obj => {
  return (dispatch, getState) => {
    const { user_id } = getState().settings;
    dispatch({ type: SAVE_GOAL, obj });
    return fetch(`http://localhost:5000/api/v1/users/${user_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        unit: obj.unit,
        gender: obj.gender,
        height: parseInt(obj.height),
        weight: parseInt(obj.weight),
        goal: parseInt(obj.goal),
        training: obj.training
      })
    });
  };
};

export const setNotiAllowance = () => {
  return (dispatch, getState) => {
    const { user_id, allowed_notification } = getState().settings;
    dispatch({ type: SET_NOTI_ALLOWANCE });
    return fetch(`http://localhost:5000/api/v1/users/${user_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        allowed_notification: !allowed_notification
      })
    });
  };
};

export const setNotiStartTime = time => {
  return (dispatch, getState) => {
    const { user_id } = getState().settings;
    dispatch({ type: SET_NOTI_START_TIME, time });
    return fetch(`http://localhost:5000/api/v1/users/${user_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        notification_start_time: time
      })
    });
  };
};

export const setNotiEndTime = time => {
  return (dispatch, getState) => {
    const { user_id } = getState().settings;
    dispatch({ type: SET_NOTI_END_TIME, time });
    return fetch(`http://localhost:5000/api/v1/users/${user_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        notification_end_time: time
      })
    });
  };
};

export const setNotiPeriod = period => {
  return (dispatch, getState) => {
    const { user_id } = getState().settings;
    dispatch({ type: SET_NOTI_PERIOD, period });
    return fetch(`http://localhost:5000/api/v1/users/${user_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        notification_period: period
      })
    });
  };
};
