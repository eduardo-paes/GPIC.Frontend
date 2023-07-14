import { IAuthService } from "@/domain/usecases/authentication-interface";
import { StyledContainer } from "@/presentation/styles/styled-components";
import { LoginForm } from "./components/login-form";

type Props = {
    authenticationService: IAuthService;
}

export const LoginPage: React.FC<Props> = ({ authenticationService }) => {

    return (
        <StyledContainer>
            <LoginForm authService={authenticationService} />
        </StyledContainer>
    );
};
