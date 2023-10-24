import { Student } from '@/domain/models/student';
import { IActivityService } from '@/domain/usecases/activity-interface';
import { IAreaService } from '@/domain/usecases/area-interface';
import { IMainAreaService } from '@/domain/usecases/main-area-interface';
import { IProgramTypeService } from '@/domain/usecases/program-type-interface';
import { IProjectService } from '@/domain/usecases/project-interface';
import { IStudentService } from '@/domain/usecases/student-interface';
import { ISubAreaService } from '@/domain/usecases/sub-area-interface';
import FeedbackMessage from '@/presentation/components/feedback-snackbar';
import Loading from '@/presentation/components/loading';
import { ActivityTypeViewModel } from '@/presentation/models/activity-type';
import { AreaViewModel } from '@/presentation/models/area';
import { Feedback } from '@/presentation/models/feedback';
import { MainAreaViewModel } from '@/presentation/models/main-area';
import { ProgramTypeViewModel } from '@/presentation/models/program-type';
import { ProjectViewModel } from '@/presentation/models/project';
import StudentViewModel from '@/presentation/models/student';
import { SubAreaViewModel } from '@/presentation/models/sub-area';
import { TokenPayload } from '@/presentation/models/token-payload';
import { StyledButton, StyledSelectField, StyledTextField } from '@/presentation/styles/styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Chip, Dialog, Divider, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, MenuItem, SelectChangeEvent, Slide, Switch, Toolbar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { decodeToken } from 'react-jwt';
import ProjectActivities from './project-activities';

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
    studentService: IStudentService;
    projectService: IProjectService;
    mainAreaService: IMainAreaService;
    areaService: IAreaService;
    subAreaService: ISubAreaService;
    project: ProjectViewModel;
    setProject: React.Dispatch<React.SetStateAction<ProjectViewModel>>;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectManagementDialog: React.FC<Props> = ({
    open, onClose, programTypeService, activityService,
    studentService, project, setProject, projectService,
    mainAreaService, areaService, subAreaService, setRefresh
}) => {

    const [hasLoaded, setHasLoaded] = React.useState<boolean>(false);
    const [students, setStudents] = React.useState<Array<StudentViewModel>>();
    const [activities, setActivities] = React.useState<Array<ActivityTypeViewModel>>();
    const [programTypes, setProgramTypes] = React.useState<Array<ProgramTypeViewModel>>();
    const [mainAreas, setMainAreas] = React.useState<Array<MainAreaViewModel>>();
    const [areas, setAreas] = React.useState<Array<AreaViewModel>>();
    const [subAreas, setSubAreas] = React.useState<Array<SubAreaViewModel>>();
    const [mainArea, setMainArea] = React.useState<string>();
    const [area, setArea] = React.useState<string>();
    const [subArea, setSubArea] = React.useState<string>();

    const [selectableArea, setSelectableArea] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [feedback, setFeedback] = React.useState<Feedback>();
    const [openFeedback, setOpenFeedback] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (open && !hasLoaded) {
            project.id && getProjectActivities();
            project.subAreaId && getProjectAreaInfo();
            getProgramTypes();
            getStudents();
            getNoticeActivities();
            toggleHasLoaded();
        }
    }, [open, hasLoaded]);

    React.useEffect(() => {
        if (!mainAreas) getMainAreas();
        getAreas();
    }, [project.mainAreaId]);

    React.useEffect(() => {
        if (!areas) getAreas();
        getSubAreas();
    }, [project.areaId]);

    function handleClose() {
        setMainArea('');
        setArea('');
        setSubArea('');
        setSelectableArea(true);
        toggleHasLoaded();
        onClose();
    }

    async function getProgramTypes() {
        try {
            const response = await programTypeService.get({});
            setProgramTypes(response);
        } catch (error) {
            console.error(error);
        }
    };

    function getProfessor(): string {
        const token = sessionStorage.getItem('jwtToken');
        const decodedToken = decodeToken<TokenPayload>(token!);
        return decodedToken?.["http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor"] || "";
    };

    function mapStudentsToViewModel(student: Student): StudentViewModel {
        return {
            id: student.id,
            name: student.name
        }
    };

    async function getStudents() {
        try {
            const response = await studentService.get({});
            setStudents(response.map(mapStudentsToViewModel));
        } catch (error) {
            console.error(error);
        }
    };

    async function getNoticeActivities() {
        try {
            const response = await activityService.getByNoticeId({ id: project.noticeId });
            setActivities(response);
        } catch (error) {
            console.error(error);
        }
    };

    async function getProjectActivities() {
        try {
            const response = await projectService.getActivitiesByProjectId({ projectId: project.id! });
            setProject((prevProject) => ({
                ...prevProject,
                activities: response
            }));
        } catch (error) {
            console.error(error);
        }
    };

    async function getProjectAreaInfo() {
        try {
            const subArea = await subAreaService.getById({ id: project.subAreaId });
            setSelectableArea(false)
            setMainArea(subArea.area?.mainArea?.name);
            setArea(subArea.area?.name);
            setSubArea(subArea.name);
        } catch (error) {
            console.error(error);
        }
    }

    async function getMainAreas() {
        try {
            const response = await mainAreaService.get({});
            setMainAreas(response);
        } catch (error) {
            console.error(error);

        }
    };

    async function getAreas() {
        try {
            const response = await areaService.get({ mainAreaId: project.mainAreaId! });
            setAreas(response);
        } catch (error) {
            console.error(error);

        }
    };

    async function getSubAreas() {
        try {
            const response = await subAreaService.get({ areaId: project.areaId! });
            setSubAreas(response);
        } catch (error) {
            console.error(error);

        }
    };

    function toggleHasLoaded() {
        setHasLoaded(!hasLoaded);
    };

    async function handleSave() {
        setLoading(true);
        try {
            if (project.id) {
                await projectService.update({ id: project.id!, ...project });
                setFeedback({ message: 'Projeto atualizado com sucesso.', type: 'success' });
            } else {
                const response = await projectService.add({ ...project, professorId: getProfessor() });
                setProject((prevProject: any) => ({
                    ...prevProject,
                    id: response.id,
                }));
                setFeedback({ message: 'Projeto aberto com sucesso.', type: 'success' });
            }
            setRefresh(true);
            handleClose();
        } catch (error: any) {
            setFeedback({ message: error.message, type: 'error' });
            console.error(error);
        } finally {
            setLoading(false);
            setOpenFeedback(true);
        }
    };

    async function handleSaveSubmit() {
        handleSave();
        setLoading(true);
        try {
            const response = await projectService.projectSubmit({ id: project.id! });
            setFeedback({ message: 'Projeto submetido com sucesso.', type: 'success' });
            handleClose();
        } catch (error) {
            console.error(error);
            setFeedback({ message: 'Falha ao submeter o projeto.', type: 'error' });
        } finally {
            setLoading(false);
            setOpenFeedback(true);
        }
    };

    const handleTextFieldChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setProject((prevProject: any) => ({
                ...prevProject,
                [name]: value,
            }));
        },
        [setProject]
    );

    const handleSelectFieldChange = React.useCallback(
        (event: SelectChangeEvent<unknown>, _child: React.ReactNode) => {
            const { name, value } = event.target;
            setProject((prevProject: any) => ({
                ...prevProject,
                [name]: value,
            }));
        },
        [setProject]
    );

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {project.id ? 'Editar' : 'Inscrever'} Projeto
                    </Typography>
                </Toolbar>
            </AppBar>
            <form method="post">
                <Grid container spacing={2} padding={4}>
                    <Grid item xs={12}>
                        <StyledTextField
                            name="title"
                            label="Título"
                            type="text"
                            fullWidth
                            value={project.title}
                            onChange={handleTextFieldChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <StyledTextField
                            name="keyWord1"
                            label="Palavra-Chave 1"
                            type="text"
                            fullWidth
                            value={project.keyWord1}
                            onChange={handleTextFieldChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <StyledTextField
                            name="keyWord2"
                            label="Palavra-Chave 2"
                            type="text"
                            fullWidth
                            value={project.keyWord2}
                            onChange={handleTextFieldChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <StyledTextField
                            name="keyWord3"
                            label="Palavra-Chave 3"
                            type="text"
                            fullWidth
                            value={project.keyWord3}
                            onChange={handleTextFieldChange}
                        />
                    </Grid>

                    <Grid item xs={12} mt={2}>
                        <Divider sx={{ marginBottom: '1rem' }}>
                            <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Objetivo" />
                        </Divider>
                    </Grid>

                    <Grid item xs={12}>
                        <StyledTextField
                            name="objective"
                            label="Objetivo"
                            type="text"
                            multiline
                            rows={3}
                            fullWidth
                            value={project.objective}
                            onChange={handleTextFieldChange}
                        />
                    </Grid>

                    <Grid item xs={12} mt={2}>
                        <Divider sx={{ marginBottom: '1rem' }}>
                            <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Metodologia" />
                        </Divider>
                    </Grid>

                    <Grid item xs={12}>
                        <StyledTextField
                            name="methodology"
                            label="Metodologia"
                            type="text"
                            multiline
                            rows={3}
                            fullWidth
                            value={project.methodology}
                            onChange={handleTextFieldChange}
                        />
                    </Grid>

                    <Grid item xs={12} mt={2}>
                        <Divider sx={{ marginBottom: '1rem' }}>
                            <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Resultados Esperados" />
                        </Divider>
                    </Grid>

                    <Grid item xs={12}>
                        <StyledTextField
                            name="expectedResults"
                            label="Resultados Esperados"
                            type="text"
                            multiline
                            rows={3}
                            fullWidth
                            value={project.expectedResults}
                            onChange={handleTextFieldChange}
                        />
                    </Grid>

                    <Grid item xs={12} mt={2}>
                        <Divider sx={{ marginBottom: '1rem' }}>
                            <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Agendamento de Execução de Atividades" />
                        </Divider>
                    </Grid>

                    <Grid item xs={12}>
                        <StyledTextField
                            name="activitiesExecutionSchedule"
                            label="Agendamento de Execução de Atividades"
                            type="text"
                            multiline
                            rows={3}
                            fullWidth
                            value={project.activitiesExecutionSchedule}
                            onChange={handleTextFieldChange}
                        />
                    </Grid>

                    <Grid item xs={12} mt={2}>
                        <Divider sx={{ marginBottom: '1rem' }}>
                            <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Área" />
                        </Divider>
                    </Grid>

                    {
                        selectableArea ?
                            <>
                                {
                                    mainAreas &&
                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel>Área Principal</InputLabel>
                                            <StyledSelectField
                                                fullWidth
                                                value={project.mainAreaId}
                                                defaultValue={project.mainAreaId}
                                                name="mainAreaId"
                                                label="Área Principal"
                                                onChange={handleSelectFieldChange}
                                            >
                                                {mainAreas.map(({ id, name }) => (
                                                    <MenuItem key={id} value={id}>
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </StyledSelectField>
                                        </FormControl>
                                    </Grid>
                                }

                                {
                                    (areas && project.mainAreaId) &&
                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel>Área</InputLabel>
                                            <StyledSelectField
                                                fullWidth
                                                value={project.areaId}
                                                name="areaId"
                                                label="Área"
                                                onChange={handleSelectFieldChange}
                                            >
                                                {areas.map(({ id, name }) => (
                                                    <MenuItem key={id} value={id}>
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </StyledSelectField>
                                        </FormControl>
                                    </Grid>
                                }

                                {
                                    (subAreas && project.areaId) &&
                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel>Sub Área</InputLabel>
                                            <StyledSelectField
                                                fullWidth
                                                value={project.subAreaId}
                                                name="subAreaId"
                                                label="Sub Área"
                                                onChange={handleSelectFieldChange}
                                            >
                                                {subAreas.map(({ id, name }) => (
                                                    <MenuItem key={id} value={id}>
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </StyledSelectField>
                                        </FormControl>
                                    </Grid>
                                }
                            </> :
                            <Grid item xs={12} display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}>
                                <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label={mainArea} />
                                <ArrowForwardIosIcon fontSize='small' />
                                <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label={area} />
                                <ArrowForwardIosIcon fontSize='small' />
                                <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label={subArea} />
                                <IconButton title='Trocar área' onClick={() => setSelectableArea(true)}>
                                    <AutorenewIcon fontSize='large' />
                                </IconButton>
                            </Grid>
                    }

                    <Grid item xs={12} mt={2}>
                        <Divider sx={{ marginBottom: '1rem' }}>
                            <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Demais Informações" />
                        </Divider>
                    </Grid>

                    {
                        programTypes &&
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Tipo de Programa</InputLabel>
                                <StyledSelectField
                                    fullWidth
                                    value={project.programTypeId}
                                    name="programTypeId"
                                    label="Tipo de Programa"
                                    onChange={handleSelectFieldChange}
                                >
                                    {programTypes.map(({ id, name }) => (
                                        <MenuItem key={id} value={id}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </StyledSelectField>
                            </FormControl>
                        </Grid>
                    }
                    {
                        students &&
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Aluno</InputLabel>
                                <StyledSelectField
                                    fullWidth
                                    value={project.studentId}
                                    name="studentId"
                                    label="Aluno"
                                    onChange={handleSelectFieldChange}
                                >
                                    {students.map(({ id, name }) => (
                                        <MenuItem key={id} value={id}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </StyledSelectField>
                            </FormControl>
                        </Grid>
                    }
                    <Grid item xs={4}>
                        <FormGroup>
                            <InputLabel>É candidato a bolsa?</InputLabel>
                            <FormControlLabel control={<Switch defaultChecked />} label="Sim" />
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12} mt={2}>
                        <Divider>
                            <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Atividades" />
                        </Divider>
                    </Grid>

                    {
                        activities &&
                        <Grid item xs={12}>
                            <ProjectActivities noticeActivities={activities} project={project} setProject={setProject} />
                        </Grid>
                    }
                    <Grid container display={'flex'} justifyContent={'center'}>
                        <Grid item xs={12} display={'flex'} justifyContent={'space-evenly'}>
                            <StyledButton disabled={loading} variant="outlined" color="primary" type="button" onClick={handleClose}>
                                Cancelar
                            </StyledButton>
                            <StyledButton disabled={loading} variant="contained" color="primary" type="submit" onClick={handleSave}>
                                Salvar
                            </StyledButton>
                            <StyledButton disabled={loading} variant="contained" color="primary" type="submit" onClick={handleSaveSubmit}>
                                Salvar e submeter
                            </StyledButton>
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

export default ProjectManagementDialog;