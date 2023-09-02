import { Activity } from "./activity";

export interface ActivityType {
	id?: string;
	name: string;
	unity: string;
	activities: Array<Activity>;
}
