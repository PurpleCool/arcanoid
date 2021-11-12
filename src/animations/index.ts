import { IAnimateParams } from "../types/types";

// export function animate({timing, draw, duration}: IAnimateParams):number {
// 	let start = performance.now();
// 	let animationId: number = requestAnimationFrame(function animate(time) {
// 		// timeFraction изменяется от 0 до 1
// 		let timeFraction = (time - start) / duration;
// 		if (timeFraction > 1) {
// 			// debugger
// 			timeFraction = 1;
// 			// cancelAnimationFrame(animationId);
// 		}

// 		// вычисление текущего состояния анимации
// 		let progress = timing(timeFraction);

// 		draw(progress, animationId); // отрисовать её

// 		if (timeFraction < 1) {
// 			animationId = requestAnimationFrame(animate);
// 		}
// 	});

// 	return animationId;
// }


export function animate({timing, draw, duration }: IAnimateParams):number {
	let start = performance.now();
	let animationId: number = requestAnimationFrame(function animate(time, animationId: number = 0) {

		let timeFraction: number = 0;
		let progress: number = 0;

		if (duration) {
			timeFraction = (time - start) / duration;
			if (timeFraction > 1) {
				timeFraction = 1;
			}

			progress = timing(timeFraction);
		}
		
		let finish = draw(progress, animationId);

		if (!finish && timeFraction < 1) {
			animationId = requestAnimationFrame((time) => {
				animate(time, animationId);
			});
		}
	});

	return animationId;
}
