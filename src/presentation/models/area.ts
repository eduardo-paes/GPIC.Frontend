import { MainAreaViewModel } from "./main-area";

export interface AreaViewModel {
	id?: string;
	name: string;
	code: string;
	mainAreaId: string;
	mainArea?: MainAreaViewModel;
	deletedAt?: Date;
}
