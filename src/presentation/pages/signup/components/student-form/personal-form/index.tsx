import StudentViewModel from "@/presentation/models/student";
import { StyledButton, StyledDateField, StyledSelectField, StyledTextField } from "@/presentation/styles/styled-components";
import { cpfMask, rgMask } from "@/presentation/utils";
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, SelectChangeEvent } from "@mui/material";
import { DateValidationError, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FieldChangeHandler } from "@mui/x-date-pickers/internals";
import { ptBR } from '@mui/x-date-pickers/locales';
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { validateBirthDate, validateCPF, validateConfirmPassword, validateDispatchDate, validateEmail, validateGender, validateIssuingAgency, validateName, validatePassword, validateRG, validateRace, validateStudentEmail } from "../../../validations";

const GENDER_OPTIONS = [
    { value: '0', label: 'Masculino' },
    { value: '1', label: 'Feminino' }
]

const RACE_OPTIONS = [
    { value: '0', label: 'Branca' },
    { value: '1', label: 'Preta' },
    { value: '2', label: 'Parda' },
    { value: '3', label: 'Amarela' },
    { value: '4', label: 'Indígena' },
    { value: '5', label: 'Não declarado' },
    { value: '6', label: 'Não dispõe da informação' }
]

type PersonalError = {
    name: string | null;
    CPF: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
    birthDate: string | null;
    RG: string | null;
    issuingAgency: string | null;
    dispatchDate: string | null;
    gender: string | null;
    race: string | null;
};

type Props = {
    student: StudentViewModel;
    setStudent: (student: any) => void;
    activeStep: number;
    setActiveStep: (activeStep: number) => void;
};

