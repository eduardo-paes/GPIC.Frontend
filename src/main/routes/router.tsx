import { Route, Routes } from "react-router-dom";
import { PasswordRecoveryPageFactory } from "../factories/pages/forgot-password";
import { HomePageFactory } from "../factories/pages/home";
import { LoginFactory } from "../factories/pages/login";
import { SignUpPageFactory } from "../factories/pages/signup";
import { NoticeManagementPageFactory } from "../factories/pages/notice";
import { PrivateRouteFactory } from "../factories/routes/private-route";
import { ProjectManagementPageFactory } from "../factories/pages/project";

const Router = (): JSX.Element => {
    return (
        <Routes>
            <Route element={<PrivateRouteFactory />}>
                <Route path="/" element={<ProjectManagementPageFactory />} />
                <Route path="/home" element={<ProjectManagementPageFactory />} />
                <Route path="/*" element={<ProjectManagementPageFactory />} />
            </Route>
            <Route element={<PrivateRouteFactory />}>
                <Route path="/edital" element={<NoticeManagementPageFactory />} />
            </Route>
            <Route path="/login" element={<LoginFactory />} />
            <Route path="/forgot-password" element={<PasswordRecoveryPageFactory />} />
            <Route path="/signup" element={<SignUpPageFactory />} />
        </Routes>
    );
};

export default Router;
