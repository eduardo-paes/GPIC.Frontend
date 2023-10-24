import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BorderLinearProgress } from '@/presentation/styles/styled-components';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number, label: string }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <Box sx={{ width: '100%', mr: '1rem' }}>
                <BorderLinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{props.label}</Typography>
            </Box>
        </Box>
    );
}

type Props = {
    progress: number;
    label: string;
}

const LinearProgressLabeled: React.FC<Props> = ({ progress, label }) => {
    return (
        <LinearProgressWithLabel value={progress} label={label} />
    );
}

export default LinearProgressLabeled;