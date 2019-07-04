import {
  SELECT_UNIT,
  SELECT_GENDER,
  SET_HEIGHT,
  SET_WEIGHT,
  SELECT_TRAINING,
  CALCULATE_GOAL,
  SET_GOAL
} from "./actionTypes";

export const selectUnit = unit => {
  return dispatch => {
    dispatch({ type: SELECT_UNIT, unit });
  };
};

export const selectGender = gender => {
  return dispatch => {
    dispatch({ type: SELECT_GENDER, gender });
  };
};

export const setHeight = height => {
  return dispatch => {
    dispatch({ type: SET_HEIGHT, height });
  };
};

export const setWeight = weight => {
  return dispatch => {
    dispatch({ type: SET_WEIGHT, weight });
  };
};

export const selectTraining = training => {
  return dispatch => {
    dispatch({ type: SELECT_TRAINING, training });
  };
};

export const calculateGoal = () => {
  return (dispatch, getState) => {
    const { unit, height, weight, training } = getState().register;

    const heightInt =
      unit === "metric" ? parseInt(height) : parseInt(height) * 2.54;
    const weightInt =
      unit === "metric" ? parseInt(weight) : parseInt(weight) * 2.2;

    let goal = Math.floor((heightInt + weightInt) / 10) * 100;

    if (training === "normal") {
      goal += Math.floor((800 * (weightInt / 75)) / 100) * 100;
    }

    if (training === "intense") {
      goal += Math.floor((1200 * (weightInt / 75)) / 100) * 100;
    }
    goal = goal.toString();

    dispatch({ type: CALCULATE_GOAL, goal });
  };
};

export const setGoal = goal => {
  return dispatch => {
    dispatch({ type: SET_GOAL, goal });
  };
};
