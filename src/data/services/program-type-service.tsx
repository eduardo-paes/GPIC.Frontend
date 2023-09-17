import { ProgramType } from "@/domain/models/program-type";
import { IProgramTypeService } from "@/domain/usecases/program-type-interface";
import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@/infrastructure/interfaces/protocols";
import { ProgramTypeDTO } from "../models/program-type-dto";

/**
 * Classe que implementa a interface de adição de tipo de programa.
 * @class
 * @implements {IProgramTypeService}
 */
export class ProgramTypeService implements IProgramTypeService {
    /**
     * Cria uma instância de ProgramTypeService.
     * @constructor
     * @param {string} url - A URL para adicionar um tipo de programa.
     * @param {IHttpClient} httpClient - O cliente HATEOAS para realizar as requisições.
     * @param {Record<string, string>} privateHeader - Informações de segurança para realizar as requisições.
     */
    constructor(
        private readonly url: string,
        private readonly httpClient: IHttpClient,
        private readonly privateHeader: Record<string, string>
    ) { }

    /**
     * Busca os tipos de programas ativos.
     * @async
     * @param {IProgramTypeService.GetParams} params - Os parâmetros para buscar os tipos de programas.
     * @returns {Promise<ProgramType>} Uma promessa que resolve para a lista de tipos de programas encontrados.
     */
    async get(params: IProgramTypeService.GetParams): Promise<Array<ProgramType>> {

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
                throw new Error('Falha ao buscar tipos de programas.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca dos tipos de programas: ${error.message}`);
        }
    }

    /**
     * Busca o tipo de programa pelo id informado.
     * @async
     * @param {IProgramTypeService.GetParams} params - Os parâmetros para buscar o tipo de programa.
     * @returns {Promise<ProgramType>} Uma promessa que resolve para o tipo de programa encontrado.
     */
    async getById(params: IProgramTypeService.GetParams): Promise<ProgramType> {

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
                throw new Error('Falha ao buscar tipo de programa.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca do tipo de programa: ${error.message}`);
        }
    }

    /**
     * Adiciona um tipo de programa com base nos parâmetros fornecidos.
     * @async
     * @param {IProgramTypeService.AddParams} params - Os parâmetros para adicionar o tipo de programa.
     * @returns {Promise<ProgramType>} Uma promessa que resolve para o tipo de programa adicionado.
     */
    async add(params: IProgramTypeService.AddParams): Promise<ProgramType> {
        const programTypeDTO: ProgramTypeDTO = {
            name: params.name,
            description: params.description
        }

        const httpRequest: HttpRequest = {
            url: this.url,
            method: 'POST',
            body: programTypeDTO,
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.created) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao criar tipo de programa.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar o cadastro de tipo de programa: ${error.message}`);
        }
    }

    /**
     * Atualiza um tipo de programa com base nos parâmetros fornecidos.
     * @async
     * @param {IProgramTypeService.UpdateParams} params - Os parâmetros para atualizar o tipo de programa.
     * @returns {Promise<ProgramType>} Uma promessa que resolve para o tipo de programa atualizado.
     */
    async update(params: IProgramTypeService.UpdateParams): Promise<ProgramType> {
        const programTypeDTO: ProgramTypeDTO = {
            name: params.name,
            description: params.description
        }

        const httpRequest: HttpRequest = {
            url: `${this.url + params.id}`,
            method: 'PUT',
            body: programTypeDTO,
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);
            console.log(httpResponse);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao atualizar tipo de programa.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a atualização de tipo de programa: ${error.message}`);
        }
    }

    /**
     * Remove um tipo de programa com base no id fornecido.
     * @async
     * @param {IProgramTypeService.DeleteParams} params - Os parâmetros para remover o tipo de programa.
     * @returns {Promise<ProgramType>} Uma promessa que resolve para o tipo de programa removido.
     */
    async delete(params: IProgramTypeService.DeleteParams): Promise<ProgramType> {

        const httpRequest: HttpRequest = {
            url: `${this.url}/${params.id}`,
            method: 'DELETE',
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok)
                return httpResponse.body;
            else throw new Error(`Falha ao remover tipo de programa.`);
        } catch (error: any) {
            throw new Error(`Erro ao realizar a remoção de tipo de programa: ${error.message}`);
        }
    }
}
