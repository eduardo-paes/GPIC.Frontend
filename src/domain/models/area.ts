import { MainArea } from "./main-area";

export interface Area {
	id?: string;
	name: string;
	code: string;
	deletedAt?: Date;
	mainArea: MainArea;
}
