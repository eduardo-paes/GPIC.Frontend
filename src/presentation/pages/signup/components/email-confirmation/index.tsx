import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputStyled, TokenInput, TokenInputContainer } from './styles';

const EmailConfirmationPage = () => {
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChangeToken = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        // Simule uma requisição assíncrona para verificar o token
        setTimeout(() => {
            setIsLoading(false);
            // Redirecionar para outra página após a confirmação do email
            navigate('/');
        }, 2000);
    }

    return (
        <div>
            <h2>Confirmação de E-mail</h2>
            <form onSubmit={handleSubmit}>
                <TokenInputContainer> {/* Use uma classe CSS personalizada para estilizar o container */}
                    <label htmlFor="token">Insira o Token:</label>
                    <TokenInput> {/* Use uma classe CSS personalizada para estilizar o campo */}
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
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Carregando...' : 'Confirmar'}
                </button>
            </form>
        </div>
    );
};

export default EmailConfirmationPage;
