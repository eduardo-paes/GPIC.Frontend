import { User } from "./user";

export interface Student {
	id: string;
	name: string;
	phone: number;
	phoneDDD: number;
	assistanceTypeId: string;
	startYear: number;
	courseId: string;
	campusId: string;
	CEP: number;
	UF: string;
	city: string;
	homeAddress: string;
	race: number;
	gender: number;
	dispatchDate: Date;
	issuingAgency: string;
	RG: number;
	birthDate: Date;
	registrationCode: string;
	user: User;
	deletedAt: Date;
	cellPhoneDDD: number;
	cellPhone: number;
}
