import { IActivityService } from '@/domain/usecases/activity-interface';
import ActivityComponent from '@/presentation/components/activity';
import { NoticeViewModel } from '@/presentation/models/notice';
import { colors } from '@/presentation/styles/colors';
import { InputStack, Paragraph, StyledButton, StyledTextField } from '@/presentation/styles/styled-components';
import { formatDateToISOString } from '@/presentation/utils';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {
    Chip,
    Divider,
    Grid,
    Stack
} from '@mui/material';
import React from 'react';

type Props = {
    initialValues: NoticeViewModel;
    data: NoticeViewModel;
    setData: React.Dispatch<React.SetStateAction<NoticeViewModel>>;
    activityService: IActivityService;
}

const NoticeForm: React.FC<Props> = ({ initialValues, data, setData, activityService }) => {
    const [filename, setFilename] = React.useState<string>('');

    React.useEffect(() => {
        setData(initialValues);
        if (initialValues.id) getActivities();
        else getLastActivities();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setData((prevData) => ({ ...prevData, [name]: new Date(value) }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files) {
            const file = files[0];
            setFilename(file.name);
            setData((prevData) => ({ ...prevData, attachedFile: file }));
        }
    };

    const getActivities = async () => {
        try {
            const activities = await activityService.getByNoticeId({ id: initialValues.id });
            setData((prevData) => ({
                ...prevData,
                activities: activities
            }))
        } catch (error) {
            console.error(error);
        }
    };

    const getLastActivities = async () => {
        try {
            const activities = await activityService.getOfLastNotice();
            setData((prevData) => ({
                ...prevData,
                activities: activities
            }))
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form>
            <Grid container spacing={2} sx={{ width: '100%' }}>

                {/* Período de Abertura */}
                <Grid item xs={12} mt={2}>
                    <Divider>
                        <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Período de Abertura" />
                    </Divider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        name="registrationStartDate"
                        label="Data de Início"
                        type="date"
                        fullWidth
                        value={formatDateToISOString(data.registrationStartDate)}
                        onChange={handleDateChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        name="registrationEndDate"
                        label="Data de Fim"
                        type="date"
                        fullWidth
                        value={formatDateToISOString(data.registrationEndDate)}
                        onChange={handleDateChange}
                    />
                </Grid>

                {/* Período de Avaliação */}
                <Grid item xs={12} mt={4}>
                    <Divider>
                        <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Período de Avaliação" />
                    </Divider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        name="evaluationStartDate"
                        label="Data de Início"
                        type="date"
                        fullWidth
                        value={formatDateToISOString(data.evaluationStartDate)}
                        onChange={handleDateChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        name="evaluationEndDate"
                        label="Data de Fim"
                        type="date"
                        fullWidth
                        value={formatDateToISOString(data.evaluationEndDate)}
                        onChange={handleDateChange}
                    />
                </Grid>

                {/* Período de Recurso */}
                <Grid item xs={12} mt={4}>
                    <Divider>
                        <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Período de Recurso" />
                    </Divider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        name="appealStartDate"
                        label="Data de Início"
                        type="date"
                        fullWidth
                        value={formatDateToISOString(data.appealStartDate)}
                        onChange={handleDateChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        name="appealEndDate"
                        label="Data de Fim"
                        type="date"
                        fullWidth
                        value={formatDateToISOString(data.appealEndDate)}
                        onChange={handleDateChange}
                    />
                </Grid>

                {/* Período de Entrega da Documentação */}
                <Grid item xs={12} mt={4}>
                    <Divider>
                        <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Período de Entrega da Documentação" />
                    </Divider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        name="sendingDocsStartDate"
                        label="Data de Início"
                        type="date"
                        fullWidth
                        value={formatDateToISOString(data.sendingDocsStartDate)}
                        onChange={handleDateChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        name="sendingDocsEndDate"
                        label="Data de Fim"
                        type="date"
                        fullWidth
                        value={formatDateToISOString(data.sendingDocsEndDate)}
                        onChange={handleDateChange}
                    />
                </Grid>

                {/* Prazos de Entrega dos Relatórios */}
                <Grid item xs={12} mt={4}>
                    <Divider>
                        <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Prazos de Entrega dos Relatórios" />
                    </Divider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        name="partialReportDeadline"
                        label="Relatório Parcial"
                        type="date"
                        fullWidth
                        value={formatDateToISOString(data.partialReportDeadline)}
                        onChange={handleDateChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        name="finalReportDeadline"
                        label="Relatório Final"
                        type="date"
                        fullWidth
                        value={formatDateToISOString(data.finalReportDeadline)}
                        onChange={handleDateChange}
                    />
                </Grid>

                {/* Atividades */}
                <Grid item xs={12} mt={4}>
                    <Divider>
                        <Chip variant='outlined' sx={{ fontWeight: 'bold' }} label="Atividades" />
                    </Divider>
                </Grid>
                <Grid item xs={12}>
                    <ActivityComponent edital={data} setEdital={setData} />
                </Grid>

                {/* Demais campos do Edital */}
                <Grid item xs={12} mt={4}>
                    <Divider />
                </Grid>
                <Grid item xs={12} container display={'flex'} alignItems={'center'} spacing={2}>
                    <Grid item xs={12}>
                        <StyledTextField
                            name="description"
                            label="Descrição"
                            multiline
                            maxRows={3}
                            fullWidth
                            value={data.description}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            name="suspensionYears"
                            label="Quantidade de Anos de Suspensão"
                            type="number"
                            fullWidth
                            value={data.suspensionYears}
                            onChange={handleChange}
                        />
                    </Grid>
                    {/* PDF do Edital */}
                    <Grid item xs={12} sm={6}>
                        <label style={{ cursor: 'pointer' }} htmlFor="noticePdf">
                            <InputStack direction="row" justifyContent={'center'} alignItems="center">
                                <AttachFileIcon />
                                Anexar Arquivo

                            </InputStack>
                        </label>
                        <input id='noticePdf' onChange={handleFileChange} hidden accept=".pdf" type="file" />
                        <Paragraph>{filename}</Paragraph>
                    </Grid>
                </Grid>
            </Grid>
        </form >
    );
};

export default NoticeForm;
