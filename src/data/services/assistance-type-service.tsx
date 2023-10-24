import { AssistanceType } from "@/domain/models/assistance-type";
import { IAssistanceTypeService } from "@/domain/usecases/assistance-type-interface";
import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@/infrastructure/interfaces/protocols";
import { AssistanceTypeDTO } from "../models/assistance-type-dto";

/**
 * Classe que implementa a interface de adição de tipo de assistência.
 * @class
 * @implements {IAssistanceTypeService}
 */
export class AssistanceTypeService implements IAssistanceTypeService {
    /**
     * Cria uma instância de AssistanceTypeService.
     * @constructor
     * @param {string} url - A URL para adicionar um tipo de assistência.
     * @param {IHttpClient} httpClient - O cliente HATEOAS para realizar as requisições.
     * @param {Record<string, string>} privateHeader - Informações de segurança para realizar as requisições.
     */
    constructor(
        private readonly url: string,
        private readonly httpClient: IHttpClient,
        private readonly privateHeader: Record<string, string>
    ) { }

    /**
     * Busca os tipos de assistências ativos.
     * @async
     * @param {IAssistanceTypeService.GetParams} params - Os parâmetros para buscar os tipos de assistências.
     * @returns {Promise<AssistanceType>} Uma promessa que resolve para a lista de tipos de assistências encontrados.
     */
    async get(params: IAssistanceTypeService.GetParams): Promise<Array<AssistanceType>> {

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
                throw new Error('Falha ao buscar tipos de assistências.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca dos tipos de assistências: ${error.message}`);
        }
    }

    /**
     * Busca o tipo de assistência pelo id informado.
     * @async
     * @param {IAssistanceTypeService.GetParams} params - Os parâmetros para buscar o tipo de assistência.
     * @returns {Promise<AssistanceType>} Uma promessa que resolve para o tipo de assistência encontrado.
     */
    async getById(params: IAssistanceTypeService.GetParams): Promise<AssistanceType> {

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
                throw new Error('Falha ao buscar tipo de assistência.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca do tipo de assistência: ${error.message}`);
        }
    }

    /**
     * Adiciona um tipo de assistência com base nos parâmetros fornecidos.
     * @async
     * @param {IAssistanceTypeService.AddParams} params - Os parâmetros para adicionar o tipo de assistência.
     * @returns {Promise<AssistanceType>} Uma promessa que resolve para o tipo de assistência adicionado.
     */
    async add(params: IAssistanceTypeService.AddParams): Promise<AssistanceType> {
        const assistanceTypeDTO: AssistanceTypeDTO = {
            name: params.name,
            description: params.description
        }

        const httpRequest: HttpRequest = {
            url: this.url,
            method: 'POST',
            body: assistanceTypeDTO,
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.created) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao criar tipo de assistência.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar o cadastro de tipo de assistência: ${error.message}`);
        }
    }

    /**
     * Atualiza um tipo de assistência com base nos parâmetros fornecidos.
     * @async
     * @param {IAssistanceTypeService.UpdateParams} params - Os parâmetros para atualizar o tipo de assistência.
     * @returns {Promise<AssistanceType>} Uma promessa que resolve para o tipo de assistência atualizado.
     */
    async update(params: IAssistanceTypeService.UpdateParams): Promise<AssistanceType> {
        const assistanceTypeDTO: AssistanceTypeDTO = {
            name: params.name,
            description: params.description
        }

        const httpRequest: HttpRequest = {
            url: `${this.url + params.id}`,
            method: 'PUT',
            body: assistanceTypeDTO,
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao atualizar tipo de assistência.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a atualização de tipo de assistência: ${error.message}`);
        }
    }

    /**
     * Remove um tipo de assistência com base no id fornecido.
     * @async
     * @param {IAssistanceTypeService.DeleteParams} params - Os parâmetros para remover o tipo de assistência.
     * @returns {Promise<AssistanceType>} Uma promessa que resolve para o tipo de assistência removido.
     */
    async delete(params: IAssistanceTypeService.DeleteParams): Promise<AssistanceType> {

        const httpRequest: HttpRequest = {
            url: `${this.url}/${params.id}`,
            method: 'DELETE',
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok)
                return httpResponse.body;
            else throw new Error(`Falha ao remover tipo de assistência.`);
        } catch (error: any) {
            throw new Error(`Erro ao realizar a remoção de tipo de assistência: ${error.message}`);
        }
    }
}
