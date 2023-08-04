import { PasswordRecoveryPage } from "@/presentation/pages/forgot-password";
import SignUpPage from "@/presentation/pages/signup";
import { Route, Routes } from "react-router-dom";
import { LoginFactory } from "../factories/pages/login";
import PrivateRoute from "./private-route";
import { SignUpPageFactory } from "../factories/pages/signup";
import { PasswordRecoveryPageFactory } from "../factories/pages/forgot-password";

const Router = (): JSX.Element => {
    return (
        <Routes>
            <Route element={<PrivateRoute isAllowed={localStorage.getItem('jwtToken') !== null} />}>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/home" element={<div>Home</div>} />
                <Route path="/*" element={<div>Home</div>} />
            </Route>
            <Route path="/login" element={<LoginFactory />} />
            <Route path="/forgot-password" element={<PasswordRecoveryPageFactory />} />
            <Route path="/signup" element={<SignUpPageFactory />} />
        </Routes>
    );
};

export default Router;
