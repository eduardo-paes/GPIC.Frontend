import { Campus } from "@/domain/models/campus";
import { ICampusService } from "@/domain/usecases/campus-interface";
import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@/infrastructure/interfaces/protocols";
import { CampusDTO } from "../models/campus-dto";

/**
 * Classe que implementa a interface de adição de campus.
 * @class
 * @implements {ICampusService}
 */
export class CampusService implements ICampusService {
    /**
     * Cria uma instância de CampusService.
     * @constructor
     * @param {string} url - A URL para adicionar um campus.
     * @param {IHttpClient} httpClient - O cliente HATEOAS para realizar as requisições.
     * @param {Record<string, string>} privateHeader - Informações de segurança para realizar as requisições.
     */
    constructor(
        private readonly url: string,
        private readonly httpClient: IHttpClient,
        private readonly privateHeader: Record<string, string>
    ) { }

    /**
     * Busca os campus ativos.
     * @async
     * @param {ICampusService.GetParams} params - Os parâmetros para buscar os campus.
     * @returns {Promise<Campus>} Uma promessa que resolve para a lista de campus encontrados.
     */
    async get(params: ICampusService.GetParams): Promise<Array<Campus>> {

        const key = import.meta.env.VITE_OCP_APIM_SUBSCRIPTION_KEY;

        const httpRequest: HttpRequest = {
            url: `${this.url}`,
            method: 'GET',
            body: {
                skip: params.skip,
                take: params.take,
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
                throw new Error('Falha ao buscar campus.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca dos campus: ${error.message}`);
        }
    }

    /**
     * Busca o campus pelo id informado.
     * @async
     * @param {ICampusService.GetParams} params - Os parâmetros para buscar o campus.
     * @returns {Promise<Campus>} Uma promessa que resolve para o campus encontrado.
     */
    async getById(params: ICampusService.GetParams): Promise<Campus> {

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
                throw new Error('Falha ao buscar campus.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca do campus: ${error.message}`);
        }
    }

    /**
     * Adiciona um campus com base nos parâmetros fornecidos.
     * @async
     * @param {ICampusService.AddParams} params - Os parâmetros para adicionar o campus.
     * @returns {Promise<Campus>} Uma promessa que resolve para o campus adicionado.
     */
    async add(params: ICampusService.AddParams): Promise<Campus> {
        const campusDTO: CampusDTO = {
            name: params.name,
        }

        const httpRequest: HttpRequest = {
            url: this.url,
            method: 'POST',
            body: campusDTO,
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.created) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao criar campus.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar o cadastro de campus: ${error.message}`);
        }
    }

    /**
     * Atualiza um campus com base nos parâmetros fornecidos.
     * @async
     * @param {ICampusService.UpdateParams} params - Os parâmetros para atualizar o campus.
     * @returns {Promise<Campus>} Uma promessa que resolve para o campus atualizado.
     */
    async update(params: ICampusService.UpdateParams): Promise<Campus> {
        const campusDTO: CampusDTO = {
            name: params.name,
        }

        const httpRequest: HttpRequest = {
            url: `${this.url + params.id}`,
            method: 'PUT',
            body: campusDTO,
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao atualizar campus.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a atualização de campus: ${error.message}`);
        }
    }

    /**
     * Remove um campus com base no id fornecido.
     * @async
     * @param {ICampusService.DeleteParams} params - Os parâmetros para remover o campus.
     * @returns {Promise<Campus>} Uma promessa que resolve para o campus removido.
     */
    async delete(params: ICampusService.DeleteParams): Promise<Campus> {

        const httpRequest: HttpRequest = {
            url: `${this.url}/${params.id}`,
            method: 'DELETE',
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok)
                return httpResponse.body;
            else throw new Error(`Falha ao remover campus.`);
        } catch (error: any) {
            throw new Error(`Erro ao realizar a remoção de campus: ${error.message}`);
        }
    }
}
