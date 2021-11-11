export interface ICoords {
	x1: number;
	x2: number;
	y1: number;
	y2: number;
	xCenter: number;
	yCenter: number;
	width: number;
	height: number;
}

// export class Coords implements ICoords {
// 	x1: number;
// 	x2: number;
// 	y1: number;
// 	y2: number;
// 	xCenter: number;
// 	yCenter: number;
// 	width: number;
// 	height: number;

// 	constructor(x1: number, y1: number, x2: number, y2: number) { 
// 		this.x1 = x1;
// 		this.y1 = y1;
// 		this.x2 = x2;
// 		this.y2 = y2;
// 		this.xCenter = x1 + (x2 - x1) / 2;
// 		this.yCenter = y1 + (y2 - y1) / 2;
// 		this.width = Math.abs(x2 - x1);
// 		this.height = Math.abs(y2 - y1);
// 	}
// }

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

export interface IAnimateParams {
	timing(timeFraction: number): number;
	draw(progress: number): void;
	duration: number,
}