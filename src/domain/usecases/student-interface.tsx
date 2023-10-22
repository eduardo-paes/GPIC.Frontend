import { Student } from "../models/student";

/**
 * Interface para adicionar um estudante.
 * @interface
 */
export interface IStudentService {
    /**
     * Busca os estudantes ativos.
     * @param {IStudentService.GetParams} params - Os parâmetros para buscar os estudantes.
     * @returns {Promise<Array<Student>>} Uma promessa que resolve para a lista de estudantes encontrados.
    */
    get(params: IStudentService.GetParams): Promise<Array<Student>>;

    /**
     * Busca o aluno que possui o id informado.
     * @param {IStudentService.GetParams} params - Os parâmetros para encontrar o aluno.
     * @returns {Promise<Student>} Uma promessa que resolve para o aluno encontrado.
     */
    getById(params: IStudentService.GetParams): Promise<Student>;

    /**
     * Adiciona um estudante com base nos parâmetros fornecidos.
     * @param {IStudentService.AddParams} params - Os parâmetros para adicionar o estudante.
     * @returns {Promise<Student>} Uma promessa que resolve para o estudante adicionado.
     */
    add(params: IStudentService.AddParams): Promise<Student>;
}

/**
 * Namespace para a interface de adição de estudante.
 * @namespace IStudentService
 */
export namespace IStudentService {
    /**
     * Parâmetros para buscar um ou mais estudantes.
     * @typedef {Object} GetParams
     */
    export type GetParams = {
        id?: string;
        take?: number;
        skip?: number;
    };

    /**
     * Parâmetros para adicionar um estudante.
     * @typedef {Object} AddParams
     */
    export type AddParams = {
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
    };
}