import { Course } from "../models/course";

/**
 * Interface para gerenciamento de curso.
 * @interface
 */
export interface ICourseService {

    /**
     * Busca todos os cursos ativos.
     * @param {ICourseService.GetParams} params - Os parâmetros para buscar os cursos.
     * @returns {Promise<Array<Course>>} Uma promessa que resolve para a lista de cursos encontrados.
     */
    get(params: ICourseService.GetParams): Promise<Array<Course>>;

    /**
     * Busca o curso que possui o id informado.
     * @param {ICourseService.GetParams} params - Os parâmetros para encontrar o curso.
     * @returns {Promise<Course>} Uma promessa que resolve para o curso encontrado.
     */
    getById(params: ICourseService.GetParams): Promise<Course>;

    /**
     * Adiciona um curso com base nos parâmetros fornecidos.
     * @param {ICourseService.AddParams} params - Os parâmetros para adicionar o curso.
     * @returns {Promise<Course>} Uma promessa que resolve para o curso adicionado.
     */
    add(params: ICourseService.AddParams): Promise<Course>;

    /**
     * Atualiza um curso com base nos parâmetros fornecidos.
     * @param {ICourseService.UpdateParams} params - Os parâmetros para atualizar o curso.
     * @returns {Promise<Course>} Uma promessa que resolve para o curso atualizado.
     */
    update(params: ICourseService.UpdateParams): Promise<Course>;

    /**
     * Remove um curso com base no id fornecido.
     * @param {ICourseService.DeleteParams} params - Os parâmetros para remover um curso.
     * @returns {Promise<Course>} Uma promessa que resolve para o curso removido.
     */
    delete(params: ICourseService.DeleteParams): Promise<Course>;
}

/**
 * Namespace para a interface de gerenciamento de curso.
 * @namespace ICourseService
 */
export namespace ICourseService {
    /**
     * Parâmetros para buscar cursos.
     * @typedef {Object} GetParams
     */
    export type GetParams = {
        id?: string;
        take?: number;
        skip?: number;
    };

    /**
     * Parâmetros para adicionar um curso.
     * @typedef {Object} AddParams
     */
    export type AddParams = {
        name: string;
    };

    /**
     * Parâmetros para atualizar um curso.
     * @typedef {Object} UpdateParams
     */
    export type UpdateParams = {
        id: string;
        name: string;
    };

    /**
     * Parâmetros para remover um curso.
     * @typedef {Object} DeleteParams
     */
    export type DeleteParams = {
        id: string;
    };
}