import { StyledContainer } from "@/presentation/styles/styled-components";
import PasswordRecoveryForm from "./components/password-recovery-form";
import { IAuthService } from "@/domain/usecases/authentication-interface";

type Props = {
    authService: IAuthService;
}

export const PasswordRecoveryPage: React.FC<Props> = ({ authService }) => {

    return (
        <StyledContainer>
            <PasswordRecoveryForm authService={authService} />
        </StyledContainer>
    );
};
