import React from "react";
import { AuthenticationServiceFactory } from "../services/authentication";
import PrivateRoute from "@/main/routes/private-route";

export const PrivateRouteFactory: React.FC = () =>
    <PrivateRoute authService={AuthenticationServiceFactory()} />
