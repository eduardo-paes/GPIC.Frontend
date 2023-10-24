import { Campus } from "../models/campus";

/**
 * Interface para gerenciamento de campus.
 * @interface
 */
export interface ICampusService {

    /**
     * Busca todos os campus ativos.
     * @param {ICampusService.GetParams} params - Os parâmetros para buscar os campus.
     * @returns {Promise<Array<Campus>>} Uma promessa que resolve para a lista de campus encontrados.
     */
    get(params: ICampusService.GetParams): Promise<Array<Campus>>;

    /**
     * Busca o campus que possui o id informado.
     * @param {ICampusService.GetParams} params - Os parâmetros para encontrar o campus.
     * @returns {Promise<Campus>} Uma promessa que resolve para o campus encontrado.
     */
    getById(params: ICampusService.GetParams): Promise<Campus>;

    /**
     * Adiciona um campus com base nos parâmetros fornecidos.
     * @param {ICampusService.AddParams} params - Os parâmetros para adicionar o campus.
     * @returns {Promise<Campus>} Uma promessa que resolve para o campus adicionado.
     */
    add(params: ICampusService.AddParams): Promise<Campus>;

    /**
     * Atualiza um campus com base nos parâmetros fornecidos.
     * @param {ICampusService.UpdateParams} params - Os parâmetros para atualizar o campus.
     * @returns {Promise<Campus>} Uma promessa que resolve para o campus atualizado.
     */
    update(params: ICampusService.UpdateParams): Promise<Campus>;

    /**
     * Remove um campus com base no id fornecido.
     * @param {ICampusService.DeleteParams} params - Os parâmetros para remover um campus.
     * @returns {Promise<Campus>} Uma promessa que resolve para o campus removido.
     */
    delete(params: ICampusService.DeleteParams): Promise<Campus>;
}

/**
 * Namespace para a interface de gerenciamento de campus.
 * @namespace ICampusService
 */
export namespace ICampusService {
    /**
     * Parâmetros para buscar campus.
     * @typedef {Object} GetParams
     */
    export type GetParams = {
        id?: string;
        take?: number;
        skip?: number;
    };

    /**
     * Parâmetros para adicionar um campus.
     * @typedef {Object} AddParams
     */
    export type AddParams = {
        name: string;
    };

    /**
     * Parâmetros para atualizar um campus.
     * @typedef {Object} UpdateParams
     */
    export type UpdateParams = {
        id: string;
        name: string;
    };

    /**
     * Parâmetros para remover um campus.
     * @typedef {Object} DeleteParams
     */
    export type DeleteParams = {
        id: string;
    };
}