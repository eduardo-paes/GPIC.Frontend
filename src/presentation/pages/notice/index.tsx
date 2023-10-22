import { Mapper } from '@/data/interfaces/mapper';
import { NoticeDTO } from '@/data/models/notice-dto';
import { Notice } from '@/domain/models/notice';
import { IActivityService } from '@/domain/usecases/activity-interface';
import { IAuthService } from '@/domain/usecases/authentication-interface';
import { INoticeService } from '@/domain/usecases/notice-interface';
import CustomDialog from '@/presentation/components/custom-dialog';
import FeedbackMessage from '@/presentation/components/feedback-snackbar';
import Loading from '@/presentation/components/loading';
import MainLayout from '@/presentation/components/main-layout';
import { Feedback } from '@/presentation/models/feedback';
import { NoticeViewModel } from '@/presentation/models/notice';
import { TokenPayload } from '@/presentation/models/token-payload';
import { StyledButton, Title } from '@/presentation/styles/styled-components';
import { Add } from '@mui/icons-material';
import {
    Grid
} from '@mui/material';
import React from 'react';
import { decodeToken } from "react-jwt";
import NoticeDialog from './components/notice-dialog';
import NoticeForm from './components/notice-form';
import NoticeTable from './components/notice-table';

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
    authService: IAuthService;
    mapperService: Mapper<NoticeViewModel, NoticeDTO>;
}

const NoticeManagementPage: React.FC<Props> = ({ noticeService, activityService, authService, mapperService }) => {
    const [notices, setNotices] = React.useState<NoticeViewModel[]>([]);
    const [selectedNotice, setSelectedNotice] = React.useState<NoticeViewModel>(initialNotice);
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [openNoticeDialog, setOpenNoticeDialog] = React.useState<boolean>(false);
    const [disableButton, setDisableButton] = React.useState<boolean>(false);
    const [refresh, setRefresh] = React.useState<boolean>(true);
    const [take, setTake] = React.useState<number>(5);
    const [page, setPage] = React.useState<number>(0);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [feedback, setFeedback] = React.useState<Feedback>();
    const [openFeedback, setOpenFeedback] = React.useState<boolean>(false);
    const [hasAdminPermission, setHasAdminPermission] = React.useState<boolean>();

    React.useEffect(() => {
        getPermission();
    }, [hasAdminPermission])

    React.useEffect(() => {
        if (refresh) getAllNotice();
    }, [refresh])

    const getPermission = async () => {
        try {
            const token = sessionStorage.getItem('jwtToken');
            const decodedToken = decodeToken<TokenPayload>(token!);
            const role = decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            if (role) setHasAdminPermission(role === 'ADMIN');
            else setHasAdminPermission(false);
        } catch (error) {
            console.error(error);
        }
    }

    const getAllNotice = async () => {
        try {
            const response = await noticeService.get({ take, skip: page });
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

    const handleVisualizeNotice = (notice: NoticeViewModel) => {
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
            } else {
                const res = await noticeService.add(noticeDTO);
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
                            Editais
                        </Title>
                    </Grid>
                    {
                        hasAdminPermission &&
                        <Grid item >
                            <StyledButton variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenDialog()}>
                                Novo Edital
                            </StyledButton>
                        </Grid>
                    }
                </Grid>
                <Grid mt={2} item xs={12}>
                    <NoticeTable notices={notices}
                        page={page}
                        setPage={setPage}
                        take={take}
                        setTake={setTake}
                        handleVisualizeNotice={handleVisualizeNotice}
                        handleEditNotice={handleEditNotice}
                        handleDeleteNotice={handleDeleteNotice}
                        hasPermission={hasAdminPermission || false}
                    />
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
