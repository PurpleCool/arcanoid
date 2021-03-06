import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Board from '../Board/Board'
import Ball from '../Ball/Ball'
import './GameField.scss'
import space_1 from './space_1.jpg'
import { BoardAnimation } from '../../animations/BoardAnimation'
import { Coords } from 'src/utils'
import { ICoords } from 'src/types/types'
import { BallAnimation } from 'src/animations/BallAnimation'
import { PathTracker } from 'src/animations/PathTracker'
import { GAME_ELEMENTS, GAME_ELEMENTS_BBOX } from 'src/const'

export default function GameField() {

	const gameFieldRef = useRef<SVGSVGElement>(null);

	const boardWidth: number = 150;
	const boardHeight: number = 20;

	const ballWidth: number = 30;
	const ballHeight: number = ballWidth;

	const [ballCoords, setBallCoords] = useState<ICoords>(getBallPosition());
	const [boardCoords, setBoardCoords] = useState<ICoords>(getBoardPosition());

	// const boardAnimation: BoardAnimation = new BoardAnimation(boardCoords, setBoardCoords);
	// const ballAnimation: BallAnimation   = new BallAnimation(ballCoords, setBallCoords);;

	// const [boardAnimation, setBoardAnimation] = useState<BoardAnimation>(new BoardAnimation(boardCoords, setBoardCoords));
	// const [ballAnimation, setBallAnimation] = useState<BallAnimation>(new BallAnimation(ballCoords, setBallCoords));

	const [boardAnimation, setBoardAnimation] = useState<BoardAnimation>();
	const [ballAnimation, setBallAnimation] = useState<BallAnimation>();
	const [pathTracker, setPathTracker] = useState<PathTracker>();

	// const keyDownHandlerBound = keyDownHandler.bind(null);
	// let pathTracker: PathTracker;

	// useLayoutEffect(() => {
	useEffect(() => {
		function doStuff(): void {

			if (gameFieldRef.current) {
				GAME_ELEMENTS.gameField = gameFieldRef.current;
				GAME_ELEMENTS_BBOX.gameField = gameFieldRef.current.getBBox();
			}
			
			let boardPosition = getBoardPosition();
			let ballPosition = getBallPosition();

			setBoardCoords(boardPosition)
			setBallCoords(ballPosition);

			let boardAnim = new BoardAnimation(boardCoords, setBoardCoords);
			let ballAnim = new BallAnimation(ballCoords, setBallCoords);
			
			setBoardAnimation(boardAnim);
			setBallAnimation(ballAnim);

			boardAnim.setCoords( boardPosition, (coords: ICoords) => setBoardCoords(prev => coords) );
			ballAnim.setCoords( ballPosition, (coords: ICoords) => setBallCoords(prev => coords) );

			let tempPathTracker = new PathTracker(boardAnim, ballAnim);
			setPathTracker(tempPathTracker);

			let timerId = setTimeout(() => {
				clearTimeout(timerId);
				tempPathTracker.startGame();
			}, 1000);

		}

		doStuff();
		// document.addEventListener('keydown', keyDownHandler);

		return () => {
			// document.removeEventListener('keydown', keyDownHandler);
		}
	// }, [gameFieldRef]);
	}, []);


	function getBoardPosition(): ICoords {
		let x1:number = gameFieldRef.current?.clientWidth || 0;
		let y1:number = gameFieldRef.current?.clientHeight || 0;

		if (x1) x1 = Math.abs(x1 / 2) - boardWidth / 2;
		if (y1 && y1 > 50) y1 -= ballHeight + boardHeight + 10;
	
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
			boardAnimation?.animateMoveRight();
		} else if (event.key === 'ArrowLeft') {
			boardAnimation?.animateMoveLeft();
		}
	}

	function moveBoard (event: MouseEvent | React.MouseEvent<HTMLDivElement>): void {
		boardAnimation?.animateMovement(event.clientX);
	}

	return (
		<div 
			className='game-field'
			// onMouseMove={moveBoard}
			onMouseDown={moveBoard}
			onKeyDown={keyDownHandler}
			tabIndex={0}
			>
			<svg ref={gameFieldRef} className='field'>
				<image className='field-image' xlinkHref={space_1} height="2160" width="3840" />
				<Board coords={boardCoords} />
				<Ball coords={ballCoords} />
			</svg>
		</div>
	)
}
