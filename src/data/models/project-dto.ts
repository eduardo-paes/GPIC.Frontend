import { ProjectActivityDTO } from "./project-activity-dto";

export interface ProjectDTO {
	id?: string;
	title: string;
	keyWord1: string;
	keyWord2: string;
	keyWord3: string;
	isScholarshipCandidate: boolean;
	objective: string;
	methodology: string;
	expectedResults: string;
	activitiesExecutionSchedule: string;
	activities: Array<ProjectActivityDTO>;
	programTypeId: string;
	professorId: string;
	subAreaId: string;
	noticeId: string;
	studentId: string;
	status?: number;
	statusDescription?: string;
	appealDescription?: string;
	submitionDate?: Date;
	ressubmissionDate?: Date;
	cancellationDate?: Date;
	cancellationReason?: string;
}
