import { Notice } from "@/domain/models/notice";
import { INoticeService } from "@/domain/usecases/notice-interface";
import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@/infrastructure/interfaces/protocols";

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
     * @param {Record<string, string>} privateHeader - Informações de segurança para realizar as requisições.
     */
    constructor(
        private readonly url: string,
        private readonly httpClient: IHttpClient,
        private readonly privateHeader: Record<string, string>
    ) { }

    /**
     * Busca um número pré definido de editais pulando um número pré definido.
     * @async
     * @param {INoticeService.GetParams} params - Os parâmetros para buscar os editais.
     * @returns {Promise<Notice>} Uma promessa que resolve para a lista de editais encontrados.
     */
    async get(params: INoticeService.GetParams): Promise<Array<Notice>> {

        const key = import.meta.env.VITE_OCP_APIM_SUBSCRIPTION_KEY;

        const httpRequest: HttpRequest = {
            url: this.url,
            method: 'GET',
            body: {
                skip: params.skip,
                take: params.take
            },
            headers: this.privateHeader
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
            method: 'GET',
            headers: this.privateHeader
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
        const noticeDTO = new FormData();
        noticeDTO.append("registrationStartDate", params.registrationStartDate.toISOString());
        noticeDTO.append("registrationEndDate", params.registrationEndDate.toISOString());
        noticeDTO.append("evaluationStartDate", params.evaluationStartDate.toISOString());
        noticeDTO.append("evaluationEndDate", params.evaluationEndDate.toISOString());
        noticeDTO.append("appealStartDate", params.appealStartDate.toISOString());
        noticeDTO.append("appealEndDate", params.appealEndDate.toISOString());
        noticeDTO.append("sendingDocsStartDate", params.sendingDocsStartDate.toISOString());
        noticeDTO.append("sendingDocsEndDate", params.sendingDocsEndDate.toISOString());
        noticeDTO.append("suspensionYears", params.suspensionYears.toString());
        noticeDTO.append("partialReportDeadline", params.partialReportDeadline.toISOString());
        noticeDTO.append("finalReportDeadline", params.finalReportDeadline.toISOString());
        if (params.attachedFile) noticeDTO.append("file", params.attachedFile);
        if (params.activities) {
            params.activities.forEach((activityType, atIndex) => {
                noticeDTO.append(`activities[${atIndex}].name`, activityType.name);
                noticeDTO.append(`activities[${atIndex}].unity`, activityType.unity);
                if (activityType.activities) {
                    activityType.activities.forEach((activity, index) => {
                        noticeDTO.append(`activities[${atIndex}].activities[${index}].name`, activity.name);
                        noticeDTO.append(`activities[${atIndex}].activities[${index}].points`, activity.points.toString());
                        noticeDTO.append(`activities[${atIndex}].activities[${index}].limits`, activity.limits.toString());
                    })
                }
            });
        }
        noticeDTO.append('suspensionYears', params.suspensionYears.toString());
        if (params.description) noticeDTO.append('description', params.description);

        const httpRequest: HttpRequest = {
            url: this.url,
            method: 'POST',
            body: noticeDTO,
            headers: {
                ...this.privateHeader,
                'Content-Type': 'multipart/form-data'
            }
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

        const noticeDTO = new FormData();
        noticeDTO.append("registrationStartDate", typeof params.registrationStartDate === 'string' ? params.registrationStartDate : params.registrationStartDate.toISOString());
        noticeDTO.append("registrationEndDate", typeof params.registrationEndDate === 'string' ? params.registrationEndDate : params.registrationEndDate.toISOString());
        noticeDTO.append("evaluationStartDate", typeof params.evaluationStartDate === 'string' ? params.evaluationStartDate : params.evaluationStartDate.toISOString());
        noticeDTO.append("evaluationEndDate", typeof params.evaluationEndDate === 'string' ? params.evaluationEndDate : params.evaluationEndDate.toISOString());
        noticeDTO.append("appealStartDate", typeof params.appealStartDate === 'string' ? params.appealStartDate : params.appealStartDate.toISOString());
        noticeDTO.append("appealEndDate", typeof params.appealEndDate === 'string' ? params.appealEndDate : params.appealEndDate.toISOString());
        noticeDTO.append("sendingDocsStartDate", typeof params.sendingDocsStartDate === 'string' ? params.sendingDocsStartDate : params.sendingDocsStartDate.toISOString());
        noticeDTO.append("sendingDocsEndDate", typeof params.sendingDocsEndDate === 'string' ? params.sendingDocsEndDate : params.sendingDocsEndDate.toISOString());
        noticeDTO.append("partialReportDeadline", typeof params.partialReportDeadline === 'string' ? params.partialReportDeadline : params.partialReportDeadline.toISOString());
        noticeDTO.append("finalReportDeadline", typeof params.finalReportDeadline === 'string' ? params.finalReportDeadline : params.finalReportDeadline.toISOString());
        noticeDTO.append("suspensionYears", params.suspensionYears.toString());
        if (params.attachedFile) noticeDTO.append("file", params.attachedFile);
        if (params.activities) {
            params.activities.forEach((activityType, atIndex) => {
                noticeDTO.append(`activities[${atIndex}].name`, activityType.name);
                noticeDTO.append(`activities[${atIndex}].unity`, activityType.unity);
                if (activityType.activities) {
                    activityType.activities.forEach((activity, index) => {
                        noticeDTO.append(`activities[${atIndex}].activities[${index}].name`, activity.name);
                        noticeDTO.append(`activities[${atIndex}].activities[${index}].points`, activity.points.toString());
                        noticeDTO.append(`activities[${atIndex}].activities[${index}].limits`, activity.limits.toString());
                    })
                }
            });
        }
        noticeDTO.append('suspensionYears', params.suspensionYears.toString());
        if (params.description) {
            noticeDTO.append('description', params.description);
        }

        const httpRequest: HttpRequest = {
            url: `${this.url + params.id}`,
            method: 'PUT',
            body: noticeDTO,
            headers: {
                ...this.privateHeader,
                'Content-Type': 'multipart/form-data'
            }
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);
            console.log(httpResponse);

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
            method: 'DELETE',
            headers: this.privateHeader
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
