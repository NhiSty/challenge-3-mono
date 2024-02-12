import {Avatar, Card, CardActions, CardContent, CardHeader, Chip, Stack} from "@mui/material";
import { PropTypes } from "prop-types";
import {useTranslation} from "@/translation/useTranslation";
import CompanyDemandStatusChip from "@components/companyDemands/StatusChip";
import LoadingButton from "@components/base/LoadingButton";
import useCompanyDemandsVC from "@/hooks/useCompanyDemandsVC";

export default function DemandCard({ demand }) {
    const { t } = useTranslation();
    const { acceptDemand, rejectDemand, loadingDecision} = useCompanyDemandsVC();

    return (
        <Card>
            <CardHeader
                title={
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <p>{`${t('companyDemand')} n°${demand.id}`}</p>
                        <CompanyDemandStatusChip status={demand.status} />
                    </Stack>
                }
            />
            <CardContent>
                <Stack direction={'row'} spacing={2} justifyContent={'start'} alignItems={'center'}>
                    <Avatar sx={{ width: 56, height: 56 }}>
                        {demand?.author?.firstName[0] + demand?.author?.lastName[0]}
                    </Avatar>
                    <Stack direction={'column'}>
                        <p>{demand?.author?.firstName}</p>
                        <p>{demand?.author?.lastName}</p>
                    </Stack>
                </Stack>
                <Stack direction={'row'} spacing={2} mt={2}>
                    <span><strong>{t('companyName')} : </strong></span>
                    <span>{demand?.companyName}</span>
                </Stack>
                <Stack direction={'row'} spacing={2} mt={2}>
                    <span><strong>{t('email')} : </strong></span>
                    <span>{demand?.author.email}</span>
                </Stack>
                <Stack direction={'row'} spacing={2} mt={2}>
                    <span><strong>{t('address')} : </strong></span>
                    <span>{demand?.address}</span>
                </Stack>
            </CardContent>
            {
                demand.status === 'pending' && (
                    <CardActions>
                        <LoadingButton
                            loading={loadingDecision}
                            onClick={() => acceptDemand(demand.id)}
                            variant="contained"
                            color="success"
                        >
                            {t('accept')}
                        </LoadingButton>
                        <LoadingButton
                            loading={loadingDecision}
                            onClick={() => rejectDemand(demand.id)}
                            variant="contained"
                            color="error"
                        >
                            {t('reject')}
                        </LoadingButton>
                    </CardActions>
                )
            }
        </Card>
    )
}

DemandCard.propTypes = {
       demand: PropTypes.object.isRequired
}
