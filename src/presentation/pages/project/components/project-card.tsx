import { INoticeService } from "@/domain/usecases/notice-interface";
import { NoticeViewModel } from "@/presentation/models/notice";
import { ProjectViewModel } from "@/presentation/models/project";
import { colors } from "@/presentation/styles/colors";
import { Paragraph, StyledButton, Title } from "@/presentation/styles/styled-components";
import { formatDateToLocaleString, getPeriodNotice } from "@/presentation/utils";
import { STATUS } from "@/presentation/utils/constants";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Card, Grid, IconButton } from "@mui/material";
import React from "react";

type Props = {
    noticeService: INoticeService;
    project: ProjectViewModel;
    getProfessor: (professorId: string) => Promise<string>;
    getStudent: (studentId: string) => Promise<string>;
    handleEdit: (project: ProjectViewModel) => void;
    handleVisualize: (project: ProjectViewModel) => void;
    handleDelete: (projectId: string) => void;
}

const ProjectCard: React.FC<Props> = ({
    noticeService, project, getProfessor, getStudent,
    handleEdit, handleVisualize, handleDelete
}) => {

    const [notice, setNotice] = React.useState<NoticeViewModel>();
    const [professor, setProfessor] = React.useState<string>();
    const [student, setStudent] = React.useState<string>();

    React.useEffect(() => {
        if (!notice) getNotice();
        if (!professor) resolveProfessor();
        if (!student) resolveStudent();
    }, [])

    async function getNotice() {
        try {
            const response = await noticeService.getById({ id: project.noticeId });
            setNotice(response);
        } catch (error) {
            console.error(error);
        }
    }

    function resolveProfessor() {
        getProfessor(project.professorId).then(value => setProfessor(value));
    }

    function resolveStudent() {
        getStudent(project.studentId).then(value => setStudent(value));
    }

    return (
        <Card sx={{ border: '2px solid #777', marginBottom: '1rem' }}>
            <Grid container>
                <Grid item container sx={{ padding: '1rem', borderBottom: '1px solid #777' }} display={'flex'} alignItems={'center'}>
                    <Grid item xs={project.status === 0 ? 10 : 12}>
                        <Title sx={{ fontSize: '1.1rem' }}>{project.title}</Title>
                    </Grid>
                    {
                        project.status === 0 &&
                        <Grid item xs={2} display={'flex'} justifyContent={'end'}>
                            <IconButton sx={{ color: colors.primary[100], borderRadius: '1.5rem' }} onClick={() => handleEdit(project)}>
                                <EditIcon fontSize='medium' />
                            </IconButton>
                            <IconButton sx={{ color: colors.red, borderRadius: '1.5rem' }} onClick={() => handleDelete(project.id!)}>
                                <DeleteIcon fontSize='medium' />
                            </IconButton>
                        </Grid>
                    }
                </Grid>
                <Grid item container sx={{ padding: '1rem', borderBottom: '1px solid #777' }}>
                    <Grid item xs={9}>
                        {project.professorId && <Paragraph sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Orientador: {professor}</Paragraph>}
                        {project.studentId && <Paragraph sx={{ marginTop: '0.5rem', fontWeight: 'bold', fontSize: '1rem' }}>Aluno: {student}</Paragraph>}
                        {notice && <>
                            <Paragraph sx={{ marginTop: '1rem' }}>Edital: {getPeriodNotice(notice?.registrationStartDate!)}</Paragraph>
                            <Paragraph sx={{ marginTop: '0.5rem' }}>Data de Início: {formatDateToLocaleString(notice?.registrationStartDate!)}</Paragraph>
                            <Paragraph sx={{ marginTop: '0.5rem' }}>Data Final: {formatDateToLocaleString(notice?.registrationEndDate!)}</Paragraph>
                        </>}
                    </Grid>
                    <Grid item xs={3} display={'flex'} alignItems={'end'} justifyContent={'end'}>
                        <StyledButton variant="outlined" onClick={() => handleVisualize(project)}>Ver detalhes</StyledButton>
                    </Grid>
                </Grid>
                <Grid item container display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    <Grid item xs={4} md={2}>
                        <Paragraph sx={{
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            backgroundColor: STATUS[project.status].color,
                            color: STATUS[project.status].fontColor,
                            padding: '0.5rem',
                            borderRadius: '0.25rem',
                            textAlign: 'center',
                            margin: '0.5rem'
                        }}>{STATUS[project.status].name}</Paragraph>
                    </Grid>
                    <Grid item xs={8} display={'flex'} justifyContent={'end'}>
                        <Paragraph sx={{ marginRight: '1rem' }}>{project.statusDescription}</Paragraph>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

export default ProjectCard;