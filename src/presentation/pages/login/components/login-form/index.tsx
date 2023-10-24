import { IAuthService } from "@/domain/usecases/authentication-interface";
import GPICLogo from "@/presentation/assets/logo-gpic-original.svg";
import Loading from "@/presentation/components/loading";
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
    const [loading, setLoading] = React.useState<boolean>(false);
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
        setLoading(true);
        const isValid = validateForm();
        event.preventDefault();
        if (isValid) {
            await authService.login({ email: email, password });
            setLoading(false);
            navigate('/home', { replace: true });
        }
        setLoading(false);
    };

    const validateForm = (): boolean => {
        const newErrors: LoginError = {
            email: validateEmail(email),
            password: validatePassword(password)
        };
        if (newErrors.email || newErrors.password) setErrors(newErrors);
        else return true;
        return false;
    };

    return (
        <StyledCard>
            <CardMedia
                component="img"
                sx={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', height: 'auto', width: '60%' }}
                image={GPICLogo}
                alt="GPIC Logo"
            />
            <Subtitle style={{ textAlign: 'center' }}>Gerenciamento de Projetos de Iniciação Científica</Subtitle>
            <CardContent>
                <Form onSubmit={handleFormSubmit} sx={{ margin: '2rem 0' }}>
                    <StyledTextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        error={errors && errors.email !== null}
                    />
                    {errors?.email && <FormHelperText error>{errors.email}</FormHelperText>}
                    <StyledTextField
                        fullWidth
                        label="Senha"
                        variant="outlined"
                        type="password"
                        value={password}
                        autoComplete=""
                        onChange={handlePasswordChange}
                        error={errors && errors.password !== null}
                        sx={{ marginTop: '1rem' }}
                    />
                    {errors?.password && <FormHelperText error>{errors.password}</FormHelperText>}
                    <StyledButton variant="contained" type="submit" sx={{ marginTop: '1rem' }}>
                        Entrar
                    </StyledButton>
                </Form>
                <Paragraph style={{ textAlign: 'center' }}>
                    <Link href="forgot-password">Esqueceu sua senha?</Link>
                </Paragraph>
                <Paragraph style={{ textAlign: 'center' }}>
                    Não tem uma conta? <Link href="signup">Realizar cadastro</Link>
                </Paragraph>
                <Loading isLoading={loading} />
            </CardContent>
        </StyledCard>
    );
};
