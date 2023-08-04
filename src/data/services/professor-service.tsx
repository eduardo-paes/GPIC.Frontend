import { Professor } from "@/domain/models/professor";
import { IProfessorService } from "@/domain/usecases/professor-interface";
import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@/infrastructure/data/protocols/http";
import { ProfessorDTO } from "../models/professor-dto";

/**
 * Classe que implementa a interface de adição de usuário.
 * @class
 * @implements {IProfessorService}
 */
export class ProfessorService implements IProfessorService {
    /**
     * Cria uma instância de ProfessorService.
     * @constructor
     * @param {string} url - A URL para adicionar um usuário.
     * @param {IHttpClient} httpClient - O cliente HATEOAS para realizar as requisições.
     */
    constructor(
        private readonly url: string,
        private readonly httpClient: IHttpClient
    ) { }

    /**
     * Adiciona um usuário com base nos parâmetros fornecidos.
     * @async
     * @param {IProfessorService.AddParams} params - Os parâmetros para adicionar o usuário.
     * @returns {Promise<Professor>} Uma promessa que resolve para o usuário adicionado.
     */
    async add(params: IProfessorService.AddParams): Promise<Professor> {
        const professorDTO: ProfessorDTO = {
            name: params.name,
            CPF: params.CPF,
            email: params.email + "@professor.cefet-rj.br",
            password: params.password,
            confirmPassword: params.confirmPassword,
            SIAPE: params.SIAPE,
            idLattes: params.idLattes
        };

        const httpRequest: HttpRequest = {
            url: this.url,
            method: 'POST',
            body: professorDTO
        };

        console.log(httpRequest);

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            console.log(httpResponse);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao criar professor.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar o cadastro de professor: ${error.message}`);
        }
    }
}
