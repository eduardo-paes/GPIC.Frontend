import { Professor } from "../models/professor";

/**
 * Interface para adicionar um professor.
 * @interface
 */
export interface IProfessorService {
    /**
     * Busca os professores ativos.
     * @param {IProfessorService.GetParams} params - Os parâmetros para buscar os professores.
     * @returns {Promise<Array<Professor>>} Uma promessa que resolve para a lista de professores encontrados.
    */
    get(params: IProfessorService.GetParams): Promise<Array<Professor>>;

    /**
     * Busca o professor que possui o id informado.
     * @param {IProfessorService.GetParams} params - Os parâmetros para encontrar o professor.
     * @returns {Promise<Professor>} Uma promessa que resolve para o professor encontrado.
     */
    getById(params: IProfessorService.GetParams): Promise<Professor>;

    /**
     * Adiciona um professor com base nos parâmetros fornecidos.
     * @param {IProfessorService.AddParams} params - Os parâmetros para adicionar o professor.
     * @returns {Promise<User>} Uma promessa que resolve para o professor adicionado.
     */
    add(params: IProfessorService.AddParams): Promise<Professor>;
}

/**
 * Namespace para a interface de adição de professor.
 * @namespace IProfessorService
 */
export namespace IProfessorService {
    /**
     * Parâmetros para buscar um ou mais professores.
     * @typedef {Object} GetParams
     */
    export type GetParams = {
        id?: string;
        take?: number;
        skip?: number;
    };

    /**
     * Parâmetros para adicionar um professor.
     * @typedef {Object} AddParams
     */
    export type AddParams = {
        name: string;
        CPF: string;
        email: string;
        password: string;
        SIAPEEnrollment: string;
        identifyLattes: number;
    };
}