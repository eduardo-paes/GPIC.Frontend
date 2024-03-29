import { ActivityTypeDTO } from "./activity-type-dto";

export interface NoticeDTO {
	id?: string;
	registrationStartDate: Date;
	registrationEndDate: Date;
	evaluationStartDate: Date;
	evaluationEndDate: Date;
	appealStartDate: Date;
	appealEndDate: Date;
	sendingDocsStartDate: Date;
	sendingDocsEndDate: Date;
	suspensionYears: number;
	partialReportDeadline: Date;
	finalReportDeadline: Date;
	attachedFile?: File | string;
	activities: Array<ActivityTypeDTO>;
	description?: string;
	deletedAt?: Date;
}
