import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { NoticeViewModel } from '@/presentation/models/notice';
import { formatDateToLocaleString } from '@/presentation/utils';
import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Paragraph } from '@/presentation/styles/styled-components';

interface Column {
    id: 'registration' | 'evaluation' | 'appeal' | 'sendingDocs' | 'functions';
    label: string;
    align?: 'center';
}

const columns: readonly Column[] = [
    {
        id: 'registration',
        label: 'Período de Abertura'
    },
    {
        id: 'evaluation',
        label: 'Período de Avaliação'
    },
    {
        id: 'appeal',
        label: 'Período de Recurso'
    },
    {
        id: 'sendingDocs',
        label: 'Período de Envio da Documentação'
    },
    {
        id: 'functions',
        label: 'Ações'
    },
];

type Props = {
    notices: Array<NoticeViewModel>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    take: number;
    setTake: React.Dispatch<React.SetStateAction<number>>;
    handleVisualizeNotice: (notice: NoticeViewModel) => void;
    handleEditNotice: (notice: NoticeViewModel) => void;
    handleDeleteNotice: (noticeId: string) => void;
    hasPermission: boolean;
}

const NoticeTable: React.FC<Props> = ({
    notices, page, setPage, take, setTake, handleVisualizeNotice,
    handleEditNotice, handleDeleteNotice, hasPermission
}) => {

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTake(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={'center'}
                                >
                                    <Paragraph sx={{ fontWeight: 'bolder' }}>{column.label}</Paragraph>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notices
                            .slice(page * take, page * take + take)
                            .map((notice) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={notice.id}>
                                        {columns.map((column) => {
                                            if (column.id !== 'functions') {
                                                const value = `${formatDateToLocaleString(notice[`${column.id}StartDate`]!)} - ${formatDateToLocaleString(notice[`${column.id}EndDate`]!)}`;
                                                return (
                                                    <TableCell key={column.id} align={'center'}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            }
                                            return (
                                                <TableCell key={column.id} align={'center'}>
                                                    <IconButton onClick={() => handleVisualizeNotice(notice)}>
                                                        <Visibility />
                                                    </IconButton>
                                                    {
                                                        hasPermission &&
                                                        <IconButton onClick={() => handleEditNotice(notice)}>
                                                            <Edit />
                                                        </IconButton>
                                                    }
                                                    {
                                                        hasPermission &&
                                                        <IconButton hidden={!hasPermission} onClick={() => handleDeleteNotice(notice.id)}>
                                                            <Delete />
                                                        </IconButton>
                                                    }
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={notices.length}
                rowsPerPage={take}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default NoticeTable;