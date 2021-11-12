import { ICoords, ISpeed } from "src/types/types";
import { Coords } from "src/utils";
import { animate } from ".";
import { BasicAnimation } from "./Animation";

export class BallAnimation extends BasicAnimation {

	defaultSpeed: ISpeed;
	speed: ISpeed;
	fieldBB: DOMRect ;

	deltaX: number;
	deltaY: number;

	gameOver: boolean;
	// animationId: number | null;
	
	constructor(coords: ICoords, setter?: any) {
		super(coords, setter);

		this.defaultSpeed = { x: -3, y: -3 }
		this.speed = this.defaultSpeed;
		let container = document.getElementsByClassName('game-field')[0] || document.body;
		this.fieldBB = container.getBoundingClientRect();

		this.deltaX = 0;
		this.deltaY = 0;

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

		let gameFieldWidth: number  = this.fieldBB.width;
		let gameFieldHeight: number = this.fieldBB.height;

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

	chechBrickCollision() {

	}

	checkWallsCollision(x1: number, y1: number): boolean {
		let collided = false;
		let x2 = x1 + this.coords.width;
		let y2 = y1 + this.coords.height;
		// debugger

		// check left
		if (x1 <= this.fieldBB.left) {
			this.setSpeed({ x: -this.speed.x, y: this.speed.y, });
			collided = true;
		}

		// check right
		if (x2 >= this.fieldBB.right) {
			this.setSpeed({ x: -this.speed.x, y: this.speed.y, });
			collided = true;
		}

		// check top
		if (y1 <= this.fieldBB.top) {
			this.setSpeed({ x: this.speed.x, y: -this.speed.y, });
			collided = true;
		}

		// check bottom
		if (y2 >= this.fieldBB.bottom) {
			// debugger
			this.setSpeed({ x: 0, y: 0, });
			collided = true;
		}

		return collided;
	}
	
	
	checkBoardCollision(x1: number, y1: number): boolean {
		let collided = false;

		


		return collided;
	}


	checkCollision(x1: number, y1: number): boolean {
		let collided = 0;
		collided += Number(this.checkWallsCollision(x1, y1) );
		collided += Number(this.checkBoardCollision(x1, y1) );

		return Boolean(collided);
	}

	drawMovement(progress: number, animationId: number | null): boolean {
		console.log('[drawMovement]');
		// if (progress < 0) return
		// let deltaX = this.coords.x1 - this.coords.x1 * this.speed.x;
		// let deltaY = this.coords.y1 - this.coords.y1 * this.speed.y;

		let deltaX = this.coords.x1 + this.speed.x;
		let deltaY = this.coords.y1 + this.speed.y;


		let x1 = Math.ceil( deltaX );
		let y1 = Math.ceil( deltaY );

		let collided = this.checkCollision(x1, y1);

		if (collided && animationId) {
			// debugger
			if (this.speed.x === 0 && this.speed.y === 0) {
				// cancelAnimationFrame(animationId);
				return true;
			}
			// this.animateMovement();
		}

		this.moveTo(x1, y1); 
		return false;
	}
	
	animateMovement(): void {
		// animate(
		// 	{
		// 		timing: timeFraction => timeFraction,
		// 		draw: this.drawMovement.bind(this),
		// 		duration: 5000,
		// 	}
		// );


		animate(
			{
				timing: timeFraction => timeFraction,
				draw: this.drawMovement.bind(this),
				// duration: 5000,
			}
		);
	}

	startMoving(x1: number, y1: number) {

	}
}