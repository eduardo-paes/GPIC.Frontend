import { ActivityViewModel } from '@/presentation/models/activity';
import { ActivityTypeViewModel } from '@/presentation/models/activity-type';
import { NoticeViewModel } from '@/presentation/models/notice';
import { colors } from '@/presentation/styles/colors';
import {
    Paragraph, StyledTextField
} from '@/presentation/styles/styled-components';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Stack
} from '@mui/material';
import React from 'react';

const initialValues: ActivityViewModel = {
    name: '',
    points: 0,
    limits: 0
}

interface Props {
    activityType: ActivityTypeViewModel;
    edital: NoticeViewModel;
    setEdital: React.Dispatch<React.SetStateAction<NoticeViewModel>>;
    activityTypeIndex: number;
}

const ActivityTypeAccordion: React.FC<Props> = ({ activityType, edital, setEdital, activityTypeIndex }) => {
    const [newActivity, setNewActivity] = React.useState<ActivityViewModel>(initialValues);
    const [actualActivityIndex, setActualActivityIndex] = React.useState<number>(-1);

    const handleAddActivity = () => {
        const activitiesType = edital.activities;
        if (activitiesType[activityTypeIndex].activities !== undefined)
            activitiesType[activityTypeIndex].activities.push(newActivity);
        else
            activitiesType[activityTypeIndex].activities = [newActivity];
        setNewActivity(initialValues);
        setEdital(prevEdital => ({
            ...prevEdital,
            activities: activitiesType
        }));
    };

    const handleUpdateActivity = () => {
        const activitiesType = edital.activities;
        activitiesType[activityTypeIndex].activities[actualActivityIndex] = newActivity;
        setEdital(prevEdital => ({
            ...prevEdital,
            activities: activitiesType
        }));
        setNewActivity(initialValues);
        setActualActivityIndex(-1);
    };

    const handleDeleteActivityType = (index: number) => {
        const activitiesType = edital.activities;
        const updatedActivityType = { ...activitiesType[activityTypeIndex] };
        updatedActivityType.activities = updatedActivityType.activities.filter((_, itemIndex) => itemIndex !== index);
        activitiesType[activityTypeIndex] = updatedActivityType;
        setEdital(prevEdital => ({
            ...prevEdital,
            activities: activitiesType
        }));
    };

    const selectActivityToEdit = (index: number) => {
        setNewActivity(edital.activities[activityTypeIndex].activities[index]);
        setActualActivityIndex(index);
    };

    const handleChangeActivity = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event?.target;
            if ((name === 'name') || (name !== 'name' && parseInt(value) >= 0)) {
                setNewActivity((prevActivity: any) => ({
                    ...prevActivity,
                    [name]: value
                }));
            }
        },
        [setNewActivity]
    );

    return (
        <Accordion sx={{ backgroundColor: colors.secondary[10] }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Paragraph sx={{ width: '50%', fontWeight: 'bolder', fontSize: '1rem', flexShrink: 0, marginTop: 0 }}>{activityType.name}</Paragraph>
                <Paragraph>{activityType.unity}</Paragraph>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            fullWidth
                            label="Nome"
                            name='name'
                            value={newActivity.name}
                            onChange={handleChangeActivity}
                            sx={{ bgcolor: 'white' }}
                        />
                    </Grid>
                    <Grid item xs={5} sm={2}>
                        <StyledTextField
                            fullWidth
                            label="Pontos"
                            name='points'
                            type='number'
                            value={newActivity.points}
                            onChange={handleChangeActivity}
                            sx={{ bgcolor: 'white' }}
                        />
                    </Grid>
                    <Grid item xs={5} sm={2}>
                        <StyledTextField
                            fullWidth
                            label="Limite"
                            name='limits'
                            type='number'
                            value={newActivity.limits}
                            onChange={handleChangeActivity}
                            sx={{ bgcolor: 'white' }}
                        />
                    </Grid>
                    <Grid item xs={2} display={'flex'} justifyContent={'center'}>
                        <IconButton onClick={actualActivityIndex < 0 ? handleAddActivity : handleUpdateActivity} sx={{ backgroundColor: colors.primary[100], color: colors.white, borderRadius: '1.5rem' }} >
                            <AddIcon fontSize='small' />
                        </IconButton>
                    </Grid>
                </Grid>
                <div>
                    <List sx={{ width: '100%' }}>
                        {edital.activities[activityTypeIndex].activities?.map((item, index) => (
                            <Card key={index} sx={{ paddingLeft: '0.5rem', paddingRight: '0.5rem', marginTop: '0.5rem', backgroundColor: colors.secondary[25] }}>
                                <ListItem
                                    key={index}
                                    disableGutters
                                    secondaryAction={
                                        <Stack direction={'column'}>
                                            <IconButton aria-label="edit" sx={{ color: colors.primary[100], borderRadius: '1.5rem' }} onClick={() => selectActivityToEdit(index)}>
                                                <EditIcon fontSize='small' />
                                            </IconButton>
                                            <IconButton aria-label="delete" sx={{ color: colors.primary[100], borderRadius: '1.5rem' }} onClick={() => handleDeleteActivityType(index)}  >
                                                <DeleteIcon fontSize='small' />
                                            </IconButton>
                                        </Stack>
                                    }
                                >
                                    <ListItemText primary={item.name} secondary={
                                        <Paragraph>
                                            Pontos: {item.points}
                                            <br />
                                            Limite: {item.limits}
                                        </Paragraph>
                                    } />
                                </ListItem>
                            </Card>
                        ))}
                    </List>
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default ActivityTypeAccordion;
