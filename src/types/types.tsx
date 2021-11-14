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

export interface ISpeed {
	x: number;
	y: number;
}

export interface IAnimateParams {
	timing(timeFraction: number): number;
	draw(progress: number, animationId: number | null): void | boolean;
	duration?: number,
}

export interface ISVGElements {
  [index: string]: any;
}

export interface IGameElements {
	gameField: SVGSVGElement | null,
	board: SVGRectElement | null,
	ball: SVGRectElement | null,
}

export interface IGameElementsBBOX {
	gameField: SVGRect | null,
	board: SVGRect | null,
	ball: SVGRect | null,
}