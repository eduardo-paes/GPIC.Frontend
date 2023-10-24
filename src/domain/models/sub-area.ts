import { Area } from "./area";

export interface SubArea {
	id?: string;
	name: string;
	code: string;
	areaId: string;
	area?: Area;
	deletedAt?: Date;
}
