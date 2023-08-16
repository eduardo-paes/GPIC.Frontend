import { Professor } from "@/domain/models/professor";
import { IProfessorService } from "@/domain/usecases/professor-interface";
import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@/infrastructure/data/protocols/http";
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
     */
    constructor(
        private readonly url: string,
        private readonly httpClient: IHttpClient
    ) { }

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
            body: professorDTO
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            console.log(httpResponse);

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
