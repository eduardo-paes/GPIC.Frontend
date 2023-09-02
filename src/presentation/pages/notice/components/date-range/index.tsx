import React from 'react';
import { colors } from '@/presentation/styles/colors';
import { Paragraph } from '@/presentation/styles/styled-components';
import { formatDateToLocaleString } from '@/presentation/utils';
import { Close } from '@mui/icons-material';
import { Card, Grid } from '@mui/material';

type Props = {
    startDate: Date;
    endDate: Date;
    period: string;
    label: string;
};

const PeriodColor: Record<string, string> = {
    "registration": colors.primary[100],
    "evaluation": colors.secondary[100],
    "appeal": '#F15A22',
    "sendingDocs": '#4DBC8E'
}

const DatePeriod: React.FC<Props> = ({ startDate, endDate, period, label }) => {
    return (
        <Card sx={{ padding: '1rem', border: `2px solid ${PeriodColor[period]}` }}>
            <Grid container>
                <Grid item xs={12}>
                    <Paragraph sx={{ margin: '0.25rem', fontWeight: 'bold', textAlign: 'center' }}>{label}</Paragraph>
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                    <Paragraph sx={{ margin: '0.25rem 0.5rem', fontWeight: 'bold' }}>{formatDateToLocaleString(startDate)}</Paragraph>
                    <Close htmlColor={colors.primary[100]} />
                    <Paragraph sx={{ margin: '0.25rem 0.5rem', fontWeight: 'bold' }}>{formatDateToLocaleString(endDate)}</Paragraph>
                </Grid>
            </Grid>
        </Card>
    )
}

export default DatePeriod;