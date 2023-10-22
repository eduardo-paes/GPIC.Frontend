import { IActivityService } from '@/domain/usecases/activity-interface';
import { IProgramTypeService } from '@/domain/usecases/program-type-interface';
import { IProjectService } from '@/domain/usecases/project-interface';
import { IStudentService } from '@/domain/usecases/student-interface';
import { ISubAreaService } from '@/domain/usecases/sub-area-interface';
import FeedbackMessage from '@/presentation/components/feedback-snackbar';
import Loading from '@/presentation/components/loading';
import { ActivityTypeViewModel } from '@/presentation/models/activity-type';
import { Feedback } from '@/presentation/models/feedback';
import { ProjectViewModel } from '@/presentation/models/project';
import { ProjectActivityViewModel } from '@/presentation/models/project-activity';
import { Paragraph, StyledButton } from '@/presentation/styles/styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Chip, Dialog, Divider, Grid, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import ActivitiesInformed from './activities-informed';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    open: boolean;
    onClose: () => void;
    programTypeService: IProgramTypeService;
    activityService: IActivityService;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    studentService: IStudentService;
    project: ProjectViewModel;
    subAreaService: ISubAreaService;
    projectService: IProjectService;
}

const ProjectDialog: React.FC<Props> = ({
    open, onClose, programTypeService, activityService, setRefresh,
    studentService, project, subAreaService, projectService
}) => {

    const [hasLoaded, setHasLoaded] = React.useState<boolean>(false);
    const [student, setStudent] = React.useState<string>();
    const [noticeActivities, setNoticeActivities] = React.useState<Array<ActivityTypeViewModel>>();
    const [projectActivities, setProjectActivities] = React.useState<Array<ProjectActivityViewModel>>();
    const [programType, setProgramType] = React.useState<string>();
    const [subArea, setSubArea] = React.useState<string>();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [feedback, setFeedback] = React.useState<Feedback>();
    const [openFeedback, setOpenFeedback] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (open && !hasLoaded) {
            getProgramType();
            getStudent();
            getSubArea();
            getNoticeActivities();
            getProjectActivities();
            toggleHasLoaded();
        }
    }, [open, hasLoaded]);

    async function getProgramType() {
        try {
            const response = await programTypeService.getById({ id: project.programTypeId });
            setProgramType(response.name);
        } catch (error) {
            console.error(error);
        }
    };

    async function getStudent() {
        try {
            const response = await studentService.getById({ id: project.studentId });
            setStudent(response.user.name);
        } catch (error) {
            console.error(error);
        }
    };

    async function getNoticeActivities() {
        try {
            const response = await activityService.getByNoticeId({ id: project.noticeId });
            setNoticeActivities(response);
        } catch (error) {
            console.error(error);

        }
    };

    async function getProjectActivities() {
        try {
            const response = await projectService.getActivitiesByProjectId({ projectId: project.id! });
            setProjectActivities(response);
        } catch (error) {
            console.error(error);
        }
    };

    async function getSubArea() {
        try {
            const response = await subAreaService.getById({ id: project.subAreaId });
            setSubArea(response.name);
        } catch (error) {
            console.error(error);

        }
    };

    async function handleSubmit() {
        setLoading(true);
        try {
            await projectService.projectSubmit({ id: project.id! });
            setFeedback({ message: 'Projeto submetido com sucesso.', type: 'success' });
            setRefresh(true);
        } catch (error: any) {
            setFeedback({ message: error.message, type: 'error' });
        } finally {
            setLoading(false);
            setOpenFeedback(true);
        }
    }

    function toggleHasLoaded() {
        setHasLoaded(!hasLoaded);
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {project.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <form method="post">
                <Grid container spacing={2} padding={4}>
                    <Grid item xs={12} display={'flex'} alignItems={'center'}>
                        <Paragraph>Palavras-chave:</Paragraph>
                        <Chip variant='outlined' sx={{ fontWeight: 'bold', margin: '0.25rem' }} label={project.keyWord1} />
                        <Chip variant='outlined' sx={{ fontWeight: 'bold', margin: '0.25rem' }} label={project.keyWord2} />
                        <Chip variant='outlined' sx={{ fontWeight: 'bold', margin: '0.25rem' }} label={project.keyWord3} />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ marginBottom: '1rem' }}>
                            <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Objetivo" />
                        </Divider>
                        <Paragraph>{project.objective}</Paragraph>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ marginBottom: '1rem' }}>
                            <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Metodologia" />
                        </Divider>
                        <Paragraph>{project.methodology}</Paragraph>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ marginBottom: '1rem' }}>
                            <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Resultados Esperados" />
                        </Divider>
                        <Paragraph>{project.expectedResults}</Paragraph>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ marginBottom: '1rem' }}>
                            <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Agendamento de Execução de Atividades" />
                        </Divider>
                        <Paragraph>{project.activitiesExecutionSchedule}</Paragraph>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ marginBottom: '1rem' }}>
                            <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Demais Informações do Projeto" />
                        </Divider>
                        <Paragraph>Tipo de Programa: {programType}</Paragraph>
                    </Grid>
                    <Grid item xs={12}>
                        {project.studentId && <Paragraph>Aluno: {student}</Paragraph>}
                    </Grid>
                    <Grid item xs={12}>
                        <Paragraph>É candidato a bolsa? {project.isScholarshipCandidate ? "Sim" : "Não"}</Paragraph>
                    </Grid>
                    <Grid item xs={12}>
                        <Paragraph>Sub Área: {subArea}</Paragraph>
                    </Grid>

                    {
                        projectActivities && noticeActivities &&
                        <Grid item xs={12}>
                            <ActivitiesInformed noticeActivities={noticeActivities} projectActivities={projectActivities} />
                        </Grid>
                    }

                    <Grid container display={'flex'} justifyContent={'center'}>
                        <Grid item xs={10} display={'flex'} justifyContent={'space-evenly'}>
                            <StyledButton disabled={loading} variant="outlined" color="primary" type="button" onClick={onClose}>
                                Voltar
                            </StyledButton>
                            {
                                project.status === 0 &&
                                <StyledButton disabled={loading} variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                                    Submeter
                                </StyledButton>
                            }
                        </Grid>
                    </Grid>
                    <Grid>
                        {feedback && <FeedbackMessage open={openFeedback} handleClose={() => setOpenFeedback(false)} feedback={feedback!} />}
                        <Loading isLoading={loading} />
                    </Grid>
                </Grid>
            </form>
        </Dialog>
    )
};

export default ProjectDialog;