import { Area } from "./area";

export interface SubArea {
	id?: string;
	name: string;
	code: string;
	deletedAt?: Date;
	area: Area;
}
