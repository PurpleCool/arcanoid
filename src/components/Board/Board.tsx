import React, { FC, useEffect } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux';
import { ICoords } from '../../types/types'
import './Board.scss'

interface BoardProps {
	coords: ICoords,
}

const Board: FC<BoardProps> = ({ coords }) => {
	useEffect(() => {
		// effect
		// return () => {
			// cleanup
		// }
	}, [coords])


	return (
		<rect className='board' x={coords.x1} y={coords.y1}
			width={coords.width} height={coords.height}
			rx={coords.height / 2} ry={coords.height / 2}
		/>
	);
}

export default Board;
