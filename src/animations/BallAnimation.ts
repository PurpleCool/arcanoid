import { GAME_ELEMENTS } from "src/const";
import { ICoords, ISpeed } from "src/types/types";
import { Coords } from "src/utils";
import { animate } from ".";
import { BasicAnimation } from "./Animation";

export class BallAnimation extends BasicAnimation {

	defaultSpeed: ISpeed;
	speed: ISpeed;
	gameOver: boolean;
	
	constructor(coords: ICoords, setter: any) {
		super(coords, setter);

		this.defaultSpeed = { x: -4, y: -4 }
		this.speed = this.defaultSpeed;

		this.gameOver = false;
	}

	setSpeed(speed: ISpeed = this.defaultSpeed) {
		this.speed = speed;
	}
	
	moveTo(x1: number, y1: number) {
		x1 = Math.max(x1, 0);
		y1 = Math.max(y1, 0);

		let x2: number = x1 + this.coords.width;
		let y2: number = y1 + this.coords.height;

		let gameFieldBB = GAME_ELEMENTS?.gameField?.getBoundingClientRect();
		if (!gameFieldBB) return;

		let gameFieldWidth: number  = gameFieldBB.width;
		let gameFieldHeight: number = gameFieldBB.height;

		if (gameFieldWidth && x2 > gameFieldWidth) {
			x2 = gameFieldWidth;
			x1 = Math.max(x2 - this.coords.width, 0);
		}

		if (gameFieldWidth && y2 > gameFieldWidth) {
			y2 = gameFieldHeight;
			y1 = Math.max(y2 - this.coords.height, 0);
		}

		const coords = Coords(x1, y1, x2, y2);
		this.coordsSetter(coords);
	}
}