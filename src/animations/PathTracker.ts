import { GAME_ELEMENTS } from "src/const";
import { animate } from ".";
import { BallAnimation } from "./BallAnimation";
import { BoardAnimation } from "./BoardAnimation";


export class PathTracker {

	boardAnimation: BoardAnimation;
	ballAnimation: BallAnimation;
	areElementsIntersected: boolean;

	constructor(boardAnimation: BoardAnimation, ballAnimation: BallAnimation) {
		this.boardAnimation = boardAnimation;
		this.ballAnimation = ballAnimation;
		this.areElementsIntersected = false;
	}
	
	checkrickCollision() {

	}

	checkWallsCollision(x1: number, y1: number): boolean {
		let collided = false;
		let x2 = x1 + this.ballAnimation.coords.width;
		let y2 = y1 + this.ballAnimation.coords.height;
		let gameFieldBB = GAME_ELEMENTS?.gameField?.getBoundingClientRect();
		if (!gameFieldBB) return true;

		// check left
		if (x1 <= gameFieldBB.left) {
			this.ballAnimation.setSpeed({ x: -this.ballAnimation.speed.x, y: this.ballAnimation.speed.y, });
			collided = true;
		}

		// check right
		if (x2 >= gameFieldBB.right) {
			this.ballAnimation.setSpeed({ x: -this.ballAnimation.speed.x, y: this.ballAnimation.speed.y, });
			collided = true;
		}

		// check top
		if (y1 <= gameFieldBB.top) {
			this.ballAnimation.setSpeed({ x: this.ballAnimation.speed.x, y: -this.ballAnimation.speed.y, });
			collided = true;
		}

		// check bottom
		if (y2 >= gameFieldBB.bottom) {
			this.ballAnimation.setSpeed({ x: 0, y: 0, });
			collided = true;
		}

		return collided;
	}
	
	
	checkBoardCollision(x1: number, y1: number): boolean {
		let collided = false;

		let gameField = GAME_ELEMENTS.gameField;
		let board = GAME_ELEMENTS.board;
		let ball = GAME_ELEMENTS.ball;

		if (!gameField || !board || !ball) return true;

		collided = gameField.checkIntersection(
			board,
			ball.getBBox()
		)

		if (!collided) {
			this.areElementsIntersected = false;
		} else {
			if (!this.areElementsIntersected) {
				this.ballAnimation.setSpeed({ x: this.ballAnimation.speed.x, y: -this.ballAnimation.speed.y, });
				this.areElementsIntersected = true;
			}
		}


		return collided;
	}


	checkCollision(x1: number, y1: number): boolean {
		let collided = 0;
		collided += Number(this.checkBoardCollision(x1, y1) );
		collided += Number(this.checkWallsCollision(x1, y1) );

		return Boolean(collided);
	}

	drawBallMovement(progress: number, animationId: number | null): boolean {
		console.log('[PathTracker][drawBallMovement]');
		
		let x1 = Math.ceil( this.ballAnimation.coords.x1 + this.ballAnimation.speed.x );
		let y1 = Math.ceil( this.ballAnimation.coords.y1 + this.ballAnimation.speed.y );

		let collided = this.checkCollision(x1, y1);

		if (collided && animationId) {
		// if (collided) {
			// debugger
			// if (animationId) {
				if (this.ballAnimation.speed.x === 0 && this.ballAnimation.speed.y === 0) {
					return true;
				}
			// }
		}

		this.ballAnimation.moveTo(x1, y1); 
		return false;
	}

	startGame() {
		// this.ballAnimation.animateMovement();

		animate(
			{
				timing: timeFraction => timeFraction,
				draw: this.drawBallMovement.bind(this),
			}
		);
	}
	
}