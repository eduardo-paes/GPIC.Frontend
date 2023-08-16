import { Notice } from "@/domain/models/notice";
import { INoticeService } from "@/domain/usecases/notice-interface";
import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@/infrastructure/data/protocols/http";
import { NoticeDTO } from "../models/notice-dto";

/**
 * Classe que implementa a interface de adição de edital.
 * @class
 * @implements {INoticeService}
 */
export class NoticeService implements INoticeService {
    /**
     * Cria uma instância de NoticeService.
     * @constructor
     * @param {string} url - A URL para adicionar um edital.
     * @param {IHttpClient} httpClient - O cliente HATEOAS para realizar as requisições.
     */
    constructor(
        private readonly url: string,
        private readonly httpClient: IHttpClient
    ) { }

    /**
     * Busca um número pré definido de editais pulando um número pré definido.
     * @async
     * @param {INoticeService.GetParams} params - Os parâmetros para buscar os editais.
     * @returns {Promise<Notice>} Uma promessa que resolve para a lista de editais encontrados.
     */
    async get(params: INoticeService.GetParams): Promise<Array<Notice>> {

        const httpRequest: HttpRequest = {
            url: this.url,
            method: 'GET',
            body: {
                skip: params.skip,
                take: params.take
            }
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else if (httpResponse.statusCode === HttpStatusCode.notFound) {
                return [];
            } else {
                throw new Error('Falha ao buscar editais.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca dos editais: ${error.message}`);
        }
    }

    /**
     * Busca o edital pelo id informado.
     * @async
     * @param {INoticeService.GetParams} params - Os parâmetros para buscar o edital.
     * @returns {Promise<Notice>} Uma promessa que resolve para o edital encontrado.
     */
    async getById(params: INoticeService.GetParams): Promise<Notice> {

        const httpRequest: HttpRequest = {
            url: `${this.url}/${params.id}`,
            method: 'GET'
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao buscar edital.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca do edital: ${error.message}`);
        }
    }

    /**
     * Adiciona um edital com base nos parâmetros fornecidos.
     * @async
     * @param {INoticeService.AddParams} params - Os parâmetros para adicionar o edital.
     * @returns {Promise<Notice>} Uma promessa que resolve para o edital adicionado.
     */
    async add(params: INoticeService.AddParams): Promise<Notice> {
        const noticeDTO: NoticeDTO = {
            registrationStartDate: params.registrationStartDate,
            registrationEndDate: params.registrationEndDate,
            evaluationStartDate: params.evaluationStartDate,
            evaluationEndDate: params.evaluationEndDate,
            appealStartDate: params.appealStartDate,
            appealEndDate: params.appealEndDate,
            sendingDocsStartDate: params.sendingDocsStartDate,
            sendingDocsEndDate: params.sendingDocsEndDate,
            suspensionYears: params.suspensionYears,
            partialReportDeadline: params.partialReportDeadline,
            finalReportDeadline: params.finalReportDeadline,
            docUrl: params.docUrl
        };

        const httpRequest: HttpRequest = {
            url: this.url,
            method: 'POST',
            body: noticeDTO
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.created) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao criar edital.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar o cadastro de edital: ${error.message}`);
        }
    }

    /**
     * Atualiza um edital com base nos parâmetros fornecidos.
     * @async
     * @param {INoticeService.UpdateParams} params - Os parâmetros para atualizar o edital.
     * @returns {Promise<Notice>} Uma promessa que resolve para o edital atualizado.
     */
    async update(params: INoticeService.UpdateParams): Promise<Notice> {
        const noticeDTO: NoticeDTO = {
            registrationStartDate: params.registrationStartDate,
            registrationEndDate: params.registrationEndDate,
            evaluationStartDate: params.evaluationStartDate,
            evaluationEndDate: params.evaluationEndDate,
            appealStartDate: params.appealStartDate,
            appealEndDate: params.appealEndDate,
            sendingDocsStartDate: params.sendingDocsStartDate,
            sendingDocsEndDate: params.sendingDocsEndDate,
            suspensionYears: params.suspensionYears,
            partialReportDeadline: params.partialReportDeadline,
            finalReportDeadline: params.finalReportDeadline,
            docUrl: params.docUrl,
            description: params.description,
            deletedAt: params.deletedAt
        };

        const httpRequest: HttpRequest = {
            url: `${this.url}/${params.id}`,
            method: 'PUT',
            body: noticeDTO
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao atualizar edital.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a atualização de edital: ${error.message}`);
        }
    }

    /**
     * Remove um edital com base no id fornecido.
     * @async
     * @param {INoticeService.DeleteParams} params - Os parâmetros para remover o edital.
     * @returns {Promise<Notice>} Uma promessa que resolve para o edital removido.
     */
    async delete(params: INoticeService.DeleteParams): Promise<Notice> {

        const httpRequest: HttpRequest = {
            url: `${this.url}/${params.id}`,
            method: 'DELETE'
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao remover edital.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a remoção de edital: ${error.message}`);
        }
    }
}
