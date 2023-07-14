import { PasswordRecoveryPage } from "@/presentation/pages/forgot-password";
import SignUpPage from "@/presentation/pages/signup";
import { Route, Routes } from "react-router-dom";
import { LoginFactory } from "../factories/pages/login";

// import { HomeFactory } from "../factories/pages/home";

const Router = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/login" element={<LoginFactory />} />
            <Route path="/forgot-password" element={<PasswordRecoveryPage />} />
            <Route path="/signup" element={<SignUpPage />} />
        </Routes>
    );
};

export default Router;
