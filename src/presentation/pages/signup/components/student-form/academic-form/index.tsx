import StudentViewModel from "@/presentation/models/student";
import { StyledButton, StyledSelectField, StyledTextField } from "@/presentation/styles/styled-components";
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { validateCampus, validateCourse, validateRegistrationCode, validateStartYear, validateTypeAssistance } from "../../../validations";

const CAMPUSES_MOCK = [
    { id: 1, name: 'Campus A' },
    { id: 2, name: 'Campus B' },
    { id: 3, name: 'Campus C' },
];

const COURSES_MOCK = [
    { id: 1, name: 'Curso X' },
    { id: 2, name: 'Curso Y' },
    { id: 3, name: 'Curso Z' },
];

const TYPE_ASSISTANCE_MOCK = [
    { id: 1, name: 'Bolsa 1' },
    { id: 2, name: 'Bolsa 2' },
    { id: 3, name: 'Bolsa 3' },
];

type AcademicError = {
    registrationCode: string | null;
    campusId: string | null;
    courseId: string | null;
    startYear: string | null;
    typeAssistanceId: string | null;
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
            typeAssistanceId: validateTypeAssistance(student.typeAssistanceId)
        };

        if (
            newErrors.campusId ||
            newErrors.courseId ||
            newErrors.startYear ||
            newErrors.typeAssistanceId
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
                        value={student.typeAssistanceId}
                        error={errors && errors.typeAssistanceId !== null}
                        name="typeAssistanceId"
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
                {errors?.typeAssistanceId && <FormHelperText error>{errors.typeAssistanceId}</FormHelperText>}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <StyledButton variant="outlined" color="primary" type="button" onClick={goBack}>
                        Voltar
                    </StyledButton>
                    <StyledButton variant="contained" color="primary" type="submit">
                        Avançar
                    </StyledButton>
                </Box>
            </Form>
        </Formik>
    );
};

export default AcademicDataForm;