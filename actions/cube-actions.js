import {
  START_CUBE,
  STOP_CUBE
} from './types';

export const startCube = payload => ({ type: START_CUBE, payload: payload });
export const stopCube = payload => ({ type: STOP_CUBE, payload: payload });
