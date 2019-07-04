import {
  SELECT_UNIT,
  SELECT_GENDER,
  SET_HEIGHT,
  SET_WEIGHT,
  SELECT_TRAINING,
  CALCULATE_GOAL,
  SET_GOAL,
  REGISTER
} from "./actionTypes";

const initialState = {
  unit: "metric",
  gender: "male",
  height: "",
  weight: "",
  training: "breath",
  goal: ""
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_UNIT:
      return {
        ...state,
        unit: action.unit
      };

    case SELECT_GENDER:
      return {
        ...state,
        gender: action.gender
      };

    case SET_HEIGHT:
      return {
        ...state,
        height: action.height
      };

    case SET_WEIGHT:
      return {
        ...state,
        weight: action.weight
      };

    case SELECT_TRAINING:
      return {
        ...state,
        training: action.training
      };

    case SET_HEIGHT:
      return {
        ...state,
        height: action.height
      };

    case CALCULATE_GOAL:
      return {
        ...state,
        goal: action.goal
      };

    case SET_GOAL:
      return {
        ...state,
        height: action.goal
      };

    case REGISTER:
      return state;

    default:
      return state;
  }
};

export default registerReducer;
