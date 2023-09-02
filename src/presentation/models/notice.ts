import { ActivityTypeViewModel } from "./activity-type";

export interface NoticeViewModel {
	id: string;
	registrationStartDate?: Date;
	registrationEndDate?: Date;
	evaluationStartDate?: Date;
	evaluationEndDate?: Date;
	appealStartDate?: Date;
	appealEndDate?: Date;
	sendingDocsStartDate?: Date;
	sendingDocsEndDate?: Date;
	suspensionYears: number;
	partialReportDeadline: Date;
	finalReportDeadline: Date;
	description?: string;
	attachedFile?: File | string;
	activities: Array<ActivityTypeViewModel>;
	deletedAt?: Date;
}
