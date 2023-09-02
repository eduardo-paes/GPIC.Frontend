import { AuthenticationService } from "@/data/services/authentication-service";
import { IAuthService } from "@/domain/usecases/authentication-interface";
import { ApiUrlFactory, AxiosHttpClientFactory, PublicHeaderFactory } from "../http";

export const AuthenticationServiceFactory = (): IAuthService =>
    new AuthenticationService(ApiUrlFactory('auth/'), AxiosHttpClientFactory(), PublicHeaderFactory());