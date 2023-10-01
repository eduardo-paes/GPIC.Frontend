import { Area } from "@/domain/models/area";
import { IAreaService } from "@/domain/usecases/area-interface";
import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@/infrastructure/interfaces/protocols";
import { AreaDTO } from "../models/area-dto";

/**
 * Classe que implementa a interface de adição de área.
 * @class
 * @implements {IAreaService}
 */
export class AreaService implements IAreaService {
    /**
     * Cria uma instância de AreaService.
     * @constructor
     * @param {string} url - A URL para adicionar uma área.
     * @param {IHttpClient} httpClient - O cliente HATEOAS para realizar as requisições.
     * @param {Record<string, string>} privateHeader - Informações de segurança para realizar as requisições.
     */
    constructor(
        private readonly url: string,
        private readonly httpClient: IHttpClient,
        private readonly privateHeader: Record<string, string>
    ) { }

    /**
     * Busca um número pré definido de áreas pulando um número pré definido.
     * @async
     * @param {IAreaService.GetParams} params - Os parâmetros para buscar as áreas.
     * @returns {Promise<Area>} Uma promessa que resolve para a lista de áreas encontradas.
     */
    async get(params: IAreaService.GetParams): Promise<Array<Area>> {

        const key = import.meta.env.VITE_OCP_APIM_SUBSCRIPTION_KEY;

        const httpRequest: HttpRequest = {
            url: this.url,
            method: 'GET',
            body: {
                mainAreaId: params.mainAreaId,
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
                throw new Error('Falha ao buscar áreas.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca das áreas: ${error.message}`);
        }
    }

    /**
     * Busca a área pelo id informado.
     * @async
     * @param {IAreaService.GetParams} params - Os parâmetros para buscar a área.
     * @returns {Promise<Area>} Uma promessa que resolve para a área encontrada.
     */
    async getById(params: IAreaService.GetParams): Promise<Area> {

        const httpRequest: HttpRequest = {
            url: `${this.url}${params.id}`,
            method: 'GET',
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao buscar área.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca da área: ${error.message}`);
        }
    }

    /**
     * Adiciona uma área com base nos parâmetros fornecidos.
     * @async
     * @param {IAreaService.AddParams} params - Os parâmetros para adicionar a área.
     * @returns {Promise<Area>} Uma promessa que resolve para a área adicionada.
     */
    async add(params: IAreaService.AddParams): Promise<Area> {
        const areaDTO: AreaDTO = { ...params }

        const httpRequest: HttpRequest = {
            url: this.url,
            method: 'POST',
            body: areaDTO,
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
                throw new Error('Falha ao criar área.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar o cadastro de área: ${error.message}`);
        }
    }

    /**
     * Atualiza uma área com base nos parâmetros fornecidos.
     * @async
     * @param {IAreaService.UpdateParams} params - Os parâmetros para atualizar a área.
     * @returns {Promise<Area>} Uma promessa que resolve para a área atualizada.
     */
    async update(params: IAreaService.UpdateParams): Promise<Area> {

        const areaDTO: AreaDTO = { ...params };

        const httpRequest: HttpRequest = {
            url: `${this.url + params.id}`,
            method: 'PUT',
            body: areaDTO,
            headers: {
                ...this.privateHeader,
                'Content-Type': 'multipart/form-data'
            }
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao atualizar área.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a atualização de área: ${error.message}`);
        }
    }

    /**
     * Remove uma área com base no id fornecido.
     * @async
     * @param {IAreaService.DeleteParams} params - Os parâmetros para remover a área.
     * @returns {Promise<Area>} Uma promessa que resolve para a área removida.
     */
    async delete(params: IAreaService.DeleteParams): Promise<Area> {

        const httpRequest: HttpRequest = {
            url: `${this.url}/${params.id}`,
            method: 'DELETE',
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok)
                return httpResponse.body;
            else throw new Error(`Falha ao remover área.`);
        } catch (error: any) {
            throw new Error(`Erro ao realizar a remoção de área: ${error.message}`);
        }
    }
}
