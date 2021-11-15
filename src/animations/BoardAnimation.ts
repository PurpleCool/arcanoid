// import { ICoords } from "src/types/types";
import { GAME_ELEMENTS } from "src/const";
import { Coords } from "src/utils";
import { animate } from ".";
import { BasicAnimation } from "./Animation";

export class BoardAnimation extends BasicAnimation {
	// constructor(coords: ICoords, setter?: any) {
	// 	super(coords, setter);
	// }
	
	
	moveRight(step: number = this.movingStep): void {
		// let newX2: number = this.coords.x2 + step;
		let bbox = GAME_ELEMENTS.board?.getBBox() || new SVGRect();
		let newX2: number = Math.max( (bbox.x + bbox.width) + step, 0);

		let gameFieldWidth: number = document.getElementsByClassName('game-field')[0]?.clientWidth || 0;

		if (gameFieldWidth && newX2 > gameFieldWidth) newX2 = gameFieldWidth;

		const coords = Coords(newX2 - this.coords.width, this.coords.y1, newX2, this.coords.y2);
		this.coordsSetter(coords);
	}

	moveLeft(step: number = this.movingStep):void {		
		// const newX1: number = Math.max(this.coords.x1 - step, 0);

		let bbox = GAME_ELEMENTS.board?.getBBox() || new SVGRect();
		const newX1: number = Math.max(bbox.x - step, 0);
		const coords = Coords(newX1, this.coords.y1, newX1 + this.coords.width, this.coords.y2);
		this.coordsSetter(coords);
	}

	animateMoveRight(step: number = this.movingStep): void {
		animate(
			{
				timing: timeFraction => timeFraction,
				draw: step ? () => { this.moveRight(step) } : this.moveRight,
				duration: 150,
			}
		);
	}

	animateMoveLeft(step: number = this.movingStep): void {
		animate(
			{
				timing: timeFraction => timeFraction,
				draw: step ? () => { this.moveLeft(step) } : this.moveLeft,
				duration: 150,
			}
		);
	}

	// animateMovement(x: number, compareX1: number): void {
	animateMovement(compareX1: number): void {
		let diff = Math.abs(this.coords.x1 - compareX1);
		let step = Math.min( this.movingStep, diff );
		if (this.coords.x1 < compareX1) {
			this.animateMoveRight(step)
		} else {
			this.animateMoveLeft(step);
		}
	}

}