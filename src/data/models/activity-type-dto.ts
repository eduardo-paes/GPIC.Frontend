import { ActivityDTO } from "./activity-dto";

export interface ActivityTypeDTO {
	id?: string;
	name: string;
	unity: string;
	activities: Array<ActivityDTO>;
}
