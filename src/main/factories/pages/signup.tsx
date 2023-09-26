import React from "react";
import SignUpPage from "@/presentation/pages/signup";
import { ProfessorServiceFactory } from "../services/professor";
import { StudentServiceFactory } from "../services/student";
import { AuthenticationServiceFactory } from "../services/authentication";
import { CEPApiServiceFactory } from "../services/cep";
import { CampusServiceFactory } from "../services/campus";
import { AssistanceTypeServiceFactory } from "../services/assistance-type";
import { CourseServiceFactory } from "../services/course";

export const SignUpPageFactory: React.FC = () =>
    <SignUpPage
        authService={AuthenticationServiceFactory()}
        professorService={ProfessorServiceFactory()}
        studentService={StudentServiceFactory()}
        cepService={CEPApiServiceFactory()}
        campusService={CampusServiceFactory()}
        courseService={CourseServiceFactory()}
        assistanceTypeService={AssistanceTypeServiceFactory()} />
