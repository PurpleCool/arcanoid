import { ICoords } from "src/types/types";
import { Coords } from "src/utils";
import { SET_BOARD_COORDS } from "./actions";

interface IBoardState {
  coords: ICoords
}

interface IBoardAction {
  type: string;
  payload: IBoardState;
}

const defaultState: IBoardState = {
  coords: Coords(0, 0, 0, 0)
}

export const boardReducer = (state = defaultState, action: IBoardAction) => {
  switch (action.type) {
    case SET_BOARD_COORDS:
      return {...state, coords: {...state.coords, ...action.payload}}
    default:
      return state;
  }
}
