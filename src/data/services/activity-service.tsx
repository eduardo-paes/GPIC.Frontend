import { ActivityType } from "@/domain/models/activity-type";
import { IActivityService } from "@/domain/usecases/activity-interface";
import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@/infrastructure/interfaces/protocols";

/**
 * Classe que implementa a interface de adição de edital.
 * @class
 * @implements {IActivityService}
 */
export class ActivityService implements IActivityService {
    /**
     * Cria uma instância de ActivityService.
     * @constructor
     * @param {string} url - A URL para realizar as buscas pelas atividades.
     * @param {IHttpClient} httpClient - O cliente HATEOAS para realizar as requisições.
     * @param {Record<string, string>} privateHeader - Parte privada do header.
     */
    constructor(
        private readonly url: string,
        private readonly httpClient: IHttpClient,
        private readonly privateHeader: Record<string, string>
    ) { }

    /**
     * Busca as últimas atividades em uso pelo edital anterior.
     * @async
     * @returns {Promise<Array<ActivityType>>} Uma promessa que resolve para a lista de tipos de atividades encontrados.
     */
    async getOfLastNotice(): Promise<Array<ActivityType>> {

        const httpRequest: HttpRequest = {
            url: this.url,
            method: 'GET',
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else if (httpResponse.statusCode === HttpStatusCode.notFound) {
                return [];
            } else {
                throw new Error('Falha ao buscar atividades.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca das atividades: ${error.message}`);
        }
    }

    /**
     * Busca as atividades de um edital cujo o id é especificado.
     * @async
     * @param {IActivityService.GetParams} params - Os parâmetros para buscar as atividades.
     * @returns {Promise<Activity>} Uma promessa que resolve para o arranjo de atividades encontradas.
     */
    async getByNoticeId(params: IActivityService.GetParams): Promise<Array<ActivityType>> {

        const httpRequest: HttpRequest = {
            url: `${this.url}/notice/${params.id}`,
            method: 'GET',
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao buscar as atividades do edital informado.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca das atividades do edital informado: ${error.message}`);
        }
    }
}
