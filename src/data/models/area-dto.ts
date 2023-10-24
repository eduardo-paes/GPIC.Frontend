import { MainAreaDTO } from "./main-area-dto";

export interface AreaDTO {
	id?: string;
	name: string;
	code: string;
	mainAreaId: string;
	mainArea?: MainAreaDTO;
	deletedAt?: Date;
}
