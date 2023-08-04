import { Student } from "../models/student";

/**
 * Interface para adicionar um estudante.
 * @interface
 */
export interface IStudentService {
    /**
     * Adiciona um estudante com base nos parâmetros fornecidos.
     * @param {IStudentService.AddParams} params - Os parâmetros para adicionar o estudante.
     * @returns {Promise<User>} Uma promessa que resolve para o estudante adicionado.
     */
    add(params: IStudentService.AddParams): Promise<Student>;
}

/**
 * Namespace para a interface de adição de estudante.
 * @namespace IStudentService
 */
export namespace IStudentService {
    /**
     * Parâmetros para adicionar um estudante.
     * @typedef {Object} AddParams
     */
    export type AddParams = {
        name: string;
        CPF: string;
        email: string;
        password: string;
        confirmPassword: string;
        birthDate: Date;
        RG: string;
        issuingAgency: string;
        dispatchDate: Date;
        gender: string;
        race: string;
        homeAddress: string;
        city: string;
        UF: string;
        CEP: string;
        campusId: string;
        courseId: string;
        startYear: string;
        typeAssistanceId: string;
        phoneDDD: string;
        phone: string;
        cellPhoneDDD: string;
        cellPhone: string;
    };
}