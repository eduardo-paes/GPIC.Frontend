import { AuthenticationService } from "@/data/services/authentication-service";
import { IAuthService } from "@/domain/usecases/authentication-interface";
import { ApiUrlFactory, AxiosHttpClientFactory } from "../http";

export const AuthenticationServiceFactory = (): IAuthService =>
    new AuthenticationService(ApiUrlFactory('/'), AxiosHttpClientFactory());