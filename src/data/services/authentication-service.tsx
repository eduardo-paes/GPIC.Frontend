import { UserLogin } from "@/domain/models/user-login";
import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@/infrastructure/data/protocols/http";
import { IAuthService } from "../../domain/usecases/authentication-interface";

export class AuthenticationService implements IAuthService {
    constructor(
        private readonly url: string,
        private readonly httpClient: IHttpClient
    ) { }

    async login(params: IAuthService.LoginParams): Promise<UserLogin> {
        const httpRequest: HttpRequest = {
            url: this.url,
            method: 'POST',
            body: params
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao realizar o login');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar o login: ${error.message}`);
        }
    }

    async confirmEmail(params: IAuthService.ConfirmEmailParams): Promise<string> {
        const httpRequest: HttpRequest = {
            url: `${this.url}/ConfirmEmail?userId=${params.userId}&token=${params.token}`,
            method: 'POST'
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao confirmar e-mail');
            }
        } catch (error: any) {
            throw new Error(`Erro ao confirmar e-mail: ${error.message}`);
        }
    }

    async forgotPassword(params: IAuthService.ForgotPasswordParams): Promise<string> {
        const response = await this.httpClient.request({
            url: `${this.url}/ForgotPassword`,
            method: 'POST',
            headers: {},
            body: { email: params.email }
        });

        if (response.statusCode === HttpStatusCode.ok) {
            return response.body;
        } else {
            throw new Error(`Erro ao solicitar reset de senha: ${response.statusCode}`);
        }

    }

    async resetPassword(params: IAuthService.ResetPasswordParams): Promise<string> {
        const response = await this.httpClient.request({
            url: `${this.url}/ResetPassword`,
            method: 'POST',
            body: params
        });

        if (response.statusCode === HttpStatusCode.ok)
            return response.body;
        throw new Error(`Erro ao atualizar a senha: ${response.statusCode}`);

    }
}