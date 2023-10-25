import { Course } from "@/domain/models/course";
import { ICourseService } from "@/domain/usecases/course-interface";
import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  IHttpClient,
} from "@/infrastructure/interfaces/protocols";
import { CourseDTO } from "../models/course-dto";

/**
 * Classe que implementa a interface de adição de curso.
 * @class
 * @implements {ICourseService}
 */
export class CourseService implements ICourseService {
  /**
   * Cria uma instância de CourseService.
   * @constructor
   * @param {string} url - A URL para adicionar um curso.
   * @param {IHttpClient} httpClient - O cliente HATEOAS para realizar as requisições.
   * @param {Record<string, string>} privateHeader - Informações de segurança para realizar as requisições.
   */
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient,
    private readonly privateHeader: Record<string, string>
  ) {}

  /**
   * Busca os cursos ativos.
   * @async
   * @param {ICourseService.GetParams} params - Os parâmetros para buscar os cursos.
   * @returns {Promise<Course>} Uma promessa que resolve para a lista de cursos encontrados.
   */
  async get(params: ICourseService.GetParams): Promise<Array<Course>> {
    const httpRequest: HttpRequest = {
      url: `${this.url}`,
      method: "GET",
      body: {
        skip: params.skip,
        take: params.take,
      },
      headers: this.privateHeader,
    };

    try {
      const httpResponse: HttpResponse = await this.httpClient.request(
        httpRequest
      );

      if (httpResponse.statusCode === HttpStatusCode.ok) {
        return httpResponse.body;
      } else if (httpResponse.statusCode === HttpStatusCode.notFound) {
        return [];
      } else {
        throw new Error("Falha ao buscar cursos.");
      }
    } catch (error: any) {
      throw new Error(`Erro ao realizar a busca dos cursos: ${error.message}`);
    }
  }

  /**
   * Busca o curso pelo id informado.
   * @async
   * @param {ICourseService.GetParams} params - Os parâmetros para buscar o curso.
   * @returns {Promise<Course>} Uma promessa que resolve para o curso encontrado.
   */
  async getById(params: ICourseService.GetParams): Promise<Course> {
    const httpRequest: HttpRequest = {
      url: `${this.url}/${params.id}`,
      method: "GET",
      headers: this.privateHeader,
    };

    try {
      const httpResponse: HttpResponse = await this.httpClient.request(
        httpRequest
      );

      if (httpResponse.statusCode === HttpStatusCode.ok) {
        return httpResponse.body;
      } else {
        throw new Error("Falha ao buscar curso.");
      }
    } catch (error: any) {
      throw new Error(`Erro ao realizar a busca do curso: ${error.message}`);
    }
  }

  /**
   * Adiciona um curso com base nos parâmetros fornecidos.
   * @async
   * @param {ICourseService.AddParams} params - Os parâmetros para adicionar o curso.
   * @returns {Promise<Course>} Uma promessa que resolve para o curso adicionado.
   */
  async add(params: ICourseService.AddParams): Promise<Course> {
    const courseDTO: CourseDTO = {
      name: params.name,
    };

    const httpRequest: HttpRequest = {
      url: this.url,
      method: "POST",
      body: courseDTO,
      headers: this.privateHeader,
    };

    try {
      const httpResponse: HttpResponse = await this.httpClient.request(
        httpRequest
      );

      if (httpResponse.statusCode === HttpStatusCode.created) {
        return httpResponse.body;
      } else {
        throw new Error("Falha ao criar curso.");
      }
    } catch (error: any) {
      throw new Error(`Erro ao realizar o cadastro de curso: ${error.message}`);
    }
  }

  /**
   * Atualiza um curso com base nos parâmetros fornecidos.
   * @async
   * @param {ICourseService.UpdateParams} params - Os parâmetros para atualizar o curso.
   * @returns {Promise<Course>} Uma promessa que resolve para o curso atualizado.
   */
  async update(params: ICourseService.UpdateParams): Promise<Course> {
    const courseDTO: CourseDTO = {
      name: params.name,
    };

    const httpRequest: HttpRequest = {
      url: `${this.url + params.id}`,
      method: "PUT",
      body: courseDTO,
      headers: this.privateHeader,
    };

    try {
      const httpResponse: HttpResponse = await this.httpClient.request(
        httpRequest
      );

      if (httpResponse.statusCode === HttpStatusCode.ok) {
        return httpResponse.body;
      } else {
        throw new Error("Falha ao atualizar curso.");
      }
    } catch (error: any) {
      throw new Error(
        `Erro ao realizar a atualização de curso: ${error.message}`
      );
    }
  }

  /**
   * Remove um curso com base no id fornecido.
   * @async
   * @param {ICourseService.DeleteParams} params - Os parâmetros para remover o curso.
   * @returns {Promise<Course>} Uma promessa que resolve para o curso removido.
   */
  async delete(params: ICourseService.DeleteParams): Promise<Course> {
    const httpRequest: HttpRequest = {
      url: `${this.url}/${params.id}`,
      method: "DELETE",
      headers: this.privateHeader,
    };

    try {
      const httpResponse: HttpResponse = await this.httpClient.request(
        httpRequest
      );

      if (httpResponse.statusCode === HttpStatusCode.ok)
        return httpResponse.body;
      else throw new Error(`Falha ao remover curso.`);
    } catch (error: any) {
      throw new Error(`Erro ao realizar a remoção de curso: ${error.message}`);
    }
  }
}
