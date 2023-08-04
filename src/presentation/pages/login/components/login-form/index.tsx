import { IAuthService } from "@/domain/usecases/authentication-interface";
import { validateEmail, validatePassword } from "@/presentation/pages/signup/validations";
import { Form, Paragraph, StyledButton, StyledCard, StyledTextField, Title } from "@/presentation/styles/styled-components";
import {
    CardContent,
    FormHelperText,
    Link
} from "@mui/material";
import React from "react";
import { redirect } from "react-router-dom";

type Props = {
    authService: IAuthService;
}

type LoginError = {
    email: string | null;
    password: string | null;
}

export const LoginForm: React.FC<Props> = ({ authService }) => {

    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [errors, setErrors] = React.useState<LoginError>();

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setErrors((prevErrors: any) => ({
            ...prevErrors,
            email: null,
        }));
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setErrors((prevErrors: any) => ({
            ...prevErrors,
            password: null,
        }));
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            await authService.login({ email: email, password }).then(() => {
                redirect('/')
            });
        } else {
            event.preventDefault();
        }
    };

    const validateForm = (): boolean => {
        const newErrors: LoginError = {
            email: validateEmail(email),
            password: validatePassword(password)
        };

        if (newErrors.email || newErrors.password)
            setErrors(newErrors);
        else
            return true;

        return false;
    };

    return (
        <StyledCard>
            <Title style={{ textAlign: 'center' }}>COPET</Title>
            <CardContent>
                <Form onSubmit={handleFormSubmit}>
                    <StyledTextField
                        label="Username"
                        variant="outlined"
                        value={email}
                        onChange={handleUsernameChange}
                        error={errors && errors.email !== null}
                    />
                    {errors?.email && <FormHelperText error>{errors.email}</FormHelperText>}
                    <StyledTextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={errors && errors.password !== null}
                    />
                    {errors?.password && <FormHelperText error>{errors.password}</FormHelperText>}
                    <StyledButton variant="contained" type="submit">
                        Entrar
                    </StyledButton>
                </Form>
                <Paragraph style={{ textAlign: 'center' }}>
                    <Link href="forgot-password">Esqueceu sua senha?</Link>
                </Paragraph>
                <Paragraph style={{ textAlign: 'center' }}>
                    Não tem uma conta? <Link href="signup">Realizar cadastro</Link>
                </Paragraph>
            </CardContent>
        </StyledCard>
    );
};
