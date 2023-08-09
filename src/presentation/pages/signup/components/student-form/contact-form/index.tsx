import StudentViewModel from "@/presentation/models/student";
import { StyledButton, StyledTextField } from "@/presentation/styles/styled-components";
import { Box, FormHelperText } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { phoneMask } from "@/presentation/utils";
import { validatePhone, validateCellPhone } from "../../../validations";

type ContactError = {
    phone: string | null;
    cellPhone: string | null;
};

type Props = {
    student: StudentViewModel;
    setStudent: (student: any) => void;
    activeStep: number;
    setActiveStep: (activeStep: number) => void;
    setEmailValidationPending: (emailValidationPending: boolean) => void;
};

const ContactDataForm: React.FC<Props> = ({ student, setStudent, activeStep, setActiveStep, setEmailValidationPending }) => {

    const [errors, setErrors] = React.useState<ContactError>();

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (value.length < 16) {
            const { maskedValue, DDD } = phoneMask(value);

            setStudent((prevStudent: any) => ({
                ...prevStudent,
                [name]: maskedValue,
                [name + 'DDD']: DDD,
            }));
        }
    };

    const goBack = (_event: React.MouseEvent<HTMLButtonElement>) => {
        setActiveStep(activeStep - 1);
    };

    const handleSubmit = (_values: StudentViewModel, formikHelpers: FormikHelpers<StudentViewModel>) => {
        if (validateForm()) {
            setEmailValidationPending(true);
            formikHelpers.setSubmitting(false);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: ContactError = {
            phone: validatePhone(student.phone),
            cellPhone: validateCellPhone(student.cellPhone)
        };

        if (
            newErrors.phone ||
            newErrors.cellPhone
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
                    name='phone'
                    label="Telefone"
                    value={student.phone}
                    error={errors && errors.phone !== null}
                    onChange={handlePhoneChange}
                />
                {errors?.phone && <FormHelperText error>{errors.phone}</FormHelperText>}
                <StyledTextField
                    fullWidth
                    name='cellPhone'
                    label="Celular"
                    value={student.cellPhone}
                    error={errors && errors.cellPhone !== null}
                    onChange={handlePhoneChange}
                />
                {errors?.cellPhone && <FormHelperText error>{errors.cellPhone}</FormHelperText>}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <StyledButton variant="outlined" color="primary" type="button" onClick={goBack}>
                        Voltar
                    </StyledButton>
                    <StyledButton variant="contained" color="primary" type="submit">
                        Cadastrar
                    </StyledButton>
                </Box>
            </Form>
        </Formik>
    );
};

export default ContactDataForm;