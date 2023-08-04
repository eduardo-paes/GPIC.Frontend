import { Navigate, Outlet } from "react-router-dom";

interface Props {
    isAllowed: boolean;
    redirectTo?: string;
    children?: React.ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ isAllowed, redirectTo = "/login", children }) => {
    if (!isAllowed)
        return <Navigate to={redirectTo} replace />;

    return children ? children : <Outlet />;
};

export default PrivateRoute;
