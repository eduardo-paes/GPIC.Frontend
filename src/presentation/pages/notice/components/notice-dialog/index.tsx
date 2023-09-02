import { NoticeViewModel } from '@/presentation/models/notice';
import { colors } from '@/presentation/styles/colors';
import { Paragraph, Subtitle } from '@/presentation/styles/styled-components';
import { formatDateToLocaleString } from '@/presentation/utils';
import { CalendarMonth, Close } from '@mui/icons-material';
import { AppBar, Button, Card, CardContent, Dialog, DialogContent, Grid, IconButton, Link, Toolbar, Typography } from '@mui/material';
import React from 'react';
import DatePeriod from '../date-range';
import { IActivityService } from '@/domain/usecases/activity-interface';
import { ActivityTypeViewModel } from '@/presentation/models/activity-type';
import ActivityTypeComponent from './components/activity-type-component';

type Props = {
    notice: NoticeViewModel;
    open: boolean;
    setOpen: (open: boolean) => void;
    activityService: IActivityService;
}

const NoticeDialog: React.FC<Props> = ({ notice, open, setOpen, activityService }) => {
    const [activities, setActivities] = React.useState<Array<ActivityTypeViewModel>>();

    React.useEffect(() => {
        if (open) getActivities();
    }, [open])

    const getActivities = async () => {
        try {
            const activitiesList = await activityService.getByNoticeId({ id: notice.id });
            setActivities(activitiesList);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Dialog open={open} fullScreen>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => setOpen(false)}
                        aria-label="close"
                    >
                        <Close />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Visualização do Edital
                    </Typography>
                    {
                        notice.attachedFile &&
                        <Link href={`${notice.attachedFile}`} sx={{ color: 'inherit' }} underline="none">
                            <Button autoFocus color="inherit">
                                Baixar Edital
                            </Button>
                        </Link>
                    }
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Grid container>
                    <Grid item spacing={2} container display='flex' justifyContent='space-evenly' alignItems='stretch'>
                        <Grid item xs={12} md={6} lg={3}>
                            <DatePeriod
                                startDate={notice.registrationEndDate!}
                                endDate={notice.registrationEndDate!}
                                period='registration'
                                label='Período de Abertura'
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <DatePeriod
                                startDate={notice.evaluationEndDate!}
                                endDate={notice.evaluationEndDate!}
                                period='evaluation'
                                label='Período de Avaliação'
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <DatePeriod
                                startDate={notice.appealEndDate!}
                                endDate={notice.appealEndDate!}
                                period='appeal'
                                label='Período de Recurso'
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <DatePeriod
                                startDate={notice.sendingDocsEndDate!}
                                endDate={notice.sendingDocsEndDate!}
                                period='sendingDocs'
                                label='Período de Entrega de Documentação'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ display: 'flex', heigth: '15rem', padding: '1rem', border: `2px solid ${colors.primary[100]}` }}>
                                <Grid container>
                                    <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                                        <Paragraph sx={{ margin: '0.25rem', fontWeight: 'bold', textAlign: 'center' }}>
                                            Prazos de Entrega dos Relatórios
                                            <br />
                                            Parcial e Final
                                        </Paragraph>
                                    </Grid>
                                    <Grid item xs={12} display='flex' justifyContent='space-around' alignItems='center'>
                                        <Paragraph sx={{ margin: '0.25rem 0.5rem', fontWeight: 'bold', textAlign: 'center' }}>
                                            {formatDateToLocaleString(notice.partialReportDeadline!)}
                                            <br />
                                            Parcial
                                        </Paragraph>
                                        <CalendarMonth htmlColor={colors.primary[100]} />
                                        <Paragraph sx={{ margin: '0.25rem 0.5rem', fontWeight: 'bold', textAlign: 'center' }}>
                                            {formatDateToLocaleString(notice.finalReportDeadline!)}
                                            <br />
                                            Final
                                        </Paragraph>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item mt={2} container display='flex' justifyContent='center'>
                        {
                            notice.description &&
                            <Grid item xs={12}>
                                <Card >
                                    <CardContent>
                                        <Subtitle sx={{ margin: 0 }}>Descrição:</Subtitle>
                                        <Paragraph>
                                            {notice.description}
                                        </Paragraph>
                                    </CardContent>
                                </Card>
                            </Grid>
                        }
                        {
                            <Grid item xs={12}>
                                <Subtitle sx={{ marginBottom: '1rem' }}>Atividades</Subtitle>
                                {
                                    activities?.map(activityType => <ActivityTypeComponent activityType={activityType} />)
                                }
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default NoticeDialog;