import React from "react";
import SignUpPage from "@/presentation/pages/signup";
import { ProfessorServiceFactory } from "../services/professor";
import { StudentServiceFactory } from "../services/student";
import { AuthenticationServiceFactory } from "../services/authentication";
import { CEPApiServiceFactory } from "../services/cep";

export const SignUpPageFactory: React.FC = () =>
    <SignUpPage
        authService={AuthenticationServiceFactory()}
        professorService={ProfessorServiceFactory()}
        studentService={StudentServiceFactory()}
        cepService={CEPApiServiceFactory()}
    />
