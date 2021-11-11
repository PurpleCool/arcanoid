import React, { useEffect, useRef, useState } from 'react'
import { Coords, ICoords } from '../../types/types'
import Board from '../Board/Board'
import Ball from '../Ball/Ball'
import './GameField.scss'
import space_1 from './space_1.jpg'
import { animateMoveLeft, animateMovement, animateMoveRight, boardMovingStep, setCoords } from '../../animations/boardAnimation'

export default function GameField() {

	const gameFieldRef = useRef<HTMLDivElement>(null);

	const boardWidth: number = 150;
	const boardHeight: number = 20;

	const ballWidth: number = 30;
	const ballHeight: number = ballWidth;

	const [ballCoords, setBallCoords] = useState<ICoords>(getBallPosition());
	const [boardCoords, setBoardCoords] = useState<ICoords>(getBoardPosition());

	let boardMoveTimer: number | null = null;
	let isBoardMoving: boolean = false;
	
	useEffect(() => {
		document.addEventListener('keydown', keyDownHandler);
		
		let coords = getBoardPosition();
		setBoardCoords(coords)
		setBallCoords(getBallPosition());
		setCoords( coords, (coords: ICoords) => setBoardCoords(prev => coords) );

		return () => {
			document.removeEventListener('keydown', keyDownHandler);
		}
	}, [gameFieldRef])

	function getBoardPosition(): ICoords {
		let x1:number = gameFieldRef.current?.clientWidth || 0;
		let y1:number = gameFieldRef.current?.clientHeight || 0;

		if (x1) x1 = Math.abs(x1 / 2) - boardWidth / 2;
		if (y1 && y1 > 50) y1 -= 50;

	
		return Coords(x1, y1, x1 + boardWidth, y1 + boardHeight);
	}
	
	function getBallPosition(): ICoords {
		let y1:number = gameFieldRef.current?.clientHeight || 0;
		let x1:number = gameFieldRef.current?.clientWidth || 0;

		if (x1) x1 = Math.abs(x1 / 2) - ballWidth / 2;
		if (y1 && y1 > 200) y1 -= 200;

		return Coords(x1, y1, x1 + ballWidth, y1 + ballHeight);
	}

	function keyDownHandler(event: KeyboardEvent | React.KeyboardEvent<HTMLDivElement>): void {
		if (event.key === 'ArrowRight') {
			animateMoveRight();
		} else if (event.key === 'ArrowLeft') {
			animateMoveLeft();
		}
	}

	function mouseMoveHandler (event: MouseEvent | React.MouseEvent<HTMLDivElement>): void {
		let timerId: ReturnType<typeof setTimeout>;

		function doStuff() {
			// debugger
			clearTimeout(timerId)
			if (boardMoveTimer) clearTimeout(boardMoveTimer);

			console.group();
				console.log(boardCoords.xCenter);
	
			if (Math.abs(boardCoords.xCenter - event.screenX) > 3) {
				// debugger
				animateMovement(boardCoords.xCenter, event.screenX);
			}
				console.log(event.screenX);
				console.log(boardCoords.xCenter);
			console.groupEnd();
	
			if (!isBoardMoving) gameFieldRef.current?.removeEventListener('mousemove', mouseMoveHandler);
		}

		doStuff()
	
	}


	return (
		<div 
			ref={gameFieldRef}
			className='game-field'
			// onMouseMove={mouseMoveHandler}
			onMouseDown={mouseMoveHandler}
			>
			<svg className='field'>
				<image className='field-image' xlinkHref={space_1} height="2160" width="3840" />
				<Board coords={boardCoords} />
				<Ball coords={ballCoords} />
			</svg>
		</div>
	)
}
