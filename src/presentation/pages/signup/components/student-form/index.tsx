import StudentViewModel from "@/presentation/models/student";

import React from "react";
import FormStepper from "./form-stepper";
import PersonalDataForm from "./personal-form";
import AddressDataForm from "./address-form";
import AcademicDataForm from "./academic-form";
import ContactDataForm from "./contact-form";
import EmailConfirmationPage from "../email-confirmation";
import { IAuthService } from "@/domain/usecases/authentication-interface";
import { IStudentService } from "@/domain/usecases/student-interface";

const STEPS = [
    'Dados Pessoais',
    'Dados de Endereço',
    'Dados Acadêmicos',
    'Dados de Contato'
];

type Props = {
    authService: IAuthService;
    studentService: IStudentService;
}

export const StudentForm: React.FC<Props> = ({ authService, studentService }) => {

    const [student, setStudent] = React.useState<StudentViewModel>({});
    const [activeStep, setActiveStep] = React.useState<number>(0);

    return (
        <div>
            {
                activeStep < 4 ?
                    <React.Fragment>
                        <FormStepper
                            steps={STEPS}
                            activeStep={activeStep}
                            setActiveStep={setActiveStep}
                        />

                        {
                            activeStep === 0 &&
                            <PersonalDataForm activeStep={activeStep} setActiveStep={setActiveStep} student={student} setStudent={setStudent} />
                        }
                        {
                            activeStep === 1 &&
                            <AddressDataForm activeStep={activeStep} setActiveStep={setActiveStep} student={student} setStudent={setStudent} />
                        }
                        {
                            activeStep === 2 &&
                            <AcademicDataForm activeStep={activeStep} setActiveStep={setActiveStep} student={student} setStudent={setStudent} />
                        }
                        {
                            activeStep === 3 &&
                            <ContactDataForm activeStep={activeStep} setActiveStep={setActiveStep} student={student} setStudent={setStudent} />
                        }
                    </React.Fragment>
                    : <EmailConfirmationPage authService={authService} email={student.email!} />
            }

        </div>
    );
};
