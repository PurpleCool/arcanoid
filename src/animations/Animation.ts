import { ICoords } from "src/types/types";
import { Coords } from "src/utils";

export class BasicAnimation {
coords: ICoords;
	coordsSetter(value: ICoords): void {};
	movingStep: number;

	constructor(coords: ICoords, setter?: any) {
		this.coords = Coords(0, 0, 0, 0);
		this.coordsSetter = (value) => {};
		
		this.setCoords(coords, setter);
		
		this.movingStep = 10;
	}

	setCoords(coords: ICoords, setter?: any) {
		this.coords  = coords
		this.coordsSetter = (value) => {
			this.coords = value;
			setter?.(value);
		};
	}

	setmovingStep(value: number = 10): number {
		this.movingStep = value;
		return value;
	}
}