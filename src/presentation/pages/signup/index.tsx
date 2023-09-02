import { Title, StyledCard, StyledContainer } from "@/presentation/styles/styled-components";
import { CardContent, Tab, Tabs } from "@mui/material";
import React from "react";
import { ProfessorForm } from "./components/professor-form";
import { StudentForm } from "./components/student-form";
import { IProfessorService } from "@/domain/usecases/professor-interface";
import { IStudentService } from "@/domain/usecases/student-interface";
import { IAuthService } from "@/domain/usecases/authentication-interface";
import StudentViewModel from "@/presentation/models/student";
import { ProfessorViewModel } from "@/presentation/models/professor";
import EmailConfirmationPage from "./components/email-confirmation";
import { ICEPService } from "@/infrastructure/interfaces/services/cep-service";

type Props = {
    authService: IAuthService;
    professorService: IProfessorService;
    studentService: IStudentService;
    cepService: ICEPService;
}

const SignUpPage: React.FC<Props> = ({ authService, professorService, studentService, cepService }) => {
    const [selectedTab, setSelectedTab] = React.useState<number>(0);
    const [emailValidationPending, setEmailValidationPending] = React.useState<boolean>(false);
    const [student, setStudent] = React.useState<StudentViewModel>({});
    const [professor, setProfessor] = React.useState<ProfessorViewModel>({});

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setEmailValidationPending(false);
        setSelectedTab(newValue);
    }

    return (
        <StyledContainer>
            <StyledCard>
                <Title style={{ textAlign: "center" }}>
                    Crie sua conta
                </Title>
                <CardContent>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        centered
                    >
                        <Tab value={0} label="Professor" />
                        <Tab value={1} label="Aluno" />
                    </Tabs>
                    {
                        !emailValidationPending ?
                            (
                                !selectedTab ?
                                    <ProfessorForm
                                        authService={authService}
                                        professorService={professorService}
                                        professor={professor}
                                        setProfessor={setProfessor}
                                        setEmailValidationPending={setEmailValidationPending}
                                    /> :
                                    <StudentForm
                                        authService={authService}
                                        studentService={studentService}
                                        cepService={cepService}
                                        student={student}
                                        setStudent={setStudent}
                                        setEmailValidationPending={setEmailValidationPending}
                                    />
                            )
                            : <EmailConfirmationPage authService={authService} email={!selectedTab ? professor.email! : student.email!} />}
                </CardContent>
            </StyledCard>
        </StyledContainer>
    );
};

export default SignUpPage;