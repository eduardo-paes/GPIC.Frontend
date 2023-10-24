import { Professor } from "@/domain/models/professor";
import { IProfessorService } from "@/domain/usecases/professor-interface";
import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@/infrastructure/interfaces/protocols";
import { ProfessorDTO } from "../models/professor-dto";

/**
 * Classe que implementa a interface de adição de professor.
 * @class
 * @implements {IProfessorService}
 */
export class ProfessorService implements IProfessorService {
    /**
     * Cria uma instância de ProfessorService.
     * @constructor
     * @param {string} url - A URL para adicionar um professor.
     * @param {IHttpClient} httpClient - O cliente HATEOAS para realizar as requisições.
     * @param {Record<string, string>} publicHeader - Header para requisições públicas.
     * @param {Record<string, string>} privateHeader - Header para requisições privadas.
     */
    constructor(
        private readonly url: string,
        private readonly httpClient: IHttpClient,
        private readonly publicHeader: Record<string, string>,
        private readonly privateHeader: Record<string, string>
    ) { }

    /**
     * Busca os professores ativos.
     * @async
     * @param {IProfessorService.GetParams} params - Os parâmetros para buscar os professores.
     * @returns {Promise<Array<Professor>>} Uma promessa que resolve para a lista de professores encontrados.
     */
    async get(params: IProfessorService.GetParams): Promise<Professor[]> {
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
                throw new Error('Falha ao buscar professores.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca dos professores: ${error.message}`);
        }
    }

    /**
     * Busca o professor pelo id informado.
     * @async
     * @param {IProfessorService.GetParams} params - Os parâmetros para buscar o professor.
     * @returns {Promise<Professor>} Uma promessa que resolve para o professor encontrado.
     */
    async getById(params: IProfessorService.GetParams): Promise<Professor> {

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
                throw new Error('Falha ao buscar professor.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca do professor: ${error.message}`);
        }
    }

    /**
     * Adiciona um professor com base nos parâmetros fornecidos.
     * @async
     * @param {IProfessorService.AddParams} params - Os parâmetros para adicionar o professor.
     * @returns {Promise<Professor>} Uma promessa que resolve para o professor adicionado.
     */
    async add(params: IProfessorService.AddParams): Promise<Professor> {
        const professorDTO: ProfessorDTO = {
            name: params.name,
            CPF: params.CPF,
            email: params.email,
            password: params.password,
            SIAPEEnrollment: params.SIAPEEnrollment,
            identifyLattes: params.identifyLattes
        };

        const httpRequest: HttpRequest = {
            url: this.url,
            method: 'POST',
            body: professorDTO,
            headers: this.publicHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.created) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao criar professor.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar o cadastro de professor: ${error.message}`);
        }
    }
}
