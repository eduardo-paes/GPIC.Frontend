import { AreaViewModel } from "./area";

export interface SubAreaViewModel {
	id?: string;
	name: string;
	code: string;
	areaId: string;
	area?: AreaViewModel;
	deletedAt?: Date;
}
