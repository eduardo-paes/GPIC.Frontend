import { Project } from "@/domain/models/project";
import { IProjectService } from "@/domain/usecases/project-interface";
import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@/infrastructure/interfaces/protocols";
import { ProjectDTO } from "../models/project-dto";
import { ProjectActivity } from "@/domain/models/project-activity";

/**
 * Classe que implementa a interface de adição de projeto.
 * @class
 * @implements {IProjectService}
 */
export class ProjectService implements IProjectService {
    /**
     * Cria uma instância de ProjectService.
     * @constructor
     * @param {string} url - A URL para adicionar um projeto.
     * @param {IHttpClient} httpClient - O cliente HATEOAS para realizar as requisições.
     * @param {Record<string, string>} privateHeader - Informações de segurança para realizar as requisições.
     */
    constructor(
        private readonly url: string,
        private readonly httpClient: IHttpClient,
        private readonly privateHeader: Record<string, string>
    ) { }

    /**
     * Busca os projetos abertos.
     * @async
     * @param {IProjectService.GetParams} params - Os parâmetros para buscar os projetos.
     * @returns {Promise<Array<Project>>} Uma promessa que resolve para a lista de projetos encontrados.
     */
    async getOpened(params: IProjectService.GetParams): Promise<Array<Project>> {

        const key = import.meta.env.VITE_OCP_APIM_SUBSCRIPTION_KEY;

        const httpRequest: HttpRequest = {
            url: `${this.url}/opened`,
            method: 'GET',
            body: {
                skip: params.skip,
                take: params.take,
                onlyMyProjects: params.onlyMyProjects
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
                throw new Error('Falha ao buscar projetos.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca dos projetos: ${error.message}`);
        }
    }

    /**
     * Busca os projetos fechados.
     * @async
     * @param {IProjectService.GetParams} params - Os parâmetros para buscar os projetos.
     * @returns {Promise<Array<Project>>} Uma promessa que resolve para a lista de projetos encontrados.
     */
    async getClosed(params: IProjectService.GetParams): Promise<Array<Project>> {

        const key = import.meta.env.VITE_OCP_APIM_SUBSCRIPTION_KEY;

        const httpRequest: HttpRequest = {
            url: `${this.url}/closed`,
            method: 'GET',
            body: {
                skip: params.skip,
                take: params.take,
                onlyMyProjects: params.onlyMyProjects
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
                throw new Error('Falha ao buscar projetos.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca dos projetos: ${error.message}`);
        }
    }

    /**
     * Busca as atividades de um projeto específico.
     * @async
     * @param {IProjectService.GetActivitiesParams} params - Os parâmetros para buscar as atividades do projeto.
     * @returns {Promise<Array<ProjectActivity>>} Uma promessa que resolve para a lista de projetos encontrados.
     */
    async getActivitiesByProjectId(params: IProjectService.GetActivitiesParams): Promise<Array<ProjectActivity>> {

        const httpRequest: HttpRequest = {
            url: `${this.url}/activity/${params.projectId}`,
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
                throw new Error('Falha ao buscar as atividades do projeto.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca das atividades do projeto: ${error.message}`);
        }
    }

    /**
     * Busca o projeto pelo id informado.
     * @async
     * @param {IProjectService.GetParams} params - Os parâmetros para buscar o projeto.
     * @returns {Promise<Project>} Uma promessa que resolve para o projeto encontrado.
     */
    async getById(params: IProjectService.GetParams): Promise<Project> {

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
                throw new Error('Falha ao buscar projeto.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a busca do projeto: ${error.message}`);
        }
    }

    /**
     * Adiciona um projeto com base nos parâmetros fornecidos.
     * @async
     * @param {IProjectService.AddParams} params - Os parâmetros para adicionar o projeto.
     * @returns {Promise<Project>} Uma promessa que resolve para o projeto adicionado.
     */
    async add(params: IProjectService.AddParams): Promise<Project> {
        const projectDTO: ProjectDTO = { ...params }
        const httpRequest: HttpRequest = {
            url: this.url,
            method: 'POST',
            body: projectDTO,
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);
            if (httpResponse.statusCode === HttpStatusCode.created) {
                return httpResponse.body;
            } else {
                throw new Error(httpResponse.body);
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar o cadastro de projeto: ${error.message}`);
        }
    }

    /**
     * Atualiza um projeto com base nos parâmetros fornecidos.
     * @async
     * @param {IProjectService.UpdateParams} params - Os parâmetros para atualizar o projeto.
     * @returns {Promise<Project>} Uma promessa que resolve para o projeto atualizado.
     */
    async update(params: IProjectService.UpdateParams): Promise<Project> {
        const projectDTO: ProjectDTO = { ...params }

        const httpRequest: HttpRequest = {
            url: `${this.url + '/' + params.id}`,
            method: 'PUT',
            body: projectDTO,
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else {
                throw new Error(httpResponse.body);
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a atualização de projeto: ${error.message}`);
        }
    }

    /**
     * Submete o projeto.
     * @async
     * @param {IProjectService.SubmitParams} params - Os parâmetros para submeter o projeto.
     * @returns {Promise<Project>} Uma promessa que resolve para o projeto submetido.
     */
    async projectSubmit(params: IProjectService.SubmitParams): Promise<Project> {

        const requestUrl = `${this.url}/submit/${params.id}`;

        const httpRequest: HttpRequest = {
            url: requestUrl,
            method: 'PUT',
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else {
                throw new Error(httpResponse.body);
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a submissão do projeto: ${error.message}`);
        }
    }

    /**
     * Solicita recurso para o projeto.
     * @async
     * @param {IProjectService.AppealParams} params - Os parâmetros para solicitar o recurso para o projeto.
     * @returns {Promise<Project>} Uma promessa que resolve para o projeto atualizado.
     */
    async projectAppeal(params: IProjectService.AppealParams): Promise<Project> {
        const requestUrl = `${this.url}/appeal/${params.id}?appealDescription=${encodeURIComponent(params.appealDescription)}`;

        const httpRequest: HttpRequest = {
            url: requestUrl,
            method: 'PUT',
            headers: this.privateHeader
        };


        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao solicitar recurso para o projeto.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar a solicitação de recurso para o projeto: ${error.message}`);
        }
    }

    /**
     * Remove um projeto com base no id fornecido.
     * @async
     * @param {IProjectService.DeleteParams} params - Os parâmetros para remover o projeto.
     * @returns {Promise<Project>} Uma promessa que resolve para o projeto removido.
     */
    async delete(params: IProjectService.DeleteParams): Promise<Project> {

        const httpRequest: HttpRequest = {
            url: `${this.url}/${params.id}`,
            method: 'DELETE',
            headers: this.privateHeader
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok)
                return httpResponse.body;
            else throw new Error(`Falha ao remover projeto.`);
        } catch (error: any) {
            throw new Error(`Erro ao realizar a remoção de projeto: ${error.message}`);
        }
    }
}
