import { SubArea } from "@/domain/models/sub-area";
import { ISubAreaService } from "@/domain/usecases/sub-area-interface";
import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  IHttpClient,
} from "@/infrastructure/interfaces/protocols";
import { SubAreaDTO } from "../models/sub-area-dto";

/**
 * Classe que implementa a interface de adição de sub área.
 * @class
 * @implements {ISubAreaService}
 */
export class SubAreaService implements ISubAreaService {
  /**
   * Cria uma instância de SubAreaService.
   * @constructor
   * @param {string} url - A URL para adicionar uma sub área.
   * @param {IHttpClient} httpClient - O cliente HATEOAS para realizar as requisições.
   * @param {Record<string, string>} privateHeader - Informações de segurança para realizar as requisições.
   */
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient,
    private readonly privateHeader: Record<string, string>
  ) {}

  /**
   * Busca um número pré definido de sub áreas pulando um número pré definido.
   * @async
   * @param {ISubAreaService.GetParams} params - Os parâmetros para buscar as sub áreas.
   * @returns {Promise<SubArea>} Uma promessa que resolve para a lista de sub áreas encontradas.
   */
  async get(params: ISubAreaService.GetParams): Promise<Array<SubArea>> {
    const httpRequest: HttpRequest = {
      url: `${this.url}area/${params.areaId}`,
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
        throw new Error("Falha ao buscar sub áreas.");
      }
    } catch (error: any) {
      throw new Error(
        `Erro ao realizar a busca das sub áreas: ${error.message}`
      );
    }
  }

  /**
   * Busca a sub área pelo id informado.
   * @async
   * @param {ISubAreaService.GetParams} params - Os parâmetros para buscar a sub área.
   * @returns {Promise<SubArea>} Uma promessa que resolve para a sub área encontrada.
   */
  async getById(params: ISubAreaService.GetParams): Promise<SubArea> {
    const httpRequest: HttpRequest = {
      url: `${this.url}${params.id}`,
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
        throw new Error("Falha ao buscar sub área.");
      }
    } catch (error: any) {
      throw new Error(`Erro ao realizar a busca da sub área: ${error.message}`);
    }
  }

  /**
   * Adiciona uma sub área com base nos parâmetros fornecidos.
   * @async
   * @param {ISubAreaService.AddParams} params - Os parâmetros para adicionar a sub área.
   * @returns {Promise<SubArea>} Uma promessa que resolve para a sub área adicionada.
   */
  async add(params: ISubAreaService.AddParams): Promise<SubArea> {
    const subAreaDTO: SubAreaDTO = { ...params };

    const httpRequest: HttpRequest = {
      url: this.url,
      method: "POST",
      body: subAreaDTO,
      headers: {
        ...this.privateHeader,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const httpResponse: HttpResponse = await this.httpClient.request(
        httpRequest
      );

      if (httpResponse.statusCode === HttpStatusCode.created) {
        return httpResponse.body;
      } else {
        throw new Error("Falha ao criar sub área.");
      }
    } catch (error: any) {
      throw new Error(
        `Erro ao realizar o cadastro de sub área: ${error.message}`
      );
    }
  }

  /**
   * Atualiza uma sub área com base nos parâmetros fornecidos.
   * @async
   * @param {ISubAreaService.UpdateParams} params - Os parâmetros para atualizar a sub área.
   * @returns {Promise<SubArea>} Uma promessa que resolve para a sub área atualizada.
   */
  async update(params: ISubAreaService.UpdateParams): Promise<SubArea> {
    const subAreaDTO: SubAreaDTO = { ...params };

    const httpRequest: HttpRequest = {
      url: `${this.url + params.id}`,
      method: "PUT",
      body: subAreaDTO,
      headers: {
        ...this.privateHeader,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const httpResponse: HttpResponse = await this.httpClient.request(
        httpRequest
      );

      if (httpResponse.statusCode === HttpStatusCode.ok) {
        return httpResponse.body;
      } else {
        throw new Error("Falha ao atualizar sub área.");
      }
    } catch (error: any) {
      throw new Error(
        `Erro ao realizar a atualização de sub área: ${error.message}`
      );
    }
  }

  /**
   * Remove uma sub área com base no id fornecido.
   * @async
   * @param {ISubAreaService.DeleteParams} params - Os parâmetros para remover a sub área.
   * @returns {Promise<SubArea>} Uma promessa que resolve para a sub área removida.
   */
  async delete(params: ISubAreaService.DeleteParams): Promise<SubArea> {
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
      else throw new Error(`Falha ao remover sub área.`);
    } catch (error: any) {
      throw new Error(
        `Erro ao realizar a remoção de sub área: ${error.message}`
      );
    }
  }
}
