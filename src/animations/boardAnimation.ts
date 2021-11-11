import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { animate } from ".";
import { setBoardCoords } from "../store/board/actionCreators";
import { Coords, ICoords } from "../types/types";

export function setCoords (coords: ICoords, setter: any) {
	boardCoords  = coords
	coordsSetter = (value) => {
		boardCoords = value;
		setter(value);
	};
}

export let boardMovingStep: number = 0;
setBoardMovingStep();

let boardCoords: ICoords = Coords(0, 0, 0, 0);
let coordsSetter = (coords: ICoords) => {};


export function setBoardMovingStep(value: number = 10): number {
	boardMovingStep = value;
	return value;
}

export function moveBoardRight(step: number = boardMovingStep): void {
	console.log(step)	;
	let newX2: number = boardCoords.x2 + step;
	let gameFieldWidth: number = document.getElementsByClassName('game-field')[0]?.clientWidth || 0;

	if (gameFieldWidth && newX2 > gameFieldWidth) newX2 = gameFieldWidth;

	const coords = Coords(newX2 - boardCoords.width, boardCoords.y1, newX2, boardCoords.y2);
	coordsSetter(coords);
}

export function moveBoardLeft(step: number = boardMovingStep):void {		
	const newX1: number = Math.max(boardCoords.x1 - step, 0);
	const coords = Coords(newX1, boardCoords.y1, newX1 + boardCoords.width, boardCoords.y2);
	coordsSetter(coords);
}

export function animateMoveRight(step: number = boardMovingStep): void {
	animate(
		{
			timing: timeFraction => timeFraction,
			draw: step ? () => { moveBoardRight(step) } : moveBoardRight,
			duration: 150,
		}
	);
}

export function animateMoveLeft(step: number = boardMovingStep): void {
	// debugger
	animate(
		{
			timing: timeFraction => timeFraction,
			draw: step ? () => { moveBoardLeft(step) } : moveBoardLeft,
			duration: 150,
		}
	);
}

export function animateMovement(x: number, compareX: number): void {
	let diff = Math.abs(x - compareX);
	let step = Math.min( boardMovingStep, diff );
	if (x < compareX) {
		animateMoveRight(step)
	} else {
		animateMoveLeft(step);
	}
}


// export function animateInfiniteMovement(x: number, compareX: number): void {
// 	// TODO
// 	let diff = Math.abs(x - compareX);
// 	let step = Math.min( boardMovingStep, diff );
// 	if (x < compareX) {
// 		animateMoveRight(step)
// 	} else {
// 		animateMoveLeft(step);
// 	}
// }