import { Notice } from "../models/notice";

/**
 * Interface para gerenciamento de edital.
 * @interface
 */
export interface INoticeService {

    /**
     * Busca todos os editais ativos.
     * @param {INoticeService.GetParams} params - Os parâmetros para buscar os editais.
     * @returns {Promise<Array<Notice>>} Uma promessa que resolve para a lista de editais encontrados.
     */
    get(params: INoticeService.GetParams): Promise<Array<Notice>>;

    /**
     * Busca o edital que possui o id informado.
     * @param {INoticeService.GetParams} params - Os parâmetros para encontrar o edital.
     * @returns {Promise<Notice>} Uma promessa que resolve para o edital encontrado.
     */
    getById(params: INoticeService.GetParams): Promise<Notice>;

    /**
     * Adiciona um edital com base nos parâmetros fornecidos.
     * @param {INoticeService.AddParams} params - Os parâmetros para adicionar o edital.
     * @returns {Promise<Notice>} Uma promessa que resolve para o edital adicionado.
     */
    add(params: INoticeService.AddParams): Promise<Notice>;

    /**
     * Atualiza um edital com base nos parâmetros fornecidos.
     * @param {INoticeService.UpdateParams} params - Os parâmetros para atualizar o edital.
     * @returns {Promise<Notice>} Uma promessa que resolve para o edital atualizado.
     */
    update(params: INoticeService.UpdateParams): Promise<Notice>;

    /**
     * Remove um edital com base no id fornecido.
     * @param {INoticeService.DeleteParams} params - Os parâmetros para remover um edital.
     * @returns {Promise<Notice>} Uma promessa que resolve para o edital removido.
     */
    delete(params: INoticeService.DeleteParams): Promise<Notice>;
}

/**
 * Namespace para a interface de gerenciamento de edital.
 * @namespace INoticeService
 */
export namespace INoticeService {
    /**
     * Parâmetros para buscar editais.
     * @typedef {Object} GetParams
     */
    export type GetParams = {
        id?: string;
        take?: number;
        skip?: number;
    };

    /**
     * Parâmetros para adicionar um edital.
     * @typedef {Object} AddParams
     */
    export type AddParams = {
        registrationStartDate: Date;
        registrationEndDate: Date;
        evaluationStartDate: Date;
        evaluationEndDate: Date;
        appealStartDate: Date;
        appealEndDate: Date;
        sendingDocsStartDate: Date;
        sendingDocsEndDate: Date;
        suspensionYears: number;
        partialReportDeadline: Date;
        finalReportDeadline: Date;
        docUrl: string;
    };

    /**
     * Parâmetros para atualizar um edital.
     * @typedef {Object} UpdateParams
     */
    export type UpdateParams = {
        id?: string;
        registrationStartDate: Date;
        registrationEndDate: Date;
        evaluationStartDate: Date;
        evaluationEndDate: Date;
        appealStartDate: Date;
        appealEndDate: Date;
        sendingDocsStartDate: Date;
        sendingDocsEndDate: Date;
        suspensionYears: number;
        partialReportDeadline: Date;
        finalReportDeadline: Date;
        docUrl?: string;
        description?: string;
        deletedAt?: Date;
    };

    /**
     * Parâmetros para remover um edital.
     * @typedef {Object} DeleteParams
     */
    export type DeleteParams = {
        id?: string;
    };
}