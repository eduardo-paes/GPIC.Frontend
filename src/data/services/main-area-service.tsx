import { MainArea } from "@/domain/models/main-area";
import { IMainAreaService } from "@/domain/usecases/main-area-interface";
import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  IHttpClient,
} from "@/infrastructure/interfaces/protocols";
import { MainAreaDTO } from "../models/main-area-dto";

/**
 * Classe que implementa a interface de adição de área principal.
 * @class
 * @implements {IMainAreaService}
 */
export class MainAreaService implements IMainAreaService {
  /**
   * Cria uma instância de MainAreaService.
   * @constructor
   * @param {string} url - A URL para adicionar uma área principal.
   * @param {IHttpClient} httpClient - O cliente HATEOAS para realizar as requisições.
   * @param {Record<string, string>} privateHeader - Informações de segurança para realizar as requisições.
   */
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient,
    private readonly privateHeader: Record<string, string>
  ) {}

  /**
   * Busca um número pré definido de áreas principais pulando um número pré definido.
   * @async
   * @param {IMainAreaService.GetParams} params - Os parâmetros para buscar as áreas principais.
   * @returns {Promise<MainArea>} Uma promessa que resolve para a lista de áreas principais encontradas.
   */
  async get(params: IMainAreaService.GetParams): Promise<Array<MainArea>> {
    const httpRequest: HttpRequest = {
      url: this.url,
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
        throw new Error("Falha ao buscar áreas principais.");
      }
    } catch (error: any) {
      throw new Error(
        `Erro ao realizar a busca das áreas principais: ${error.message}`
      );
    }
  }

  /**
   * Busca a área principal pelo id informado.
   * @async
   * @param {IMainAreaService.GetParams} params - Os parâmetros para buscar a área principal.
   * @returns {Promise<MainArea>} Uma promessa que resolve para a área principal encontrada.
   */
  async getById(params: IMainAreaService.GetParams): Promise<MainArea> {
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
        throw new Error("Falha ao buscar área principal.");
      }
    } catch (error: any) {
      throw new Error(
        `Erro ao realizar a busca da área principal: ${error.message}`
      );
    }
  }

  /**
   * Adiciona uma área principal com base nos parâmetros fornecidos.
   * @async
   * @param {IMainAreaService.AddParams} params - Os parâmetros para adicionar a área principal.
   * @returns {Promise<MainArea>} Uma promessa que resolve para a área principal adicionada.
   */
  async add(params: IMainAreaService.AddParams): Promise<MainArea> {
    const mainAreaDTO: MainAreaDTO = { ...params };

    const httpRequest: HttpRequest = {
      url: this.url,
      method: "POST",
      body: mainAreaDTO,
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
        throw new Error("Falha ao criar área principal.");
      }
    } catch (error: any) {
      throw new Error(
        `Erro ao realizar o cadastro de área principal: ${error.message}`
      );
    }
  }

  /**
   * Atualiza uma área principal com base nos parâmetros fornecidos.
   * @async
   * @param {IMainAreaService.UpdateParams} params - Os parâmetros para atualizar a área principal.
   * @returns {Promise<MainArea>} Uma promessa que resolve para a área principal atualizada.
   */
  async update(params: IMainAreaService.UpdateParams): Promise<MainArea> {
    const mainAreaDTO: MainAreaDTO = { ...params };

    const httpRequest: HttpRequest = {
      url: `${this.url + params.id}`,
      method: "PUT",
      body: mainAreaDTO,
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
        throw new Error("Falha ao atualizar área principal.");
      }
    } catch (error: any) {
      throw new Error(
        `Erro ao realizar a atualização de área principal: ${error.message}`
      );
    }
  }

  /**
   * Remove uma área principal com base no id fornecido.
   * @async
   * @param {IMainAreaService.DeleteParams} params - Os parâmetros para remover a área principal.
   * @returns {Promise<MainArea>} Uma promessa que resolve para a área principal removida.
   */
  async delete(params: IMainAreaService.DeleteParams): Promise<MainArea> {
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
      else throw new Error(`Falha ao remover área principal.`);
    } catch (error: any) {
      throw new Error(
        `Erro ao realizar a remoção de área principal: ${error.message}`
      );
    }
  }
}
