import StudentViewModel from "@/presentation/models/student";
import { Form } from "@/presentation/styles/styled-components";

import { StyledButton } from "@/presentation/styles/styled-components";
import React from "react";
import FormStepper from "./form-stepper";

const INITIAL_STATE: StudentViewModel = {
    name: '',
    CPF: '',
    email: '',
    password: '',
    birthDate: new Date(),
    RG: 0,
    issuingAgency: '',
    dispatchDate: new Date(),
    gender: 0,
    race: 0,
    homeAddress: '',
    city: '',
    UF: '',
    CEP: 0,
    campusId: '',
    courseId: '',
    startYear: '',
    typeAssistanceId: '',
    phoneDDD: 0,
    phone: 0,
    cellPhoneDDD: 0,
    cellPhone: 0,
}

export const StudentForm = () => {

    const [student, setStudent] = React.useState<StudentViewModel>(INITIAL_STATE);

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(student);
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            <FormStepper />

            <StyledButton variant="contained" color="primary" type="submit">
                Cadastrar
            </StyledButton>
        </Form>
    );
};
