import React from "react";
import { validateEmail } from "@/presentation/pages/signup/validations";
import { Title, Form, StyledButton, StyledCard, StyledTextField, Paragraph } from "@/presentation/styles/styled-components";
import { Box, FormHelperText } from "@mui/material";
import { IAuthService } from "@/domain/usecases/authentication-interface";

type Props = {
    authService: IAuthService;
}

const PasswordRecoveryForm: React.FC<Props> = ({ authService }) => {
    const [email, setEmail] = React.useState<string>("");
    const [emailError, setEmailError] = React.useState<string | null>(null);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setEmailError(null);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm())
            authService.forgotPassword({ email });
    };

    const validateForm = (): boolean => {
        const newError: string | null = validateEmail(email);

        if (newError) setEmailError(newError);
        else return true;

        return false;
    };

    const goBack = (event: React.MouseEvent<HTMLButtonElement>) => {
        history.back();
    };

    return (
        <StyledCard>
            <Title style={{ textAlign: "center" }}>
                Atualizar Senha
            </Title>
            <Paragraph style={{ textAlign: "center" }}>
                Informe seu email institucional para onde será enviado o link de atualização de senha.
            </Paragraph>
            <Form onSubmit={handleFormSubmit}>
                <StyledTextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    error={emailError !== null}
                    onChange={handleEmailChange}
                />
                {emailError && <FormHelperText error>{emailError}</FormHelperText>}
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
                    <StyledButton variant="outlined" onClick={goBack}>
                        Voltar
                    </StyledButton>
                    <StyledButton variant="contained" type="submit">
                        Avançar
                    </StyledButton>
                </Box>
            </Form>
        </StyledCard>
    );
};

export default PasswordRecoveryForm;