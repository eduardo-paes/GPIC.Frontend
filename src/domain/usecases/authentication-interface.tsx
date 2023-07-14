import { UserLogin } from "../models/user-login";

export interface IAuthService {
    login(params: IAuthService.LoginParams): Promise<UserLogin>;
    confirmEmail(params: IAuthService.ConfirmEmailParams): Promise<string>;
    forgotPassword(params: IAuthService.ForgotPasswordParams): Promise<string>;
    resetPassword(params: IAuthService.ResetPasswordParams): Promise<string>;
}

export namespace IAuthService {
    export type LoginParams = {
        email: string,
        password: string
    }

    export type ConfirmEmailParams = {
        userId: string,
        token: string
    }

    export type ForgotPasswordParams = {
        email: string
    }

    export type ResetPasswordParams = {
        id: string,
        password: string,
        token: string
    }
}
