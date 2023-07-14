import { CardTitle, Form, StyledCard, StyledTextField } from "@/presentation/styles/styled-components";
import { Button } from "@mui/material";
import React, { useState } from "react";

export const PasswordRecoveryForm = () => {
    const [email, setEmail] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Enviar email");
    };

    return (
        <StyledCard>
            <CardTitle title="Recuperar Senha" />
            <Form onSubmit={handleFormSubmit}>
                <StyledTextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={handleEmailChange}
                />
                <Button variant="contained" color="primary" type="submit">
                    Send recovery email
                </Button>
            </Form>
        </StyledCard>
    );
};
