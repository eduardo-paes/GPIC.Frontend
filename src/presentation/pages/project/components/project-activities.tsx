import LinearProgressLabeled from "@/presentation/components/progress-bar";
import { ActivityTypeViewModel } from "@/presentation/models/activity-type";
import { ProjectViewModel } from "@/presentation/models/project";
import { colors } from "@/presentation/styles/colors";
import { Paragraph, Title } from "@/presentation/styles/styled-components";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Card, Grid, List, TextField } from "@mui/material";
import React from "react";

type Props = {
    noticeActivities: Array<ActivityTypeViewModel>;
    project: ProjectViewModel;
    setProject: React.Dispatch<React.SetStateAction<ProjectViewModel>>;
}

const ProjectActivities: React.FC<Props> = ({ noticeActivities, project, setProject }) => {

    const [total, setTotal] = React.useState<number>(0);
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);

    React.useEffect(() => {
        getTotal();
    }, [hasChanged, project.activities]);

    function getTotal() {
        setTotal(0);
        noticeActivities.forEach(noticeActivity => noticeActivity.activities.forEach(activity => {
            const findedActivity = project.activities?.find(projectActivity => projectActivity.activityId === activity.id);
            if (findedActivity) {
                const numberInformed = findedActivity.informedActivities;
                const pointsToAdd = Math.min(activity.limits, numberInformed * activity.points);
                setTotal(prevTotal => prevTotal + pointsToAdd)
            }
        }))
        setHasChanged(false);
    }

    function getProgress(value: number, points: number, limits: number) {
        return (value * points) > limits ? 100 : ((value * points / limits) * 100);
    }

    function getLabel(value: number, points: number, limits: number) {
        return `${(value * points) > limits ? limits : (value * points)}/${limits}`;
    }

    const handleTextFieldChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { id, value } = event.target;
            const numberInformed = parseInt(value);

            if (numberInformed >= 0) {
                setProject(prevProject => {
                    const updatedActivities = prevProject.activities.map(activity => {
                        if (activity.activityId === id) {
                            return {
                                ...activity,
                                informedActivities: numberInformed
                            };
                        }
                        return activity;
                    });

                    const existingActivity = updatedActivities.find(activity => activity.activityId === id);
                    if (!existingActivity) {
                        updatedActivities.push({
                            informedActivities: numberInformed,
                            activityId: id
                        });
                    }

                    return {
                        ...prevProject,
                        activities: updatedActivities
                    };
                });
                setHasChanged(true);
            }
        },
        [setProject, setHasChanged]
    );

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
                                            const projectActivity = project.activities?.find(activity => activity.activityId === item.id) || {
                                                activityId: item.id,
                                                informedActivities: 0
                                            };

                                            return (
                                                <Card key={index} sx={{ margin: '1rem', padding: '1rem', border: `2px` }}>
                                                    <LinearProgressLabeled progress={getProgress(projectActivity.informedActivities, item.points, item.limits)} label={getLabel(projectActivity.informedActivities, item.points, item.limits)} />
                                                    <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                                        <Grid item xs={12} mb={2}>
                                                            <Paragraph>{item.name}</Paragraph>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Paragraph>Pontos: {item.points}</Paragraph>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Paragraph>Limite: {item.limits}</Paragraph>
                                                        </Grid>
                                                        <Grid item xs={10} md={5} container display={'flex'} direction={'row'} alignItems={'center'}>
                                                            <Paragraph sx={{ marginRight: '0.25rem' }}>Executadas: </Paragraph>
                                                            <TextField
                                                                id={item.id}
                                                                variant="standard"
                                                                type="number"
                                                                value={projectActivity.informedActivities}
                                                                onChange={handleTextFieldChange}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Paragraph>Total: {(projectActivity.informedActivities * item.points) > item.limits ? item.limits : (projectActivity.informedActivities * item.points)}</Paragraph>
                                                        </Grid>
                                                    </Grid>
                                                </Card>
                                            )
                                        }
                                        )
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

export default ProjectActivities;