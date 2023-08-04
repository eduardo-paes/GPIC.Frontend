import { Title, StyledCard, StyledContainer } from "@/presentation/styles/styled-components";
import { CardContent, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { ProfessorForm } from "./components/professor-form";
import { StudentForm } from "./components/student-form";
import { IProfessorService } from "@/domain/usecases/professor-interface";
import { IStudentService } from "@/domain/usecases/student-interface";
import { IAuthService } from "@/domain/usecases/authentication-interface";

type Props = {
    authService: IAuthService;
    professorService: IProfessorService;
    studentService: IStudentService;
}

const SignUpPage: React.FC<Props> = ({ authService, professorService, studentService }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setSelectedTab(newValue);

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
                        !selectedTab
                            ? <ProfessorForm authService={authService} professorService={professorService} />
                            : <StudentForm authService={authService} studentService={studentService} />
                    }
                </CardContent>
            </StyledCard>
        </StyledContainer>
    );
};

export default SignUpPage;