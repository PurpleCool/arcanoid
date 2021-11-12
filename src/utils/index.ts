import { ICoords } from "../types/types";

export function Coords(x1: number, y1: number, x2: number, y2: number): ICoords {
	return { 
		x1: x1,
		y1: y1,
		x2: x2,
		y2: y2,
		
		xCenter: x1 + (x2 - x1) / 2,
		yCenter: y1 + (y2 - y1) / 2,
		width: Math.abs(x2 - x1),
		height: Math.abs(y2 - y1),
	}
}