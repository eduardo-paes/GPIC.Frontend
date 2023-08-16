import { User } from "./user";

export interface Professor {
	id: string;
	user: User;
	SIAPE: string;
	identifyLattes: number;
	deletedAt: Date;
}
