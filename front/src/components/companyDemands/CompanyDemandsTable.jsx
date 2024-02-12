import Table from "@components/base/Table";
import {useEffect} from "react";
import {useTranslation} from "@/translation/useTranslation";
import TableLineSkeleton from "@components/base/TableLineSkeleton";
import {IconButton} from "@mui/material";
import { ArrowUpRightSquareIcon } from "lucide-react";
import {useNavigate} from "react-router-dom";
import useCompanyDemandsVC from "@/hooks/useCompanyDemandsVC";

export default function CompanyDemandsTable() {
    const { t } = useTranslation();
    const { getPendingDemands, loading, demands } = useCompanyDemandsVC();
    const navigate = useNavigate();

    useEffect(() => {
        getPendingDemands();
    }, []);

    console.log(demands)

    return (
        <Table thead={[t("companyName"), t("firstname"), t("lastname"), t("address"), '']}>
            {loading

                ? (<TableLineSkeleton nbLines={3} nbColumns={4} />)
                : ( demands?.length > 0
                    ? demands.map((demand, index) => (
                        <tr key={index}>
                            <td>{demand.companyName}</td>
                            <td>{demand.author.firstName}</td>
                            <td>{demand.author.lastName}</td>
                            <td>{demand.address}</td>
                            <td>
                                <IconButton onClick={() => navigate(`${demand.id}`)}>
                                    <ArrowUpRightSquareIcon />
                                </IconButton>
                            </td>
                        </tr>
                    ))
                    : (
                        <tr>
                            <td colSpan={5} className="text-center">{t("noPendingDemands")}</td>
                        </tr>
                    )
            )}
        </Table>
    )
}
