import { IActivityService } from '@/domain/usecases/activity-interface';
import { IAreaService } from '@/domain/usecases/area-interface';
import { IMainAreaService } from '@/domain/usecases/main-area-interface';
import { INoticeService } from '@/domain/usecases/notice-interface';
import { IProfessorService } from '@/domain/usecases/professor-interface';
import { IProgramTypeService } from '@/domain/usecases/program-type-interface';
import { IProjectService } from '@/domain/usecases/project-interface';
import { IStudentService } from '@/domain/usecases/student-interface';
import { ISubAreaService } from '@/domain/usecases/sub-area-interface';
import MainLayout from '@/presentation/components/main-layout';
import { NoticeViewModel } from '@/presentation/models/notice';
import { ProjectViewModel } from '@/presentation/models/project';
import { TokenPayload } from '@/presentation/models/token-payload';
import { Title } from '@/presentation/styles/styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import React from 'react';
import { decodeToken } from 'react-jwt';
import OpenedNotice from './components/opened-notice';
import ProjectCard from './components/project-card';
import ProjectDialog from './components/project-dialog';
import ProjectManagementDialog from './components/project-management-dialog';

const INITIAL_VALUE: ProjectViewModel = {
    title: '',
    keyWord1: '',
    keyWord2: '',
    keyWord3: '',
    isScholarshipCandidate: false,
    objective: '',
    methodology: '',
    expectedResults: '',
    activitiesExecutionSchedule: '',
    activities: [],
    programTypeId: '',
    professorId: '',
    subAreaId: '',
    areaId: '',
    mainAreaId: '',
    noticeId: '',
    studentId: '',
    status: 0,
    statusDescription: ''
}

type Props = {
    projectService: IProjectService;
    programTypeService: IProgramTypeService;
    noticeService: INoticeService;
    activityService: IActivityService;
    studentService: IStudentService;
    professorService: IProfessorService;
    mainAreaService: IMainAreaService;
    areaService: IAreaService;
    subAreaService: ISubAreaService;
};

