import MainLayout from "../widgets/mainLayout";
import Paper from "@mui/material/Paper";
import PartnerBalance from "../entities/components/partnerBalance";
import {Stack, useMediaQuery} from "@mui/material";
import PartnerLink from "../entities/components/partnerLink";
import ReferralsList from "../widgets/referralsList";


const Partner = () => {
    const mediaQuery = useMediaQuery('(min-width:1270px)');

    return (
        <MainLayout heading="Партнерская программа">
            <Stack spacing={7}>
                <Paper sx={{maxWidth: 'max-content'}}>
                    <span className="h2 blue">Как работает партнерская система?</span>
                </Paper>
                <PartnerBalance/>
                <PartnerLink/>
                <ReferralsList/>
            </Stack>
        </MainLayout>
    );
};

export default Partner;
