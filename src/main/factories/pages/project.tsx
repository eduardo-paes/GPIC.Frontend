import ProjectManagementPage from "@/presentation/pages/project";
import React from "react";
import { ActivityServiceFactory } from "../services/activity";
import { AreaServiceFactory } from "../services/area";
import { MainAreaServiceFactory } from "../services/main-area";
import { NoticeServiceFactory } from "../services/notice";
import { ProfessorServiceFactory } from "../services/professor";
import { ProgramTypeServiceFactory } from "../services/program-type";
import { ProjectServiceFactory } from "../services/project";
import { StudentServiceFactory } from "../services/student";
import { SubAreaServiceFactory } from "../services/sub-area";

export const ProjectManagementPageFactory: React.FC = () =>
    <ProjectManagementPage
        projectService={ProjectServiceFactory()}
        noticeService={NoticeServiceFactory()}
        activityService={ActivityServiceFactory()}
        programTypeService={ProgramTypeServiceFactory()}
        studentService={StudentServiceFactory()}
        professorService={ProfessorServiceFactory()}
        mainAreaService={MainAreaServiceFactory()}
        areaService={AreaServiceFactory()}
        subAreaService={SubAreaServiceFactory()}
    />
