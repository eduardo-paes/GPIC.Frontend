export interface StudentDTO {
	name: string;
	CPF: string;
	email: string;
	password: string;
	birthDate: Date;
	RG: number;
	issuingAgency: string;
	dispatchDate: Date;
	gender: string;
	race: string;
	homeAddress: string;
	city: string;
	UF: string;
	CEP: number;
	registrationCode: string;
	campusId: string;
	courseId: string;
	startYear: string;
	assistanceTypeId: string;
	phoneDDD?: number;
	phone?: number;
	cellPhoneDDD?: number;
	cellPhone?: number;
}
