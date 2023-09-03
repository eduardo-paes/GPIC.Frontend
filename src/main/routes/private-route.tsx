import React from 'react';
import { IAuthService } from "@/domain/usecases/authentication-interface";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    isAllowed?: boolean;
    redirectTo?: string;
    children?: React.ReactElement;
    authService: IAuthService;
}

const PrivateRoute: React.FC<Props> = ({ authService, isAllowed, redirectTo = "/login", children }) => {
    if (!authService.isAuthenticated())
        return <Navigate to={redirectTo} replace />;

    return children || <Outlet />;
};

export default PrivateRoute;
