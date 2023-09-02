import { INoticeService } from '@/domain/usecases/notice-interface';
import CustomDialog from '@/presentation/components/custom-dialog';
import MainLayout from '@/presentation/components/main-layout';
import { NoticeViewModel } from '@/presentation/models/notice';
import { StyledButton, Title } from '@/presentation/styles/styled-components';
import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    Grid,
    IconButton,
    Input,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import React from 'react';
import NoticeForm from './components/notice-form';
import { formatDateToLocaleString } from '@/presentation/utils';
import { NoticeDTO } from '@/data/models/notice-dto';
import { Notice } from '@/domain/models/notice';
import NoticeDialog from './components/notice-dialog';
import Loading from '@/presentation/components/loading';
import { Feedback } from '@/presentation/models/feedback';
import FeedbackMessage from '@/presentation/components/feedback-snackbar';
import { IActivityService } from '@/domain/usecases/activity-interface';
import NoticeMapper from '@/data/mappings/notice';
import { Mapper } from '@/data/interfaces/mapper';

const initialNotice: NoticeViewModel = {
    id: '',
    registrationStartDate: new Date(),
    registrationEndDate: new Date(),
    evaluationStartDate: new Date(),
    evaluationEndDate: new Date(),
    appealStartDate: new Date(),
    appealEndDate: new Date(),
    sendingDocsStartDate: new Date(),
    sendingDocsEndDate: new Date(),
    suspensionYears: 0,
    partialReportDeadline: new Date(),
    finalReportDeadline: new Date(),
    activities: []
};

interface Props {
    noticeService: INoticeService;
    activityService: IActivityService;
    mapperService: Mapper<NoticeViewModel, NoticeDTO>;
}

