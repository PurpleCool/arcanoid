import { FC } from 'react'
import { ICoords } from '../../types/types'
import './Ball.scss'


interface BallProps {
	coords: ICoords;
}

const Ball: FC<BallProps> = ({ coords }) => {

	return (
		<rect className='ball' x={coords.x1} y={coords.y1}
			width={coords.width} height={coords.height}
			rx='50%' ry='50%'
		/>
	)
}


export default Ball;