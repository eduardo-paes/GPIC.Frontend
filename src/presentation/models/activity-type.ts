import { ActivityViewModel } from "./activity";

export interface ActivityTypeViewModel {
	id?: string;
	name: string;
	unity: string;
	activities: Array<ActivityViewModel>;
}
