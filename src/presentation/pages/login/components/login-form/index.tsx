import { IAuthService } from "@/domain/usecases/authentication-interface";
import GPICLogo from "@/presentation/assets/logo.png";
import { validateEmail, validatePassword } from "@/presentation/pages/signup/validations";
import { Form, Paragraph, StyledButton, StyledCard, StyledTextField, Subtitle } from "@/presentation/styles/styled-components";
import {
    CardContent,
    CardMedia,
    FormHelperText,
    Link
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        const isValid = validateForm();
        event.preventDefault();
        if (isValid) {
            await authService.login({ email: email, password });
            navigate('/home', { replace: true });
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
            <CardMedia
                component="img"
                sx={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', height: 100, width: '60%' }}
                image={GPICLogo}
                alt="GPIC Logo"
            />
            <Subtitle style={{ textAlign: 'center' }}>Gerenciamento de Projetos de Iniciação Científica</Subtitle>
            <CardContent>
                <Form onSubmit={handleFormSubmit}>
                    <StyledTextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        error={errors && errors.email !== null}
                    />
                    {errors?.email && <FormHelperText error>{errors.email}</FormHelperText>}
                    <StyledTextField
                        label="Senha"
                        variant="outlined"
                        type="password"
                        value={password}
                        autoComplete=""
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
