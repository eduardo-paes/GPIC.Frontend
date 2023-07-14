import { Form, StyledTextField } from "@/presentation/styles/styled-components";

import { StyledButton } from "@/presentation/styles/styled-components";
import { cpfMask } from "@/presentation/utils";
import { InputAdornment } from "@mui/material";
import React from "react";

export const ProfessorForm = () => {

    const [username, setUsername] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const [CPF, setCPF] = React.useState<string>("");
    const [SIAPE, setSIAPE] = React.useState<string>("");
    const [idLattes, setIdLattes] = React.useState<string>("");
    const [isFormValid, setIsFormValid] = React.useState<boolean>(false);

    React.useEffect(() => {
        setIsFormValid(password === confirmPassword);
    }, [confirmPassword]);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSIAPEChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSIAPE(event.target.value.replace(/\D/g, ''));
    };

    const handleIdLattesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdLattes(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length < 15) setCPF(cpfMask(value));
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Realiza autenticação");
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            <StyledTextField
                label="Nome"
                variant="outlined"
                required
                value={username}
                onChange={handleUsernameChange}
            />
            <StyledTextField
                label="CPF"
                type="text"
                variant="outlined"
                required
                value={CPF}
                onChange={handleCPFChange}
            />
            <StyledTextField
                label="Email"
                type="email"
                variant="outlined"
                InputProps={{
                    endAdornment: <InputAdornment position="end">@cefet-rj.br</InputAdornment>
                }}
                required
                onChange={handleEmailChange}
            />
            <StyledTextField
                label="Senha"
                type="password"
                variant="outlined"
                required
                value={password}
                onChange={handlePasswordChange}
            />
            <StyledTextField
                label="Confirmação de senha"
                type="password"
                variant="outlined"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={!isFormValid}
                helperText={!isFormValid && 'As senhas não coincidem.'}
            />
            <StyledTextField
                label="SIAPE"
                type="text"
                variant="outlined"
                required
                value={SIAPE}
                onChange={handleSIAPEChange}
                inputProps={{ pattern: '[0-9]*' }}
            />
            <StyledTextField
                label="Identificador Lattes"
                type="text"
                variant="outlined"
                required
                value={idLattes}
                onChange={handleIdLattesChange}
            />
            <StyledButton variant="contained" color="primary" type="submit">
                Cadastrar
            </StyledButton>
        </Form>
    );
};
