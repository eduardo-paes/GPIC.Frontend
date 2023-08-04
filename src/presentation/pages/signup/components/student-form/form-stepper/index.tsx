import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import * as React from 'react';

type StepperProps = {
    activeStep: number;
    setActiveStep: (activeStep: number) => void;
    steps: Array<string>;
};

const FormStepper: React.FC<StepperProps> = ({ activeStep, setActiveStep, steps }) => {

    const handleStep = (step: number) => () => setActiveStep(step);

    return (
        <Box sx={{ width: '100%', padding: '2rem 1rem' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={label} completed={index < activeStep}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default FormStepper;
