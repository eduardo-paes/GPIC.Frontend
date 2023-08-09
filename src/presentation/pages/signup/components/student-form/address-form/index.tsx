import StudentViewModel from "@/presentation/models/student";
import { StyledButton, StyledSelectField, StyledTextField } from "@/presentation/styles/styled-components";
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, SelectChangeEvent } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { validateHomeAddress, validateCity, validateUF, validateCEP } from "../../../validations";
import { STATES, cepMask } from "@/presentation/utils";

type AddressError = {
    homeAddress: string | null;
    city: string | null;
    UF: string | null;
    CEP: string | null;
};

type Props = {
    student: StudentViewModel;
    setStudent: (student: any) => void;
    activeStep: number;
    setActiveStep: (activeStep: number) => void;
};

const AddressDataForm: React.FC<Props> = ({ student, setStudent, activeStep, setActiveStep }) => {

    const [errors, setErrors] = React.useState<AddressError>();

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setStudent((prevStudent: any) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleCEPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length < 10)
            setStudent((prevStudent: any) => ({
                ...prevStudent,
                CEP: cepMask(value),
            }));
    };

    const handleSelectFieldChange = (event: SelectChangeEvent<unknown>, child: React.ReactNode) => {
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
        const newErrors: AddressError = {
            homeAddress: validateHomeAddress(student.homeAddress),
            city: validateCity(student.city),
            UF: validateUF(student.UF),
            CEP: validateCEP(student.CEP)
        };

        if (
            newErrors.homeAddress ||
            newErrors.city ||
            newErrors.UF ||
            newErrors.CEP
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
                    label="Endereço"
                    name="homeAddress"
                    value={student.homeAddress}
                    error={errors && errors.homeAddress !== null}
                    onChange={handleTextFieldChange}
                />
                {errors?.homeAddress && <FormHelperText error>{errors.homeAddress}</FormHelperText>}
                <StyledTextField
                    fullWidth
                    type="text"
                    label="Cidade"
                    name="city"
                    variant="outlined"
                    value={student.city}
                    error={errors && errors.city !== null}
                    onChange={handleTextFieldChange}
                />
                {errors?.city && <FormHelperText error>{errors.city}</FormHelperText>}
                <FormControl fullWidth sx={{ marginTop: '1rem' }}>
                    <InputLabel>UF</InputLabel>
                    <StyledSelectField
                        fullWidth
                        value={student.UF}
                        error={errors && errors.UF !== null}
                        name="UF"
                        label="UF"
                        onChange={handleSelectFieldChange}
                    >
                        {Object.entries(STATES).map(([value, label]) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </StyledSelectField>
                </FormControl>
                {errors?.UF && <FormHelperText error>{errors.UF}</FormHelperText>}
                <StyledTextField
                    type="text"
                    fullWidth
                    label="CEP"
                    name="CEP"
                    value={student.CEP}
                    error={errors && errors.CEP !== null}
                    onChange={handleCEPChange}
                />
                {errors?.CEP && <FormHelperText error>{errors.CEP}</FormHelperText>}
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

export default AddressDataForm;