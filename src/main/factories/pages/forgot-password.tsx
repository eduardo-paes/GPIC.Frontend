import { PasswordRecoveryPage } from "@/presentation/pages/forgot-password";
import React from "react";
import { AuthenticationServiceFactory } from "../services/authentication";

export const PasswordRecoveryPageFactory: React.FC = () =>
    <PasswordRecoveryPage authService={AuthenticationServiceFactory()} />
