import { Area } from "../models/area";

/**
 * Interface para gerenciamento de área.
 * @interface
 */
export interface IAreaService {

    /**
     * Busca todas as áreas ativas de determinada área principal.
     * @param {IAreaService.GetParams} params - Os parâmetros para buscar as áreas.
     * @returns {Promise<Array<Area>>} Uma promessa que resolve para a lista de áreas encontradas.
     */
    get(params: IAreaService.GetParams): Promise<Array<Area>>;

    /**
     * Busca a área que possui o id informado.
     * @param {IAreaService.GetParams} params - Os parâmetros para encontrar a área.
     * @returns {Promise<Area>} Uma promessa que resolve para a área encontrada.
     */
    getById(params: IAreaService.GetParams): Promise<Area>;

    /**
     * Adiciona uma área com base nos parâmetros fornecidos.
     * @param {IAreaService.AddParams} params - Os parâmetros para adicionar a área.
     * @returns {Promise<Area>} Uma promessa que resolve para a área adicionada.
     */
    add(params: IAreaService.AddParams): Promise<Area>;

    /**
     * Atualiza uma área com base nos parâmetros fornecidos.
     * @param {IAreaService.UpdateParams} params - Os parâmetros para atualizar a área.
     * @returns {Promise<Area>} Uma promessa que resolve para a área atualizada.
     */
    update(params: IAreaService.UpdateParams): Promise<Area>;

    /**
     * Remove uma área com base no id fornecido.
     * @param {IAreaService.DeleteParams} params - Os parâmetros para remover uma área.
     * @returns {Promise<Area>} Uma promessa que resolve para a área removida.
     */
    delete(params: IAreaService.DeleteParams): Promise<Area>;
}

/**
 * Namespace para a interface de gerenciamento de área.
 * @namespace IAreaService
 */
export namespace IAreaService {
    /**
     * Parâmetros para buscar áreas.
     * @typedef {Object} GetParams
     */
    export type GetParams = {
        id?: string;
        mainAreaId?: string;
        take?: number;
        skip?: number;
    };

    /**
     * Parâmetros para adicionar uma área.
     * @typedef {Object} AddParams
     */
    export type AddParams = {
        name: string;
        code: string;
        mainAreaId: string;
    };

    /**
     * Parâmetros para atualizar uma área.
     * @typedef {Object} UpdateParams
     */
    export type UpdateParams = {
        id?: string;
        name: string;
        code: string;
        mainAreaId: string;
    };

    /**
     * Parâmetros para remover uma área.
     * @typedef {Object} DeleteParams
     */
    export type DeleteParams = {
        id?: string;
    };
}