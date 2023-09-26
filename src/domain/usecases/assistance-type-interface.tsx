import { AssistanceType } from "../models/assistance-type";

/**
 * Interface para gerenciamento de tipo de assistência.
 * @interface
 */
export interface IAssistanceTypeService {

    /**
     * Busca todos os tipos de assistências ativos.
     * @param {IAssistanceTypeService.GetParams} params - Os parâmetros para buscar os tipos de assistências.
     * @returns {Promise<Array<AssistanceType>>} Uma promessa que resolve para a lista de tipos de assistências encontrados.
     */
    get(params: IAssistanceTypeService.GetParams): Promise<Array<AssistanceType>>;

    /**
     * Busca o tipo de assistência que possui o id informado.
     * @param {IAssistanceTypeService.GetParams} params - Os parâmetros para encontrar o tipo de assistência.
     * @returns {Promise<AssistanceType>} Uma promessa que resolve para o tipo de assistência encontrado.
     */
    getById(params: IAssistanceTypeService.GetParams): Promise<AssistanceType>;

    /**
     * Adiciona um tipo de assistência com base nos parâmetros fornecidos.
     * @param {IAssistanceTypeService.AddParams} params - Os parâmetros para adicionar o tipo de assistência.
     * @returns {Promise<AssistanceType>} Uma promessa que resolve para o tipo de assistência adicionado.
     */
    add(params: IAssistanceTypeService.AddParams): Promise<AssistanceType>;

    /**
     * Atualiza um tipo de assistência com base nos parâmetros fornecidos.
     * @param {IAssistanceTypeService.UpdateParams} params - Os parâmetros para atualizar o tipo de assistência.
     * @returns {Promise<AssistanceType>} Uma promessa que resolve para o tipo de assistência atualizado.
     */
    update(params: IAssistanceTypeService.UpdateParams): Promise<AssistanceType>;

    /**
     * Remove um tipo de assistência com base no id fornecido.
     * @param {IAssistanceTypeService.DeleteParams} params - Os parâmetros para remover um tipo de assistência.
     * @returns {Promise<AssistanceType>} Uma promessa que resolve para o tipo de assistência removido.
     */
    delete(params: IAssistanceTypeService.DeleteParams): Promise<AssistanceType>;
}

/**
 * Namespace para a interface de gerenciamento de tipo de assistência.
 * @namespace IAssistanceTypeService
 */
export namespace IAssistanceTypeService {
    /**
     * Parâmetros para buscar tipos de assistências.
     * @typedef {Object} GetParams
     */
    export type GetParams = {
        id?: string;
        take?: number;
        skip?: number;
    };

    /**
     * Parâmetros para adicionar um tipo de assistência.
     * @typedef {Object} AddParams
     */
    export type AddParams = {
        name: string;
        description: string;
    };

    /**
     * Parâmetros para atualizar um tipo de assistência.
     * @typedef {Object} UpdateParams
     */
    export type UpdateParams = {
        id: string;
        name: string;
        description: string;
    };

    /**
     * Parâmetros para remover um tipo de assistência.
     * @typedef {Object} DeleteParams
     */
    export type DeleteParams = {
        id: string;
    };
}