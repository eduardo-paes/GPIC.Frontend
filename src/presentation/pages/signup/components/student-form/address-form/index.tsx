import StudentViewModel from "@/presentation/models/student";
import { StyledButton, StyledSelectField, StyledTextField } from "@/presentation/styles/styled-components";
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, SelectChangeEvent } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { validateHomeAddress, validateCity, validateUF, validateCEP } from "../../../validations";
import { STATES, cepMask, removeNonNumeric } from "@/presentation/utils";
import { ICEPService } from "@/infrastructure/interfaces/services/cep-service";

type AddressError = {
    homeAddress: string | null;
    city: string | null;
    UF: string | null;
    CEP: string | null;
};

type Props = {
    cepService: ICEPService;
    student: StudentViewModel;
    setStudent: (student: any) => void;
    activeStep: number;
    setActiveStep: (activeStep: number) => void;
};

const AddressDataForm: React.FC<Props> = ({ cepService, student, setStudent, activeStep, setActiveStep }) => {

    const [errors, setErrors] = React.useState<AddressError>();

    React.useEffect(() => {
        if (student.CEP?.length === 9) {
            consultCEP();
        }
    }, [student.CEP])

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setStudent((prevStudent: any) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleCEPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length < 10) {
            setStudent((prevStudent: any) => ({
                ...prevStudent,
                CEP: cepMask(value),
                homeAddress: null,
                city: null,
                UF: null,
            }));
        }
    };

    const consultCEP = async () => {
        const address = await cepService.consult({ CEP: removeNonNumeric(student.CEP!), CPF: student.CPF! });
        setStudent((prevStudent: any) => ({
            ...prevStudent,
            homeAddress: `${address.logradouro} - ${address.bairro}`,
            city: address.localidade,
            UF: Object.keys(STATES).find(x => x === address.uf),
        }));
    };

    const handleSelectFieldChange = (event: SelectChangeEvent<unknown>, child: React.ReactNode) => {
        const { name, value } = event.target;
        setStudent((prevStudent: any) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const goBack = (_event: React.MouseEvent<HTMLButtonElement>) => {
        setActiveStep(activeStep - 1);
    };

    const handleSubmit = (_values: StudentViewModel, formikHelpers: FormikHelpers<StudentViewModel>) => {
        if (validateForm()) {
            setActiveStep(activeStep + 1);
            formikHelpers.setSubmitting(false);
        }

    };

    const validateForm = (): boolean => {
        const newErrors: AddressError = {
            homeAddress: validateHomeAddress(student.homeAddress),
            city: validateCity(student.city),
            UF: validateUF(student.UF),
            CEP: validateCEP(student.CEP)
        };

        if (
            newErrors.homeAddress ||
            newErrors.city ||
            newErrors.UF ||
            newErrors.CEP
        )
            setErrors(newErrors);
        else
            return true;

        return false;
    };

    return (
        <Formik
            initialValues={student}
            onSubmit={handleSubmit}
        >
            <Form>
                <StyledTextField
                    sx={{ marginTop: '1rem' }}
                    type="text"
                    fullWidth
                    label="CEP"
                    name="CEP"
                    value={student.CEP}
                    error={errors && errors.CEP !== null}
                    onChange={handleCEPChange}
                    onBlur={consultCEP}
                />
                {errors?.CEP && <FormHelperText error>{errors.CEP}</FormHelperText>}
                {
                    student.homeAddress &&
                    <>
                        <FormControl fullWidth sx={{ marginTop: '1rem' }}>
                            <StyledTextField
                                sx={{ marginTop: '1rem' }}
                                disabled
                                fullWidth
                                type="text"
                                label="Endereço"
                                name="homeAddress"
                                value={student.homeAddress}
                                error={errors && errors.homeAddress !== null}
                                onChange={handleTextFieldChange}
                            />
                        </FormControl>
                        {errors?.homeAddress && <FormHelperText error>{errors.homeAddress}</FormHelperText>}
                    </>
                }
                {
                    student.city &&
                    <>
                        <FormControl fullWidth sx={{ marginTop: '1rem' }}>
                            <StyledTextField
                                fullWidth
                                disabled
                                type="text"
                                label="Cidade"
                                name="city"
                                variant="outlined"
                                value={student.city}
                                error={errors && errors.city !== null}
                                onChange={handleTextFieldChange}
                            />
                        </FormControl>
                        {errors?.city && <FormHelperText error>{errors.city}</FormHelperText>}
                    </>
                }
                {
                    student.UF &&
                    <>
                        <FormControl fullWidth sx={{ marginTop: '1rem' }}>
                            <InputLabel>UF</InputLabel>
                            <StyledSelectField
                                fullWidth
                                disabled
                                value={student.UF}
                                error={errors && errors.UF !== null}
                                name="UF"
                                label="UF"
                                onChange={handleSelectFieldChange}
                            >
                                {Object.entries(STATES).map(([value, label]) => (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                ))}
                            </StyledSelectField>
                        </FormControl>
                        {errors?.UF && <FormHelperText error>{errors.UF}</FormHelperText>}
                    </>
                }
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
                    <StyledButton variant="outlined" onClick={goBack}>
                        Voltar
                    </StyledButton>
                    <StyledButton disabled={!student.CEP || student.CEP.length < 9} variant="contained" type="submit">
                        Avançar
                    </StyledButton>
                </Box>
            </Form>
        </Formik>
    );
};

export default AddressDataForm;