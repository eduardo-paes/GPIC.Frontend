import { ActivityTypeViewModel } from '@/presentation/models/activity-type';
import { NoticeViewModel } from '@/presentation/models/notice';
import { colors } from '@/presentation/styles/colors';
import { StyledTextField } from '@/presentation/styles/styled-components';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Grid,
    IconButton,
    Stack
} from '@mui/material';
import React from 'react';
import ActivityTypeAccordion from '../activity-type';

const initialValues: ActivityTypeViewModel = {
    name: '',
    unity: '',
    activities: []
}

interface Props {
    edital: NoticeViewModel;
    setEdital: React.Dispatch<React.SetStateAction<NoticeViewModel>>;
}

const ActivityComponent: React.FC<Props> = ({ edital, setEdital }) => {
    const [newActivityType, setNewActivityType] = React.useState<ActivityTypeViewModel>(initialValues);
    const [actualActivityTypeIndex, setActualActivityTypeIndex] = React.useState<number>(-1);

    const handleAddActivityType = () => {
        if (newActivityType.unity && newActivityType.name) {
            const updatedEdital = { ...edital };
            const updatedActivities = [...edital.activities];
            updatedActivities.push(newActivityType);
            updatedEdital.activities = updatedActivities;
            setEdital(updatedEdital);
            setNewActivityType({
                name: '',
                unity: '',
                activities: []
            });
        }
    };

    const handleUpdateActivity = () => {
        const updatedEdital = { ...edital };
        const updatedActivitiesType = [...updatedEdital.activities];
        updatedActivitiesType[actualActivityTypeIndex] = newActivityType;
        updatedEdital.activities = updatedActivitiesType;
        setEdital(updatedEdital);
        setNewActivityType(initialValues);
        setActualActivityTypeIndex(-1);
    };

    const handleDeleteActivityType = (index: number) => {
        const updatedEdital = { ...edital };
        const updatedActivitiesType = [...updatedEdital.activities.filter((_, itemIndex) => itemIndex !== index)];
        updatedEdital.activities = updatedActivitiesType;
        setEdital(updatedEdital);
        setNewActivityType(initialValues);
    };

    const selectActivityTypeToEdit = (index: number) => {
        setNewActivityType(edital.activities![index]);
        setActualActivityTypeIndex(index);
    };

    const handleChangeActivityType = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event?.target;
            setNewActivityType((prevActivityType: any) => ({
                ...prevActivityType,
                [name]: value
            }));
        },
        [setNewActivityType]
    );

    return (
        <div>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                    <StyledTextField
                        fullWidth
                        label="Nome"
                        name='name'
                        value={newActivityType.name}
                        onChange={handleChangeActivityType}
                    />
                </Grid>
                <Grid item xs={5}>
                    <StyledTextField
                        fullWidth
                        label="Unidade"
                        name='unity'
                        value={newActivityType.unity}
                        onChange={handleChangeActivityType}
                    />
                </Grid>
                <Grid item xs={1} display={'flex'} justifyContent={'center'}>
                    <IconButton onClick={actualActivityTypeIndex < 0 ? handleAddActivityType : handleUpdateActivity} sx={{ backgroundColor: colors.primary[100], color: colors.white, borderRadius: '1.5rem' }} >
                        <AddIcon fontSize='medium' />
                    </IconButton>
                </Grid>
            </Grid>

            {edital.activities && edital.activities.map((activity, unityIndex) => (
                <Grid key={unityIndex} container display={'flex'} alignItems={'center'} mt={4}>
                    <Grid item xs={10}>
                        <ActivityTypeAccordion edital={edital} setEdital={setEdital} activityTypeIndex={unityIndex} activityType={activity} />
                    </Grid>
                    <Grid item xs={2} display={'flex'} justifyContent={'center'}>
                        <Stack direction={'row'}>
                            <IconButton aria-label="edit" sx={{ color: colors.primary[100], borderRadius: '1.5rem' }} onClick={() => selectActivityTypeToEdit(unityIndex)}>
                                <EditIcon fontSize='medium' />
                            </IconButton>
                            <IconButton aria-label="delete" sx={{ color: colors.primary[100], borderRadius: '1.5rem' }} onClick={() => handleDeleteActivityType(unityIndex)}  >
                                <DeleteIcon fontSize='medium' />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            ))}
        </div>
    );
};

export default ActivityComponent;
