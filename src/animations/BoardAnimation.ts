// import { ICoords } from "src/types/types";
import { Coords } from "src/utils";
import { animate } from ".";
import { BasicAnimation } from "./Animation";

export class BoardAnimation extends BasicAnimation {
	// constructor(coords: ICoords, setter?: any) {
	// 	super(coords, setter);
	// }
	
	moveRight(step: number = this.movingStep): void {
		console.log(step)	;
		let newX2: number = this.coords.x2 + step;
		let gameFieldWidth: number = document.getElementsByClassName('game-field')[0]?.clientWidth || 0;

		if (gameFieldWidth && newX2 > gameFieldWidth) newX2 = gameFieldWidth;

		const coords = Coords(newX2 - this.coords.width, this.coords.y1, newX2, this.coords.y2);
		this.coordsSetter(coords);
	}

	moveLeft(step: number = this.movingStep):void {		
		const newX1: number = Math.max(this.coords.x1 - step, 0);
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

	animateMovement(x: number, compareX: number): void {
		let diff = Math.abs(x - compareX);
		let step = Math.min( this.movingStep, diff );
		if (x < compareX) {
			this.animateMoveRight(step)
		} else {
			this.animateMoveLeft(step);
		}
	}

}