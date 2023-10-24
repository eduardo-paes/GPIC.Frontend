import { NoticeViewModel } from "@/presentation/models/notice";
import { ProjectViewModel } from "@/presentation/models/project";
import { colors } from "@/presentation/styles/colors";
import { StyledButton, Subtitle } from "@/presentation/styles/styled-components";
import { getPeriodNotice } from "@/presentation/utils";
import { Card, Grid } from "@mui/material";
import React from "react";

type Props = {
    notice: NoticeViewModel;
    setOpenProjectManagement: React.Dispatch<React.SetStateAction<boolean>>;
    setProject: React.Dispatch<React.SetStateAction<ProjectViewModel>>;
}

const OpenedNotice: React.FC<Props> = ({ notice, setOpenProjectManagement, setProject }) => {

    function openProjectManegement(): void {
        setOpenProjectManagement(true);
        setProject((prevValue) => ({ ...prevValue, noticeId: notice.id }));
    }

    return (
        <Card sx={{ borderTop: `5px solid ${colors.secondary[100]}` }}>
            <Grid container display={'flex'} justifyContent={'space-between'}>
                <Grid item xs={6} sx={{ padding: '1rem' }} display={'flex'} alignItems={'center'}>
                    <Subtitle>
                        Edital {getPeriodNotice(notice.registrationStartDate!)}
                    </Subtitle>
                </Grid>
                <Grid item xs={6} sx={{ padding: '1rem' }} display={'flex'} alignItems={'center'} justifyContent={'end'}>
                    <StyledButton variant="contained" onClick={openProjectManegement}>
                        Inscrever Projeto
                    </StyledButton>
                </Grid>
            </Grid>
        </Card>
    )
}

export default OpenedNotice;