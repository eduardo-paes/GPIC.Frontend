import { MainArea } from "../models/main-area";

/**
 * Interface para gerenciamento de área principal.
 * @interface
 */
export interface IMainAreaService {

    /**
     * Busca todas as áreas principais ativas.
     * @param {IMainAreaService.GetParams} params - Os parâmetros para buscar as áreas principais.
     * @returns {Promise<Array<MainArea>>} Uma promessa que resolve para a lista de áreas principais encontradas.
     */
    get(params: IMainAreaService.GetParams): Promise<Array<MainArea>>;

    /**
     * Busca a área principal que possui o id informado.
     * @param {IMainAreaService.GetParams} params - Os parâmetros para encontrar a área principal.
     * @returns {Promise<MainArea>} Uma promessa que resolve para a área principal encontrada.
     */
    getById(params: IMainAreaService.GetParams): Promise<MainArea>;

    /**
     * Adiciona uma área principal com base nos parâmetros fornecidos.
     * @param {IMainAreaService.AddParams} params - Os parâmetros para adicionar a área principal.
     * @returns {Promise<MainArea>} Uma promessa que resolve para a área principal adicionada.
     */
    add(params: IMainAreaService.AddParams): Promise<MainArea>;

    /**
     * Atualiza uma área principal com base nos parâmetros fornecidos.
     * @param {IMainAreaService.UpdateParams} params - Os parâmetros para atualizar a área principal.
     * @returns {Promise<MainArea>} Uma promessa que resolve para a área principal atualizada.
     */
    update(params: IMainAreaService.UpdateParams): Promise<MainArea>;

    /**
     * Remove uma área principal com base no id fornecido.
     * @param {IMainAreaService.DeleteParams} params - Os parâmetros para remover uma área principal.
     * @returns {Promise<MainArea>} Uma promessa que resolve para a área principal removida.
     */
    delete(params: IMainAreaService.DeleteParams): Promise<MainArea>;
}

/**
 * Namespace para a interface de gerenciamento de área principal.
 * @namespace IMainAreaService
 */
export namespace IMainAreaService {
    /**
     * Parâmetros para buscar áreas principais.
     * @typedef {Object} GetParams
     */
    export type GetParams = {
        id?: string;
        take?: number;
        skip?: number;
    };

    /**
     * Parâmetros para adicionar uma área principal.
     * @typedef {Object} AddParams
     */
    export type AddParams = {
        name: string;
        code: string;
    };

    /**
     * Parâmetros para atualizar uma área principal.
     * @typedef {Object} UpdateParams
     */
    export type UpdateParams = {
        id?: string;
        name: string;
        code: string;
    };

    /**
     * Parâmetros para remover uma área principal.
     * @typedef {Object} DeleteParams
     */
    export type DeleteParams = {
        id?: string;
    };
}