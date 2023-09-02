import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputStyled, TokenInput, TokenInputContainer } from './styles';
import { Box, Typography } from '@mui/material';
import { StyledButton, Subtitle, Title } from '@/presentation/styles/styled-components';
import { IAuthService } from '@/domain/usecases/authentication-interface';
import Loading from '@/presentation/components/loading';
import { Feedback } from '@/presentation/models/feedback';
import FeedbackMessage from '@/presentation/components/feedback-snackbar';

type Props = {
    authService: IAuthService;
    email: string;
}

const EmailConfirmationPage: React.FC<Props> = ({ authService, email }) => {
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = React.useState<Feedback>();
    const [openFeedback, setOpenFeedback] = React.useState<boolean>(false);
    const navigate = useNavigate();

    const handleChangeToken = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await authService.confirmEmail({ token, email })
            setIsLoading(false);
            setFeedback({ message: "E-mail confirmado com sucesso.", type: "success" });
            navigate('/login');
        } catch (error) {
            console.error(error);
            setFeedback({ message: "Não foi possível confirmar o e-mail.", type: "error" });
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '2rem' }}>
            <Subtitle style={{ textAlign: "center", fontWeight: 'bold' }} >Confirmação de E-mail</Subtitle>
            <form onSubmit={handleSubmit}>
                <TokenInputContainer>
                    <p style={{ textAlign: "center", marginBottom: '1rem' }} >Insira o código enviado para o seu email institucional.</p>
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
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <StyledButton variant="contained" color="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Carregando...' : 'Confirmar'}
                    </StyledButton>
                </Box>
                {feedback && <FeedbackMessage open={openFeedback} handleClose={() => setOpenFeedback(false)} feedback={feedback!} />}
                <Loading isLoading={isLoading} />
            </form>
        </div>
    );
};

export default EmailConfirmationPage;
