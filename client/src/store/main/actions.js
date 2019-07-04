import { SET_AMOUNT, FETCHED_GOAL } from "./actionTypes";

export const setAmount = amount => {
  return dispatch => {
    dispatch({ type: SET_AMOUNT, amount });
  };
};

export const fetchedGoal = goal => {
  return dispatch => {
    dispatch({ type: FETCHED_GOAL, goal });
  };
};
