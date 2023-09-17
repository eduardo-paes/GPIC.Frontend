import { ProgramType } from "../models/program-type";

/**
 * Interface para gerenciamento de tipo de programa.
 * @interface
 */
export interface IProgramTypeService {

    /**
     * Busca todos os tipos de programas ativos.
     * @param {IProgramTypeService.GetParams} params - Os parâmetros para buscar os tipos de programas.
     * @returns {Promise<Array<ProgramType>>} Uma promessa que resolve para a lista de tipos de programas encontrados.
     */
    get(params: IProgramTypeService.GetParams): Promise<Array<ProgramType>>;

    /**
     * Busca o tipo de programa que possui o id informado.
     * @param {IProgramTypeService.GetParams} params - Os parâmetros para encontrar o tipo de programa.
     * @returns {Promise<ProgramType>} Uma promessa que resolve para o tipo de programa encontrado.
     */
    getById(params: IProgramTypeService.GetParams): Promise<ProgramType>;

    /**
     * Adiciona um tipo de programa com base nos parâmetros fornecidos.
     * @param {IProgramTypeService.AddParams} params - Os parâmetros para adicionar o tipo de programa.
     * @returns {Promise<ProgramType>} Uma promessa que resolve para o tipo de programa adicionado.
     */
    add(params: IProgramTypeService.AddParams): Promise<ProgramType>;

    /**
     * Atualiza um tipo de programa com base nos parâmetros fornecidos.
     * @param {IProgramTypeService.UpdateParams} params - Os parâmetros para atualizar o tipo de programa.
     * @returns {Promise<ProgramType>} Uma promessa que resolve para o tipo de programa atualizado.
     */
    update(params: IProgramTypeService.UpdateParams): Promise<ProgramType>;

    /**
     * Remove um tipo de programa com base no id fornecido.
     * @param {IProgramTypeService.DeleteParams} params - Os parâmetros para remover um tipo de programa.
     * @returns {Promise<ProgramType>} Uma promessa que resolve para o tipo de programa removido.
     */
    delete(params: IProgramTypeService.DeleteParams): Promise<ProgramType>;
}

/**
 * Namespace para a interface de gerenciamento de tipo de programa.
 * @namespace IProgramTypeService
 */
export namespace IProgramTypeService {
    /**
     * Parâmetros para buscar tipos de programas.
     * @typedef {Object} GetParams
     */
    export type GetParams = {
        id?: string;
        take?: number;
        skip?: number;
    };

    /**
     * Parâmetros para adicionar um tipo de programa.
     * @typedef {Object} AddParams
     */
    export type AddParams = {
        name: string;
        description: string;
    };

    /**
     * Parâmetros para atualizar um tipo de programa.
     * @typedef {Object} UpdateParams
     */
    export type UpdateParams = {
        id: string;
        name: string;
        description: string;
    };

    /**
     * Parâmetros para remover um tipo de programa.
     * @typedef {Object} DeleteParams
     */
    export type DeleteParams = {
        id: string;
    };
}