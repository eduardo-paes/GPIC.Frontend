import StudentViewModel from "@/presentation/models/student";

import { IAssistanceTypeService } from "@/domain/usecases/assistance-type-interface";
import { IAuthService } from "@/domain/usecases/authentication-interface";
import { ICampusService } from "@/domain/usecases/campus-interface";
import { ICourseService } from "@/domain/usecases/course-interface";
import { IStudentService } from "@/domain/usecases/student-interface";
import { ICEPService } from "@/infrastructure/interfaces/services/cep-service";
import React from "react";
import AcademicDataForm from "./academic-form";
import AddressDataForm from "./address-form";
import ContactDataForm from "./contact-form";
import FormStepper from "./form-stepper";
import PersonalDataForm from "./personal-form";

const STEPS = [
    'Dados Pessoais',
    'Dados de Endereço',
    'Dados Acadêmicos',
    'Dados de Contato'
];

interface Props {
    authService: IAuthService;
    studentService: IStudentService;
    cepService: ICEPService;
    student: StudentViewModel;
    setStudent: (student: any) => void;
    setEmailValidationPending: (emailValidationPending: boolean) => void;
    campusService: ICampusService;
    courseService: ICourseService;
    assistanceTypeService: IAssistanceTypeService;
}

export const StudentForm: React.FC<Props> = ({
    authService, studentService, student, setStudent, setEmailValidationPending,
    cepService, campusService, courseService, assistanceTypeService
}) => {

    const [activeStep, setActiveStep] = React.useState<number>(0);

    return (
        <div>
            {
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
                        <AddressDataForm activeStep={activeStep} setActiveStep={setActiveStep} student={student} setStudent={setStudent} cepService={cepService} />
                    }
                    {
                        activeStep === 2 &&
                        <AcademicDataForm
                            activeStep={activeStep}
                            setActiveStep={setActiveStep}
                            student={student}
                            setStudent={setStudent}
                            campusService={campusService}
                            courseService={courseService}
                            assistanceTypeService={assistanceTypeService}
                        />
                    }
                    {
                        activeStep === 3 &&
                        <ContactDataForm studentService={studentService} activeStep={activeStep} setActiveStep={setActiveStep} student={student} setStudent={setStudent} setEmailValidationPending={setEmailValidationPending} />
                    }
                </React.Fragment>
            }

        </div>
    );
};