const NoticeManagementPage: React.FC<Props> = ({ noticeService, activityService, mapperService }) => {
    const [notices, setNotices] = React.useState<NoticeViewModel[]>([]);
    const [selectedNotice, setSelectedNotice] = React.useState<NoticeViewModel>(initialNotice);
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [openNoticeDialog, setOpenNoticeDialog] = React.useState<boolean>(false);
    const [disableButton, setDisableButton] = React.useState<boolean>(false);
    const [refresh, setRefresh] = React.useState<boolean>(true);
    const [take, setTake] = React.useState<number>(5);
    const [skip, setSkip] = React.useState<number>(0);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [feedback, setFeedback] = React.useState<Feedback>();
    const [openFeedback, setOpenFeedback] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (refresh) {
            getAllNotice();
            console.log(notices);

        }
    }, [refresh])

    const getAllNotice = async () => {
        try {
            const response = await noticeService.get({ take, skip });
            setNotices(response.map(mapNoticeModelToViewModel));
            setRefresh(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleOpenDialog = (notice?: NoticeViewModel) => {
        setSelectedNotice(notice || initialNotice);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setSelectedNotice(initialNotice);
        setOpenDialog(false);
    };

    const visualizeNotice = (notice: NoticeViewModel) => {
        setOpenNoticeDialog(true);
        setSelectedNotice(notice);
    };

    function mapNoticeModelToViewModel(notice: Notice): NoticeViewModel {
        return {
            id: notice.id,
            registrationStartDate: notice.registrationStartDate!,
            registrationEndDate: notice.registrationEndDate!,
            evaluationStartDate: notice.evaluationStartDate!,
            evaluationEndDate: notice.evaluationEndDate!,
            appealStartDate: notice.appealStartDate!,
            appealEndDate: notice.appealEndDate!,
            sendingDocsStartDate: notice.sendingDocsStartDate!,
            sendingDocsEndDate: notice.sendingDocsEndDate!,
            suspensionYears: notice.suspensionYears,
            partialReportDeadline: notice.partialReportDeadline!,
            finalReportDeadline: notice.finalReportDeadline!,
            attachedFile: notice.docUrl,
            activities: notice.activities,
            description: notice.description,
            deletedAt: notice.deletedAt
        };
    };

    const handleSaveNotice = async () => {
        setDisableButton(true);
        const noticeDTO = mapperService.mapFrom(selectedNotice);
        try {
            setIsLoading(true);
            if (selectedNotice.id) {
                const res = await noticeService.update(noticeDTO);
                console.log(res);
            } else {
                const res = await noticeService.add(noticeDTO);
                console.log(res);
            }
            setFeedback({ message: 'Edital salvo com sucesso.', type: 'success' });
            setRefresh(true);
            setSelectedNotice(initialNotice);
            handleCloseDialog();
        } catch (error) {
            console.log(error);

            console.error(error);
            setFeedback({ message: 'Erro ao salvar Edital. Verifique os campos e tente novamente.', type: 'error' });
        } finally {
            setIsLoading(false);
            setDisableButton(false);
            setOpenFeedback(true);
        }
    };

    const handleEditNotice = (notice: NoticeViewModel) => {
        handleOpenDialog(notice);
    };

    const handleDeleteNotice = async (id: string) => {
        try {
            await noticeService.delete({ id });
            setNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MainLayout>
            <Grid container mt={2} >
                <Grid item container display={'flex'} alignItems={'center'} justifyContent={'space-between'} xs={12}>
                    <Grid item >
                        <Title>
                            Gerenciamento de Editais
                        </Title>
                    </Grid>
                    <Grid item >
                        <StyledButton variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenDialog()}>
                            Novo Edital
                        </StyledButton>
                    </Grid>
                </Grid>
                <Grid mt={2} item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }} >Período de Abertura</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }} >Período de Avaliação</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }} >Período de Recurso</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }} >Período de Envio da Documentação</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }} >Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {notices.length === 0 ? (
                                    <TableRow>
                                        <TableCell align='center' colSpan={6}>
                                            <Typography variant="body1">Nenhum edital encontrado.</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    notices.map((notice) => (
                                        <TableRow key={notice.id}>
                                            <TableCell align='center'>
                                                {`${formatDateToLocaleString(notice.registrationStartDate!)} - ${formatDateToLocaleString(notice.registrationEndDate!)}`}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {`${formatDateToLocaleString(notice.evaluationStartDate!)} - ${formatDateToLocaleString(notice.evaluationEndDate!)}`}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {`${formatDateToLocaleString(notice.appealStartDate!)} - ${formatDateToLocaleString(notice.appealEndDate!)}`}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {`${formatDateToLocaleString(notice.sendingDocsStartDate!)} - ${formatDateToLocaleString(notice.sendingDocsEndDate!)}`}
                                            </TableCell>
                                            <TableCell align='center'>
                                                <IconButton onClick={() => visualizeNotice(notice)}>
                                                    <Visibility />
                                                </IconButton>
                                                <IconButton onClick={() => handleEditNotice(notice)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteNotice(notice.id)}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item>
                    <CustomDialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        title={"Formulário de Edital"}
                        content={<NoticeForm activityService={activityService} initialValues={selectedNotice} data={selectedNotice} setData={setSelectedNotice} />}
                        actions={
                            <>
                                <StyledButton variant='outlined' onClick={handleCloseDialog}>Voltar</StyledButton>
                                <StyledButton disabled={disableButton} variant='contained' onClick={handleSaveNotice}>Salvar</StyledButton>
                            </>
                        }
                    />
                </Grid>
                <Grid>
                    <NoticeDialog activityService={activityService} notice={selectedNotice} open={openNoticeDialog} setOpen={setOpenNoticeDialog} />
                </Grid>
                <Grid>
                    <Loading isLoading={isLoading} />
                    {feedback && <FeedbackMessage open={openFeedback} handleClose={() => setOpenFeedback(false)} feedback={feedback!} />}
                </Grid>
            </Grid>
        </MainLayout>
    );
};

export default NoticeManagementPage;
