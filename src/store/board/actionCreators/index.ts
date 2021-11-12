import { ICoords } from "src/types/types";
import { SET_BOARD_COORDS } from "../actions";

export function setBoardCoords(coords: ICoords) {
	return {
		type: SET_BOARD_COORDS, 
		payload: coords,
	}
}