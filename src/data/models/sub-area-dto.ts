import { AreaDTO } from "./area-dto";

export interface SubAreaDTO {
	id?: string;
	name: string;
	code: string;
	areaId: string;
	area?: AreaDTO;
	deletedAt?: Date;
}
