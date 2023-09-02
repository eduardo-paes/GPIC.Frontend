import StudentViewModel from "@/presentation/models/student";
import { StyledButton, StyledTextField } from "@/presentation/styles/styled-components";
import { Box, FormHelperText } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { phoneMask, removeNonNumeric } from "@/presentation/utils";
import { validatePhone, validateCellPhone } from "../../../validations";
import { IStudentService } from "@/domain/usecases/student-interface";
import { StudentDTO } from "@/data/models/student-dto";
import FeedbackMessage from "@/presentation/components/feedback-snackbar";
import { Feedback } from "@/presentation/models/feedback";
import Loading from "@/presentation/components/loading";

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
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [feedback, setFeedback] = React.useState<Feedback>();
    const [openFeedback, setOpenFeedback] = React.useState<boolean>(false);

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
            birthDate: student.birthDate!,
            RG: parseInt(removeNonNumeric(student.RG!)),
            issuingAgency: student.issuingAgency!,
            dispatchDate: student.dispatchDate!,
            gender: student.gender!,
            race: student.race!,
            homeAddress: student.homeAddress!,
            city: student.city!,
            UF: student.UF!,
            CEP: parseInt(removeNonNumeric(student.CEP!)),
            registrationCode: student.registrationCode!,
            campusId: student.campusId!,
            courseId: student.courseId!,
            startYear: student.startYear!,
            assistanceTypeId: student.assistanceTypeId!,
            phoneDDD: student.phoneDDD ? parseInt(student.phoneDDD!) : undefined,
            phone: student.phone ? parseInt(removeNonNumeric(student.phone!)) : undefined,
            cellPhoneDDD: student.cellPhoneDDD ? parseInt(student.cellPhoneDDD!) : undefined,
            cellPhone: student.cellPhone ? parseInt(removeNonNumeric(student.cellPhone!)) : undefined,
        };
    }

    const handleSubmit = async (_values: StudentViewModel, formikHelpers: FormikHelpers<StudentViewModel>) => {
        setIsLoading(true);
        if (validateForm()) {
            try {
                formikHelpers.setSubmitting(false);
                const studentDTO = mapStudentViewModelToDTO(student);
                const response = await studentService.add(studentDTO);
                if (response) {
                    setFeedback({ message: 'Usuário criado com sucesso.', type: 'success' });
                    setEmailValidationPending(true);
                }
            } catch (error) {
                console.error(error);
                setFeedback({ message: 'Não foi possível criar o usuário. Verifique os campos e tente novamente.', type: 'error' });
            }
        }
        setIsLoading(false);
        setOpenFeedback(true);
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
        <>
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
                        sx={{ marginTop: '1rem' }}
                    />
                    {errors?.phone && <FormHelperText error>{errors.phone}</FormHelperText>}
                    <StyledTextField
                        fullWidth
                        name='cellPhone'
                        label="Celular"
                        value={student.cellPhone}
                        error={errors && errors.cellPhone !== null}
                        onChange={handlePhoneChange}
                        sx={{ marginTop: '1rem' }}
                    />
                    {errors?.cellPhone && <FormHelperText error>{errors.cellPhone}</FormHelperText>}
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
                        <StyledButton variant="outlined" onClick={goBack}>
                            Voltar
                        </StyledButton>
                        <StyledButton disabled={isLoading} variant="contained" color="primary" type="submit">
                            Cadastrar
                        </StyledButton>
                    </Box>
                </Form>
            </Formik>
            {feedback && <FeedbackMessage open={openFeedback} handleClose={() => setOpenFeedback(false)} feedback={feedback!} />}
            <Loading isLoading={isLoading} />
        </>
    );
};

export default ContactDataForm;