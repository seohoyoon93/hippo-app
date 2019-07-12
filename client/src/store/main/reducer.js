import { SET_AMOUNT, FETCHED_GOAL } from "./actionTypes";

const initialState = {
  amount: null,
  goal: null
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AMOUNT:
      return {
        ...state,
        amount: action.amount
      };

    case FETCHED_GOAL:
      return {
        ...state,
        goal: action.goal
      };

    default:
      return state;
  }
};

export default mainReducer;
