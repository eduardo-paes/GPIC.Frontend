import { LoginPage } from "@/presentation/pages/login";
import React from "react";
import { AuthenticationServiceFactory } from "../services/authentication";

export const LoginFactory: React.FC = () =>
    <LoginPage authenticationService={AuthenticationServiceFactory()} />
