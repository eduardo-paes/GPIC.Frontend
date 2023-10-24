export interface StudentViewModel {
	//#region User Properties
	id?: string;
	name?: string;
	CPF?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
	//#endregion

	//#region Base Student Contract (required properties)
	birthDate?: Date;
	RG?: string;
	issuingAgency?: string;
	dispatchDate?: Date;
	gender?: string;
	race?: string;
	homeAddress?: string;
	city?: string;
	UF?: string;
	CEP?: string;
	registrationCode?: string;
	campusId?: string;
	courseId?: string;
	startYear?: string;
	//#endregion

	//#region Base Student Contract (optional properties)
	assistanceTypeId?: string;
	phoneDDD?: string;
	phone?: string;
	cellPhoneDDD?: string;
	cellPhone?: string;
	//#endregion
}

export default StudentViewModel;
