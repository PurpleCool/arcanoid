import React, { FC, useEffect, useLayoutEffect, useRef } from 'react'
import { GAME_ELEMENTS, GAME_ELEMENTS_BBOX } from 'src/const';
import { ICoords } from '../../types/types'
import './Board.scss'

interface BoardProps {
	coords: ICoords,
}

const Board: FC<BoardProps> = ({ coords }) => {
	let boardRef = useRef<SVGRectElement>(null);

	useLayoutEffect(() => {
		if (boardRef.current) {
			GAME_ELEMENTS.board = boardRef.current;
			GAME_ELEMENTS_BBOX.board = boardRef.current.getBBox();
		}
	}, [boardRef])


	return (
		<rect ref={boardRef} className='board' x={coords.x1} y={coords.y1}
			width={coords.width} height={coords.height}
			rx={coords.height / 2} ry={coords.height / 2}
		/>
	);
}

export default Board;
