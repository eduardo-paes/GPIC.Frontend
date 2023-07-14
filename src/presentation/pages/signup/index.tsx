import { CardTitle, StyledCard, StyledContainer } from "@/presentation/styles/styled-components";
import { CardContent, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { ProfessorForm } from "./components/professor-form";
import { StudentForm } from "./components/student-form";

const SignUpPage: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setSelectedTab(newValue);

    return (
        <StyledContainer>
            <StyledCard>
                <CardTitle title="Crie sua conta" />
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
                        !selectedTab ? <ProfessorForm /> : <StudentForm />
                    }
                </CardContent>
            </StyledCard>
        </StyledContainer>
    );
};

export default SignUpPage;