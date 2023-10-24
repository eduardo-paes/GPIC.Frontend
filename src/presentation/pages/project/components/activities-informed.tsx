import LinearProgressLabeled from "@/presentation/components/progress-bar";
import { ActivityTypeViewModel } from "@/presentation/models/activity-type";
import { ProjectActivityViewModel } from "@/presentation/models/project-activity";
import { colors } from "@/presentation/styles/colors";
import { Paragraph, Title } from "@/presentation/styles/styled-components";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Card, Grid, List } from "@mui/material";
import React from "react";

type Props = {
    noticeActivities: Array<ActivityTypeViewModel>;
    projectActivities: Array<ProjectActivityViewModel>;
}

const ActivitiesInformed: React.FC<Props> = ({ noticeActivities, projectActivities }) => {

    const [total, setTotal] = React.useState<number>(0);
    const [hasLoaded, setHasLoaded] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!hasLoaded) getTotal();
    }, [hasLoaded]);

    function getTotal() {
        setTotal(0);
        noticeActivities.forEach(noticeActivity => noticeActivity.activities.forEach(activity => {
            const findedActivity = projectActivities.find(projectActivity => projectActivity.activityId === activity.id);
            if (findedActivity) {
                const numberInformed = findedActivity.informedActivities;
                const pointsToAdd = Math.min(activity.limits, numberInformed * activity.points);
                setTotal(prevTotal => prevTotal + pointsToAdd)
            }
        }))
        setHasLoaded(false);
    }

    function getProgress(value: number, points: number, limits: number) {
        return (value * points) > limits ? 100 : ((value * points / limits) * 100);
    }

    function getLabel(value: number, points: number, limits: number) {
        return `${(value * points) > limits ? limits : (value * points)}/${limits}`;
    }

    return (
        <>
            {
                noticeActivities.map(activityType => {
                    return (
                        <Accordion key={activityType.id} sx={{ marginTop: '1rem', borderLeft: `6px solid ${colors.secondary[100]}`, backgroundColor: colors.secondary[10] }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Grid item xs={12}><Paragraph sx={{ width: '50%', fontWeight: 'bolder', fontSize: '1rem', flexShrink: 0, marginTop: 0 }}>{activityType.name}</Paragraph></Grid>
                                <Grid item xs={12}><Paragraph>{activityType.unity}</Paragraph></Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List sx={{ width: '100%' }}>
                                    {
                                        activityType.activities?.map((item, index) => {

                                            const projectActivity = projectActivities.find(activity => activity.activityId === item.id) || {
                                                activityId: item.id,
                                                informedActivities: 0
                                            };

                                            return (
                                                <Card key={index} sx={{ margin: '1rem', padding: '1rem', border: `2px` }}>
                                                    <LinearProgressLabeled progress={getProgress(projectActivity.informedActivities, item.points, item.limits)} label={getLabel(projectActivity.informedActivities, item.points, item.limits)} />
                                                    <Grid container display={'flex'} justifyContent={'space-between'}>
                                                        <Grid item xs={12} mb={2}>
                                                            <Paragraph>{item.name}</Paragraph>
                                                        </Grid>
                                                        <Grid item xs={6} md={2}>
                                                            <Paragraph>Pontos: {item.points}</Paragraph>
                                                        </Grid>
                                                        <Grid item xs={3} md={2}>
                                                            <Paragraph>Limite: {item.limits}</Paragraph>
                                                        </Grid>
                                                        <Grid item xs={6} md={4}>
                                                            <Paragraph>Executadas: {projectActivity.informedActivities} </Paragraph>
                                                        </Grid>
                                                        <Grid item xs={3} md={4}>
                                                            <Paragraph>Total: {(projectActivity.informedActivities * item.points) > item.limits ? item.limits : (projectActivity.informedActivities * item.points)}</Paragraph>
                                                        </Grid>
                                                    </Grid>
                                                </Card>
                                            )
                                        })
                                    }
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
            <Title sx={{ textAlign: 'end', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem', marginTop: '1rem' }}>
                Pontuação Total: {total}
            </Title>
        </>
    );
};

export default ActivitiesInformed;