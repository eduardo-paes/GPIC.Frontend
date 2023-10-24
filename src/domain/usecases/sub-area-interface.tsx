import { SubArea } from "../models/sub-area";

/**
 * Interface para gerenciamento de sub área.
 * @interface
 */
export interface ISubAreaService {

    /**
     * Busca todas as sub áreas ativas de determinada área.
     * @param {ISubAreaService.GetParams} params - Os parâmetros para buscar as sub áreas.
     * @returns {Promise<Array<SubArea>>} Uma promessa que resolve para a lista de sub áreas encontradas.
     */
    get(params: ISubAreaService.GetParams): Promise<Array<SubArea>>;

    /**
     * Busca a sub área que possui o id informado.
     * @param {ISubAreaService.GetParams} params - Os parâmetros para encontrar a sub área.
     * @returns {Promise<SubArea>} Uma promessa que resolve para a sub área encontrada.
     */
    getById(params: ISubAreaService.GetParams): Promise<SubArea>;

    /**
     * Adiciona uma sub área com base nos parâmetros fornecidos.
     * @param {ISubAreaService.AddParams} params - Os parâmetros para adicionar a sub área.
     * @returns {Promise<SubArea>} Uma promessa que resolve para a sub área adicionada.
     */
    add(params: ISubAreaService.AddParams): Promise<SubArea>;

    /**
     * Atualiza uma sub área com base nos parâmetros fornecidos.
     * @param {ISubAreaService.UpdateParams} params - Os parâmetros para atualizar a sub área.
     * @returns {Promise<SubArea>} Uma promessa que resolve para a sub área atualizada.
     */
    update(params: ISubAreaService.UpdateParams): Promise<SubArea>;

    /**
     * Remove uma sub área com base no id fornecido.
     * @param {ISubAreaService.DeleteParams} params - Os parâmetros para remover uma sub área.
     * @returns {Promise<SubArea>} Uma promessa que resolve para a sub área removida.
     */
    delete(params: ISubAreaService.DeleteParams): Promise<SubArea>;
}

/**
 * Namespace para a interface de gerenciamento de sub área.
 * @namespace ISubAreaService
 */
export namespace ISubAreaService {
    /**
     * Parâmetros para buscar sub áreas.
     * @typedef {Object} GetParams
     */
    export type GetParams = {
        id?: string;
        areaId?: string;
        take?: number;
        skip?: number;
    };

    /**
     * Parâmetros para adicionar uma sub área.
     * @typedef {Object} AddParams
     */
    export type AddParams = {
        name: string;
        code: string;
        areaId: string;
    };

    /**
     * Parâmetros para atualizar uma sub área.
     * @typedef {Object} UpdateParams
     */
    export type UpdateParams = {
        id?: string;
        name: string;
        code: string;
        areaId: string;
    };

    /**
     * Parâmetros para remover uma sub área.
     * @typedef {Object} DeleteParams
     */
    export type DeleteParams = {
        id?: string;
    };
}