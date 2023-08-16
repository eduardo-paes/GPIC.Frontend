import StudentViewModel from "@/presentation/models/student";
import { StyledButton, StyledTextField } from "@/presentation/styles/styled-components";
import { Box, FormHelperText } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { phoneMask } from "@/presentation/utils";
import { validatePhone, validateCellPhone } from "../../../validations";
import { IStudentService } from "@/domain/usecases/student-interface";
import { StudentDTO } from "@/data/models/student-dto";

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
    studentService: IStudentService;
};

const ContactDataForm: React.FC<Props> = ({ student, setStudent, activeStep, setActiveStep, setEmailValidationPending, studentService }) => {

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

    function mapStudentViewModelToDTO(student: StudentViewModel): StudentDTO {
        return {
            name: student.name!,
            CPF: student.CPF!,
            email: student.email!,
            password: student.password!,
            confirmPassword: student.confirmPassword!,
            birthDate: student.birthDate!,
            RG: student.RG!,
            issuingAgency: student.issuingAgency!,
            dispatchDate: student.dispatchDate!,
            gender: student.gender!,
            race: student.race!,
            homeAddress: student.homeAddress!,
            city: student.city!,
            UF: student.UF!,
            CEP: student.CEP!,
            registrationCode: student.registrationCode!,
            campusId: student.campusId!,
            courseId: student.courseId!,
            startYear: student.startYear!,
            assistanceTypeId: student.assistanceTypeId!,
            phoneDDD: student.phoneDDD!,
            phone: student.phone!,
            cellPhoneDDD: student.cellPhoneDDD!,
            cellPhone: student.cellPhone!,
        };
    }

    const handleSubmit = async (_values: StudentViewModel, formikHelpers: FormikHelpers<StudentViewModel>) => {
        if (validateForm()) {
            try {
                formikHelpers.setSubmitting(false);
                const studentDTO = mapStudentViewModelToDTO(student);
                const response = await studentService.add(studentDTO);
                if (response)
                    setEmailValidationPending(true);
            } catch (error) {
                console.error(error);
            }
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
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
                    <StyledButton variant="outlined" onClick={goBack}>
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