import StudentViewModel from "@/presentation/models/student";
import { StyledButton, StyledSelectField, StyledTextField } from "@/presentation/styles/styled-components";
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { validateCampus, validateCourse, validateRegistrationCode, validateStartYear, validateTypeAssistance } from "../../../validations";

const CAMPUSES_MOCK = [
    { id: "d04dd94a-8e17-4435-a85b-81947a3ade45", name: 'Maracanã' },
    { id: "81b651f0-fb43-495f-988d-a87ff41dee65", name: 'Nova Friburgo' },
    { id: "de00d078-8b83-474a-aa47-a24471c45bc2", name: 'Petrópolis' },
];

const COURSES_MOCK = [
    { id: "35cc0adf-4fb5-4428-a745-008794ac0e60", name: 'Bacharelado em Línguas Estrangeiras Aplicadas às Negociações Internacionais' },
    { id: "eab402c3-0a9b-458b-a348-20660f9de623", name: 'Bacharelado em Engenharia Elétrica' },
    { id: "bbbc4e5f-d1a8-4410-818b-1919d6c16cec", name: 'Bacharelado em Engenharia de Computação' },
    { id: "3f55aa62-622c-424c-84e8-1b511734b71e", name: 'Bacharelado em Turismo' },
    { id: "de06d1fb-a132-4b28-b967-e88c3c927719", name: 'Bacharelado em Administração' },
];

const TYPE_ASSISTANCE_MOCK = [
    { id: "da8ba703-351e-4094-8b25-ab3890d24609", name: 'Sem bolsa' },
    { id: "12490981-b8d4-41a9-ae12-7356e4b2120a", name: 'PAED' },
    { id: "2791d044-7cdf-497b-abe8-db18c6e2c9d4", name: 'PAEm' },
    { id: "c2ee4eb8-ab3f-43a4-8fd9-54e3281d90bf", name: 'PAE' },
    { id: "28689fc2-0655-492c-83f1-14552480ee71", name: 'Auxílio Digital' },
    { id: "0d69e97f-e11e-4504-8771-14f1c2f6cff8", name: 'Outra' },
];

type AcademicError = {
    registrationCode: string | null;
    campusId: string | null;
    courseId: string | null;
    startYear: string | null;
    assistanceTypeId: string | null;
};

type Props = {
    student: StudentViewModel;
    setStudent: (student: any) => void;
    activeStep: number;
    setActiveStep: (activeStep: number) => void;
};

const AcademicDataForm: React.FC<Props> = ({ student, setStudent, activeStep, setActiveStep }) => {

    const [errors, setErrors] = React.useState<AcademicError>();

    const handleRegistrationCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (value.length < 21)
            setStudent((prevStudent: any) => ({
                ...prevStudent,
                [name]: value,
            }));
    };

    const handleStartYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (value.length < 5)
            setStudent((prevStudent: any) => ({
                ...prevStudent,
                [name]: value.replace(/\D/g, ""),
            }));
    };

    const handleSelectFieldChange = (event: SelectChangeEvent<unknown>, _child: React.ReactNode) => {
        const { name, value } = event.target;
        setStudent((prevStudent: any) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const goBack = (_event: React.MouseEvent<HTMLButtonElement>) => {
        setActiveStep(activeStep - 1);
    };

    const handleSubmit = (_values: StudentViewModel, formikHelpers: FormikHelpers<StudentViewModel>) => {
        if (validateForm()) {
            setActiveStep(activeStep + 1);
            formikHelpers.setSubmitting(false);
        }

    };

    const validateForm = (): boolean => {
        const newErrors: AcademicError = {
            registrationCode: validateRegistrationCode(student.registrationCode),
            campusId: validateCampus(student.campusId),
            courseId: validateCourse(student.courseId),
            startYear: validateStartYear(student.startYear),
            assistanceTypeId: validateTypeAssistance(student.assistanceTypeId)
        };

        if (
            newErrors.campusId ||
            newErrors.courseId ||
            newErrors.startYear ||
            newErrors.assistanceTypeId
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
                    value={student.registrationCode}
                    error={errors && errors.registrationCode !== null}
                    name="registrationCode"
                    label="Matrícula"
                    onChange={handleRegistrationCodeChange}
                />
                {errors?.campusId && <FormHelperText error>{errors.campusId}</FormHelperText>}
                <FormControl fullWidth sx={{ marginTop: '1rem' }}>
                    <InputLabel>Campus</InputLabel>
                    <StyledSelectField
                        fullWidth
                        value={student.campusId}
                        error={errors && errors.campusId !== null}
                        name="campusId"
                        label="Campus"
                        onChange={handleSelectFieldChange}
                    >
                        {CAMPUSES_MOCK.map(({ id, name }) => (
                            <MenuItem key={id} value={id}>
                                {name}
                            </MenuItem>
                        ))}
                    </StyledSelectField>
                </FormControl>
                {errors?.campusId && <FormHelperText error>{errors.campusId}</FormHelperText>}
                <FormControl fullWidth sx={{ marginTop: '1rem' }}>
                    <InputLabel>Curso</InputLabel>
                    <StyledSelectField
                        fullWidth
                        value={student.courseId}
                        error={errors && errors.courseId !== null}
                        name="courseId"
                        label="Curso"
                        onChange={handleSelectFieldChange}
                    >
                        {COURSES_MOCK.map(({ id, name }) => (
                            <MenuItem key={id} value={id}>
                                {name}
                            </MenuItem>
                        ))}
                    </StyledSelectField>
                </FormControl>
                {errors?.courseId && <FormHelperText error>{errors.courseId}</FormHelperText>}
                <StyledTextField
                    sx={{ marginTop: '1rem' }}
                    fullWidth
                    type="text"
                    label="Ano de Ingresso"
                    name="startYear"
                    value={student.startYear}
                    error={errors && errors.startYear !== null}
                    onChange={handleStartYearChange}
                />
                {errors?.startYear && <FormHelperText error>{errors.startYear}</FormHelperText>}
                <FormControl fullWidth sx={{ marginTop: '1rem' }}>
                    <InputLabel>Tipo da Bolsa</InputLabel>
                    <StyledSelectField
                        fullWidth
                        value={student.assistanceTypeId}
                        error={errors && errors.assistanceTypeId !== null}
                        name="assistanceTypeId"
                        label="Tipo da Bolsa"
                        onChange={handleSelectFieldChange}
                    >
                        {TYPE_ASSISTANCE_MOCK.map(({ id, name }) => (
                            <MenuItem key={id} value={id}>
                                {name}
                            </MenuItem>
                        ))}
                    </StyledSelectField>
                </FormControl>
                {errors?.assistanceTypeId && <FormHelperText error>{errors.assistanceTypeId}</FormHelperText>}
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
                    <StyledButton variant="outlined" onClick={goBack}>
                        Voltar
                    </StyledButton>
                    <StyledButton variant="contained" type="submit">
                        Avançar
                    </StyledButton>
                </Box>
            </Form>
        </Formik>
    );
};

export default AcademicDataForm;