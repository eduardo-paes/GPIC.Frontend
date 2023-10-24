import { ActivityTypeViewModel } from '@/presentation/models/activity-type';
import { colors } from '@/presentation/styles/colors';
import {
    Paragraph
} from '@/presentation/styles/styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import React from 'react';

interface Props {
    activityType: ActivityTypeViewModel;
}

const ActivityTypeComponent: React.FC<Props> = ({ activityType }) => {

    return (
        <Accordion sx={{ borderLeft: `6px solid ${colors.secondary[100]}`, backgroundColor: colors.secondary[10] }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Paragraph sx={{ width: '50%', fontWeight: 'bolder', fontSize: '1rem', flexShrink: 0, marginTop: 0 }}>{activityType.name}</Paragraph>
                <Paragraph>{activityType.unity}</Paragraph>
            </AccordionSummary>
            <AccordionDetails>
                <div>
                    <List sx={{ width: '100%' }}>
                        {activityType.activities?.map((item, index) => (
                            <Card key={index} sx={{ paddingLeft: '0.5rem', paddingRight: '0.5rem', marginTop: '0.5rem', borderLeft: `6px solid ${colors.secondary[100]}` }}>
                                <ListItem
                                    key={index}
                                    disableGutters
                                >
                                    <ListItemText primary={item.name} secondary={`Pontos: ${item.points}\t\t\tLimite: ${item.limits}`} />
                                </ListItem>
                            </Card>
                        ))}
                    </List>
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default ActivityTypeComponent;
