export interface ProfessorViewModel {
	//#region User Properties
	name?: string;
	CPF?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
	//#endregion

	//#region Base Professor Contract (required properties)
	SIAPEEnrollment?: string;
	identifyLattes?: string;
	//#endregion
}
