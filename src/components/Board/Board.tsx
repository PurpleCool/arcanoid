import React, { FC } from 'react'
import { IBoardCoords } from '../../types/types'
import './Board.scss'

interface BoardProps {
	coords: IBoardCoords,
	boardWidth: number
}

const Board: FC<BoardProps> = ({ coords, boardWidth = 150 }) => {

	const {x, y} = coords;

	function getRectY() {
		return y - 50;
	}

	const boardHeight = 20;

	return (
		<rect className='board' x={x - boardWidth / 2} y={getRectY()}
			width={boardWidth} height={boardHeight}
			rx={boardHeight / 2} ry={boardHeight / 2}/>
			// rx="15" ry="50%"/>
	);
}

export default Board;
