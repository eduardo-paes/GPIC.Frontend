interface StudentViewModel {
    //#region User Properties
    name: string;
    CPF: string;
    email: string;
    password: string;
    //#endregion

    //#region Base Student Contract (required properties)
    birthDate: Date;
    RG: number;
    issuingAgency: string;
    dispatchDate: Date;
    gender: number;
    race: number;
    homeAddress: string;
    city: string;
    UF: string;
    CEP: number;
    campusId: string;
    courseId: string;
    startYear: string;
    //#endregion

    //#region Base Student Contract (optional properties)
    typeAssistanceId: string;
    phoneDDD: number;
    phone: number;
    cellPhoneDDD: number;
    cellPhone: number;
    //#endregion
}

export default StudentViewModel;