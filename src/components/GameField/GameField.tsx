import React, { useEffect, useRef, useState } from 'react'
import { IBoardCoords } from '../../types/types'
import Board from '../Board/Board'
import './GameField.scss'
import space_1 from './space_1.jpg'

export default function GameField() {

	const gameFieldRef = useRef<HTMLDivElement>(null);
	const [boardCoords, setBoardCoords] = useState(getBoardPosition());

	useEffect(() => {
		document.addEventListener('keydown', keyDownHandler);
		setBoardCoords(getBoardPosition());

		return () => {
			document.removeEventListener('keydown', keyDownHandler);
		}
	}, [gameFieldRef])

	function getBoardPosition():IBoardCoords {
		let y:number = gameFieldRef.current?.clientHeight || 0;
		let x:number = gameFieldRef.current?.clientWidth || 0;
		if (x) x = Math.abs(x / 2);

		return { x, y };
	}

	function keyDownHandler(event: KeyboardEvent) {
		console.log('[GameField][keyDownHandler] event: ', event);

	}

	return (
		<div 
			ref={gameFieldRef}
			className='game-field'
			>
			<svg className='field'>
				<image className='field-image' xlinkHref={space_1} height="2160" width="3840" />
				<Board coords={boardCoords} boardWidth={150} />
			</svg>
		</div>
	)
}
