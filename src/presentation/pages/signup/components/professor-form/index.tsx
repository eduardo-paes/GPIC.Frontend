import { Form, StyledTextField } from "@/presentation/styles/styled-components";

import { ProfessorDTO } from "@/data/models/professor-dto";
import { IAuthService } from "@/domain/usecases/authentication-interface";
import { IProfessorService } from "@/domain/usecases/professor-interface";
import { ProfessorViewModel } from "@/presentation/models/professor";
import { StyledButton } from "@/presentation/styles/styled-components";
import { cpfMask } from "@/presentation/utils";
import { Box, FormHelperText, InputAdornment } from "@mui/material";
import React from "react";
import { validateCPF, validateConfirmPassword, validateEmail, validateIdLattes, validateName, validatePassword, validateSIAPE } from "../../validations";

type ProfessorError = {
    name: string | null;
    CPF: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
    SIAPE: string | null;
    idLattes: string | null;
};

type Props = {
    authService: IAuthService;
    professorService: IProfessorService;
}

export const ProfessorForm: React.FC<Props> = ({ authService, professorService }) => {

    const [professor, setProfessor] = React.useState<ProfessorViewModel>({});
    const [errors, setErrors] = React.useState<ProfessorError>();

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProfessor((prevProfessor: any) => ({
            ...prevProfessor,
            [name]: value
        }));
    };

    const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length < 15)
            setProfessor((prevProfessor: any) => ({
                ...prevProfessor,
                CPF: cpfMask(value),
            }));
    };

    const handleSIAPEChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length < 15)
            setProfessor((prevProfessor: any) => ({
                ...prevProfessor,
                SIAPE: value.replace(/\D/g, ''),
            }));
    };

    function mapProfessorViewModelToDTO(professor: ProfessorViewModel): ProfessorDTO {
        return {
            name: professor.name!,
            CPF: professor.CPF!,
            email: professor.email!,
            password: professor.password!,
            confirmPassword: professor.confirmPassword!,
            SIAPE: professor.SIAPE!,
            idLattes: parseInt(professor.idLattes!)
        };
    }

    const goBack = (_event: React.MouseEvent<HTMLButtonElement>) => {
        history.back();
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            const professorDTO = mapProfessorViewModelToDTO(professor);
            await professorService.add(professorDTO);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: ProfessorError = {
            name: validateName(professor.name),
            CPF: validateCPF(professor.CPF),
            email: validateEmail(professor.email),
            password: validatePassword(professor.password),
            confirmPassword: validateConfirmPassword(professor.password, professor.confirmPassword),
            SIAPE: validateSIAPE(professor.SIAPE),
            idLattes: validateIdLattes(professor.idLattes)
        };

        if (
            newErrors.name ||
            newErrors.CPF ||
            newErrors.email ||
            newErrors.password ||
            newErrors.confirmPassword ||
            newErrors.SIAPE ||
            newErrors.idLattes
        )
            setErrors(newErrors);
        else
            return true;

        return false;
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            <StyledTextField
                label="Nome"
                name="name"
                value={professor.name}
                error={errors && errors.name !== null}
                onChange={handleTextFieldChange}
            />

            {errors?.name && <FormHelperText error>{errors.name}</FormHelperText>}
            <StyledTextField
                label="CPF"
                type="text"
                name="CPF"
                value={professor.CPF}
                error={errors && errors.CPF !== null}
                onChange={handleCPFChange}
            />

            {errors?.CPF && <FormHelperText error>{errors.CPF}</FormHelperText>}
            <StyledTextField
                label="Email"
                type="text"
                InputProps={{
                    endAdornment: <InputAdornment position="end">@professor.cefet-rj.br</InputAdornment>
                }}
                name="email"
                value={professor.email}
                error={errors && errors.email !== null}
                onChange={handleTextFieldChange}
            />

            {errors?.email && <FormHelperText error>{errors.email}</FormHelperText>}
            <StyledTextField
                label="Senha"
                type="password"
                name="password"
                value={professor.password}
                error={errors && errors.password !== null}
                onChange={handleTextFieldChange}
            />

            {errors?.password && <FormHelperText error>{errors.password}</FormHelperText>}
            <StyledTextField
                label="Confirmação de senha"
                type="password"
                variant="outlined"
                name="confirmPassword"
                value={professor.confirmPassword}
                error={errors && errors.confirmPassword !== null}
                onChange={handleTextFieldChange}
            />

            {errors?.confirmPassword && <FormHelperText error>{errors.confirmPassword}</FormHelperText>}
            <StyledTextField
                label="SIAPE"
                type="text"
                name="SIAPE"
                value={professor.SIAPE}
                error={errors && errors.SIAPE !== null}
                onChange={handleSIAPEChange}
                inputProps={{ pattern: '[0-9]*' }}
            />

            {errors?.SIAPE && <FormHelperText error>{errors.SIAPE}</FormHelperText>}
            <StyledTextField
                label="Identificador Lattes"
                type="text"
                name="idLattes"
                value={professor.idLattes}
                error={errors && errors.idLattes !== null}
                onChange={handleTextFieldChange}
            />
            {errors?.idLattes && <FormHelperText error>{errors.idLattes}</FormHelperText>}


            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
                <StyledButton variant="outlined" color="primary" type="button" onClick={goBack}>
                    Voltar
                </StyledButton>
                <StyledButton variant="contained" color="primary" type="submit">
                    Avançar
                </StyledButton>
            </Box>
        </Form>
    );
};
