import {
  START_CUBE,
  STOP_CUBE
} from '../actions/types';

const INITIAL_STATE = {
  message: "Hello world",
  cubeIsRotating: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case START_CUBE: {
      return {
        ...state,
        cubeIsRotating: true
      }
    }
    case STOP_CUBE: {
      return {
        ...state,
        cubeIsRotating: false
      }
    }
    default:
      return state;
  }
}
