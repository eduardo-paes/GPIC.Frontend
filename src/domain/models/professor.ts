import { User } from "./user";

export interface Professor {
	id: string;
	user: User;
	SIAPE: string;
	idLattes: number;
	deletedAt: Date;
}
