import { MainArea } from "./main-area";

export interface Area {
	id?: string;
	name: string;
	code: string;
	mainAreaId: string;
	mainArea?: MainArea;
	deletedAt?: Date;
}
