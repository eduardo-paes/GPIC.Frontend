import { IAuthService } from "@/domain/usecases/authentication-interface";
import { CardTitle, Form, StyledButton, StyledCard, StyledTextField } from "@/presentation/styles/styled-components";
import {
    CardContent,
    Link,
    Typography
} from "@mui/material";
import React, { useState } from "react";

type Props = {
    authService: IAuthService;
}

export const LoginForm: React.FC<Props> = ({ authService }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await authService.login({ email: email, password });
        console.log(response);
    };

    return (
        <StyledCard>
            <CardTitle title="COPET" />
            <CardContent>
                <Form onSubmit={handleFormSubmit}>
                    <StyledTextField
                        label="Username"
                        variant="outlined"
                        value={email}
                        required
                        onChange={handleUsernameChange}
                    />
                    <StyledTextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        required
                        onChange={handlePasswordChange}
                    />
                    <StyledButton variant="contained" color="primary" type="submit">
                        Login
                    </StyledButton>
                </Form>
                <Typography variant="body2" textAlign={'center'} mt={2}>
                    <Link href="forgot-password">Forgot Password?</Link>
                </Typography>
                <Typography variant="body2" textAlign={'center'} mt={2}>
                    Don't have an account? <Link href="signup">Sign Up</Link>
                </Typography>
            </CardContent>
        </StyledCard>
    );
};