const ProjectManagementPage: React.FC<Props> = ({
    projectService, programTypeService, noticeService,
    activityService, studentService, professorService,
    mainAreaService, areaService, subAreaService
}) => {
    const [openedNotice, setOpenedNotice] = React.useState<NoticeViewModel>();
    const [openedProjects, setOpenedProjects] = React.useState<Array<ProjectViewModel>>();
    const [closedProjects, setClosedProjects] = React.useState<Array<ProjectViewModel>>();
    const [openProjectManagement, setOpenProjectManagement] = React.useState<boolean>(false);
    const [openProjectDialog, setOpenProjectDialog] = React.useState<boolean>(false);
    const [refresh, setRefresh] = React.useState<boolean>(true);
    const [selectedProject, setSelectedProject] = React.useState<ProjectViewModel>(INITIAL_VALUE);

    React.useEffect(() => {
        if (refresh) {
            getRole(sessionStorage.getItem('jwtToken')!) !== 'STUDENT' && getOpenedNotice();
            getOpenedProjects();
            getClosedProjects();
            setRefresh(false);
        }
    }, [refresh]);

    async function getOpenedNotice() {
        const now = new Date();
        try {
            const notices = await noticeService.get({});
            const noticeOnRegistrationPhase = notices.find(notice => now > new Date(notice.registrationStartDate) && now < new Date(notice.registrationEndDate));

            setOpenedNotice(noticeOnRegistrationPhase);
        } catch (error) {
            console.log(error);
        }
    }

    async function getOpenedProjects() {
        try {
            const projects = await projectService.getOpened({});
            setOpenedProjects(projects);
        } catch (error) {
            console.log(error);
        }
    }

    async function getClosedProjects() {
        try {
            const projects = await projectService.getClosed({});
            setClosedProjects(projects);
        } catch (error) {
            console.log(error);
        }
    }

    function editProject(projectToEdit: ProjectViewModel) {
        setSelectedProject(projectToEdit);
        setOpenProjectManagement(true);
    }

    function showProject(projectToShow: ProjectViewModel) {
        setSelectedProject(projectToShow);
        setOpenProjectDialog(true);
    }

    async function deleteProject(projectId: string) {
        try {
            await projectService.delete({ id: projectId });
            setRefresh(true);
        } catch (error: any) {
            console.error(error);
        }
    }

    function getRole(token: string) {
        const decodedToken = decodeToken<TokenPayload>(token);
        return decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }

    function getProfessorName(token: string) {
        const decodedToken = decodeToken<TokenPayload>(token);
        return decodedToken?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    }

    async function getProfessor(professorId: string) {
        const jwtToken = sessionStorage.getItem('jwtToken');
        if (getRole(jwtToken!) === 'PROFESSOR') {
            const professorName = getProfessorName(jwtToken!);
            return professorName ? professorName : "";
        }

        try {
            const professor = await professorService.getById({ id: professorId });
            return professor.user.name;
        } catch (error) {
            console.error(error);
            return 'Professor não encontrado';
        }
    }

    async function getStudent(studentId: string) {
        try {
            return (await studentService.getById({ id: studentId })).user.name;
        } catch (error) {
            console.error(error);
            return 'Aluno não encontrado';
        }
    }

    function handleCloseDialog() {
        openProjectDialog && setOpenProjectDialog(false);
        openProjectManagement && setOpenProjectManagement(false);
        setSelectedProject(INITIAL_VALUE);
    }

    return (
        <MainLayout>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Title>
                        Meus Projetos
                    </Title>
                </Grid>
                <Grid item xs={12}>
                    {
                        openedNotice &&
                        <OpenedNotice
                            notice={openedNotice!}
                            setOpenProjectManagement={setOpenProjectManagement}
                            setProject={setSelectedProject}
                        />
                    }
                </Grid>
                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="closed-projects-accordion"
                            id="closed-projects-header"
                        >
                            <Typography>Projetos Abertos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {
                                openedProjects &&
                                openedProjects.map(openedProject =>
                                    <ProjectCard
                                        key={openedProject.id!}
                                        noticeService={noticeService}
                                        getProfessor={getProfessor}
                                        getStudent={getStudent}
                                        project={openedProject}
                                        handleEdit={editProject}
                                        handleVisualize={showProject}
                                        handleDelete={deleteProject}
                                    />
                                )
                            }
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="closed-projects-accordion"
                            id="closed-projects-header"
                        >
                            <Typography>Projetos Encerrados</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {
                                closedProjects &&
                                closedProjects.map(closedProject =>
                                    <ProjectCard
                                        key={closedProject.id!}
                                        noticeService={noticeService}
                                        getProfessor={getProfessor}
                                        getStudent={getStudent}
                                        project={closedProject}
                                        handleEdit={editProject}
                                        handleVisualize={showProject}
                                        handleDelete={deleteProject}
                                    />
                                )
                            }
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid>
                    <ProjectManagementDialog
                        open={openProjectManagement}
                        onClose={handleCloseDialog}
                        programTypeService={programTypeService}
                        activityService={activityService}
                        project={selectedProject}
                        setProject={setSelectedProject}
                        studentService={studentService}
                        projectService={projectService}
                        mainAreaService={mainAreaService}
                        areaService={areaService}
                        subAreaService={subAreaService}
                        setRefresh={setRefresh}
                    />
                </Grid>
                <Grid>
                    <ProjectDialog
                        open={openProjectDialog}
                        onClose={handleCloseDialog}
                        programTypeService={programTypeService}
                        activityService={activityService}
                        project={selectedProject}
                        studentService={studentService}
                        subAreaService={subAreaService}
                        projectService={projectService}
                        setRefresh={setRefresh}
                    />
                </Grid>
            </Grid>
        </MainLayout>
    )
};

export default ProjectManagementPage;