const PersonalDataForm: React.FC<Props> = ({ student, setStudent, activeStep, setActiveStep }) => {

    const [errors, setErrors] = React.useState<PersonalError>();

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setStudent((prevStudent: any) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleSelectFieldChange = (event: SelectChangeEvent<unknown>, child: React.ReactNode) => {
        const { name, value } = event.target;
        setStudent((prevStudent: any) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length < 15)
            setStudent((prevStudent: any) => ({
                ...prevStudent,
                CPF: cpfMask(value),
            }));
    };

    const handleRGChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length < 13)
            setStudent((prevStudent: any) => ({
                ...prevStudent,
                RG: rgMask(value),
            }));
    };

    const handleBirthDateFieldChange: FieldChangeHandler<unknown, DateValidationError> = (value: unknown) => {
        setStudent((prevStudent: any) => ({
            ...prevStudent,
            birthDate: value,
        }));
    };

    const handleDispatchDateFieldChange: FieldChangeHandler<unknown, DateValidationError> = (value: unknown) => {
        setStudent((prevStudent: any) => ({
            ...prevStudent,
            dispatchDate: value,
        }));
    };

    const handleSubmit = (_values: StudentViewModel, formikHelpers: FormikHelpers<StudentViewModel>) => {
        if (validateForm()) {
            setActiveStep(activeStep + 1);
            formikHelpers.setSubmitting(false);
        }
    };

    const goBack = (_event: React.MouseEvent<HTMLButtonElement>) => {
        history.back();
    };

    const validateForm = (): boolean => {
        const newErrors: PersonalError = {
            name: validateName(student.name),
            email: validateEmail(student.email),
            CPF: validateCPF(student.CPF),
            RG: validateRG(student.RG),
            gender: validateGender(student.gender),
            race: validateRace(student.race),
            password: validatePassword(student.password),
            confirmPassword: validateConfirmPassword(student.password, student.confirmPassword),
            birthDate: validateBirthDate(student.birthDate),
            dispatchDate: validateDispatchDate(student.dispatchDate),
            issuingAgency: validateIssuingAgency(student.issuingAgency)
        };

        if (
            newErrors.name ||
            newErrors.email ||
            newErrors.CPF ||
            newErrors.RG ||
            newErrors.gender ||
            newErrors.race ||
            newErrors.password ||
            newErrors.confirmPassword ||
            newErrors.birthDate ||
            newErrors.dispatchDate ||
            newErrors.issuingAgency
        )
            setErrors(newErrors);
        else
            return true;

        return false;
    };

    return (
        <Formik
            initialValues={student}
            onSubmit={handleSubmit}
        >
            <Form>
                <StyledTextField
                    sx={{ marginTop: '1rem' }}
                    fullWidth
                    type="text"
                    label="Nome"
                    name="name"
                    value={student.name}
                    error={errors && errors.name !== null}
                    onChange={handleTextFieldChange}
                />
                {errors?.name && <FormHelperText error>{errors.name}</FormHelperText>}
                <StyledTextField
                    sx={{ marginTop: '1rem' }}
                    fullWidth
                    type="text"
                    label="CPF"
                    value={student.CPF}
                    error={errors && errors.CPF !== null}
                    onChange={handleCPFChange}
                />
                {errors?.CPF && <FormHelperText error>{errors.CPF}</FormHelperText>}
                <StyledTextField
                    sx={{ marginTop: '1rem' }}
                    fullWidth
                    label="Email"
                    name="email"
                    value={student.email}
                    error={errors && errors.email !== null}
                    onChange={handleTextFieldChange}
                />
                {errors?.email && <FormHelperText error>{errors.email}</FormHelperText>}
                <LocalizationProvider dateAdapter={AdapterDayjs} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                    <StyledDateField
                        fullWidth
                        label="Data de Nascimento"
                        name="birthDate"
                        value={student.birthDate}
                        onChange={handleBirthDateFieldChange}
                        format="DD/MM/YYYY"
                    />
                </LocalizationProvider>
                {errors?.birthDate && <FormHelperText error>{errors.birthDate}</FormHelperText>}
                <StyledTextField
                    sx={{ marginTop: '1rem' }}
                    fullWidth
                    type="text"
                    label="RG"
                    value={student.RG}
                    error={errors && errors.RG !== null}
                    onChange={handleRGChange}
                />
                {errors?.RG && <FormHelperText error>{errors.RG}</FormHelperText>}
                <StyledTextField
                    sx={{ marginTop: '1rem' }}
                    fullWidth
                    label="Órgão Emissor"
                    name="issuingAgency"
                    value={student.issuingAgency}
                    error={errors && errors.issuingAgency !== null}
                    onChange={handleTextFieldChange}
                />
                {errors?.issuingAgency && <FormHelperText error>{errors.issuingAgency}</FormHelperText>}
                <LocalizationProvider dateAdapter={AdapterDayjs} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                    <StyledDateField
                        fullWidth
                        label="Data de Emissão"
                        name="dispatchDate"
                        value={student.dispatchDate}
                        onChange={handleDispatchDateFieldChange}
                        format="DD/MM/YYYY"
                    />
                </LocalizationProvider>
                {errors?.dispatchDate && <FormHelperText error>{errors.dispatchDate}</FormHelperText>}
                <FormControl sx={{ marginTop: '1rem' }} fullWidth>
                    <InputLabel>Gênero</InputLabel>
                    <StyledSelectField
                        fullWidth
                        value={student.gender || undefined}
                        error={errors && errors.gender !== null}
                        name="gender"
                        label="Gênero"
                        onChange={handleSelectFieldChange}
                    >
                        {
                            GENDER_OPTIONS.map(
                                option =>
                                    <MenuItem value={option.value}>{option.label}</MenuItem>
                            )
                        }
                    </StyledSelectField>
                </FormControl>
                {errors?.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
                <FormControl sx={{ marginTop: '1rem' }} fullWidth>
                    <InputLabel>Raça</InputLabel>
                    <StyledSelectField
                        fullWidth
                        value={student.race}
                        error={errors && errors.race !== null}
                        name="race"
                        label="Raça"
                        onChange={handleSelectFieldChange}
                    >
                        {
                            RACE_OPTIONS.map(
                                option =>
                                    <MenuItem value={option.value}>{option.label}</MenuItem>
                            )
                        }
                    </StyledSelectField>
                </FormControl>
                {errors?.race && <FormHelperText error>{errors.race}</FormHelperText>}
                <StyledTextField
                    sx={{ marginTop: '1rem' }}
                    type="password"
                    fullWidth
                    label="Senha"
                    name="password"
                    value={student.password}
                    error={errors && errors.password !== null}
                    onChange={handleTextFieldChange}
                />
                {errors?.password && <FormHelperText error>{errors.password}</FormHelperText>}
                <StyledTextField
                    sx={{ marginTop: '1rem' }}
                    type="password"
                    fullWidth
                    label="Confirmar senha"
                    name="confirmPassword"
                    value={student.confirmPassword}
                    error={errors && errors.confirmPassword !== null}
                    onChange={handleTextFieldChange}
                />
                {errors?.confirmPassword && <FormHelperText error>{errors.confirmPassword}</FormHelperText>}
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
                    <StyledButton variant="outlined" onClick={goBack}>
                        Voltar
                    </StyledButton>
                    <StyledButton variant="contained" type="submit">
                        Avançar
                    </StyledButton>
                </Box>
            </Form >
        </Formik >
    );
};

export default PersonalDataForm;