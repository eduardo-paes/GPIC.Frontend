import { Address } from "@/domain/models/address";
import {
	HttpRequest,
	HttpResponse,
	HttpStatusCode,
	IHttpClient,
} from "@/infrastructure/interfaces/protocols";
import { ICEPService } from "@/infrastructure/interfaces/services/cep-service";
import axios from "axios";

export class CEPApiService implements ICEPService {
	constructor(private readonly httpClient: IHttpClient) {}

	async consult(params: ICEPService.ConsultParams): Promise<Address> {
		const httpRequest: HttpRequest = {
			url: `https://viacep.com.br/ws/${params.CEP}/json/`,
			method: "GET",
		};

		try {
			const httpResponse: HttpResponse = await this.httpClient.request(
				httpRequest
			);

			if (httpResponse.statusCode === HttpStatusCode.ok) {
				return httpResponse.body;
			} else {
				throw new Error("Não foi possível consultar o CEP informado.");
			}
		} catch (error: any) {
			throw new Error(
				`Erro ao consultar o CEP informado: ${error.message}`
			);
		}
	}
}
