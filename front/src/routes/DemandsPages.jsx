import {useTranslation} from "@/translation/useTranslation";
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import CompanyDemandsTable from "@components/companyDemands/CompanyDemandsTable";

export default function DemandsPages() {
    const { t } = useTranslation();

    return (
        <Card>
            <CardHeader title={<Typography>{t("companyDemands")}</Typography>} />
            <CardContent>
                <CompanyDemandsTable />
            </CardContent>
        </Card>
    )
}
