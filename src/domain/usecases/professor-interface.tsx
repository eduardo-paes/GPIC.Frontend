import { Professor } from "../models/professor";

/**
 * Interface para adicionar um professor.
 * @interface
 */
export interface IProfessorService {
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
     * Parâmetros para adicionar um professor.
     * @typedef {Object} AddParams
     */
    export type AddParams = {
        name: string;
        CPF: string;
        email: string;
        password: string;
        confirmPassword: string;
        SIAPE: string;
        idLattes: number;
    };
}