import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputStyled, TokenInput, TokenInputContainer } from './styles';
import { Box, Typography } from '@mui/material';
import { StyledButton, Title } from '@/presentation/styles/styled-components';
import { IAuthService } from '@/domain/usecases/authentication-interface';

type Props = {
    authService: IAuthService;
    email: string;
}

const EmailConfirmationPage: React.FC<Props> = ({ authService, email }) => {
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChangeToken = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await authService.confirmEmail({ token, email })
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/');
        }, 2000);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '2rem' }}>
            <Title style={{ textAlign: "center" }} >Confirmação de E-mail</Title>
            <form onSubmit={handleSubmit}>
                <TokenInputContainer>
                    <label htmlFor="token">Insira o código enviado para o seu email institucional.</label>
                    <TokenInput>
                        <InputStyled
                            type="text"
                            id="token"
                            value={token}
                            onChange={handleChangeToken}
                            maxLength={6}
                            required
                        />
                    </TokenInput>
                </TokenInputContainer>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <StyledButton variant="contained" color="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Carregando...' : 'Confirmar'}
                    </StyledButton>
                </Box>
            </form>
        </div>
    );
};

export default EmailConfirmationPage;
