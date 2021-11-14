import { FC, useLayoutEffect, useRef } from 'react'
import { GAME_ELEMENTS, GAME_ELEMENTS_BBOX } from 'src/const';
import { ICoords } from '../../types/types'
import './Ball.scss'


interface BallProps {
	coords: ICoords;
}

const Ball: FC<BallProps> = ({ coords }) => {
	let ballRef = useRef<SVGRectElement>(null);

	useLayoutEffect(() => {
		if (ballRef.current) {
			GAME_ELEMENTS.ball = ballRef.current;
			GAME_ELEMENTS_BBOX.ball = ballRef.current.getBBox();
		}
	}, [ballRef])


	return (
		<rect ref={ballRef} className='ball' x={coords.x1} y={coords.y1}
			width={coords.width} height={coords.height}
			rx='50%' ry='50%'
		/>
	)
}


export default Ball;