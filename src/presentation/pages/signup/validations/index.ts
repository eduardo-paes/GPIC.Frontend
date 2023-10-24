export const validateName = (name: string | undefined): string | null => {
	if (!name) return "Campo obrigatório.";
	return null;
};

export const validateEmail = (email: string | undefined): string | null => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!email) return "Campo obrigatório.";
	if (!emailRegex.test(email)) return "Insira um email válido.";
	return null;
};

export const validateStudentEmail = (
	email: string | undefined
): string | null => {
	const emailRegex = /^[^\s@]+@aluno\.cefet-rj\.br$/;
	if (!email) return "Campo obrigatório.";
	if (!emailRegex.test(email)) return "Insira um email válido.";
	return null;
};

export const validateProfessorEmail = (
	email: string | undefined
): string | null => {
	const emailRegex = /^[^\s@]+@professor\.cefet-rj\.br$/;
	if (!email) return "Campo obrigatório.";
	// if (!emailRegex.test(email)) return "Insira um email válido.";
	return null;
};

export const validateCPF = (CPF: string | undefined): string | null => {
	if (!CPF) return "Campo obrigatório";

	if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(CPF)) return "CPF inválido";

	return null;
};

export const validateRG = (RG: string | undefined): string | null => {
	if (!RG) return "Campo obrigatório";

	if (!/^\d{2}\.\d{3}\.\d{3}-\d{1}$/.test(RG)) return "RG inválido";

	return null;
};

export const validatePassword = (
	password: string | undefined
): string | null => {
	if (!password) return "Campo obrigatório";

	if (password.length < 6) return "A senha deve ter pelo menos 6 caracteres";

	return null;
};

export const validateConfirmPassword = (
	password: string | undefined,
	confirmPassword: string | undefined
): string | null => {
	if (!confirmPassword) return "Campo obrigatório";

	if (!(confirmPassword === password)) return "Deve ser igual a senha";

	return null;
};

export const validateBirthDate = (
	birthDate: Date | undefined
): string | null => {
	if (!birthDate) return "Campo obrigatório";

	return null;
};

export const validateDispatchDate = (
	dispatchDate: Date | undefined
): string | null => {
	if (!dispatchDate) return "Campo obrigatório";

	return null;
};

export const validateIssuingAgency = (
	issuingAgency: string | undefined
): string | null => {
	if (!issuingAgency) return "Campo obrigatório";

	return null;
};

export const validateGender = (gender: string | undefined): string | null => {
	if (!gender) return "Campo obrigatório";

	return null;
};

export const validateRace = (race: string | undefined): string | null => {
	if (!race) return "Campo obrigatório";

	return null;
};

export const validateHomeAddress = (
	homeAddress: string | undefined
): string | null => {
	if (!homeAddress) return "Campo obrigatório";

	return null;
};

export const validateCity = (city: string | undefined): string | null => {
	if (!city) return "Campo obrigatório";

	return null;
};

export const validateUF = (UF: string | undefined): string | null => {
	if (!UF) return "Campo obrigatório";

	return null;
};

export const validateCEP = (CEP: string | undefined): string | null => {
	if (!CEP) return "Campo obrigatório";

	if (!/^\d{5}-\d{3}$/.test(CEP)) return "CEP inválido";

	return null;
};

export const validateRegistrationCode = (
	registrationCode: string | undefined
): string | null => {
	if (!registrationCode) return "Campo obrigatório";
	if (registrationCode.length < 11)
		return "A matrícula deve possuir no mínimo 11 caracteres";

	return null;
};

export const validateCampus = (campusId: string | undefined): string | null => {
	if (!campusId) return "Campo obrigatório";

	return null;
};

export const validateCourse = (courseId: string | undefined): string | null => {
	if (!courseId) return "Campo obrigatório";

	return null;
};

export const validateStartYear = (
	startYear: string | undefined
): string | null => {
	if (!startYear) return "Campo obrigatório";

	if (!/^\d{4}$/.test(startYear)) return "Ano inválido";

	return null;
};

export const validateTypeAssistance = (
	typeAssistance: string | undefined
): string | null => {
	if (!typeAssistance) return "Campo obrigatório";

	return null;
};

export const validatePhone = (
	phoneNumber: string | undefined
): string | null => {
	if (phoneNumber && !/^\(\d{2}\) \d{4}-\d{4}$/.test(phoneNumber))
		return "Número de telefone inválido";

	return null;
};

export const validateCellPhone = (
	cellPhoneNumber: string | undefined
): string | null => {
	if (cellPhoneNumber && !/^\(\d{2}\) \d{5}-\d{4}$/.test(cellPhoneNumber))
		return "Número de celular inválido";

	return null;
};

export const validateSIAPE = (SIAPE: string | undefined): string | null => {
	if (!SIAPE) return "Campo obrigatório";
	if (SIAPE.length < 7) return "A Matrícula SIAPE deve conter 7 caracteres.";

	return null;
};

export const validateIdLattes = (
	identifyLattes: string | undefined
): string | null => {
	if (!identifyLattes) return "Campo obrigatório";

	return null;
};
