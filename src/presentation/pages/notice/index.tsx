import { INoticeService } from '@/domain/usecases/notice-interface';
import MainLayout from '@/presentation/components/main-layout';
import { NoticeViewModel } from '@/presentation/models/notice';
import { Title } from '@/presentation/styles/styled-components';
import { Add, Delete, Edit } from '@mui/icons-material';
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
    docUrl: ''
};

interface Props {
    noticeService: INoticeService;
}

const NoticeManagementPage: React.FC<Props> = ({ noticeService }) => {
    const [notices, setNotices] = React.useState<NoticeViewModel[]>([]);
    const [selectedNotice, setSelectedNotice] = React.useState<NoticeViewModel>(initialNotice);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleOpenDialog = (notice?: NoticeViewModel) => {
        setSelectedNotice(notice || initialNotice);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setSelectedNotice(initialNotice);
        setOpenDialog(false);
    };

    const handleSaveNotice = () => {
        if (selectedNotice.id) {
            // Update existing notice
            setNotices((prevNotices) =>
                prevNotices.map((notice) => (notice.id === selectedNotice.id ? selectedNotice : notice))
            );
        } else {
            // Add new notice
            setNotices((prevNotices) => [...prevNotices, { ...selectedNotice, id: Date.now().toString() }]);
        }
        handleCloseDialog();
    };

    const handleEditNotice = (notice: NoticeViewModel) => {
        handleOpenDialog(notice);
    };

    const handleDeleteNotice = (id: string) => {
        setNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== id));
    };

    return (
        <MainLayout>
            <Box mt={4} sx={{ margin: '1rem' }}>
                <Title>
                    Gerenciamento de Editais
                </Title>
                <Card sx={{ margin: '1rem 0', padding: '1rem' }}>
                    <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <Grid item>
                            <Input
                                type='file'
                                value={null}
                                onChange={() => { }}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenDialog()}>
                                Novo Edital
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nº</TableCell>
                                <TableCell>Data de Abertura</TableCell>
                                <TableCell>Data de Avaliação</TableCell>
                                <TableCell>Data de Recurso</TableCell>
                                <TableCell>Data de Envio da Documentação</TableCell>
                                <TableCell align="right">Ações</TableCell>
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
                                        <TableCell>{notice.id}</TableCell>
                                        <TableCell>
                                            {`${notice.registrationStartDate.toLocaleDateString()} - ${notice.registrationEndDate.toLocaleDateString()}`}
                                        </TableCell>
                                        <TableCell align="right">
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
            </Box>
        </MainLayout>
    );
};

export default NoticeManagementPage;
